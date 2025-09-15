/* =========================
   TIMER (TOEFL pacing)
========================= */
let running=false, startedAt=null, timerMs=20*60*1000, tickH=null;
const clockEl=document.getElementById("clock");
const startPauseBtn=document.getElementById("startPauseBtn");
const resetBtn=document.getElementById("resetBtn");
const presetBtns=document.querySelectorAll(".preset");
const pad=n=>n<10?`0${n}`:`${n}`;
const msToClock=ms=>{const s=Math.max(0,Math.floor(ms/1000));const m=Math.floor(s/60), r=s%60;return `${pad(m)}:${pad(r)}`};
function tick(){timerMs-=1000;if(timerMs<=0){timerMs=0;stopTimer()}clockEl.textContent=msToClock(timerMs)}
function startTimer(){if(running)return;running=true;if(!startedAt)startedAt=Date.now();tickH=setInterval(tick,1000);startPauseBtn.textContent="⏸"}
function stopTimer(){running=false;clearInterval(tickH);startPauseBtn.textContent="▶"}
function resetTimer(ms=20*60*1000){stopTimer();timerMs=ms;clockEl.textContent=msToClock(timerMs);startedAt=null}
startPauseBtn.addEventListener("click",()=>running?stopTimer():startTimer());
resetBtn.addEventListener("click",()=>resetTimer());
presetBtns.forEach(b=>b.addEventListener("click",()=>resetTimer(Number(b.dataset.min)*60*1000)));
clockEl.textContent=msToClock(timerMs);

/* =========================
   DATA
========================= */
const SECTIONS={
  intro:"The reading passage presents the topic of driverless cars and argues that they create serious social and safety problems. However, the lecturer counters these points, emphasizing that such problems are being addressed and overall benefits may outweigh the risks.",
  body1:"First, the passage claims that driverless cars will eliminate many driving jobs. In contrast, the lecturer refutes this idea by explaining that new roles in fleet maintenance and remote operations will appear. This indicates that the employment concern is likely overstated.",
  body2:"Second, the article asserts that autonomous vehicles are too expensive to deploy widely. However, the professor disputes this view, noting that costs fall with scale and shared robo-taxis lower per-trip prices. Therefore, it is evident that the cost barrier will decline over time.",
  body3:"Finally, the reading highlights that sensors fail in bad weather, making the technology unsafe. On the other hand, the lecturer challenges this argument, pointing out that multi-sensor fusion and conservative planning improve reliability. As a result, this concern is weakened.",
  conclusion:"In conclusion, while the reading outlines several problems with driverless cars, the lecturer offers compelling counterarguments, showing that large-scale adoption is more promising than suggested."
};

