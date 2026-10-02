import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx = await b.newContext({viewport:{width:1366,height:768}, permissions:['clipboard-read','clipboard-write']});
const p = await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/../dist/index.html');
await p.keyboard.type('feber');
console.log('LISTE:', await p.$$eval('#list > *', els=>els.map(e=>e.textContent.trim()).slice(0,4)));
await p.keyboard.press('Escape'); await p.keyboard.type('bryst'); await p.keyboard.press('Enter');
await p.keyboard.type('i morges'); await p.keyboard.press('Tab'); await p.keyboard.type('trykkende');
await p.click('#rf_0'); await p.click('#rf_2'); await p.click('#rf_2'); // hvilesmerter=nej, koldsved=JA
await p.focus('#rf_3'); await p.keyboard.press('n');
// O: AT ua via '.', BT
const oIdx = await p.evaluate(()=>current.journal.findIndex(l=>l.key==='O'));
await p.focus(`#f_${oIdx}_0`); await p.keyboard.press('.');
await p.fill(`#f_${oIdx}_1`,'128/82');
await p.keyboard.down('Alt'); await p.keyboard.press('KeyI'); await p.keyboard.up('Alt');
await p.keyboard.down('Control'); await p.keyboard.press('Enter'); await p.keyboard.up('Control');
console.log('--- NOTAT ---\n'+await p.evaluate(()=>navigator.clipboard.readText()));
console.log('--- TJEK ---\n'+await p.textContent('#check'));
await p.screenshot({path:'/home/claude/lommekort/v11.png'});
await p.keyboard.down('Control'); await p.keyboard.down('Shift'); await p.keyboard.press('Enter'); await p.keyboard.up('Shift'); await p.keyboard.up('Control');
console.log('--- PATIENT ---\n'+(await p.evaluate(()=>navigator.clipboard.readText())).slice(0,80));
await p.keyboard.down('Alt'); await p.keyboard.press('KeyN'); await p.keyboard.up('Alt');
console.log('RYDDET chips:', await p.$$eval('.chip', c=>c.filter(x=>x.dataset.s!=='0').length), '| preview:', await p.textContent('#preview'));
// alle kort
for (const c of await p.evaluate(()=>CARDS.map(c=>c.title))) { await p.evaluate(t=>openCard(CARDS.find(c=>c.title===t)), c); }
console.log('FEJL:', errs);
await b.close();
