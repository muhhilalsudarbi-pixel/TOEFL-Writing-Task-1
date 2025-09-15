/* =========================
   TIMER
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
   DATA — WORD BANK
========================= */
const WB={
  reading:{ rows:[
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
  ]},
  lecture:{ rows:[
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
  ]},
  contrast:{ rows:[
    {en:"however",id:"namun / tetapi",pos:"kalimat 2",ex:"However, the lecturer presents conflicting evidence."},
    {en:"in contrast",id:"sebaliknya",pos:"kalimat 2",ex:"In contrast, the professor notes declining costs."},
    {en:"on the other hand",id:"di sisi lain",pos:"kalimat 2",ex:"On the other hand, he argues safety improves."},
    {en:"conversely",id:"sebaliknya",pos:"kalimat 2",ex:"Conversely, the lecture suggests benefits."},
    {en:"nevertheless",id:"meskipun begitu",pos:"kalimat 2",ex:"Nevertheless, the professor points out progress."},
    {en:"despite this",id:"meskipun demikian",pos:"kalimat 2",ex:"Despite this, the speaker claims risks decline."},
    {en:"by comparison",id:"jika dibandingkan",pos:"kalimat 2",ex:"By comparison, the lecture highlights efficiency gains."}
  ]},
  progression:{ rows:[
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
  ]},
  mini:{ rows:[
    {en:"this shows that",id:"ini menunjukkan bahwa",pos:"kalimat 3",ex:"This shows that the employment fear is overstated."},
    {en:"this indicates that",id:"ini mengindikasikan bahwa",pos:"kalimat 3",ex:"This indicates that scaling will reduce prices."},
    {en:"this suggests that",id:"ini menyarankan/menunjukkan bahwa",pos:"kalimat 3",ex:"This suggests that reliability improves."},
    {en:"this demonstrates that",id:"ini membuktikan bahwa",pos:"kalimat 3",ex:"This demonstrates that safety can surpass humans."},
    {en:"this proves that",id:"ini membuktikan bahwa",pos:"kalimat 3",ex:"This proves that the cost claim is weak."},
    {en:"this reveals that",id:"ini mengungkapkan bahwa",pos:"kalimat 3",ex:"This reveals that regulations adapt over time."}
  ]}
};

/* =========================
   DATA — ALGAE NOTES & FILLED TEXTS (your content)
========================= */
const ALGAE = {
  intro: {
    notes: "R: Algae biofuel has problems (land/water, cost, CO₂).\nL: Still promising; problems solvable.",
    styles: {
      simple:
        "The reading and the lecture are about algae biofuel.\nWhile the author of the article believes that it has serious problems,\nthe lecturer casts doubt on the statements in the article.\nHe explains that algae fuel has a bright future and challenges each of the writer’s points.",
      easy:
        "The reading passage discusses algae biofuel and argues that it has unique problems.\nHowever, the lecturer disagrees, saying that these concerns can be solved.",
      academic:
        "The article presents information about algae as a potential fuel source and claims that producing it faces several difficulties.\nIn contrast, the professor challenges these ideas, emphasizing that algae biofuel remains feasible.",
      advanced:
        "According to the reading, algae-derived fuel could replace fossil fuels but faces major obstacles.\nNevertheless, the lecturer systematically refutes these points, arguing that algae still holds great promise."
    }
  },
  body1: {
    notes: "R1: Needs farmland + water → food shortage.\nL1: Grows on infertile land + seawater/dirty water → no competition.",
    styles: {
      simple:
        "First, the passage states that algae farming requires farmland and freshwater, which could worsen food shortages.\nIn contrast, the lecturer explains that algae can grow on infertile land and in seawater or polluted water.\nThis shows that algae do not compete with food production.",
      easy:
        "The article claims that algae farming uses valuable farmland and water.\nHowever, the professor disagrees, pointing out that algae can grow in infertile areas and in seawater.",
      academic:
        "Initially, the reading suggests that large-scale algae farming would use up scarce farmland and water, intensifying food shortages.\nOn the other hand, the lecturer counters this argument by explaining that algae can thrive in infertile soil and in water unsuitable for crops.\nThis indicates that the concern about land and water is not valid.",
      advanced:
        "The author asserts that algae cultivation requires fertile land and fresh water, which could worsen global food scarcity.\nThe lecturer, however, rebuts this claim, noting that algae flourish in barren land and saline or contaminated water.\nAs a result, the fear of food shortages is unfounded."
    }
  },
  body2: {
    notes: "R2: Too expensive → needs machines + facilities.\nL2: Harvest weekly, 20× more fuel than corn → profit covers cost quickly.",
    styles: {
      simple:
        "Second, the passage argues that algae biofuel is too costly because it requires expensive facilities.\nHowever, the lecturer states that algae can be harvested weekly and produce twenty times more fuel than corn.\nTherefore, the cost problem is exaggerated.",
      easy:
        "The author claims that producing algae fuel is very expensive.\nIn contrast, the professor says that algae provide much higher yields than corn and cover the costs quickly.",
      academic:
        "The reading highlights that algae fuel is impractical due to the need for costly machines and facilities.\nNevertheless, the lecturer disputes this, explaining that algae can be harvested every week and produce far more fuel than corn, making it financially viable.\nThus, the expense issue is not as serious as suggested.",
      advanced:
        "According to the article, algae fuel is economically unfeasible because of heavy investment in equipment.\nYet, the professor challenges this view, emphasizing that the high frequency and yield of algae harvests quickly compensate for the costs.\nConsequently, the claim of excessive expense is overstated."
    }
  },
  body3: {
    notes: "R3: Needs lots of CO₂, not all absorbed → pollution.\nL3: Absorbs CO₂ efficiently → reduces greenhouse gases.",
    styles: {
      simple:
        "Finally, the passage claims that algae require too much carbon dioxide, and the excess pollutes the atmosphere.\nOn the other hand, the lecturer argues that algae absorb carbon dioxide effectively, which reduces greenhouse gases.",
      easy:
        "The article states that algae use large amounts of carbon dioxide, causing environmental problems.\nHowever, the professor disagrees, saying that algae actually reduce greenhouse gases.",
      academic:
        "The text asserts that algae demand excessive CO₂, and unused amounts would escape into the air, worsening pollution.\nConversely, the lecturer challenges this claim by noting that algae absorb substantial CO₂ during growth, helping reduce emissions.\nThis demonstrates that algae can benefit the environment.",
      advanced:
        "The author maintains that algae cultivation leads to harmful CO₂ emissions.\nThe lecturer, however, dismisses this argument, observing that algae serve as a carbon sink, effectively lowering greenhouse gases.\nThus, the claim about environmental harm is weakened."
    }
  },
  conclusion: {
    notes: "R: Algae has problems.\nL: Counters all, promising fuel.",
    styles: {
      simple:
        "In conclusion, while the reading claims algae biofuel has major problems, the lecturer shows that these issues can be solved.",
      easy:
        "To sum up, the passage lists disadvantages of algae fuel, while the professor explains solutions, showing it is practical.",
      academic:
        "In summary, the article outlines difficulties in algae biofuel production, but the lecture provides convincing counterarguments, indicating its feasibility.",
      advanced:
        "Overall, the reading casts doubt on the viability of algae fuel, yet the professor systematically undermines these doubts, proving its promise as a renewable energy source."
    }
  }
};

