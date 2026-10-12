import { spawn } from "node:child_process";

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = "C:\\Users\\Hp\\AppData\\Local\\Temp\\chrome-bench-" + Date.now();

  const chromeProc = spawn(chromePath, [
    "--headless",
    "--remote-debugging-port=9222",
    `--user-data-dir=${userDataDir}`,
    "http://localhost:3000"
  ]);

  // Wait 2.5s for page and CDP to initialize
  await new Promise((r) => setTimeout(r, 2500));

  try {
    const res = await fetch("http://127.0.0.1:9222/json/list");
    const pages = await res.json();
    const page = pages.find((p) => p.type === "page") || pages[0];

    if (!page || !page.webSocketDebuggerUrl) {
      console.log("No active target page found");
      return;
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve) => { ws.onopen = resolve; });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === msgId) {
            ws.removeEventListener("message", handler);
            resolve(data.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send("Runtime.enable");

    const evalResult = await send("Runtime.evaluate", {
      expression: `
        new Promise((resolve) => {
          const frameDeltas = [];
          let last = performance.now();
          let frames = 0;

          function loop(now) {
            const delta = now - last;
            last = now;
            if (frames > 5) {
              frameDeltas.push(delta);
            }
            frames++;
            if (frames < 70) {
              requestAnimationFrame(loop);
            } else {
              const avg = frameDeltas.reduce((a, b) => a + b, 0) / frameDeltas.length;
              resolve({
                fps: Math.round(1000 / avg),
                avgFrametimeMs: Number(avg.toFixed(2)),
                samples: frameDeltas.length
              });
            }
          }
          requestAnimationFrame(loop);
        })
      `,
      awaitPromise: true,
      returnByValue: true,
    });

    console.log("=== RUNTIME FPS REPORT ===");
    console.log(JSON.stringify(evalResult.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error("Benchmark error:", err.message);
  } finally {
    chromeProc.kill();
  }
}

run();
