import { spawn } from "node:child_process";
import fs from "node:fs";

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = "C:\\Users\\Hp\\AppData\\Local\\Temp\\chrome-shots-" + Date.now();

  const chromeProc = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9226",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    `--user-data-dir=${userDataDir}`,
    "http://localhost:3000"
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  try {
    const res = await fetch("http://127.0.0.1:9226/json/list");
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

    async function captureView(filename, width, height, targetTheme, scrollY = 0) {
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      // Ensure theme is set correctly
      for (let attempt = 0; attempt < 5; attempt++) {
        const themeStatus = await send("Runtime.evaluate", {
          expression: `
            (() => {
              const isDark = document.documentElement.classList.contains('dark');
              const wantsDark = '${targetTheme}' === 'dark';
              if (isDark !== wantsDark) {
                const btn = document.querySelector('button[aria-label="Toggle theme"]');
                if (btn) {
                  btn.click();
                  return 'toggled';
                }
                return 'btn-not-found';
              }
              return 'matched';
            })()
          `
        });
        if (themeStatus.result?.value === 'matched') break;
        await new Promise((r) => setTimeout(r, 600));
      }

      // Allow 600ms for CSS cross-fade transition and Three.js uniform sync
      await new Promise((r) => setTimeout(r, 600));

      if (scrollY > 0) {
        await send("Runtime.evaluate", {
          expression: `window.scrollTo(0, ${scrollY});`
        });
        await new Promise((r) => setTimeout(r, 700));
      } else {
        await send("Runtime.evaluate", {
          expression: `window.scrollTo(0, 0);`
        });
        await new Promise((r) => setTimeout(r, 700));
      }

      const shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });

      fs.writeFileSync(`public/screenshots/${filename}`, Buffer.from(shot.data, "base64"));
      console.log(`Saved public/screenshots/${filename}`);
    }

    // 1. Desktop Light Hero (Birana warm parchment surface, cleaned hero text, ink borders)
    await captureView("birana-hero-1440-light.png", 1440, 900, "light", 0);

    // 2. Desktop Dark Hero (Candlelit aged vellum parchment, cleaned hero text, ink borders)
    await captureView("birana-hero-1440-dark.png", 1440, 900, "dark", 0);

    // 3. Desktop Projects Light (Unskewed browser mockup sheet on parchment, zero shadows)
    const projOffset = await send("Runtime.evaluate", {
      expression: `document.getElementById('projects')?.offsetTop || 900;`
    });
    const pY = (projOffset.result?.value || 900) - 20;

    await captureView("birana-projects-1440-light.png", 1440, 900, "light", pY);
    await captureView("birana-projects-1440-dark.png", 1440, 900, "dark", pY);

    // 4. Mobile 390px Hero Light and Dark
    await captureView("birana-hero-390-light.png", 390, 844, "light", 0);
    await captureView("birana-hero-390-dark.png", 390, 844, "dark", 0);

    ws.close();
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    chromeProc.kill();
  }
}

run();
