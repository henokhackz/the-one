import { spawn } from "node:child_process";

async function main() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = "C:\\Users\\Hp\\AppData\\Local\\Temp\\chrome-dbg-" + Date.now();
  const chromeProc = spawn(chromePath, [
    "--headless",
    "--remote-debugging-port=9225",
    `--user-data-dir=${userDataDir}`,
    "http://localhost:3000"
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  try {
    const res = await fetch("http://127.0.0.1:9225/json/list");
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

    await send("Page.enable");
    await send("Runtime.enable");

    // Capture console API calls
    ws.addEventListener("message", (evt) => {
      const data = JSON.parse(evt.data);
      if (data.method === "Runtime.consoleAPICalled") {
        console.log("PAGE CONSOLE:", data.params.type, data.params.args.map(a => a.value || a.description));
      }
      if (data.method === "Runtime.exceptionThrown") {
        console.error("PAGE EXCEPTION:", data.params.exceptionDetails);
      }
    });

    const info = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const c = document.querySelector('canvas');
          if (!c) return { hasCanvas: false };
          return {
            hasCanvas: true,
            width: c.width,
            height: c.height,
            style: c.getAttribute('style')
          };
        })()
      `,
      returnByValue: true
    });
    console.log("Canvas info:", info.result?.value);

    // Wait 2s to catch any console errors
    await new Promise((r) => setTimeout(r, 2000));
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chromeProc.kill();
  }
}

main();
