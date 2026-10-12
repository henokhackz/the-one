import { spawn } from "node:child_process";
import fs from "node:fs";

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = "C:\\Users\\Hp\\AppData\\Local\\Temp\\chrome-shots-" + Date.now();

  const chromeProc = spawn(chromePath, [
    "--headless",
    "--remote-debugging-port=9224",
    `--user-data-dir=${userDataDir}`,
    "http://localhost:3000"
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  try {
    const res = await fetch("http://127.0.0.1:9224/json/list");
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
    await send("Input.emulateTouchFromMouseEvent", { enabled: false });

    async function captureView(filename, width, height, theme, mouseX, mouseY, debugUrl) {
      if (debugUrl) {
        await send("Page.navigate", { url: debugUrl });
        await new Promise((r) => setTimeout(r, 2200));
      }

      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      // Set theme class on documentElement
      await send("Runtime.evaluate", {
        expression: `
          if ('${theme}' === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
          } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          }
          window.dispatchEvent(new Event('storage'));
        `
      });

      await new Promise((r) => setTimeout(r, 800));

      // Emulate pointer movement to trigger hover
      if (mouseX !== undefined && mouseY !== undefined) {
        await send("Input.dispatchMouseEvent", {
          type: "mouseMoved",
          x: mouseX,
          y: mouseY,
        });
        await send("Input.dispatchPointerEvent", {
          type: "pointerMove",
          x: mouseX,
          y: mouseY,
          pointerType: "mouse"
        });
        await new Promise((r) => setTimeout(r, 600));
      }

      const shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });

      fs.writeFileSync(`public/screenshots/${filename}`, Buffer.from(shot.data, "base64"));
      console.log(`Saved public/screenshots/${filename}`);
    }

    // 1. Desktop 1440px Dark with hover over right grid area
    await captureView("hero-grid-1440-dark.png", 1440, 900, "dark", 1050, 420);

    // 2. Desktop 1440px Light with hover over right grid area
    await captureView("hero-grid-1440-light.png", 1440, 900, "light", 1050, 420);

    // 3. Mobile 390px Dark
    await captureView("hero-grid-390-dark.png", 390, 844, "dark", 200, 300);

    // 4. Mobile 390px Light
    await captureView("hero-grid-390-light.png", 390, 844, "light", 200, 300);

    // 5. Desktop 1440px with ?debug=grid showing 140px radius overlay
    await captureView("hero-grid-debug-1440.png", 1440, 900, "dark", 1000, 400, "http://localhost:3000/?debug=grid");

    ws.close();
  } catch (err) {
    console.error("Grid verification error:", err.message);
  } finally {
    chromeProc.kill();
  }
}

run();
