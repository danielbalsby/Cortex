const { chromium } = require('playwright');
const S = __dirname + '/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file:///home/user/Cortex/cortex.html'); await p.waitForTimeout(300);
  const klik = async (felt, valg) => {
    const f = p.getByRole('group', { name: new RegExp('^' + felt + '( |$)') });
    const knap = f.locator('button.chip').filter({ hasText: new RegExp('(^|\\s)' + valg + '$') }); if ((await knap.count()) !== 1) throw new Error('knap ' + felt + '/' + valg + ': ' + (await knap.count())); await knap.click(); await p.waitForTimeout(80);
  };
  const trykket = async () => p.evaluate(() => [...document.querySelectorAll('button.chip[aria-pressed=true]')].map(b => b.closest('[role=group]').querySelector('.feltLabel').innerText.split('\n')[0] + '=' + b.innerText.replace(/^\d\n?/, '')).join(', '));
  const flagListe = async () => p.evaluate(() => [...document.querySelectorAll('.punkt.flag')].map(e => (e.classList.contains('fremhaevet') ? 'FREMHÆVET ' : '           ') + e.innerText.split('\n')[0].slice(0, 70) + ' … | ' + (e.innerText.match(/MATCHER|ikke vurderet|ikke opfyldt[^\n]*|vurderes klinisk/) || ['(ingen status)'])[0]));
  const ryd = async () => { await p.keyboard.press('Escape'); await p.keyboard.press('Escape'); await p.waitForTimeout(100); };

  console.log('### Albue: Feber = Ja');
  await p.keyboard.press('2'); await p.waitForTimeout(200);
  await klik('Feber', 'Ja');
  console.log('valgt: ' + await trykket()); console.log((await flagListe()).join('\n'));
  await p.screenshot({ path: S + 'test-albue-feber.png' });
  await ryd();
  console.log('### Albue: Hævelse Over olecranon + Varme Ja');
  await p.keyboard.press('2'); await p.waitForTimeout(200);
  await klik('Hævelse', 'Over olecranon'); await klik('Varme', 'Ja');
  console.log('valgt: ' + await trykket()); console.log((await flagListe()).join('\n'));
  await p.screenshot({ path: S + 'test-albue-bursit.png' });
  await ryd();
  console.log('### Knæ: Traume Nej + Alder 12–17');
  await p.keyboard.press('4'); await p.waitForTimeout(200);
  await klik('Traume', 'Nej'); await klik('Alder', '12–17');
  console.log('valgt: ' + await trykket()); console.log((await flagListe()).join('\n'));
  await p.screenshot({ path: S + 'test-knae-12-17.png' });
  await ryd();
  console.log('### Lænderyg: Henvisning');
  await p.keyboard.press('3'); await p.waitForTimeout(200);
  const sek = p.locator('details.sektion', { has: p.locator('summary h2', { hasText: /^Henvisning/i }) });
  await sek.locator(':scope > summary').click(); await p.waitForTimeout(150);
  
  console.log(await sek.locator(':scope > ul > li').evaluateAll(ls => ls.map(l => '- ' + l.querySelector('summary, strong').innerText.replace(/\n/g, ' ')).join('\n')));
  await sek.scrollIntoViewIfNeeded();
  await p.screenshot({ path: S + 'test-ryg.png', fullPage: true });
  await b.close();
})();
