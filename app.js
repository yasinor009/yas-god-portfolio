'use strict';
const $ = (id) => document.getElementById(id);
const STORAGE_VERSION = 'yas-demo-v1';
const storage = {
  read(key, fallback) { try { return JSON.parse(localStorage.getItem(`${STORAGE_VERSION}:${key}`)) ?? fallback; } catch { return fallback; } },
  write(key, value) { try { localStorage.setItem(`${STORAGE_VERSION}:${key}`, JSON.stringify(value)); } catch { /* The interaction still works when storage is unavailable. */ } }
};
function renderInventory() {
  const seed = [{id:'MED-001',name:'Amoxicillin',expiry:'2028-03-31',quantity:42},{id:'MED-002',name:'Paracetamol',expiry:'2028-08-31',quantity:76},{id:'MED-003',name:'Cetirizine',expiry:'2028-11-30',quantity:8}];
  const saved = storage.read('inventory', null);
  let items = seed.map((item) => ({...item}));
  if (Array.isArray(saved) && saved.length === seed.length && saved.every((v,i) => v?.id === seed[i].id && Number.isSafeInteger(v.quantity) && v.quantity >= 0 && v.quantity <= 1000000)) items = seed.map((v,i) => ({...v,quantity:saved[i].quantity}));
  for (const item of items) { const option = document.createElement('option'); option.value=item.id; option.textContent=item.name; $('medicine').append(option); }
  function draw() {
    $('stock-total').textContent=String(items.reduce((sum,item)=>sum+item.quantity,0));
    $('item-count').textContent=String(items.length);
    $('alert-total').textContent=String(items.filter(item=>item.quantity<10).length);
    const query=$('search').value.trim().toLowerCase();
    const filtered=items.filter(item=>`${item.name} ${item.id}`.toLowerCase().includes(query));
    $('inventory-rows').replaceChildren();
    for (const item of filtered) {
      const tr=document.createElement('tr');
      for (const value of [item.name,item.id,item.expiry,String(item.quantity)]) { const td=document.createElement('td');td.textContent=value;tr.append(td); }
      const td=document.createElement('td');const badge=document.createElement('span');badge.className=`pill${item.quantity===0?' danger':item.quantity<10?' warning':''}`;badge.textContent=item.quantity===0?'Out of stock':item.quantity<10?'Low stock':'Available';td.append(badge);tr.append(td);$('inventory-rows').append(tr);
    }
    $('no-results').hidden=filtered.length!==0;
  }
  $('search').addEventListener('input',draw);
  $('movement-form').addEventListener('submit',(event)=>{
    event.preventDefault(); const amount=Number($('quantity').value); const item=items.find(v=>v.id===$('medicine').value); const outgoing=$('movement-type').value==='out';
    if (!item || !Number.isSafeInteger(amount) || amount<1 || amount>100000) { $('inventory-message').textContent='Enter a whole quantity between 1 and 100,000.';return; }
    if (outgoing && amount>item.quantity) { $('inventory-message').textContent='Not enough stock. No movement was saved.';return; }
    const next=item.quantity+(outgoing?-amount:amount);
    if(next>1000000){$('inventory-message').textContent='Demo stock is limited to 1,000,000 units per item.';return;}
    item.quantity=next;storage.write('inventory',items);draw();$('inventory-message').textContent=`${item.name}: ${amount} units ${outgoing?'removed':'added'}. Saved in this browser.`;
  });
  $('reset').addEventListener('click',()=>{items=seed.map(v=>({...v}));storage.write('inventory',items);$('search').value='';$('inventory-message').textContent='Demo stock reset.';draw();});draw();
}
function renderAcademy() {
 const lessons=[['Variables & values','Represent a small piece of information.'],['Lists & dictionaries','Organize a collection of records.'],['Reusable functions','Give repeated behavior a clear name.']];
 let saved=storage.read('lessons',[]);let completed=new Set(Array.isArray(saved)?saved.filter(v=>Number.isInteger(v)&&v>=0&&v<lessons.length):[]);
 function draw(){
  const percent=Math.round(completed.size/lessons.length*100);$('progress-fill').style.width=`${percent}%`;$('progress').setAttribute('aria-valuenow',String(percent));$('progress-label').textContent=`${completed.size} of ${lessons.length} lessons completed`;$('lessons').replaceChildren();
  lessons.forEach(([title,description],i)=>{const row=document.createElement('article');row.className='lesson';const info=document.createElement('div');const h=document.createElement('h3');h.textContent=`0${i+1} / ${title}`;const p=document.createElement('p');p.textContent=description;info.append(h,p);const button=document.createElement('button');button.type='button';button.textContent=completed.has(i)?'Completed ✓':'Mark complete';button.setAttribute('aria-pressed',String(completed.has(i)));button.setAttribute('aria-label',`${completed.has(i)?'Undo completion of':'Complete'} ${title}`);button.addEventListener('click',()=>{completed.has(i)?completed.delete(i):completed.add(i);storage.write('lessons',[...completed]);draw();});row.append(info,button);$('lessons').append(row);});
 }
 $('reset').addEventListener('click',()=>{completed.clear();storage.write('lessons',[]);draw();});draw();
}
function renderDistance(){
 const inputs=['real-width','focal-length','pixel-width'];
 function draw(){const [width,focal,pixels]=inputs.map(id=>Number($(id).value));const result=width*focal/pixels;if(![width,focal,pixels].every(v=>Number.isFinite(v)&&v>=0.001&&v<=1000000)||!Number.isFinite(result)){ $('distance-result').textContent='—';$('distance-error').textContent='Enter finite positive values from 0.001 to 1,000,000.';return;}$('distance-error').textContent='';$('distance-result').textContent=result.toFixed(2);$('target-box').style.width=`${Math.max(24,Math.min(pixels*1.6,250))}px`;}
 inputs.forEach(id=>$(id).addEventListener('input',draw));$('reset').addEventListener('click',()=>{inputs.forEach((id,i)=>$(id).value=[0.3,2400,60][i]);draw();});draw();
}
if($('year'))$('year').textContent=String(new Date().getFullYear());
({inventory:renderInventory,academy:renderAcademy,distance:renderDistance}[document.body.dataset.demo]||(()=>{}))();