const WB={
  reading:{
    title:"Reading verbs (klaim bacaan)",
    rows:[
      {en:"states",id:"menyatakan",pos:'“The passage states that …”',ex:"The passage states that driverless cars could increase road efficiency."},
      {en:"argues",id:"berpendapat",pos:'“The author argues that …”',ex:"The author argues that automation threatens employment."},
      {en:"claims",id:"mengklaim",pos:'“The passage claims that …”',ex:"The passage claims that costs will remain high."},
      {en:"maintains",id:"mempertahankan pendapat",pos:'“The author maintains that …”',ex:"The author maintains that safety will not improve."},
      {en:"suggests",id:"menyarankan/menunjukkan",pos:'“The article suggests that …”',ex:"The article suggests that regulations are not ready."},
      {en:"mentions",id:"menyebutkan",pos:'“The passage mentions that …”',ex:"The passage mentions that mapping is incomplete."},
      {en:"points out",id:"menunjukkan",pos:'“The author points out that …”',ex:"The author points out that sensors fail in storms."},
      {en:"asserts",id:"menegaskan",pos:'“The article asserts that …”',ex:"The article asserts that liabilities are unclear."},
      {en:"highlights",id:"menyoroti",pos:'“The passage highlights …”',ex:"The passage highlights frequent software bugs."},
      {en:"presents",id:"memaparkan",pos:'“The reading presents …”',ex:"The reading presents several social drawbacks."}
    ]
  },
  lecture:{
    title:"Lecture verbs (sanggahan dosen)",
    rows:[
      {en:"refutes",id:"menyangkal",pos:'“The lecturer refutes this point …”',ex:"The lecturer refutes this point by citing new job categories."},
      {en:"counters",id:"menentang",pos:'“The professor counters this idea …”',ex:"The professor counters this idea with cost-curve data."},
      {en:"contradicts",id:"bertentangan dengan",pos:'“The lecturer contradicts the passage …”',ex:"The lecturer contradicts the passage by showing improved safety."},
      {en:"challenges",id:"menggugat/menantang",pos:'“The speaker challenges the claim …”',ex:"The speaker challenges the claim about reliability."},
      {en:"opposes",id:"menentang",pos:'“The professor opposes the view …”',ex:"The professor opposes the view that prices stay high."},
      {en:"disputes",id:"memperdebatkan",pos:'“He disputes the claim …”',ex:"He disputes the claim that jobs will vanish."},
      {en:"undermines",id:"melemahkan",pos:'“The lecture undermines the argument …”',ex:"The lecture undermines the argument about risk."},
      {en:"dismisses",id:"menolak/mengabaikan",pos:'“The professor dismisses this concern …”',ex:"The professor dismisses this concern as outdated."},
      {en:"rejects",id:"menolak",pos:'“The lecturer rejects the idea …”',ex:"The lecturer rejects the idea of permanent hazards."},
      {en:"rebuts",id:"membantah",pos:'“The speaker rebuts this argument …”',ex:"The speaker rebuts this argument with evidence."}
    ]
  },
  contrast:{
    title:"Transitions — Contrast (perlawanan)",
    rows:[
      {en:"however",id:"namun / tetapi",pos:"kalimat 2",ex:"However, the lecturer presents conflicting evidence."},
      {en:"in contrast",id:"sebaliknya",pos:"kalimat 2",ex:"In contrast, the professor notes declining costs."},
      {en:"on the other hand",id:"di sisi lain",pos:"kalimat 2",ex:"On the other hand, he argues safety improves."},
      {en:"conversely",id:"sebaliknya",pos:"kalimat 2",ex:"Conversely, the lecture suggests benefits."},
      {en:"nevertheless",id:"meskipun begitu",pos:"kalimat 2",ex:"Nevertheless, the professor points out progress."},
      {en:"despite this",id:"meskipun demikian",pos:"kalimat 2",ex:"Despite this, the speaker claims risks decline."},
      {en:"by comparison",id:"jika dibandingkan",pos:"kalimat 2",ex:"By comparison, the lecture highlights efficiency gains."}
    ]
  },
  progression:{
    title:"Transitions — Progression (urutan/penalaran)",
    rows:[
      {en:"first",id:"pertama",pos:"awal paragraf 1",ex:"First, the passage claims jobs will be lost."},
      {en:"second",id:"kedua",pos:"awal paragraf 2",ex:"Second, the article asserts costs are too high."},
      {en:"finally",id:"terakhir",pos:"awal paragraf 3",ex:"Finally, the reading highlights weather risks."},
      {en:"moreover",id:"lebih jauh lagi",pos:"tambahan alasan",ex:"Moreover, maintenance can be centralized."},
      {en:"additionally",id:"tambahan lagi",pos:"tambahan alasan",ex:"Additionally, software updates are frequent."},
      {en:"furthermore",id:"selain itu",pos:"tambahan alasan",ex:"Furthermore, traffic flow improves."},
      {en:"therefore",id:"oleh karena itu",pos:"kesimpulan mini",ex:"Therefore, it is evident that costs will fall."},
      {en:"as a result",id:"akibatnya",pos:"kesimpulan mini",ex:"As a result, this concern is weakened."},
      {en:"consequently",id:"konsekuensinya",pos:"kesimpulan mini",ex:"Consequently, adoption becomes feasible."},
      {en:"thus",id:"maka",pos:"kesimpulan mini",ex:"Thus, the objection loses strength."}
    ]
  },
  mini:{
    title:"Mini-conclusions (penutup paragraf)",
    rows:[
      {en:"this shows that",id:"ini menunjukkan bahwa",pos:"kalimat 3",ex:"This shows that the employment fear is overstated."},
      {en:"this indicates that",id:"ini mengindikasikan bahwa",pos:"kalimat 3",ex:"This indicates that scaling will reduce prices."},
      {en:"this suggests that",id:"ini menyarankan/menunjukkan bahwa",pos:"kalimat 3",ex:"This suggests that reliability improves."},
      {en:"this demonstrates that",id:"ini membuktikan bahwa",pos:"kalimat 3",ex:"This demonstrates that safety can surpass humans."},
      {en:"this proves that",id:"ini membuktikan bahwa",pos:"kalimat 3",ex:"This proves that the cost claim is weak."},
      {en:"this reveals that",id:"ini mengungkapkan bahwa",pos:"kalimat 3",ex:"This reveals that regulations adapt over time."}
    ]
  }
};

/* =========================
   WORD BANK TRAINER
========================= */
const wbSet=document.getElementById("wbSet");
const wbField=document.getElementById("wbField");
const wbCase=document.getElementById("wbCase");
const wbAuto=document.getElementById("wbAuto");
const wbShuffle=document.getElementById("wbShuffle");
const wbReset=document.getElementById("wbReset");

