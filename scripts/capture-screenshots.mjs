import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");
const screenshotRoot = path.join(rootDir, "screenshots", "app-store", "iphone-6.5");

const PORT = 4173;

// Mobile CSS viewport at 3x scale -> 1284x2778 PNG (App Store 6.5" size)
const MOBILE_CSS = { width: 428, height: 926 };
const DEVICE_SCALE = 3;
const OUTPUT_WIDTH = MOBILE_CSS.width * DEVICE_SCALE;
const OUTPUT_HEIGHT = MOBILE_CSS.height * DEVICE_SCALE;

const pages = [
  {
    slug: "01-home",
    path: "/",
    title: "Browse all CSU campuses",
  },
  {
    slug: "homev2",
    path: "/",
    title: "Home with recently visited campus",
    action: async (page) => {
      const search = page.locator('input[placeholder*="Search campuses"]');
      await search.fill("csus");
      await page.waitForTimeout(500);

      await page
        .getByRole("link", {
          name: "Navigate to California State University, Sacramento",
        })
        .click();
      await page.waitForURL(/\/campus\/csus\/?$/, { timeout: 15000 });
      await page.waitForTimeout(1000);

      await page.getByRole("button", { name: "Change Campus" }).click();
      await page.waitForURL(/\/$/, { timeout: 15000 });
      await page.waitForTimeout(500);

      await page
        .getByRole("heading", { name: "Recently Visited" })
        .waitFor({ timeout: 10000 });
      await page.waitForTimeout(500);
    },
  },
  {
    slug: "02-campus",
    path: "/campus/csus/",
    title: "Campus building list",
  },
  {
    slug: "03-search",
    path: "/campus/csus/",
    title: "Search buildings quickly",
    action: async (page) => {
      const search = page.locator('input[placeholder*="Search building"]');
      await search.fill("library");
      await page.waitForTimeout(500);
    },
  },
  {
    slug: "04-library",
    path: "/campus/csus/",
    title: "University Library building page",
    action: async (page) => {
      const search = page.locator('input[placeholder*="Search building"]');
      await search.fill("library");
      await page.waitForTimeout(500);

      await page.getByRole("link", { name: "University Library (LIB)" }).click();
      await page.waitForURL(/\/campus\/csus\/lib\/?$/, { timeout: 15000 });
      await page
        .getByRole("heading", { name: "University Library", level: 2 })
        .waitFor({ timeout: 10000 });
      await page.waitForTimeout(500);
    },
  },
];

const onlySlugs = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
const pagesToCapture =
  onlySlugs.length > 0
    ? pages.filter((pageInfo) => onlySlugs.includes(pageInfo.slug))
    : pages;

if (pagesToCapture.length === 0) {
  console.error(
    `No matching pages. Available slugs: ${pages.map((p) => p.slug).join(", ")}`,
  );
  process.exit(1);
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          resolve();
          return;
        }
      } catch {
        // Server still starting.
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }

      setTimeout(check, 250);
    };

    check();
  });
}

function startServer() {
  return spawn("npx", ["serve", outDir, "-l", String(PORT), "--no-clipboard"], {
    cwd: rootDir,
    stdio: "ignore",
  });
}

async function captureScreenshots() {
  await mkdir(screenshotRoot, { recursive: true });

  const server = startServer();
  const baseUrl = `http://127.0.0.1:${PORT}`;

  try {
    await waitForServer(baseUrl);

    const browser = await chromium.launch();
    const context = await browser.newContext({
      ...devices["iPhone 14 Plus"],
      viewport: MOBILE_CSS,
      deviceScaleFactor: DEVICE_SCALE,
    });

    const captured = [];

    for (const pageInfo of pagesToCapture) {
      const page = await context.newPage();
      await page.goto(`${baseUrl}${pageInfo.path}`, {
        waitUntil: "networkidle",
        timeout: 60000,
      });
      if (pageInfo.action) {
        await pageInfo.action(page);
      }
      await page.waitForTimeout(1500);

      const filename = `${pageInfo.slug}.png`;
      const filePath = path.join(screenshotRoot, filename);

      await page.screenshot({
        path: filePath,
        fullPage: false,
      });

      captured.push({
        file: filename,
        title: pageInfo.title,
        cssViewport: `${MOBILE_CSS.width}x${MOBILE_CSS.height}`,
        outputSize: `${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}`,
      });

      await page.close();
    }

    await browser.close();

    const manifest = {
      generatedAt: new Date().toISOString(),
      device: "iPhone mobile viewport (428x926 CSS @ 3x)",
      cssViewport: `${MOBILE_CSS.width}x${MOBILE_CSS.height}`,
      deviceScaleFactor: DEVICE_SCALE,
      outputDimensions: `${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}`,
      usage: "App Store Connect iPhone 6.5 inch display and GitHub README",
      files: captured,
    };

    await writeFile(
      path.join(screenshotRoot, "manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    console.log("Captured mobile screenshots:");
    for (const item of captured) {
      console.log(
        `- ${item.file} (mobile ${item.cssViewport} -> ${item.outputSize})`,
      );
    }
  } finally {
    server.kill("SIGTERM");
  }
}

captureScreenshots().catch((error) => {
  console.error(error);
  process.exit(1);
});
