async function measureFps() {
  try {
    const listRes = await fetch("http://127.0.0.1:9222/json/list");
    const pages = await listRes.json();
    const page = pages.find((p) => p.type === "page") || pages[0];

    if (!page || !page.webSocketDebuggerUrl) {
      console.log("No active target page found");
      return;
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (evt) => {
          const res = JSON.parse(evt.data);
          if (res.id === id) {
            ws.removeEventListener("message", handler);
            resolve(res.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send("Runtime.enable");

    // Measure requestAnimationFrame timing in the browser
    const evalResult = await send("Runtime.evaluate", {
      expression: `
        new Promise((resolve) => {
          const frameTimes = [];
          let lastTime = performance.now();
          let count = 0;

          function tick(now) {
            const dt = now - lastTime;
            lastTime = now;
            if (count > 5) { // Skip warmup
              frameTimes.push(dt);
            }
            count++;
            if (count < 65) {
              requestAnimationFrame(tick);
            } else {
              const avgDt = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
              const minDt = Math.min(...frameTimes);
              const maxDt = Math.max(...frameTimes);
              const fps = 1000 / avgDt;
              resolve({
                fps: Math.round(fps),
                avgFrametimeMs: Number(avgDt.toFixed(2)),
                minFrametimeMs: Number(minDt.toFixed(2)),
                maxFrametimeMs: Number(maxDt.toFixed(2)),
                samples: frameTimes.length,
                tier: window.navigator.hardwareConcurrency ? "Hardware detected" : "Standard"
              });
            }
          }
          requestAnimationFrame(tick);
        })
      `,
      awaitPromise: true,
      returnByValue: true,
    });

    console.log("=== FPS BENCHMARK RESULTS ===");
    console.log(JSON.stringify(evalResult.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error("Benchmark error:", err.message);
  }
}

measureFps();