const wbTarget=document.getElementById("wbTarget");
const wbInput=document.getElementById("wbInput");
const wbArti=document.getElementById("wbArti");
const wbPos=document.getElementById("wbPos");
const wbExample=document.getElementById("wbExample");

const wbIndex=document.getElementById("wbIndex");
const wbCorrect=document.getElementById("wbCorrect");
const wbMistakes=document.getElementById("wbMistakes");
const wbStreak=document.getElementById("wbStreak");

let order=[], idx=0, correct=0, mistakes=0, streak=0;
const _cycleOrder=["en","pos","ex"];
let _cycleIdx=0;

function shuffleArr(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a }
function normalize(s){ const t=s.replace(/\s+/g," ").trim(); return wbCase.checked?t.toLowerCase():t; }
function getActiveField(){ return wbField.value==="cycle" ? _cycleOrder[_cycleIdx] : wbField.value; }
function getRowsForSet(){
  if(wbSet.value==="all"){
    // concat in a stable order
    return [
      ...WB.reading.rows.map(r=>({...r,_group:"reading"})),
      ...WB.lecture.rows.map(r=>({...r,_group:"lecture"})),
      ...WB.contrast.rows.map(r=>({...r,_group:"contrast"})),
      ...WB.progression.rows.map(r=>({...r,_group:"progression"})),
      ...WB.mini.rows.map(r=>({...r,_group:"mini"})),
    ];
  }
  return WB[wbSet.value].rows;
}
function pickTargetFromRow(row){
  const f=getActiveField();
  if(f==="pos") return row.pos;
  if(f==="ex")  return row.ex;
  return row.en;
}

function loadWB(resetOrder=true){
  const rows=getRowsForSet();
  if(resetOrder){ order=rows.map((_,i)=>i); }
  const i=order[idx] ?? 0;
  const r=rows[i];

  const field=getActiveField();
  const targetText=pickTargetFromRow(r);

  wbTarget.textContent=targetText;
  wbArti.textContent=r.id ?? "—";
  wbPos.textContent=r.pos ?? "—";
  wbExample.textContent=r.ex ?? "—";

  wbInput.value="";
  wbInput.classList.remove("badInput","goodInput");
  wbIndex.textContent=`${idx+1}/${rows.length}`;

  wbInput.placeholder = field==="en" ? "Type the word exactly..."
                       : field==="pos" ? "Type the Letak (template) exactly..."
                       : "Type the Contoh (example) exactly...";
}

function wbCheck(){
  const rows=getRowsForSet();
  const r=rows[order[idx]];
  const A=normalize(wbInput.value);
  const B=normalize(pickTargetFromRow(r));

  if(A===B){
    wbInput.classList.remove("badInput");
    wbInput.classList.add("goodInput");
    correct++; streak++;
    wbCorrect.textContent=correct;
    wbStreak.textContent=streak;

    if(wbAuto.checked){
      // cycle through fields within item
      if(wbField.value==="cycle" && _cycleIdx < _cycleOrder.length-1){
        _cycleIdx++;
        wbInput.value="";
        wbInput.classList.remove("goodInput");
        loadWB(false);
        return;
      }
      // next item
      _cycleIdx=0;
      if(idx < rows.length-1){ idx++; loadWB(false); }
      wbInput.value="";
      wbInput.classList.remove("goodInput");
    }
  }else{
    wbInput.classList.remove("goodInput");
    wbInput.classList.add("badInput");
  }
}

wbInput.addEventListener("keydown",(e)=>{
  if(e.key==="Enter"){
    if(wbInput.value.trim()==="") return;
    const rows=getRowsForSet();
    const r=rows[order[idx]];
    const A=normalize(wbInput.value);
    const B=normalize(pickTargetFromRow(r));
    if(A!==B){ mistakes++; streak=0; wbMistakes.textContent=mistakes; wbStreak.textContent=streak; }
    wbCheck();
  }
});

wbShuffle.addEventListener("click",()=>{
  const rows=getRowsForSet();
  order=shuffleArr(rows.map((_,i)=>i));
  idx=0; correct=0; mistakes=0; streak=0; _cycleIdx=0;
  wbCorrect.textContent=0; wbMistakes.textContent=0; wbStreak.textContent=0;
  loadWB(false);
});
wbReset.addEventListener("click",()=>{
  idx=0; correct=0; mistakes=0; streak=0; _cycleIdx=0;
  wbCorrect.textContent=0; wbMistakes.textContent=0; wbStreak.textContent=0;
  loadWB(true);
});
wbSet.addEventListener("change",()=>{
  idx=0; correct=0; mistakes=0; streak=0; _cycleIdx=0;
  wbCorrect.textContent=0; wbMistakes.textContent=0; wbStreak.textContent=0;
  loadWB(true);
});
wbField.addEventListener("change",()=>{
  _cycleIdx=0;
  loadWB(false);
});

