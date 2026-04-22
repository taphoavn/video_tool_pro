const fs = require("fs");
const { minify } = require("html-minifier-terser");

async function run() {
  const inputPath = "index-dev.html";
  const outputDir = "dist";
  const outputPath = `${outputDir}/index.html`;

  const html = fs.readFileSync(inputPath, "utf8");

  const result = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  });

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  fs.writeFileSync(outputPath, result, "utf8");

  console.log(`Built: ${outputPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});