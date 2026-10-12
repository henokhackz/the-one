async function inspect() {
  const res = await fetch("http://127.0.0.1:9224/json/list").catch(() => null);
  if (!res) {
    console.log("No chrome on 9224");
    return;
  }
  const pages = await res.json();
  const page = pages.find((p) => p.type === "page") || pages[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => { ws.onopen = r; });

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      const handler = (evt) => {
        const data = JSON.parse(evt.data);
        if (data.id === id) {
          ws.removeEventListener("message", handler);
          resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const evalRes = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return { error: "No canvas found in DOM" };
        const rect = canvas.getBoundingClientRect();
        return {
          width: canvas.width,
          height: canvas.height,
          rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
          glError: (() => {
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            return gl ? "gl context exists" : "no gl context";
          })()
        };
      })()
    `,
    returnByValue: true
  });
  console.log("Canvas eval:", JSON.stringify(evalRes, null, 2));

  // Also read console logs
  await send("Console.enable");
  await send("Runtime.enable");
  ws.close();
}
inspect();