/* =========================
   KARAOKE DRILL
========================= */
const secSelect=document.getElementById("secSelect");
const showPunct=document.getElementById("showPunct");
const autoNextSec=document.getElementById("autoNextSec");
const resetDrill=document.getElementById("resetDrill");
const secTemplate=document.getElementById("secTemplate");
const secTyped=document.getElementById("secTyped");
const secProg=document.getElementById("secProg");
const secErr=document.getElementById("secErr");
const secAcc=document.getElementById("secAcc");
const secWpm=document.getElementById("secWpm");
const secBar=document.getElementById("secBar");

let tStart=null;

const ALL_ORDER=["intro","body1","body2","body3","conclusion"];
let allIdx=0;

function tokenSplit(s, withPunct){
  return s.split(withPunct? /(\s+|[.,;:!?—-])/ : /(\s+)/).filter(x=>x.length>0);
}
function currentSectionKey(){
  if(secSelect.value!=="all") return secSelect.value;
  return ALL_ORDER[allIdx] || "conclusion";
}
function currentTemplateText(){
  return SECTIONS[currentSectionKey()];
}
function renderTemplate(){
  const txt=currentTemplateText();
  const toks=tokenSplit(txt, showPunct.checked);
  secTemplate.innerHTML = toks.map(t=>{
    if(/\s+/.test(t)) return `<span class="tk space">${t}</span>`;
    if(showPunct.checked && /^[.,;:!?—-]$/.test(t)) return `<span class="tk punct">${t}</span>`;
    return `<span class="tk good">${t}</span>`;
  }).join("");
}

function updateKaraoke(){
  const txt=currentTemplateText();
  const tgt=tokenSplit(txt, showPunct.checked);
  const mine=tokenSplit(secTyped.value, showPunct.checked);

  let wrong=0, matchCount=0;
  const out=tgt.map((tok,i)=>{
    const my = mine[i] ?? "";
    const isSpace=/^\s+$/.test(tok);
    const isPunct=/^[.,;:!?—-]$/.test(tok);
    if(isSpace) return `<span class="tk space">${tok}</span>`;
    const ok = (my||"") === tok;
    if(ok){ matchCount++; return `<span class="tk good">${tok}</span>`; }
    if(isPunct && !showPunct.checked){ return `<span class="tk punct">${tok}</span>`; }
    wrong++; return `<span class="tk bad">${my||tok}</span>`;
  }).join("");
  secTemplate.innerHTML=out;

  const total=tgt.filter(t=>!/^\s+$/.test(t)).length;
  const prog=Math.min(100, Math.round((matchCount/total)*100));
  const acc= (matchCount+wrong) ? Math.round((matchCount/(matchCount+wrong))*100) : 0;

  secProg.textContent=prog+"%";
  secAcc.textContent=acc+"%";
  secErr.textContent=wrong;
  secBar.style.width=prog+"%";

  if(!tStart) tStart=Date.now();
  const mins=(Date.now()-tStart)/60000;
  const words=secTyped.value.trim().split(/\s+/).filter(Boolean).length;
  secWpm.textContent= mins>0 ? Math.round(words/mins) : 0;

  // Auto-next section logic (works for single section AND all)
  if(autoNextSec.checked && prog===100 && wrong===0){
    if(secSelect.value==="all"){
      if(allIdx < ALL_ORDER.length-1){
        allIdx++;
        resetKaraoke(false); // go next, keep all-mode
      }
    }else{
      // no-op for single unless user wants to switch manually
    }
  }
}

function resetKaraoke(hard=true){
  if(hard){
    if(secSelect.value==="all") allIdx=0;
  }
  secTyped.value=""; tStart=null;
  renderTemplate(); updateKaraoke();
}

secSelect.addEventListener("change", ()=> resetKaraoke(true));
showPunct.addEventListener("change", ()=>{ renderTemplate(); updateKaraoke(); });
resetDrill.addEventListener("click", ()=> resetKaraoke(true));
secTyped.addEventListener("input", updateKaraoke);

/* =========================
   INIT
========================= */
function init(){
  // Word Bank
  order=getRowsForSet().map((_,i)=>i);
  idx=0; correct=0; mistakes=0; streak=0; _cycleIdx=0;
  wbCorrect.textContent=0; wbMistakes.textContent=0; wbStreak.textContent=0;
  loadWB(true);

  // Karaoke
  renderTemplate();
  updateKaraoke();

  // Quality of life: hotkeys
  document.addEventListener("keydown",(e)=>{
    if(e.target===wbInput || e.target===secTyped) return; // don't hijack typing
    if(e.code==="Space"){ e.preventDefault(); running?stopTimer():startTimer(); }
    if(e.key==="r"||e.key==="R"){ resetTimer(); }
  });
}
document.addEventListener("DOMContentLoaded", init);
