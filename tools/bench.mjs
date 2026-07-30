// 首页加载性能基准测试：模拟弱网（150ms RTT / 下行 1.6 Mbps），禁用缓存，多轮测量
// 用法: node tools/bench.mjs [url] [runs]
import { chromium } from 'playwright-core';

const url = process.argv[2] || 'http://localhost:4000/';
const RUNS = parseInt(process.argv[3] || '5', 10);

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const page = await browser.newPage();
const client = await page.context().newCDPSession(page);
await client.send('Network.enable');
await client.send('Network.setCacheDisabled', { cacheDisabled: true });
// 弱网: 150ms RTT, 下行 1.6 Mbps (200 KB/s), 上行 750 Kbps
await client.send('Network.emulateNetworkConditions', {
  offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750
});

const runs = [];
for (let i = 0; i < RUNS; i++) {
  await page.goto(url + '?bench=' + Date.now(), { waitUntil: 'load' });
  runs.push(await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint');
    return {
      ttfb: Math.round(n.responseStart),
      fcp: fcp ? Math.round(fcp.startTime) : null,
      dcl: Math.round(n.domContentLoadedEventEnd),
      load: Math.round(n.loadEventEnd),
      transfer: n.transferSize,
      decoded: n.decodedBodySize
    };
  }));
}
await browser.close();

const avg = (k) => Math.round(runs.reduce((s, r) => s + r[k], 0) / runs.length);
console.log(JSON.stringify({
  url, runs: RUNS, network: '150ms RTT / 1.6 Mbps down',
  samples: runs,
  avg: {
    ttfb: avg('ttfb'), fcp: avg('fcp'), dcl: avg('dcl'), load: avg('load'),
    transfer: avg('transfer'), decoded: avg('decoded')
  }
}, null, 2));
