import { chromium } from 'playwright';
const b = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const ctx = await b.newContext({ viewport:{width:1440,height:900}, permissions:['clipboard-read','clipboard-write'] });
const p = await ctx.newPage();
const errs=[]; p.on('pageerror', e=>errs.push(e.message)); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
await p.goto('file://' + process.cwd() + '/../dist/index.html');
await p.keyboard.type('svim'); await p.keyboard.press('Enter');
const t = await p.textContent('#card h1'); console.log('ÅBNET:', t);
// udfyld 3 felter via Tab
await p.keyboard.type('i går');            // Svimmelhed siden
await p.keyboard.press('Tab'); await p.keyboard.type('vertigo');
await p.keyboard.press('Tab'); await p.keyboard.type('sekunder');
await p.fill('#f_4_0', 'Positiv højre side');   // A
await p.keyboard.down('Alt'); await p.keyboard.press('KeyS'); await p.keyboard.up('Alt');
await p.keyboard.down('Control'); await p.keyboard.press('Enter'); await p.keyboard.up('Control');
const clip = await p.evaluate(()=>navigator.clipboard.readText());
console.log('--- KOPI ---\n'+clip);
await p.screenshot({path:'shot1.png'});
// ny patient rydder
await p.keyboard.down('Alt'); await p.keyboard.press('KeyN'); await p.keyboard.up('Alt');
console.log('EFTER RYD:', await p.textContent('#preview'));
// søg via indhold og nyt kort rydder felter
await p.keyboard.press('Escape'); await p.click('body'); await p.keyboard.press('/'); await p.keyboard.type('feber'); 
console.log('LISTE feber:', await p.$$eval('#list button span:first-child', els=>els.map(e=>e.textContent)));
await p.keyboard.press('Enter'); console.log('ÅBNET:', await p.textContent('#card h1'));
await p.setViewportSize({width:390,height:844}); await p.screenshot({path:'shot_mobile.png', fullPage:false});
console.log('FEJL:', errs);
await b.close();
