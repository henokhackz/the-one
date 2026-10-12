import { spawn } from "node:child_process";

async function test() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = "C:\\Users\\Hp\\AppData\\Local\\Temp\\chrome-test-" + Date.now();

  const chromeProc = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9228",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    `--user-data-dir=${userDataDir}`,
    "http://localhost:3000"
  ]);

  await new Promise((r) => setTimeout(r, 3000));

  try {
    const res = await fetch("http://127.0.0.1:9228/json/list");
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

    await send("Runtime.enable");
    const initClass = await send("Runtime.evaluate", { expression: "document.documentElement.className" });
    console.log("Initial class:", initClass.result.value);

    const btnInfo = await send("Runtime.evaluate", {
      expression: "Boolean(document.querySelector('button[aria-label=\"Toggle theme\"]'))"
    });
    console.log("Btn found:", btnInfo.result.value);

    const clickRes = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label="Toggle theme"]');
          if (btn) {
            btn.click();
            return "Clicked";
          }
          return "No button";
        })()
      `
    });
    console.log("Click result:", clickRes.result.value);

    await new Promise((r) => setTimeout(r, 1000));

    const afterClass = await send("Runtime.evaluate", { expression: "document.documentElement.className" });
    const bg = await send("Runtime.evaluate", { expression: "getComputedStyle(document.body).backgroundColor" });
    const color = await send("Runtime.evaluate", { expression: "getComputedStyle(document.body).color" });
    console.log("Class after click:", afterClass.result.value, "BG:", bg.result.value, "Color:", color.result.value);

    ws.close();
  } catch (err) {
    console.error("Err:", err);
  } finally {
    chromeProc.kill();
  }
}

test();
