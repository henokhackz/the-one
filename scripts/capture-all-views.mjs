import { spawn } from "node:child_process";
import fs from "node:fs";

async function capture() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = "C:\\Users\\Hp\\AppData\\Local\\Temp\\chrome-shots-" + Date.now();

  const chromeProc = spawn(chromePath, [
    "--headless",
    "--remote-debugging-port=9223",
    `--user-data-dir=${userDataDir}`,
    "http://localhost:3000"
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  try {
    const res = await fetch("http://127.0.0.1:9223/json/list");
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

    async function takeShot(filename, width, height, scrollY = 0) {
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      if (scrollY > 0) {
        await send("Runtime.evaluate", {
          expression: `window.scrollTo(0, ${scrollY});`
        });
        await new Promise((r) => setTimeout(r, 800));
      } else {
        await send("Runtime.evaluate", {
          expression: `window.scrollTo(0, 0);`
        });
        await new Promise((r) => setTimeout(r, 800));
      }

      const shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });

      fs.writeFileSync(`public/screenshots/${filename}`, Buffer.from(shot.data, "base64"));
      console.log(`Saved public/screenshots/${filename}`);
    }

    // 1. Desktop Hero (1440x900)
    await takeShot("hero-1440.png", 1440, 900, 0);

    // 2. Desktop Projects (1440x900, scrolled to #projects)
    const projOffset = await send("Runtime.evaluate", {
      expression: `document.getElementById('projects')?.offsetTop || 900;`
    });
    await takeShot("projects-1440.png", 1440, 900, (projOffset.result.value || 900) - 20);

    // 3. Desktop Nav while scrolling (scrolled to #skills, shows progress bar & active nav)
    const skillsOffset = await send("Runtime.evaluate", {
      expression: `document.getElementById('skills')?.offsetTop || 2200;`
    });
    await takeShot("nav-scrolling-1440.png", 1440, 900, (skillsOffset.result.value || 2200) - 20);

    // 4. Mobile Hero (390x844)
    await takeShot("hero-390.png", 390, 844, 0);

    // 5. Mobile Projects (390x844, scrolled to projects)
    await takeShot("projects-390.png", 390, 844, (projOffset.result.value || 900) - 20);

    ws.close();
  } catch (err) {
    console.error("Capture error:", err.message);
  } finally {
    chromeProc.kill();
  }
}

capture();