/* =========================
   DATA — UNIVERSAL PLACEHOLDER TEMPLATES (for Karaoke styles)
========================= */
const TEMPLATES = {
  intro: {
    simple:
      "The reading and the lecture are about [topic]. While the author of the article believes that [main claim], the lecturer casts doubt on the statements in the article. He explains [overall counterclaim] and challenges each of the writer’s points.",
    easy:
      "The reading passage discusses [topic] and argues that [main claim]. However, the lecturer disagrees, saying that [overall counterclaim].",
    academic:
      "The article presents information about [topic] and maintains that [main claim]. In contrast, the professor challenges these ideas, emphasizing that [overall counterclaim].",
    advanced:
      "According to the reading, [topic] faces several challenges. Nevertheless, the lecturer systematically refutes these points, arguing that [overall counterclaim]."
  },
  body1: {
    simple:
      "First, the passage states that [R1]. In contrast, the lecturer explains that [L1]. This shows that [mini-conclusion].",
    easy:
      "The article claims that [R1]. However, the professor disagrees, pointing out that [L1].",
    academic:
      "Initially, the reading suggests that [R1]. On the other hand, the lecturer counters this argument by explaining that [L1]. This indicates that [mini-conclusion].",
    advanced:
      "The author asserts that [R1]. The lecturer, however, rebuts this claim, noting that [L1]. As a result, the concern about [R1 keyword] is unfounded."
  },
  body2: {
    simple:
      "Second, the passage argues that [R2]. However, the lecturer refutes this idea, saying that [L2].",
    easy:
      "The author claims that [R2]. In contrast, the professor states that [L2].",
    academic:
      "The reading highlights that [R2]. Nevertheless, the lecturer disputes this, explaining that [L2]. Therefore, [mini-conclusion].",
    advanced:
      "According to the article, [R2]. Yet, the professor challenges this view, emphasizing that [L2]. Consequently, the issue of [R2 keyword] seems exaggerated."
  },
  body3: {
    simple:
      "Finally, the passage explains that [R3]. On the other hand, the lecturer argues that [L3].",
    easy:
      "The article claims that [R3]. However, the professor disagrees, saying that [L3].",
    academic:
      "The text asserts that [R3]. Conversely, the lecturer challenges this claim by noting that [L3]. This demonstrates that [mini-conclusion].",
    advanced:
      "The author maintains that [R3]. The lecturer, however, dismisses this argument, observing that [L3]. Thus, the claim about [R3 keyword] is weakened."
  },
  conclusion: {
    simple:
      "In conclusion, the reading says that [topic is problematic], but the lecturer shows that [topic is possible/promising].",
    easy:
      "To sum up, the passage lists several concerns about [topic], while the professor explains that these problems can be solved.",
    academic:
      "In summary, the article outlines difficulties in [topic], but the lecture provides strong counterarguments that make it more feasible.",
    advanced:
      "Overall, the reading casts doubt on the viability of [topic], yet the professor systematically undermines these claims, proving that [topic] remains promising."
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
    return [
      ...WB.reading.rows,
      ...WB.lecture.rows,
      ...WB.contrast.rows,
      ...WB.progression.rows,
      ...WB.mini.rows,
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
      if(wbField.value==="cycle" && _cycleIdx < _cycleOrder.length-1){
        _cycleIdx++;
        wbInput.value="";
        wbInput.classList.remove("goodInput");
        loadWB(false);
        return;
      }
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
   KARAOKE DRILL — Styles + Custom
========================= */
const secSelect=document.getElementById("secSelect");
const styleSelect=document.getElementById("styleSelect");
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
let customTemplate=""; // from Filled Template/Full Essay Builder

function tokenSplit(s, withPunct){
  return s.split(withPunct? /(\s+|[.,;:!?—-])/ : /(\s+)/).filter(x=>x.length>0);
}
function currentSectionKey(){
  if(secSelect.value==="custom") return "custom";
  if(secSelect.value!=="all") return secSelect.value;
  return ALL_ORDER[allIdx] || "conclusion";
}
function getTemplateFor(section, style){
  return TEMPLATES[section][style];
}
function fullEssayPlaceholder(style){
  return [
    getTemplateFor("intro",style),
    getTemplateFor("body1",style),
    getTemplateFor("body2",style),
    getTemplateFor("body3",style),
    getTemplateFor("conclusion",style)
  ].join("\n\n");
}
function currentTemplateText(){
  const style = styleSelect.value;
  if(secSelect.value==="custom") return customTemplate || "— (No custom text yet) —";
  if(secSelect.value==="all") return fullEssayPlaceholder(style);
  const key=currentSectionKey();
  return getTemplateFor(key, style);
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

  if(autoNextSec.checked && prog===100 && wrong===0){
    if(secSelect.value==="all"){
      if(allIdx < ALL_ORDER.length-1){
        allIdx++;
        resetKaraoke(false);
      }
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
styleSelect.addEventListener("change", ()=> { renderTemplate(); updateKaraoke(); });
showPunct.addEventListener("change", ()=>{ renderTemplate(); updateKaraoke(); });
resetDrill.addEventListener("click", ()=> resetKaraoke(true));
secTyped.addEventListener("input", updateKaraoke());

/* =========================
   FILLED TEMPLATE UI (Algae)
========================= */
const algaeSection=document.getElementById("algaeSection");
const algaeStyle=document.getElementById("algaeStyle");
const algaeNotes=document.getElementById("algaeNotes");
const algaeText=document.getElementById("algaeText");
const copyAlgaeText=document.getElementById("copyAlgaeText");
const useAlgaeInKaraoke=document.getElementById("useAlgaeInKaraoke");

function renderAlgae(){
  const sec=algaeSection.value;
  const st=algaeStyle.value;
  algaeNotes.textContent = ALGAE[sec].notes;
  algaeText.textContent  = ALGAE[sec].styles[st];
}
algaeSection.addEventListener("change", renderAlgae);
algaeStyle.addEventListener("change", renderAlgae);
copyAlgaeText.addEventListener("click", ()=>{
  navigator.clipboard.writeText(algaeText.textContent);
});
useAlgaeInKaraoke.addEventListener("click", ()=>{
  customTemplate = algaeText.textContent;
  document.getElementById("secSelect").value = "custom";
  resetKaraoke(true);
});

/* =========================
   FULL ESSAY BUILDER (Algae)
========================= */
const fullStyle=document.getElementById("fullStyle");
const buildFull=document.getElementById("buildFull");
const copyFull=document.getElementById("copyFull");
const useFullInKaraoke=document.getElementById("useFullInKaraoke");
const fullEssay=document.getElementById("fullEssay");

function buildFullEssay(style){
  const join = (sec) => ALGAE[sec].styles[style];
  return [
    join("intro"),
    join("body1"),
    join("body2"),
    join("body3"),
    join("conclusion")
  ].join("\n\n");
}
buildFull.addEventListener("click", ()=>{
  fullEssay.textContent = buildFullEssay(fullStyle.value);
});
copyFull.addEventListener("click", ()=>{
  navigator.clipboard.writeText(fullEssay.textContent || "");
});
useFullInKaraoke.addEventListener("click", ()=>{
  customTemplate = fullEssay.textContent || buildFullEssay(fullStyle.value);
  document.getElementById("secSelect").value = "custom";
  resetKaraoke(true);
});

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

  // Algae panels
  renderAlgae();
  fullEssay.textContent = buildFullEssay(fullStyle.value);

  // Hotkeys
  document.addEventListener("keydown",(e)=>{
    if(e.target===wbInput || e.target===secTyped) return;
    if(e.code==="Space"){ e.preventDefault(); running?stopTimer():startTimer(); }
    if(e.key==="r"||e.key==="R"){ resetTimer(); }
  });
}
document.addEventListener("DOMContentLoaded", init);
