import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p = await (await b.newContext()).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/../dist/index.html');
const n = await p.$$eval('#list button', b=>b.length);
for (let i=0;i<n;i++){
  await p.click(`#list button:nth-child(${i+1})`);
  const title = await p.textContent('#card h1');
  const secs = await p.$$eval('#card h2', h=>h.length);
  const fields = await p.$$eval('#journal input, #journal textarea', f=>f.length);
  await p.fill('#journal input, #journal textarea', 'test');
  const prev = await p.textContent('#preview');
  const safety = await p.evaluate(()=>!!current.safetyNet);
  console.log(`${title.padEnd(48)} sek:${secs} felter:${fields} safety:${safety} -> ${prev.split('\n')[0].slice(0,50)}`);
}
console.log('fejl:',errs); await b.close();
