// 构建脚本：将 index.html（可读源码）压缩为 dist/index.html（线上产物）
// 用法: node tools/minify.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { minify } from 'html-minifier-terser';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const minified = await minify(html, {
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
  keepClosingSlash: true
});

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/index.html', import.meta.url), minified);

console.log(`index.html: ${html.length} bytes -> dist/index.html: ${minified.length} bytes (${Math.round((1 - minified.length / html.length) * 100)}% 减小)`);
