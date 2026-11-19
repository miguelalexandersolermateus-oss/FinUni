'use strict';
const KEY='finuni_dashboard_v1';
const incomeCats=['Beca','Salario','Ayuda familiar','Emprendimiento','Otros ingresos'];
const expenseCats=['Alimentación','Transporte','Matrícula','Materiales','Vivienda','Entretenimiento','Salud','Otros gastos'];
const palette=['#087f68','#26b999','#f5ae57','#7385db','#e66b79','#8ccfc2','#b68add','#5e8da8'];
const $=(sel)=>document.querySelector(sel);
const $$=(sel)=>Array.from(document.querySelectorAll(sel));
const money=(n)=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);
const localDate=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const initial=()=>({transactions:[],goals:[]});
let state=load();
function validTransaction(t){return t&&typeof t.id==='string'&&['ingreso','gasto'].includes(t.type)&&typeof t.description==='string'&&t.description.length<=70&&typeof t.category==='string'&&t.category.length<=70&&/^\d{4}-\d{2}-\d{2}$/.test(t.date)&&Number.isSafeInteger(t.amount)&&t.amount>0&&t.amount<=999999999999}
function validGoal(g){return g&&typeof g.id==='string'&&typeof g.name==='string'&&g.name.length<=70&&Number.isSafeInteger(g.target)&&g.target>0&&g.target<=999999999999&&Number.isSafeInteger(g.saved)&&g.saved>=0&&g.saved<=999999999999}
function load(){try{const raw=localStorage.getItem(KEY);if(!raw)return initial();const data=JSON.parse(raw);if(!data||!Array.isArray(data.transactions)||!Array.isArray(data.goals))return initial();return {transactions:data.transactions.filter(validTransaction).slice(0,5000),goals:data.goals.filter(validGoal).slice(0,1000)}}catch{return initial()}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{toast('No se pudieron guardar los datos en este navegador.');return false}}
let toastTimer;function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3500)}
function make(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el}
function monthTotals(){const month=localDate().slice(0,7);let income=0,expense=0;const cats={};for(const t of state.transactions){if(!t.date.startsWith(month))continue;if(t.type==='ingreso')income+=t.amount;else{expense+=t.amount;cats[t.category]=(cats[t.category]||0)+t.amount}}return {income,expense,balance:income-expense,cats}}
function go(view){if(!['inicio','movimientos','metas','asistente'].includes(view))view='inicio';$$('.view').forEach(v=>v.classList.toggle('active',v.id===view));$$('.nav-link').forEach(a=>a.classList.toggle('active',a.dataset.view===view));$('#pageTitle').textContent=({inicio:'Resumen general',movimientos:'Mis movimientos',metas:'Metas de ahorro',asistente:'Asistente FinUni'})[view];$('#sidebar').classList.remove('open');if(location.hash!=='#'+view)history.replaceState(null,'','#'+view);render()}
function sortedTransactions(){return [...state.transactions].sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id))}
function transactionRow(t,showDelete=false){const row=make('div','transaction-row');row.append(make('div','transaction-icon '+(t.type==='gasto'?'expense':''),t.type==='gasto'?'↘':'↗'));const detail=make('div','transaction-detail');detail.append(make('strong','',t.description),make('small','',`${t.category} · ${t.date}`));row.append(detail,make('span','transaction-amount '+(t.type==='gasto'?'expense':'income'),(t.type==='gasto'?'- ':'+ ')+money(t.amount)));if(showDelete){const del=make('button','delete-btn','Eliminar');del.type='button';del.addEventListener('click',()=>{if(confirm('¿Eliminar este movimiento?')){state.transactions=state.transactions.filter(x=>x.id!==t.id);persist();render();toast('Movimiento eliminado')}});row.append(del)}return row}
function fillRows(container,items,showDelete=false){container.replaceChildren();if(!items.length){container.append(make('p','empty','Aún no hay movimientos. Registra tu primer ingreso o gasto para empezar.'));return}items.forEach(t=>container.append(transactionRow(t,showDelete)))}
function goalItem(g){const div=make('div','goal-item');const title=make('h4','',g.name);const meta=make('div','goal-meta');meta.append(make('span','',`${money(g.saved)} de ${money(g.target)}`),make('span','',`${Math.min(100,Math.round(g.saved/g.target*100))}%`));const progress=make('div','progress');const fill=make('div');fill.style.width=Math.min(100,g.saved/g.target*100)+'%';progress.append(fill);div.append(title,meta,progress);return div}
function renderGoals(){const preview=$('#goalPreview');preview.replaceChildren();if(!state.goals.length)preview.append(make('p','empty','Todavía no tienes metas. ¡Crea tu primera meta de ahorro!'));else state.goals.slice(0,3).forEach(g=>preview.append(goalItem(g)));
const all=$('#allGoals');all.replaceChildren();if(!state.goals.length){all.append(make('p','empty','No hay metas creadas. Usa el botón «Crear meta» para comenzar.'));return}state.goals.forEach(g=>{const card=make('article','goal-card');card.append(make('h3','',g.name),make('p','',g.saved>=g.target?'🎉 ¡Meta alcanzada!':'Sigue avanzando a tu ritmo'));card.append(make('div','amount',money(g.saved)));card.append(goalItem(g));const actions=make('div','actions');const add=make('button','btn btn-primary','+ Añadir ahorro');add.addEventListener('click',()=>{const form=$('#saveForm');form.reset();form.elements.goalId.value=g.id;$('#savingFor').textContent=`Meta: ${g.name}`;$('#saveDialog').showModal()});const del=make('button','btn btn-secondary','Eliminar');del.addEventListener('click',()=>{if(confirm(`¿Eliminar la meta «${g.name}»?`)){state.goals=state.goals.filter(x=>x.id!==g.id);persist();render();toast('Meta eliminada')}});actions.append(add,del);card.append(actions);all.append(card)})}
function drawChart(cats){const canvas=$('#expenseChart');const ctx=canvas.getContext('2d');const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);const entries=Object.entries(cats).sort((a,b)=>b[1]-a[1]);const legend=$('#chartLegend');legend.replaceChildren();const total=entries.reduce((s,x)=>s+x[1],0);const cx=w/2,cy=h/2,r=90,inner=60;if(!total){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.arc(cx,cy,inner,0,Math.PI*2,true);ctx.fillStyle='#e9f1ef';ctx.fill('evenodd');legend.append(make('p','empty','Registra gastos para ver tu distribución.'));return}let start=-Math.PI/2;entries.forEach(([name,value],i)=>{const end=start+value/total*Math.PI*2;ctx.beginPath();ctx.arc(cx,cy,r,start,end);ctx.arc(cx,cy,inner,end,start,true);ctx.closePath();ctx.fillStyle=palette[i%palette.length];ctx.fill();start=end;const row=make('div','legend-row');const label=make('span');const dot=make('i','dot');dot.style.background=palette[i%palette.length];label.append(dot,make('span','',name));row.append(label,make('strong','',`${Math.round(value/total*100)}%`));legend.append(row)});ctx.textAlign='center';ctx.fillStyle='#152b32';ctx.font='bold 17px system-ui';ctx.fillText('Gastos',cx,cy-2);ctx.font='12px system-ui';ctx.fillStyle='#70828b';ctx.fillText(money(total),cx,cy+18)}
function render(){const totals=monthTotals();$('#incomeStat').textContent=money(totals.income);$('#expenseStat').textContent=money(totals.expense);$('#balanceStat').textContent=money(totals.balance);$('#balanceStat').classList.toggle('negative',totals.balance<0);$('#balanceNote').textContent=totals.balance<0?'Tus gastos superan tus ingresos':'Ingresos menos gastos';$('#goalsStat').textContent=String(state.goals.length);drawChart(totals.cats);fillRows($('#recentTransactions'),sortedTransactions().slice(0,5));const q=$('#searchMovement').value.toLocaleLowerCase('es');const filter=$('#filterType').value;fillRows($('#allTransactions'),sortedTransactions().filter(t=>(filter==='todos'||t.type===filter)&&(t.description.toLocaleLowerCase('es').includes(q)||t.category.toLocaleLowerCase('es').includes(q))),true);renderGoals()}
function updateCats(){const sel=$('#movementCategory');sel.replaceChildren();(($('#movementType').value==='ingreso')?incomeCats:expenseCats).forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;sel.append(o)})}
function openMovement(){const f=$('#movementForm');f.reset();f.elements.date.value=localDate();updateCats();$('#movementDialog').showModal()}
function intFrom(input){const n=Number(input);return Number.isSafeInteger(n)?n:NaN}
$('#movementForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const t={id:crypto.randomUUID(),type:f.elements.type.value,description:f.elements.description.value.trim(),amount:intFrom(f.elements.amount.value),category:f.elements.category.value,date:f.elements.date.value};if(!validTransaction(t)||!(t.type==='ingreso'?incomeCats:expenseCats).includes(t.category)){toast('Revisa los datos del movimiento.');return}state.transactions.push(t);persist();$('#movementDialog').close();render();toast('Movimiento registrado')});
$('#goalForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const g={id:crypto.randomUUID(),name:f.elements.name.value.trim(),target:intFrom(f.elements.target.value),saved:intFrom(f.elements.saved.value)};if(!g.name||!validGoal(g)){toast('Revisa los datos de la meta.');return}state.goals.push(g);persist();$('#goalDialog').close();render();toast('Meta creada')});
$('#saveForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const g=state.goals.find(x=>x.id===f.elements.goalId.value);const amount=intFrom(f.elements.amount.value);if(!g||!Number.isSafeInteger(amount)||amount<=0||g.saved+amount>999999999999){toast('Cantidad no válida.');return}g.saved+=amount;persist();$('#saveDialog').close();render();toast('Ahorro añadido')});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));$$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));$$('.nav-link').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(a.dataset.view)}));$('#quickAdd').addEventListener('click',openMovement);$('#addMovement').addEventListener('click',openMovement);$('#addGoal').addEventListener('click',()=>{$('#goalForm').reset();$('#goalDialog').showModal()});$('#movementType').addEventListener('change',updateCats);$('#filterType').addEventListener('change',render);$('#searchMovement').addEventListener('input',render);$('#menuToggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));window.addEventListener('hashchange',()=>go(location.hash.slice(1)));
// CORTEX: motor cognitivo local. No envía preguntas a servicios externos.
const normalizar=s=>String(s).toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
const stop=new Set('a al de del la el los las un una unos unas que como cuanto cuantos cual cuales es son y o para por me mi mis en con se lo yo tu tus hay puedo quiero necesito sobre cada este esta esto tengo he'.split(' '));
let contextoChat=[];
const memoriaKey='finuni_chat_cortex_v1';
try {const hist=JSON.parse(sessionStorage.getItem(memoriaKey)||'[]');if(Array.isArray(hist))contextoChat=hist.filter(x=>x&&['user','bot'].includes(x.who)&&typeof x.text==='string').slice(-14)}catch{}
function guardarChat(){try{sessionStorage.setItem(memoriaKey,JSON.stringify(contextoChat.slice(-14)))}catch{}}
function chatSay(text,who='bot',remember=true){
 const box=make('div','bubble '+who,text);$('#chatMessages').append(box);$('#chatMessages').scrollTop=$('#chatMessages').scrollHeight;
 if(remember){contextoChat.push({who,text});contextoChat=contextoChat.slice(-14);guardarChat()}
}
const patterns={
 sarcasmo:/que maravilla|que genial|excelente.*(sin|quebrad|dinero)|fantastico.*(sin|quebrad)|otra vez.*(sin dinero|sin plata|quebrad)/,
 crisis:/suicid|quitarme la vida|no quiero vivir|hacerme dano|autolesion|matarme/,
 deficit:/gastos? (superan|mayores|mas) (que|a) (mis )?ingresos|balance negativo|no me alcanza|gasto mas de lo que/,
 balance:/balance|saldo|cuanto me queda|cuanto tengo disponible|cuanto me sobra/,
 gastos:/gastos? (del mes|registrados|en total)|cuanto he gastado|en que gasto mas|mayor gasto|gaste este mes/,
 ingresos:/ingresos? (del mes|registrados|en total)|cuanto he ganado|cuanto recibo|cuanto me ingresa/,
 metas:/mis metas|como van mis metas|progreso de mis metas|metas registradas|cuanto me falta para mi meta/
};
function tokens(s){return normalizar(s).split(' ').filter(x=>x.length>2&&!stop.has(x))}
function clasificar(q){
 const clean=normalizar(q), input=new Set(tokens(q));let best=null,score=0;
 for(const item of FINUNI_INTENTS){
  for(const ex of item.examples){const normalized=normalizar(ex), words=[...new Set(tokens(ex))];
   let hits=words.filter(w=>input.has(w)).length;
   const cur=clean===normalized?100:(clean.includes(normalized)&&normalized.length>8?12:0)+(hits/Math.max(1,words.length))*5+(hits/Math.max(1,input.size))*3;
   if(cur>score){score=cur;best=item}
  }
 }
 return score>=4.1?best:null;
}
function numerosEnTexto(s){
 const found=[];const re=/\$?\s*(\d{1,3}(?:[.,]\d{3})+|\d{4,9}|\d{1,3})(?:\s*(?:mil|millones?))?/gi;
 for(const m of s.matchAll(re)){
  const raw=m[0].toLocaleLowerCase('es');let txt=raw.replace(/\$/g,'').trim();let mult=1;
  if(/millones?/.test(txt)){mult=1000000;txt=txt.replace(/millones?/,'').trim()}
  else if(/mil/.test(txt)){mult=1000;txt=txt.replace(/mil/,'').trim()}
  const n=Number(txt.replace(/[.,](?=\d{3}(?:\D|$))/g,'').replace(',','.'))*mult;
  if(Number.isSafeInteger(n)&&n>=0&&n<=999999999999)found.push(n)
 }
 return found;
}
function calculoDesdeTexto(text){
 const q=normalizar(text), n=numerosEnTexto(text);
 // Sólo aplica cálculos cuando se describen explícitamente cifras y el contexto.
 if(/(beca|ingreso|recibo|gano)/.test(q)&&/(gasto|egreso)/.test(q)&&n.length>=2){
  const diff=n[0]-n[1];return `Con las cifras de tu mensaje: ingresos ${money(n[0])} − gastos ${money(n[1])} = balance ${money(diff)}. ${diff<0?'Tus gastos superarían tus ingresos. Revisa primero lo esencial antes de ahorrar.':'Ese saldo no es necesariamente dinero libre: verifica pagos pendientes y reserva para imprevistos.'}`;
 }
 if(/(computador|celular|meta|comprar|alcanzar|conseguir)/.test(q)&&/(ahorr|tengo|guardado)/.test(q)&&n.length>=3){
  const faltante=Math.max(0,n[0]-n[1]);const meses=n[2]>0?Math.ceil(faltante/n[2]):null;
  return `Objetivo: ${money(n[0])}. Ahorrado: ${money(n[1])}. Faltante: ${money(faltante)}. ${faltante===0?'¡Ya alcanzarías tu meta!':meses===null?'Indícame cuánto puedes ahorrar mensualmente para estimar el plazo.':`Si ahorras ${money(n[2])} cada mes y mantienes ese ritmo, necesitarías aproximadamente ${meses} ${meses===1?'mes':'meses'}.`} No se incluyen intereses ni cambios de precios.`;
 }
 return null;
}
function respuestaLocal(text){
 const q=normalizar(text), totals=monthTotals();
 if(patterns.crisis.test(q))return 'Me preocupa tu seguridad. Busca ahora mismo apoyo de una persona de confianza y no te quedes solo con esto. Si estás en peligro inmediato, llama a los servicios de emergencia de tu zona. Podemos seguir conversando, pero la ayuda humana es prioritaria.';
 if(patterns.sarcasmo.test(q))return FINUNI_INTENTS.find(i=>i.id==='sarcasmo').answer;
 // Si el usuario incluye valores, nunca inventar; calcular únicamente con datos expresos.
 const computed=calculoDesdeTexto(text);if(computed)return computed;
 if(patterns.deficit.test(q))return `Entiendo tu preocupación. ${FINUNI_INTENTS.find(i=>i.id==='deficit').answer} En tus registros de este mes: ingresos ${money(totals.income)}, gastos ${money(totals.expense)} y balance ${money(totals.balance)}.`;
 if(patterns.balance.test(q))return `Según lo registrado ESTE MES en este navegador: ingresos ${money(totals.income)}, gastos ${money(totals.expense)} y balance ${money(totals.balance)}. Esto no es el saldo bancario ni descuenta compromisos futuros.`;
 if(patterns.gastos.test(q)){let cats=Object.entries(totals.cats).sort((a,b)=>b[1]-a[1]);return `Este mes registraste ${money(totals.expense)} en gastos.${cats.length?` Tu mayor categoría es ${cats[0][0]} (${money(cats[0][1])}).`:' Aún no hay gastos registrados este mes.'}`}
 if(patterns.ingresos.test(q))return `Tus ingresos registrados ESTE MES son ${money(totals.income)}. Si faltan movimientos, agrégalos en la sección Movimientos.`;
 if(patterns.metas.test(q)){if(!state.goals.length)return 'Aún no tienes metas registradas. Puedes crear una en Metas de ahorro.';return `Tus metas guardadas en este navegador:\n${state.goals.slice(0,8).map(g=>`• ${g.name}: ${money(g.saved)} de ${money(g.target)}. Faltan ${money(Math.max(0,g.target-g.saved))}.`).join('\n')}`}
 if(/^(hola|buenas|hey|holi|saludos)( |$)/.test(q))return '¡Hola! Soy FinUni 🎓. Puedo ayudarte con becas, presupuesto, gastos, ahorro, metas y el Proyecto CORTEX. ¿Qué te gustaría consultar?';
 const selected=clasificar(text);if(selected)return selected.answer;
 if(/^(y si|y cuando|y entonces|y eso)/.test(q)&&contextoChat.length>=2)return 'Puedo continuar el tema, pero necesito que me indiques el valor o situación que cambió para calcularlo sin inventar información.';
 return 'No estoy seguro de haber entendido tu pregunta. Puedo ayudarte con becas, balance, ingresos, gastos, presupuesto, metas, ahorro y el Proyecto CORTEX. ¿Podrías reformularla o darme más detalles?';
}
function ask(text){chatSay(text,'user');chatSay(respuestaLocal(text))}
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const i=$('#chatInput');const q=i.value.trim();if(!q)return;i.value='';ask(q)});
$$('[data-prompt]').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.prompt)));
const historyDisplay=contextoChat.slice();
if(historyDisplay.length){historyDisplay.forEach(entry=>chatSay(entry.text,entry.who,false))}
else chatSay('¡Hola! Soy FinUni 🎓💚. Respondo con reglas del Proyecto CORTEX y los movimientos de este navegador. Pregúntame por un presupuesto, una beca o una meta.', 'bot');
$('#exportData').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),...state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='finuni-datos-'+localDate()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Datos exportados')});
$('#importData').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>2*1024*1024){toast('El archivo es demasiado grande.');e.target.value='';return}try{const obj=JSON.parse(await file.text());if(!obj||!Array.isArray(obj.transactions)||!Array.isArray(obj.goals)||obj.transactions.length>5000||obj.goals.length>1000||!obj.transactions.every(validTransaction)||!obj.goals.every(validGoal))throw Error('formato');if(confirm('¿Reemplazar todos los datos actuales con el archivo importado?')){state={transactions:obj.transactions,goals:obj.goals};persist();render();toast('Datos importados correctamente')}}catch{toast('Archivo JSON inválido o incompatible.')}e.target.value=''});
$('#clearData').addEventListener('click',()=>{if(confirm('¿Borrar TODOS los movimientos y metas de este navegador? Esta acción no se puede deshacer.')){state=initial();persist();render();toast('Datos borrados')}});
$('#today').textContent=new Intl.DateTimeFormat('es-CO',{day:'numeric',month:'long',year:'numeric'}).format(new Date());$('#year').textContent=String(new Date().getFullYear());go(location.hash.slice(1)||'inicio');
