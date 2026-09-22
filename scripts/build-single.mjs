/**
 * Bundles the built app into ONE self-contained .html file.
 *
 * Inlines: the CSS, the JS, the four brand PNGs, and the webfonts themselves —
 * so the file renders identically to localhost with no network and no sibling files.
 *
 *   npm run build:single
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const OUT = join(root, "gIGNITE-2026.html");

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const dataUri = (buf, ext) => `data:${MIME[ext] ?? "application/octet-stream"};base64,${buf.toString("base64")}`;

/* ---------- 1. read the build ---------- */
let html = await readFile(join(dist, "index.html"), "utf8");
const js = await readFile(join(dist, "app.js"), "utf8");

const cssName = (await readdir(dist)).find((f) => f.endsWith(".css"));
let css = cssName ? await readFile(join(dist, cssName), "utf8") : "";

/* ---------- 2. inline the brand images everywhere they are referenced ---------- */
const images = (await readdir(dist)).filter((f) => extname(f) === ".png");
const uris = {};
for (const name of images) {
  uris[name] = dataUri(await readFile(join(dist, name)), ".png");
}

let jsInlined = js;
for (const [name, uri] of Object.entries(uris)) {
  // source writes them as "/name.png"; the build may also emit "./name.png"
  for (const ref of [`"/${name}"`, `'/${name}'`, `"./${name}"`, `'./${name}'`]) {
    jsInlined = jsInlined.split(ref).join(`"${uri}"`);
  }
  html = html.split(`./${name}`).join(uri).split(`/${name}`).join(uri);
  css = css.split(`./${name}`).join(uri).split(`/${name}`).join(uri);
}

/* ---------- 3. inline the webfonts ---------- */
const fontHref = html.match(/href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)"/)?.[1];
let fontCss = "";

if (fontHref) {
  const url = fontHref.replaceAll("&amp;", "&");
  // a modern UA string is what makes Google serve woff2 rather than ttf
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Google Fonts request failed: ${res.status}`);
  fontCss = await res.text();

  // keep only the latin + latin-ext faces; the rest triples the file for nothing
  const blocks = fontCss.split("/*").filter(Boolean);
  fontCss = blocks
    .filter((b) => /^\s*(latin|latin-ext)\s*\*\//.test(b))
    .map((b) => b.slice(b.indexOf("*/") + 2))
    .join("\n");

  const urls = [...new Set([...fontCss.matchAll(/url\((https:[^)]+\.woff2)\)/g)].map((m) => m[1]))];
  console.log(`  fonts: embedding ${urls.length} woff2 files`);

  const fetched = await Promise.all(
    urls.map(async (u) => {
      const r = await fetch(u);
      if (!r.ok) throw new Error(`font fetch failed: ${u}`);
      return [u, dataUri(Buffer.from(await r.arrayBuffer()), ".woff2")];
    })
  );
  for (const [u, uri] of fetched) fontCss = fontCss.split(u).join(uri);
}

/* ---------- 4. stitch it together ---------- */
html = html
  // drop the external font <link>s and preconnects — they are inlined now
  .replace(/<link[^>]+fonts\.(googleapis|gstatic)\.com[^>]*>\s*/g, "")
  .replace(/<link[^>]+rel="stylesheet"[^>]*>\s*/g, "")
  .replace(/<script[^>]+src="[^"]*app\.js"[^>]*><\/script>/, "")
  .replace(
    "</head>",
    `<style>\n${fontCss}\n</style>\n<style>\n${css}\n</style>\n</head>`
  )
  .replace("</body>", `<script type="module">\n${jsInlined}\n</script>\n</body>`);

await writeFile(OUT, html, "utf8");

const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
console.log(`\n  ✓ ${OUT}`);
console.log(`    ${kb} KB · self-contained · open it directly in a browser\n`);
