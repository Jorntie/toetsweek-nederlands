// Interactieve onderdelen, deel 3: de schrijfwerkplaats (tijd- en woordverdeler, schrijfplan-bouwer, schrijfarena).
(function () {
  "use strict";
  const N = TW.NED, h = N.h, esc = TW.esc;
  const PLAN_HREF = "#/doe/schrijven/schrijfplan", ARENA_HREF = "#/doe/schrijven/schrijfarena";
  const KANT_KORT = { kans: "kans", bedreiging: "bedreiging", nuance: "genuanceerd" };
  const rond5 = (x) => Math.max(5, Math.round(x / 5) * 5);
  const telWoorden = N.telWoorden;

  // Verdeling van woorden en tijd; overal gebruikt, dus op één plek.
  N.verdeling = function (inst, nMidden) {
    const W = inst.woorden, M = inst.minuten;
    const inl = rond5(W * 0.12), slot = rond5(W * 0.12), mid = Math.max(0, W - inl - slot);
    const n = nMidden || Math.max(3, Math.min(6, Math.round(mid / 105)));
    const plan = Math.round(M * 0.15), nalezen = Math.round(M * 0.2), reserve = Math.round(M * 0.05), schrijven = M - plan - nalezen - reserve;
    return { inl, slot, mid, n, perAlinea: Math.round(mid / n / 5) * 5, plan, schrijven, nalezen, reserve, tempo: schrijven ? W / schrijven : 0 };
  };

  // ======================================================================
  // TIJD- EN WOORDVERDELER
  // ======================================================================
  TW.widget("verdeler", {
    titel: "Tijd en woorden verdelen", icoon: "⏱️",
    uitleg: "Je weet nog niet hoeveel woorden en hoeveel tijd je krijgt. Schuif tot het klopt met je opdracht; het schrijfplan en de schrijfarena rekenen ermee verder.",
    maak(el, api) {
      let inst = h.inst();
      el.innerHTML = `<label class="schuif"><span>Aantal woorden</span><output id="nl-ow"></output><input id="nl-w" type="range" min="200" max="1200" step="50" value="${inst.woorden}"></label>
        <label class="schuif"><span>Tijd in minuten</span><output id="nl-om"></output><input id="nl-m" type="range" min="30" max="180" step="5" value="${inst.minuten}"></label>
        <div id="nl-uit"></div>`;
      function teken() {
        const v = N.verdeling(inst);
        el.querySelector("#nl-ow").textContent = inst.woorden + " woorden";
        el.querySelector("#nl-om").textContent = inst.minuten + " min";
        const tijd = [["Lezen en plan", v.plan, 0], ["Schrijven", v.schrijven, 1], ["Nalezen", v.nalezen, 2], ["Reserve", v.reserve, 3]];
        const wrd = [["Inleiding", v.inl, 0], ["Middenstuk", v.mid, 1], ["Slot", v.slot, 2]];
        const balk = (rijen, tot, eenh) => `<div class="nl-balk">${rijen.map((r) => `<i class="nl-b${r[2]}" style="flex:${Math.max(r[1], tot * 0.04)}"></i>`).join("")}</div>
          <div class="nl-balklegenda">${rijen.map((r) => `<span><i class="nl-b${r[2]}"></i>${r[0]} <b>${r[1]} ${eenh}</b></span>`).join("")}</div>`;
        const t = v.tempo;
        el.querySelector("#nl-uit").innerHTML = `<h4 class="nl-titel">Je tijd</h4>${balk(tijd, inst.minuten, "min")}
          <h4 class="nl-titel">Je woorden</h4>${balk(wrd, inst.woorden, "wrd")}
          <div class="uit"><b>Middenstuk:</b> ongeveer ${v.n} alinea's van elk ± ${v.perAlinea} woorden.<br>
          <b>Tempo:</b> ± ${Math.round(t)} woorden per minuut tijdens het schrijven. ${t > 22 ? "Dat is erg krap: houd je plan kort en schrijf door." : t > 14 ? "Dat is stevig doorwerken: een goed plan vooraf is onmisbaar." : "Dat is goed te doen: je hebt tijd om zinnen te verbeteren."}</div>
          <p class="meta">Vuistregel: plan eerst, en houd altijd tijd over om na te lezen. Daar haal je de meeste punten voor taalgebruik en spelling.</p>`;
      }
      el.querySelector("#nl-w").oninput = (e) => { inst = h.zetInst({ woorden: +e.target.value }); teken(); api.klaar(); };
      el.querySelector("#nl-m").oninput = (e) => { inst = h.zetInst({ minuten: +e.target.value }); teken(); api.klaar(); };
      teken();
    }
  });

  // ======================================================================
  // SCHRIJFPLAN-BOUWER
  // ======================================================================
  const OPENINGEN = [
    ["voorbeeld", "Een voorbeeld of kort verhaal", "Mijn tante vertaalde twintig jaar handleidingen. Vorige maand kreeg ze voor het eerst geen enkele opdracht."],
    ["actueel", "Een actuele aanleiding", "Sinds chatbots voor iedereen beschikbaar zijn, gaat bijna elk gesprek over werk ook over AI."],
    ["vraag", "Een vraag aan de lezer", "Weet jij zeker dat het beroep waarvoor je straks gaat studeren over tien jaar nog bestaat?"],
    ["uitspraak", "Een prikkelende uitspraak", "De typiste, de lantaarnopsteker en de telefoniste zijn verdwenen. De vertaler is de volgende."],
    ["tegenstelling", "Een tegenstelling", "Volgens de één maakt AI ons allemaal werkloos, volgens de ander lost het alle personeelstekorten op."]
  ];
  const UITSMIJTERS = [
    ["oproep", "Een oproep of aanbeveling"], ["toekomst", "Een blik op de toekomst"], ["cirkel", "Terug naar je opening"], ["vraag", "Een vraag om over na te denken"]
  ];
  N.OPENINGEN = OPENINGEN;
  const leegPlan = () => ({ soort: "", kant: "", stelling: "", args: [], tegen: null, afweging: "", opening: "", openNotitie: "", uitsmijter: "", slotNotitie: "", titel: "", stap: 0 });
  N.leesPlan = () => Object.assign(leegPlan(), h.lees("plan", {}));

  function stellingCheck(p) {
    const s = p.stelling.trim(), uit = [];
    if (!s) return [[false, p.soort === "beschouwing" ? "Typ je hoofdvraag of tik een voorstel aan." : "Typ je stelling of tik een voorstel aan."]];
    const n = telWoorden(s);
    if (p.soort === "beschouwing") {
      uit.push([/\?\s*$/.test(s), "Een hoofdvraag eindigt op een vraagteken."]);
      const open = /^(hoe|welke?|wat|waarom|waardoor|wie|in hoeverre|in welke mate|op welke manier)\b/i.test(s);
      uit.push([true, open ? "Open vraag: er zijn meerdere antwoorden mogelijk." : "Dit lijkt een gesloten vraag (ja of nee). Dat mag, als je beide antwoorden bespreekt. Een open vraag (hoe, welke, in hoeverre) geeft meer ruimte."]);
      uit.push([!/\b(moet|moeten|hoort|horen|slecht|fout|belachelijk)\b/i.test(s), "De vraag is neutraal en verraadt je mening niet."]);
    } else {
      uit.push([!/\?\s*$/.test(s), "Een stelling is een bewering, geen vraag."]);
      uit.push([!/^(ik vind|ik denk|volgens mij|naar mijn mening|mijn mening is)/i.test(s), "Geen 'ik vind' of 'volgens mij': de stelling zelf is al je mening."]);
      uit.push([!/\b(misschien|een beetje|soms|best wel|eigenlijk|wellicht)\b/i.test(s), "Stellig geformuleerd, zonder afzwakkers als 'misschien' of 'soms'."]);
    }
    uit.push([n <= 25, `Eén heldere zin van hoogstens 25 woorden (nu ${n}).`]);
    return uit;
  }

  // Het bouwplan als lijst alinea's: { kop, inhoud, sig, woorden }
  N.bouwplan = function (p, inst) {
    const bes = p.soort === "beschouwing";
    const midden = p.args.length + (bes ? (p.afweging.trim() ? 1 : 0) : (p.tegen ? 1 : 0));
    const v = N.verdeling(inst, Math.max(1, midden));
    const rij = [];
    const op = OPENINGEN.find((o) => o[0] === p.opening);
    rij.push({ kop: "Inleiding", inhoud: [op ? "Opening: " + op[1].toLowerCase() + (p.openNotitie.trim() ? " (" + p.openNotitie.trim() + ")" : "") : "Opening: nog kiezen", "Aanleiding: waarom is dit nu een onderwerp?", (bes ? "Hoofdvraag: " : "Stelling: ") + (p.stelling.trim() || "nog invullen")], sig: "", woorden: v.inl });
    const sigB = ["Ten eerste / In de eerste plaats", "Daarnaast / Ten tweede", "Bovendien", "Ten slotte / Het belangrijkste argument is"];
    p.args.forEach((a, n) => {
      const laatste = n === p.args.length - 1 && p.args.length > 1;
      rij.push({
        kop: bes ? `Alinea ${n + 2}: ${a.kant ? "kant '" + KANT_KORT[a.kant] + "'" : "eigen invalshoek"}` : `Argument ${n + 1}`,
        inhoud: [a.tekst, "Soort argument: " + (N.TYPES[a.type] || "nog bepalen"), "Werk uit met uitleg en een voorbeeld" + (inst.bronnen === "ja" ? " of een gegeven uit je bron (met bronvermelding)" : "")],
        sig: bes ? (a.kant === "bedreiging" ? "Daartegenover staat / Aan de andere kant" : a.kant === "nuance" ? "Daar komt bij / Veel hangt af van" : n === 0 ? "Volgens voorstanders / Aan de ene kant" : "Daarnaast / Bovendien") : (laatste ? sigB[3] : sigB[Math.min(n, 2)]),
        woorden: v.perAlinea
      });
    });
    if (!bes && p.tegen) rij.push({ kop: "Tegenargument en weerlegging", inhoud: ["Tegenargument: " + p.tegen.tekst, "Weerlegging: " + (p.tegen.weer || "nog invullen")], sig: "Tegenstanders zeggen dat … Toch / Dat is echter", woorden: v.perAlinea });
    if (bes && p.afweging.trim()) rij.push({ kop: "Afweging", inhoud: [p.afweging.trim()], sig: "Alles afwegend / Wat de doorslag geeft, is", woorden: v.perAlinea });
    const ui = UITSMIJTERS.find((u) => u[0] === p.uitsmijter);
    rij.push({ kop: "Slot", inhoud: bes ? ["Vat de kanten kort samen", "Geef een voorzichtige conclusie op je hoofdvraag", "Uitsmijter: " + (ui ? ui[1].toLowerCase() : "nog kiezen") + (p.slotNotitie.trim() ? " (" + p.slotNotitie.trim() + ")" : "")] : ["Vat je argumenten in één zin samen", "Herhaal je stelling in andere woorden", "Uitsmijter: " + (ui ? ui[1].toLowerCase() : "nog kiezen") + (p.slotNotitie.trim() ? " (" + p.slotNotitie.trim() + ")" : "")], sig: bes ? "Al met al / Alles bij elkaar" : "Kortom / Daarom", woorden: v.slot });
    return rij;
  };
  N.bouwplanTekst = function (p, inst) {
    const rij = N.bouwplan(p, inst);
    return `BOUWPLAN ${(p.soort || "tekst").toUpperCase()}${p.titel.trim() ? ": " + p.titel.trim() : ""}\n(${inst.woorden} woorden, ${inst.minuten} minuten)\n\n` +
      rij.map((r, n) => `${n + 1}. ${r.kop} (± ${r.woorden} woorden)${r.sig ? "\n   Signaalwoorden: " + r.sig : ""}\n${r.inhoud.map((i) => "   - " + i).join("\n")}`).join("\n\n");
  };
  N.bouwplanHtml = function (p, inst) {
    return `<ol class="nl-plan">${N.bouwplan(p, inst).map((r) => `<li><div class="nl-plankop"><b>${esc(r.kop)}</b><span>± ${r.woorden} wrd</span></div>
      <ul>${r.inhoud.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>${r.sig ? `<small>Signaalwoorden: ${esc(r.sig)}</small>` : ""}</li>`).join("")}</ol>`;
  };

  TW.widget("schrijfplan", {
    titel: "Schrijfplan-bouwer", icoon: "🗺️",
    uitleg: "In zes stappen van lege pagina naar bouwplan. Alles wordt bewaard op dit apparaat, dus je kunt later verdergaan.",
    maak(el, api) {
      let p = N.leesPlan(), inst = h.inst();
      const bewaar = () => h.schrijf("plan", p);
      const bes = () => p.soort === "beschouwing";
      const STAPPEN = () => ["Opdracht", bes() ? "Hoofdvraag" : "Stelling", bes() ? "Kanten" : "Argumenten", bes() ? "Afweging" : "Tegenargument", "Begin en eind", "Bouwplan"];
      const klaarStap = (n) => [!!p.soort, stellingCheck(p).every((c) => c[0]), p.args.length >= 2, bes() ? p.afweging.trim().length > 10 : !!(p.tegen && p.tegen.weer && p.tegen.weer.trim()), !!(p.opening && p.uitsmijter), false][n];
      const aanbevolen = () => (inst.woorden < 400 ? 2 : inst.woorden < 750 ? 3 : 4);

      function teken() {
        const namen = STAPPEN(), s = p.stap;
        el.innerHTML = `<div class="nl-stappen">${namen.map((n, i) => `<button class="${i === s ? "nu" : ""} ${klaarStap(i) ? "af" : ""}" data-stap="${i}" aria-label="Stap ${i + 1}: ${n}">${klaarStap(i) ? "✓" : i + 1}</button>`).join("")}</div>
          <h4 class="nl-titel">Stap ${s + 1} · ${namen[s]}</h4><div class="nl-stap"></div>
          <div class="two"><button class="btn" id="nl-vorige" ${s === 0 ? "disabled" : ""}>← Vorige</button><button class="btn primary" id="nl-volgende" ${s === 5 ? "disabled" : ""}>Volgende →</button></div>`;
        el.querySelectorAll("[data-stap]").forEach((b) => (b.onclick = () => ga(+b.dataset.stap)));
        el.querySelector("#nl-vorige").onclick = () => ga(s - 1);
        el.querySelector("#nl-volgende").onclick = () => ga(s + 1);
        [stap0, stap1, stap2, stap3, stap4, stap5][s](el.querySelector(".nl-stap"));
      }
      function ga(n) { p.stap = Math.max(0, Math.min(5, n)); bewaar(); teken(); el.scrollIntoView({ block: "start", behavior: "smooth" }); }

      // ---- stap 1: opdracht ----
      function stap0(w) {
        w.innerHTML = `<p class="meta">Wat vraagt de opdracht? Mag je kiezen, kies dan wat bij je past.</p>
          <div class="nl-kaarten"><button class="nl-kaart ${p.soort === "betoog" ? "aan" : ""}" data-soort="betoog"><b>Betoog</b><span>Ik verdedig één standpunt en wil de lezer overtuigen.</span></button>
          <button class="nl-kaart ${p.soort === "beschouwing" ? "aan" : ""}" data-soort="beschouwing"><b>Beschouwing</b><span>Ik belicht meerdere kanten en laat de lezer zelf oordelen.</span></button></div>
          <label class="schuif"><span>Aantal woorden</span><output>${inst.woorden}</output><input id="nl-w" type="range" min="200" max="1200" step="50" value="${inst.woorden}"></label>
          <label class="schuif"><span>Tijd in minuten</span><output>${inst.minuten}</output><input id="nl-m" type="range" min="30" max="180" step="5" value="${inst.minuten}"></label>
          <p class="meta">Weet je het nog niet? Laat de schuiven staan en pas ze aan zodra je de opdracht hebt.</p>
          <p><b>Krijg je bronnen bij de opdracht?</b></p>
          <div class="keuze">${[["ja", "Ja"], ["nee", "Nee"], ["weetniet", "Weet ik niet"]].map((b) => `<button class="btn ${inst.bronnen === b[0] ? "aan" : ""}" data-bron="${b[0]}">${b[1]}</button>`).join("")}</div>
          ${inst.bronnen !== "nee" ? `<div class="note tip"><b>Tip</b> Met bronnen: markeer bij het lezen per bron één gegeven dat je kunt gebruiken en noteer erbij wie het zegt. Zonder bronnen: werk met redeneringen en bekende voorbeelden, en verzin geen cijfers.</div>` : ""}`;
        w.querySelectorAll("[data-soort]").forEach((b) => (b.onclick = () => {
          if (p.soort && p.soort !== b.dataset.soort && (p.stelling || p.args.length) && !confirm("Je wisselt van tekstsoort. Je stelling of hoofdvraag wordt leeggemaakt; je argumenten blijven staan. Doorgaan?")) return;
          if (p.soort !== b.dataset.soort) { p.stelling = ""; p.tegen = null; }
          p.soort = b.dataset.soort; h.zetInst({ soort: p.soort }); bewaar(); api.klaar(); teken();
        }));
        w.querySelector("#nl-w").oninput = (e) => { inst = h.zetInst({ woorden: +e.target.value }); e.target.previousElementSibling.textContent = inst.woorden; };
        w.querySelector("#nl-m").oninput = (e) => { inst = h.zetInst({ minuten: +e.target.value }); e.target.previousElementSibling.textContent = inst.minuten; };
        w.querySelectorAll("[data-bron]").forEach((b) => (b.onclick = () => { inst = h.zetInst({ bronnen: b.dataset.bron }); teken(); }));
      }

      // ---- stap 2: stelling of hoofdvraag ----
      function stap1(w) {
        if (!p.soort) { w.innerHTML = `<p>Kies eerst bij stap 1 of je een betoog of een beschouwing schrijft.</p>`; return; }
        const voorstel = bes() ? N.HOOFDVRAGEN.map((t) => ({ t })) : N.STELLINGEN.filter((x) => !p.kant || x.kant === p.kant);
        w.innerHTML = `${bes() ? `<p class="meta">Een hoofdvraag is open en neutraal. Je beantwoordt haar pas in het slot.</p>` : `<p class="meta">Welke kant verdedig je?</p>
            <div class="keuze"><button class="btn ${p.kant === "kans" ? "aan" : ""}" data-kant="kans">AI is vooral een kans</button><button class="btn ${p.kant === "bedreiging" ? "aan" : ""}" data-kant="bedreiging">AI is vooral een bedreiging</button></div>`}
          <label class="nl-veld"><span>${bes() ? "Mijn hoofdvraag" : "Mijn stelling"}</span><textarea id="nl-st" rows="3" placeholder="${bes() ? "Bijvoorbeeld: In hoeverre …?" : "Eén stellige zin waar je het mee eens of oneens kunt zijn"}">${esc(p.stelling)}</textarea></label>
          <div id="nl-chk"></div>
          <p class="meta">Voorstellen (tik om over te nemen, daarna mag je de zin aanpassen):</p>
          <div class="nl-voorstellen">${voorstel.map((x, n) => `<button class="chip breed" data-v="${n}">${esc(x.t)}</button>`).join("")}</div>`;
        const chk = () => { w.querySelector("#nl-chk").innerHTML = stellingCheck(p).map((c) => `<div class="nl-punt ${c[0] ? "ok" : "let"}">${c[0] ? "✓" : "!"} ${esc(c[1])}</div>`).join(""); };
        w.querySelector("#nl-st").oninput = (e) => { p.stelling = e.target.value; bewaar(); chk(); };
        w.querySelectorAll("[data-kant]").forEach((b) => (b.onclick = () => { p.kant = b.dataset.kant; bewaar(); teken(); }));
        w.querySelectorAll("[data-v]").forEach((b) => (b.onclick = () => { const x = voorstel[+b.dataset.v]; p.stelling = x.t; if (x.kant) p.kant = x.kant; bewaar(); teken(); }));
        chk();
      }

      // ---- stap 3: argumenten of kanten ----
      function stap2(w) {
        if (!p.soort) { w.innerHTML = `<p>Kies eerst bij stap 1 of je een betoog of een beschouwing schrijft.</p>`; return; }
        const fav = h.lees("fav", []), gekozen = (id) => p.args.some((a) => a.id === id);
        let bank = N.BANK.filter((a) => bes() || !p.kant || a.kant === p.kant || a.kant === "nuance");
        bank = bank.slice().sort((a, b) => (fav.includes(b.id) ? 1 : 0) - (fav.includes(a.id) ? 1 : 0));
        const tel = (k) => p.args.filter((a) => a.kant === k).length;
        w.innerHTML = `<p class="meta">${bes() ? "Kies standpunten van verschillende kanten. Een beschouwing is pas in balans als elke kant ongeveer even veel ruimte krijgt." : `Kies de argumenten die je stelling steunen. Bij ${inst.woorden} woorden passen er ongeveer ${aanbevolen()}.`}</p>
          <div class="nl-gekozen">${p.args.length ? p.args.map((a, n) => `<div class="nl-gek"><div class="nl-pijlen"><button class="btn" data-op="${n}" ${n === 0 ? "disabled" : ""} aria-label="Omhoog">▲</button><button class="btn" data-neer="${n}" ${n === p.args.length - 1 ? "disabled" : ""} aria-label="Omlaag">▼</button></div>
            <div><b>${n + 1}. ${esc(a.kort || "Eigen argument")}</b> ${a.kant ? `<span class="nl-kant ${a.kant}">${KANT_KORT[a.kant]}</span>` : ""}<p>${esc(a.tekst)}</p><small>${esc(N.TYPES[a.type] || "")}</small></div>
            <button class="btn nl-x" data-weg="${n}" aria-label="Verwijder">✕</button></div>`).join("") : `<p class="meta">Nog niets gekozen.</p>`}</div>
          ${bes() ? `<div class="nl-balans"><span>Balans</span><div class="nl-balk"><i class="nl-b2" style="flex:${tel("kans") || 0.05}"></i><i class="nl-b0" style="flex:${tel("nuance") || 0.05}"></i><i class="nl-b3" style="flex:${tel("bedreiging") || 0.05}"></i></div><small>kans ${tel("kans")} · genuanceerd ${tel("nuance")} · bedreiging ${tel("bedreiging")}</small></div>` : (p.args.length > 1 ? `<div class="note tip"><b>Tip</b> Zet je sterkste argument achteraan: wat de lezer het laatst leest, blijft het best hangen. Het zwakste hoort in het midden.</div>` : "")}
          <p><b>Uit de argumentenbank</b>${fav.length ? ` <span class="meta">(★ = door jou bewaard)</span>` : ""}</p>
          ${bank.map((a) => `<button class="nl-bankitem ${gekozen(a.id) ? "aan" : ""}" data-b="${a.id}"><span class="nl-kant ${a.kant}">${KANT_KORT[a.kant]}</span> <b>${fav.includes(a.id) ? "★ " : ""}${esc(a.kort)}</b><span>${esc(a.tekst)}</span><em>${gekozen(a.id) ? "✓ gekozen" : "+ kies"}</em></button>`).join("")}
          <p><b>Eigen argument</b></p>
          <textarea id="nl-eigen" rows="2" placeholder="Typ je eigen argument in één of twee zinnen"></textarea>
          <label class="nl-veld"><span>Soort argument</span><select id="nl-etype">${Object.keys(N.TYPES).map((t) => `<option value="${t}">${esc(N.TYPES[t])}</option>`).join("")}</select></label>
          <button class="btn big" id="nl-voeg">+ Voeg mijn argument toe</button>`;
        w.querySelectorAll("[data-b]").forEach((b) => (b.onclick = () => {
          const a = N.BANK.find((x) => x.id === b.dataset.b);
          if (gekozen(a.id)) p.args = p.args.filter((x) => x.id !== a.id); else p.args.push({ id: a.id, kort: a.kort, tekst: a.tekst, type: a.type, kant: a.kant });
          bewaar(); teken();
        }));
        w.querySelectorAll("[data-op]").forEach((b) => (b.onclick = () => { const n = +b.dataset.op; [p.args[n - 1], p.args[n]] = [p.args[n], p.args[n - 1]]; bewaar(); teken(); }));
        w.querySelectorAll("[data-neer]").forEach((b) => (b.onclick = () => { const n = +b.dataset.neer; [p.args[n + 1], p.args[n]] = [p.args[n], p.args[n + 1]]; bewaar(); teken(); }));
        w.querySelectorAll("[data-weg]").forEach((b) => (b.onclick = () => { p.args.splice(+b.dataset.weg, 1); bewaar(); teken(); }));
        w.querySelector("#nl-voeg").onclick = () => {
          const t = w.querySelector("#nl-eigen").value.trim(); if (!t) return;
          p.args.push({ id: "e" + Date.now(), eigen: true, kort: "", tekst: t, type: w.querySelector("#nl-etype").value, kant: "" }); bewaar(); teken();
        };
      }

      // ---- stap 4: tegenargument (betoog) of afweging (beschouwing) ----
      function stap3(w) {
        if (!p.soort) { w.innerHTML = `<p>Kies eerst bij stap 1 of je een betoog of een beschouwing schrijft.</p>`; return; }
        if (bes()) {
          const starters = ["Het hangt vooral af van", "Op korte termijn …, maar op lange termijn", "Voor … pakt het anders uit dan voor", "Het zwaarst weegt volgens mij dat"];
          w.innerHTML = `<p class="meta">Je hebt de kanten naast elkaar gezet. Wat geeft de doorslag, of waar hangt het van af? Dit wordt de kern van je laatste alinea's.</p>
            <div class="nl-starters">${starters.map((s) => `<button class="chip" data-s="${esc(s)}">${esc(s)} …</button>`).join("")}</div>
            <textarea id="nl-afw" rows="5" placeholder="Mijn afweging in twee of drie zinnen">${esc(p.afweging)}</textarea>
            <div class="note let"><b>Let op</b> Formuleer voorzichtig: 'waarschijnlijk', 'het lijkt erop dat', 'veel hangt af van'. In een beschouwing dring je je mening niet op.</div>`;
          const ta = w.querySelector("#nl-afw");
          ta.oninput = () => { p.afweging = ta.value; bewaar(); };
          w.querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => { ta.value = (ta.value.trim() ? ta.value.trim() + " " : "") + b.dataset.s + " "; p.afweging = ta.value; bewaar(); ta.focus(); }));
          return;
        }
        const ander = p.kant === "kans" ? "bedreiging" : p.kant === "bedreiging" ? "kans" : null;
        const bank = N.BANK.filter((a) => !a.sjabloon && (ander ? a.kant === ander : true) && !p.args.some((x) => x.id === a.id));
        w.innerHTML = `<p class="meta">Een sterk betoog noemt het beste argument van de tegenpartij en haalt het onderuit. Kies er één${ander ? "" : " (kies bij stap 2 eerst een kant, dan zie je hier alleen de tegenpartij)"}.</p>
          ${bank.map((a) => `<button class="nl-bankitem ${p.tegen && p.tegen.id === a.id ? "aan" : ""}" data-b="${a.id}"><span class="nl-kant ${a.kant}">${KANT_KORT[a.kant]}</span> <b>${esc(a.kort)}</b><span>${esc(a.tekst)}</span><em>${p.tegen && p.tegen.id === a.id ? "✓ gekozen" : "+ kies"}</em></button>`).join("")}
          <label class="nl-veld"><span>Of typ zelf een tegenargument</span><textarea id="nl-tegen" rows="2" placeholder="Tegenstanders zeggen dat …">${p.tegen && !p.tegen.id ? esc(p.tegen.tekst) : ""}</textarea></label>
          <label class="nl-veld"><span>Mijn weerlegging</span><textarea id="nl-weer" rows="4" placeholder="Dat klopt (deels), maar …">${p.tegen ? esc(p.tegen.weer || "") : ""}</textarea></label>
          <div class="note tip"><b>Tip</b> De weerlegging in drie stappen: noem het bezwaar eerlijk, geef toe wat ervan klopt, en laat dan zien waarom je stelling toch overeind blijft.</div>`;
        w.querySelectorAll("[data-b]").forEach((b) => (b.onclick = () => { const a = N.BANK.find((x) => x.id === b.dataset.b); p.tegen = { id: a.id, tekst: a.tekst, weer: a.weer }; bewaar(); teken(); }));
        w.querySelector("#nl-tegen").oninput = (e) => { p.tegen = { id: "", tekst: e.target.value, weer: (p.tegen && !p.tegen.id && p.tegen.weer) || "" }; bewaar(); };
        w.querySelector("#nl-weer").oninput = (e) => { if (!p.tegen) p.tegen = { id: "", tekst: "", weer: "" }; p.tegen.weer = e.target.value; bewaar(); };
      }

      // ---- stap 5: inleiding, slot, titel ----
      function stap4(w) {
        const op = OPENINGEN.find((o) => o[0] === p.opening);
        w.innerHTML = `<p><b>Hoe open je?</b></p>
          <div class="nl-voorstellen">${OPENINGEN.map((o) => `<button class="chip breed ${p.opening === o[0] ? "sel" : ""}" data-o="${o[0]}">${esc(o[1])}</button>`).join("")}</div>
          ${op ? `<div class="uit"><span class="meta">Zo kan dat klinken</span><br><i>${esc(op[2])}</i></div>` : ""}
          <label class="nl-veld"><span>Mijn idee voor de opening</span><textarea id="nl-on" rows="2" placeholder="Steekwoorden zijn genoeg">${esc(p.openNotitie)}</textarea></label>
          <p><b>Hoe sluit je af?</b></p>
          <p class="meta">${bes() ? "Je slot vat de kanten samen en geeft een voorzichtig antwoord op je hoofdvraag." : "Je slot vat je argumenten samen en herhaalt je stelling in andere woorden."} Daarna volgt de uitsmijter:</p>
          <div class="nl-voorstellen">${UITSMIJTERS.map((u) => `<button class="chip breed ${p.uitsmijter === u[0] ? "sel" : ""}" data-u="${u[0]}">${esc(u[1])}</button>`).join("")}</div>
          <label class="nl-veld"><span>Mijn idee voor de laatste zin</span><textarea id="nl-sn" rows="2" placeholder="Steekwoorden zijn genoeg">${esc(p.slotNotitie)}</textarea></label>
          <label class="nl-veld"><span>Titel (mag ook als laatste)</span><input type="text" id="nl-ti" value="${esc(p.titel)}" placeholder="Kort en prikkelend"></label>
          <div class="note let"><b>Let op</b> In het slot komt geen nieuw argument meer. Wat je daar nog wilt zeggen, hoort in het middenstuk.</div>`;
        w.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => { p.opening = b.dataset.o; bewaar(); teken(); }));
        w.querySelectorAll("[data-u]").forEach((b) => (b.onclick = () => { p.uitsmijter = b.dataset.u; bewaar(); teken(); }));
        w.querySelector("#nl-on").oninput = (e) => { p.openNotitie = e.target.value; bewaar(); };
        w.querySelector("#nl-sn").oninput = (e) => { p.slotNotitie = e.target.value; bewaar(); };
        w.querySelector("#nl-ti").oninput = (e) => { p.titel = e.target.value; bewaar(); };
      }

      // ---- stap 6: het bouwplan ----
      function stap5(w) {
        if (!p.soort) { w.innerHTML = `<p>Kies eerst bij stap 1 of je een betoog of een beschouwing schrijft.</p>`; return; }
        const namen = STAPPEN(), open = [0, 1, 2, 3, 4].filter((n) => !klaarStap(n));
        const totaal = N.bouwplan(p, inst).reduce((s, r) => s + r.woorden, 0);
        w.innerHTML = `${open.length ? `<div class="note let"><b>Nog niet af</b> ${open.map((n) => `<button class="btn klein" data-ga="${n}">Stap ${n + 1}: ${namen[n]}</button>`).join(" ")}</div>` : `<div class="note tip"><b>Compleet</b> Je plan is rond. Kopieer het of ga schrijven.</div>`}
          <div class="nl-plankaart"><div class="meta">${esc(p.soort)} · ${inst.woorden} woorden · ${inst.minuten} minuten</div><h4>${esc(p.titel.trim() || "(nog geen titel)")}</h4>${N.bouwplanHtml(p, inst)}
          <p class="meta">Samen ± ${totaal} woorden.</p></div>
          <div class="two"><button class="btn" id="nl-kop">Kopieer bouwplan</button><a class="btn primary" href="${ARENA_HREF}">Naar de schrijfarena</a></div>
          <p style="text-align:center"><button class="btn link" id="nl-reset">Plan wissen en opnieuw beginnen</button></p>`;
        w.querySelectorAll("[data-ga]").forEach((b) => (b.onclick = () => ga(+b.dataset.ga)));
        w.querySelector("#nl-kop").onclick = (e) => h.kopieer(N.bouwplanTekst(p, inst), e.target);
        w.querySelector("#nl-reset").onclick = () => { if (confirm("Je hele schrijfplan wissen?")) { p = leegPlan(); bewaar(); teken(); } };
        if (!open.length) api.klaar();
      }
      teken();
    }
  });

  // ======================================================================
  // TEKSTANALYSE (voor de schrijfarena)
  // ======================================================================
  const STOP = new Set("aan al alle alleen als altijd andere anders ben bij daar daarom dan dat de der deze die dit doen door dus een eens en er erg ge geen had heb hebben heeft hem het hier hij hoe hun iets ik in is ja je kan kon kunnen maar me meer men met mij mijn moet moeten na naar niet niets nog nu of om omdat ons onze ook op over reeds te tegen toch toen tot u uit uw van veel voor want waren was wat we wel werd wezen wie wij wil worden wordt zal ze zei zelf zich zij zijn zo zonder zou zouden zullen deze hebben waar waarbij waardoor steeds vaak soms tussen onder tijdens terwijl hoewel echter omdat doordat zodat wanneer indien bijvoorbeeld namelijk daardoor hierdoor daarnaast bovendien verder vooral erbij ervan ermee erop gaan gaat komt komen maken maakt wordt worden blijft blijven staat staan zoals zulke welke elke ieder iedere iedereen niemand alles allemaal zeer heel minder eerste tweede derde nieuwe grote goede kunnen willen mogen doet deed gedaan geweest geworden".split(" "));
  const SYN = {
    banen: "functies, beroepen, werk, arbeidsplaatsen", baan: "functie, beroep, werk", mensen: "werknemers, burgers, personeel", bedrijven: "werkgevers, ondernemingen, organisaties", bedrijf: "werkgever, onderneming, organisatie",
    werknemers: "personeel, medewerkers, arbeidskrachten", belangrijk: "van belang, essentieel, wezenlijk", gebruiken: "inzetten, toepassen, benutten", gebruikt: "ingezet, toegepast, benut", probleem: "knelpunt, kwestie, moeilijkheid",
    technologie: "techniek, innovatie, systemen", techniek: "technologie, software, systemen", computers: "machines, systemen, software", kunstmatige: "AI, slimme software, zelflerende systemen", intelligentie: "AI, slimme software",
    veranderen: "verschuiven, een andere inhoud krijgen", verandert: "verschuift, wordt anders", verdwijnen: "wegvallen, overbodig worden, vervallen", gevolgen: "effecten, uitwerking, consequenties", zorgen: "bezorgdheid, vrees, onrust",
    toekomst: "komende jaren, later, vooruitzicht", werken: "arbeid verrichten, aan de slag zijn", taken: "werkzaamheden, klussen, handelingen", omscholing: "bijscholing, een nieuwe opleiding, een cursus"
  };
  const SPREEK = [
    ["heel erg", "zeer, bijzonder"], ["best wel", "schrap het of schrijf 'tamelijk'"], ["een beetje", "enigszins, of schrap het"], ["sowieso", "in elk geval"], ["gewoon", "meestal kun je dit woord schrappen"],
    ["eigenlijk", "schrappen maakt je zin stelliger"], ["echt", "schrap het of schrijf 'werkelijk'"], ["super\\w*", "zeer, uitstekend"], ["mega\\w*", "zeer groot, enorm"], ["dingen", "noem wat je bedoelt: taken, gevolgen, problemen"], ["ding", "noem wat je bedoelt"],
    ["en zo", "schrap het of noem nog een voorbeeld"], ["enzo", "schrap het"], ["of zo", "schrap het"], ["ofzo", "schrap het"], ["zeg maar", "schrap het"], ["nou", "schrap het"], ["oké", "goed, in orde"], ["oke", "goed, in orde"],
    ["natuurlijk", "is het echt vanzelfsprekend? Leg anders uit waarom"], ["leuk", "kies een preciezer woord: nuttig, aantrekkelijk"], ["stom", "kies een zakelijk woord: onverstandig, onterecht"], ["raar", "opvallend, vreemd, onlogisch"],
    ["chill", "prettig, ontspannen"], ["random", "willekeurig"], ["kwa", "qua"], ["best veel", "tamelijk veel, of noem hoeveel"], ["wel eens", "soms, af en toe"], ["hartstikke", "zeer"], ["tja", "schrap het"], ["je weet wel", "schrap het"]
  ];
  const AFK = ["bijv.", "bv.", "o.a.", "d.w.z.", "enz.", "etc.", "m.a.w.", "t.o.v.", "i.p.v.", "m.b.t.", "o.m.", "a.h.w."];
  const MENGSELS = [["beseffen zich", "beseffen / realiseren zich"], ["beseft zich", "beseft / realiseert zich"], ["overnieuw", "opnieuw"], ["kost duur", "is duur / kost veel"], ["kosten duur", "zijn duur / kosten veel"],
    ["zoals bijvoorbeeld", "zoals óf bijvoorbeeld"], ["maar echter", "maar óf echter"], ["dus daarom", "dus óf daarom"], ["ook bovendien", "ook óf bovendien"], ["enigste", "enige"], ["meest optimale", "optimale"], ["nachecken", "nakijken, controleren"], ["de reden is omdat", "de reden is dat"], ["naar mijn mening vind ik", "naar mijn mening óf ik vind"], ["volgens mij denk ik", "volgens mij óf ik denk"], ["me mening", "mijn mening"], ["me werk", "mijn werk"], ["me baan", "mijn baan"], ["hun hebben", "zij hebben"], ["hun zijn", "zij zijn"], ["hun kunnen", "zij kunnen"], ["hun vinden", "zij vinden"], ["hun gaan", "zij gaan"], ["hun willen", "zij willen"], ["hun moeten", "zij moeten"], ["hun zeggen", "zij zeggen"], ["hun denken", "zij denken"], ["groter als", "bij een vergelijking: groter dan"], ["beter als", "bij een vergelijking: beter dan"], ["sneller als", "bij een vergelijking: sneller dan"], ["meer als", "bij een vergelijking: meer dan"], ["minder als", "bij een vergelijking: minder dan"], ["slimmer als", "bij een vergelijking: slimmer dan"], ["goedkoper als", "bij een vergelijking: goedkoper dan"]];
  const NIET_WW = new Set("gebied beleid verband bericht gewicht gezicht verschil bedrijf geval geld gehad gedrag gebruik geluid gevoel gezond bekend beroemd beperkt gericht verleden gemiddeld beeld verschillend bepaald besloten".split(" "));
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const woordRe = (s, vlag) => new RegExp("(^|[^a-zà-ÿ0-9])(" + s + ")(?=[^a-zà-ÿ0-9]|$)", vlag || "g");

  N.analyse = function (tekst, inst) {
    const A = { woorden: telWoorden(tekst) };
    const alineas = tekst.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    A.alineas = alineas.map((a) => telWoorden(a));
    // zinnen (afkortingen eerst onschadelijk maken)
    let schoon = tekst; AFK.forEach((a) => { schoon = schoon.split(a).join(a.replace(/\./g, "·")); });
    schoon = schoon.replace(/(\d)\.(\d)/g, "$1·$2");
    A.zinnen = (schoon.match(/[^.!?…\n]+(?:[.!?…]+["'’”)\]]*|(?=\n)|$)/g) || []).map((z) => z.replace(/·/g, ".").trim()).filter((z) => telWoorden(z) > 0).map((z) => ({ t: z, n: telWoorden(z) }));
    A.gem = A.zinnen.length ? A.woorden / A.zinnen.length : 0;
    A.lang = A.zinnen.filter((z) => z.n > 25);
    const laag = tekst.toLowerCase().replace(/[’`]/g, "'");
    // signaalwoorden: langste eerst, gevonden stukken wegstrepen
    let rest = laag; A.sig = {};
    const alle = N.VERBANDEN.flatMap((v) => v.w.map((w) => [w, v.id])).sort((a, b) => b[0].length - a[0].length);
    alle.forEach(([w, v]) => {
      const re = w === "om te" ? /(^|[^a-zà-ÿ0-9])(om(?:\s+[^\s.!?,;:]+){1,7}?\s+te)(?=[^a-zà-ÿ0-9]|$)/g : woordRe(escRe(w));
      let n = 0; rest = rest.replace(re, (m, voor, wrd) => { n++; return voor + " ".repeat(wrd.length); });
      if (n) { (A.sig[v] = A.sig[v] || {})[w] = n; }
    });
    // spreektaal en vage woorden
    A.spreek = [];
    SPREEK.forEach(([w, tip]) => { const m = laag.match(woordRe(w)); if (m) A.spreek.push({ w: w.replace("\\w*", "…"), n: m.length, tip }); });
    const afk = AFK.filter((a) => laag.includes(a)); if (afk.length) A.spreek.push({ w: afk.join(" "), n: afk.length, tip: "schrijf afkortingen voluit" });
    const versterkers = (laag.match(woordRe("heel|erg|echt|super|enorm")) || []).length;
    A.versterkers = versterkers;
    // herhaling
    const freq = {}; (laag.match(/[a-zà-ÿ]+(?:-[a-zà-ÿ]+)*/g) || []).forEach((w) => { if (w.length >= 5 && !STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });
    const drempel = Math.max(4, Math.round(A.woorden / 110));
    A.herhaal = Object.entries(freq).filter((e) => e[1] >= drempel).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w, n]) => ({ w, n, syn: SYN[w] || "" }));
    // zinsbegin
    const begin = {}; A.zinnen.forEach((z) => { const w = (z.t.match(/[A-Za-zÀ-ÿ]+/) || [""])[0].toLowerCase(); if (w) begin[w] = (begin[w] || 0) + 1; });
    A.begin = Object.entries(begin).filter((e) => e[1] >= 3 && e[1] / A.zinnen.length >= 0.15).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([w, n]) => ({ w, n }));
    // ik vind
    A.ikvind = (laag.match(woordRe("ik vind|vind ik|naar mijn mening|volgens mij|ik denk|denk ik|mijns inziens|ik ben van mening")) || []).length;
    // werkwoordsvormen om na te lopen
    const kand = {}; (laag.match(/[a-zà-ÿ]+/g) || []).forEach((w) => {
      if (NIET_WW.has(w)) return;
      if (/dt$/.test(w) || /^(word|wordt|vind|vindt|houd|houdt|antwoord|antwoordt)$/.test(w) || (/^(ge|be|ver|ont|her)[a-zà-ÿ]{3,}[dt]$/.test(w) && w.length >= 6)) kand[w] = (kand[w] || 0) + 1;
    });
    A.ww = Object.entries(kand).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([w, n]) => ({ w, n }));
    // losse aandachtspunten
    const P = [];
    MENGSELS.forEach(([f, g]) => { if (woordRe(escRe(f)).test(laag)) P.push(`'${f}' → ${g}`); });
    if (/(^|[^A-Za-z])ai(?=[^A-Za-z]|$)/.test(tekst.replace(/AI/g, ""))) P.push("Schrijf AI met hoofdletters.");
    if (/ {2,}/.test(tekst)) P.push("Er staan dubbele spaties in je tekst.");
    if (/ [,.;:!?]/.test(tekst)) P.push("Vóór een leesteken hoort geen spatie.");
    if (/[,;][A-Za-zÀ-ÿ]/.test(tekst)) P.push("Na een komma hoort een spatie.");
    if (/[.!?] +[a-zà-ÿ]/.test(schoon)) P.push("Begin elke zin met een hoofdletter.");
    if ((tekst.match(/!/g) || []).length > 1) P.push("Uitroeptekens passen zelden in een zakelijke tekst. Laat je argumenten het werk doen.");
    if (woordRe("u|uw").test(laag) && woordRe("je|jij|jouw").test(laag)) P.push("Je gebruikt 'u' en 'je' door elkaar. Kies één aanspreekvorm.");
    if (/\d+ ?%|\d+ procent/.test(laag) && inst.bronnen !== "ja") P.push("Je noemt een percentage. Komt het uit een bron? Vermeld die dan. Verzin nooit cijfers.");
    A.punten = P;
    // opbouw
    const O = [], n = A.alineas.length, eerste = alineas[0] || "", laatste = alineas[n - 1] || "";
    if (A.woorden >= 80) {
      if (n < 4) O.push("Je tekst heeft " + n + (n === 1 ? " alinea" : " alinea's") + ". Verdeel hem met Enter in inleiding, middenstuk (meerdere alinea's) en slot.");
      if (A.alineas.some((x) => x > 170)) O.push("Een alinea is erg lang (meer dan 170 woorden). Splits haar: één onderwerp per alinea.");
      if (n >= 4 && A.alineas.slice(1, -1).some((x) => x < 30)) O.push("Een alinea in je middenstuk is erg kort. Werk het argument uit met uitleg en een voorbeeld.");
      if (inst.soort === "beschouwing" && n >= 3 && !/\?/.test(eerste)) O.push("Ik zie geen vraag in je eerste alinea. Staat je hoofdvraag in de inleiding?");
      if (inst.soort !== "beschouwing" && n >= 4 && !/tegenstander|critici|criticus|sommigen|sommige mensen|er wordt beweerd|er wordt gezegd|bezwaar|weliswaar|tegenargument|je zou kunnen|men zegt|vaak wordt gezegd|volgens anderen|toegegeven/.test(laag)) O.push("Ik zie nog geen tegenargument. Noem er één ('Tegenstanders zeggen dat …') en weerleg het.");
      if (n >= 4 && !/kortom|al met al|concluderend|samengevat|samenvattend|dus|daarom|alles bij elkaar|alles afwegend|conclusie/.test(laatste.toLowerCase())) O.push("In je laatste alinea staat geen signaalwoord voor een samenvatting of conclusie (kortom, al met al, daarom).");
      if (inst.soort === "beschouwing" && A.ikvind > 1) O.push("In een beschouwing houd je je eigen mening op de achtergrond. 'Ik vind' hoort hoogstens één keer in het slot.");
    }
    A.opbouw = O;
    return A;
  };

  // ======================================================================
  // SCHRIJFARENA
  // ======================================================================
  const RUBRIEK = (soort, bronnen) => [
    { id: "inhoud", naam: "Inhoud", gewicht: 25, punten: (soort === "beschouwing" ? ["Mijn hoofdvraag staat duidelijk in de inleiding", "Ik belicht minstens twee kanten, ongeveer even uitgebreid", "Elke bewering is onderbouwd met uitleg of een voorbeeld", "Ik blijf bij het onderwerp: AI en werk"] : ["Mijn stelling staat duidelijk in de inleiding", "Ik geef minstens twee, liefst drie verschillende argumenten", "Elke bewering is onderbouwd met uitleg of een voorbeeld", "Ik blijf bij het onderwerp: AI en werk"]).concat(bronnen === "ja" ? ["Ik gebruik informatie uit de bronnen en vermeld waar die vandaan komt"] : ["Ik verzin geen cijfers of onderzoeken"]) },
    { id: "opbouw", naam: "Opbouw", gewicht: 20, punten: ["Inleiding, middenstuk en slot zijn duidelijk te herkennen", "Elke alinea heeft één onderwerp en een kernzin", "De alinea's zijn met signaalwoorden aan elkaar verbonden", "In mijn slot staat geen nieuw argument", "Mijn titel past bij de tekst en maakt nieuwsgierig", "Ik zit binnen 10% van het gevraagde aantal woorden"] },
    { id: "argumentatie", naam: "Argumentatie", gewicht: 20, punten: soort === "beschouwing" ? ["Bij elke kant staan argumenten, geen losse meningen", "Ik geef de standpunten van anderen eerlijk weer", "Mijn eigen oordeel bewaar ik voor het slot en formuleer ik voorzichtig", "Mijn conclusie volgt uit wat ik heb besproken", "Er zitten geen drogredenen in"] : ["Ik noem een tegenargument en weerleg het", "Mijn sterkste argument staat op een opvallende plek", "Mijn conclusie volgt uit mijn argumenten", "Er zitten geen drogredenen in", "Ik blijf stellig: geen 'misschien' bij mijn eigen standpunt"] },
    { id: "taal", naam: "Taalgebruik", gewicht: 20, punten: ["Zakelijke toon, geen spreektaal", "Mijn zinnen wisselen af in lengte en beginnen niet steeds hetzelfde", "Geen zin is langer dan ongeveer 25 woorden", "Verwijswoorden kloppen (het bedrijf … zijn, de regering … haar)", "Ik herhaal niet steeds dezelfde woorden"] },
    { id: "spelling", naam: "Spelling en interpunctie", gewicht: 15, punten: ["Alle werkwoorden nagelopen op d/t", "Elke zin begint met een hoofdletter en eindigt met een punt", "Komma tussen twee persoonsvormen en vóór maar en want", "Samenstellingen aan elkaar (arbeidsmarkt, AI-systeem)", "Citaten staan tussen aanhalingstekens, met de bron erbij"] }
  ];

  TW.widget("schrijfarena", {
    titel: "Schrijfarena", icoon: "✍️",
    uitleg: "Schrijf hier je tekst. Je ziet meteen hoe je ervoor staat: woorden, alinea's, signaalwoorden, zinslengte en woordkeus. Alles blijft op dit apparaat bewaard.",
    maak(el, api) {
      let inst = h.inst(), opslag = Object.assign({ titel: "", tekst: "" }, h.lees("tekst", {})), tab = "opbouw";
      let klok = Object.assign({ eind: 0, rest: 0, loopt: false, totaal: 0 }, h.lees("klok", {}));
      let timer = null, t1 = null, t2 = null;
      api.opruimen(() => { clearInterval(timer); clearTimeout(t1); clearTimeout(t2); h.schrijf("tekst", opslag); });
      const plan = N.leesPlan();
      el.innerHTML = `
        <details class="nl-vak" ${opslag.tekst ? "" : "open"}><summary>⚙️ Instellingen</summary>
          <div class="keuze" id="nl-soort"><button class="btn" data-soort="betoog">Betoog</button><button class="btn" data-soort="beschouwing">Beschouwing</button></div>
          <label class="schuif"><span>Woorddoel</span><output id="nl-ow"></output><input id="nl-w" type="range" min="200" max="1200" step="50" value="${inst.woorden}"></label>
          <label class="schuif"><span>Tijd</span><output id="nl-om"></output><input id="nl-m" type="range" min="30" max="180" step="5" value="${inst.minuten}"></label>
          <p class="meta">Krijg je bronnen?</p><div class="keuze" id="nl-bron">${[["ja", "Ja"], ["nee", "Nee"], ["weetniet", "Weet ik niet"]].map((b) => `<button class="btn" data-bron="${b[0]}">${b[1]}</button>`).join("")}</div>
        </details>
        <details class="nl-vak"><summary>🗺️ Mijn bouwplan</summary><div id="nl-plan"></div></details>
        <div class="nl-klok"><div><b id="nl-tijd">–</b><small id="nl-fase"></small></div><div class="nl-klokknop"><button class="btn" id="nl-start">Start</button><button class="btn" id="nl-reset" aria-label="Klok terugzetten">↺</button></div></div>
        <div class="bar nl-klokbalk"><i id="nl-tbalk" style="width:0%"></i></div>
        <input type="text" class="nl-titelveld" id="nl-ti" placeholder="Titel" value="${esc(opslag.titel)}" aria-label="Titel">
        <div class="nl-meter" id="nl-meter"></div>
        <textarea id="nl-ta" class="nl-schrijf" rows="16" placeholder="Begin hier te schrijven. Druk op Enter voor een nieuwe alinea." aria-label="Jouw tekst" spellcheck="false" autocapitalize="sentences">${esc(opslag.tekst)}</textarea>
        <p class="meta">De spellingcontrole van je telefoon staat hier uit: op de toets heb je die ook niet.</p>
        <div class="two"><button class="btn" id="nl-kop">Kopieer tekst</button><button class="btn" id="nl-wis">Tekst wissen</button></div>
        <h4 class="nl-titel">Terugkoppeling</h4>
        <div class="nl-tabs" id="nl-tabs"></div><div id="nl-analyse"></div>
        <details class="nl-vak" id="nl-rub"><summary>✅ Zelf beoordelen</summary><div id="nl-rubriek"></div></details>`;
      const $ = (s) => el.querySelector(s), ta = $("#nl-ta");

      // ---- instellingen ----
      function instTeken() {
        $("#nl-ow").textContent = inst.woorden + " woorden"; $("#nl-om").textContent = inst.minuten + " min";
        el.querySelectorAll("[data-soort]").forEach((b) => b.classList.toggle("aan", b.dataset.soort === inst.soort));
        el.querySelectorAll("[data-bron]").forEach((b) => b.classList.toggle("aan", b.dataset.bron === inst.bronnen));
        $("#nl-plan").innerHTML = plan.soort ? `<p class="meta">${esc(plan.soort)}${plan.titel.trim() ? " · " + esc(plan.titel.trim()) : ""}</p>${N.bouwplanHtml(plan, inst)}<a class="btn klein" href="${PLAN_HREF}">Plan aanpassen</a>` : `<p>Je hebt nog geen schrijfplan. Met een plan schrijf je sneller en raak je de draad niet kwijt.</p><a class="btn primary" href="${PLAN_HREF}">Maak eerst een schrijfplan</a>`;
      }
      $("#nl-w").oninput = (e) => { inst = h.zetInst({ woorden: +e.target.value }); instTeken(); ververs(); };
      $("#nl-m").oninput = (e) => { inst = h.zetInst({ minuten: +e.target.value }); instTeken(); if (!klok.loopt && !klok.rest) klokTeken(); };
      el.querySelectorAll("[data-soort]").forEach((b) => (b.onclick = () => { inst = h.zetInst({ soort: b.dataset.soort }); instTeken(); ververs(); rubriek(); }));
      el.querySelectorAll("[data-bron]").forEach((b) => (b.onclick = () => { inst = h.zetInst({ bronnen: b.dataset.bron }); instTeken(); ververs(); rubriek(); }));

      // ---- klok ----
      const restSec = () => (klok.loopt ? Math.max(0, Math.round((klok.eind - Date.now()) / 1000)) : klok.rest || inst.minuten * 60);
      function klokTeken() {
        const tot = klok.totaal || inst.minuten * 60, r = restSec(), om = tot - r, f = tot ? om / tot : 0;
        const mm = Math.floor(r / 60), ss = String(r % 60).padStart(2, "0");
        $("#nl-tijd").textContent = `${mm}:${ss}`;
        $("#nl-tbalk").style.width = Math.min(100, f * 100) + "%";
        const v = N.verdeling(inst);
        $("#nl-fase").textContent = r === 0 && klok.totaal ? "De tijd is om. Lever in wat je hebt." : !klok.loopt && !klok.rest ? `Klok staat klaar: ${v.plan} min plan, ${v.schrijven} min schrijven, ${v.nalezen + v.reserve} min nalezen` : f < 0.15 ? "Fase 1: opdracht lezen en plan maken" : f < 0.75 ? "Fase 2: schrijven" : "Fase 3: nalezen en verbeteren";
        $("#nl-start").textContent = klok.loopt ? "Pauze" : klok.rest ? "Verder" : "Start";
        if (klok.loopt && r === 0) { klok.loopt = false; klok.rest = 0; clearInterval(timer); h.schrijf("klok", klok); $("#nl-start").textContent = "Start"; }
      }
      const tik = () => { clearInterval(timer); timer = setInterval(klokTeken, 1000); };
      $("#nl-start").onclick = () => {
        if (klok.loopt) { klok.rest = restSec(); klok.loopt = false; clearInterval(timer); }
        else { const r = klok.rest || inst.minuten * 60; if (!klok.rest) klok.totaal = r; klok.eind = Date.now() + r * 1000; klok.loopt = true; tik(); }
        h.schrijf("klok", klok); klokTeken();
      };
      $("#nl-reset").onclick = () => { clearInterval(timer); klok = { eind: 0, rest: 0, loopt: false, totaal: 0 }; h.schrijf("klok", klok); klokTeken(); };
      if (klok.loopt) tik();

      // ---- meters en analyse ----
      let A = N.analyse(opslag.tekst, inst);
      const TABS = [["opbouw", "Opbouw"], ["verband", "Verbanden"], ["zinnen", "Zinnen"], ["woorden", "Woordkeus"], ["nakijk", "Nakijken"]];
      function meter() {
        const doel = inst.woorden, f = A.woorden / doel, binnen = Math.abs(1 - f) <= 0.1;
        $("#nl-meter").innerHTML = `<div class="nl-m1"><b class="${binnen ? "nl-ok" : f > 1.1 ? "nok" : ""}">${A.woorden}</b><span>/ ${doel} woorden</span></div>
          <div class="nl-m2"><span><b>${A.alineas.length}</b> alinea's</span><span><b>${A.zinnen.length}</b> zinnen</span><span><b>${A.gem ? Math.round(A.gem) : "–"}</b> wrd/zin</span></div>
          <div class="nl-doel"><i class="${binnen ? "goed" : f > 1.1 ? "over" : ""}" style="width:${Math.min(100, (f / 1.2) * 100)}%"></i><em></em></div>`;
      }
      function badge(k) {
        if (k === "opbouw") return A.opbouw.length;
        if (k === "verband") return Object.keys(A.sig).length < 4 && A.woorden >= 80 ? 1 : 0;
        if (k === "zinnen") return A.lang.length + A.begin.length;
        if (k === "woorden") return A.spreek.length + A.herhaal.length + (A.ikvind > 2 ? 1 : 0);
        return A.punten.length;
      }
      function analyseTeken() {
        $("#nl-tabs").innerHTML = TABS.map((t) => { const b = badge(t[0]); return `<button class="${tab === t[0] ? "aan" : ""}" data-tab="${t[0]}">${t[1]}${b ? `<i>${b}</i>` : ""}</button>`; }).join("");
        el.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { tab = b.dataset.tab; analyseTeken(); }));
        const uit = $("#nl-analyse");
        if (A.woorden < 20) { uit.innerHTML = `<p class="meta">Schrijf een paar zinnen; dan verschijnt hier je terugkoppeling.</p>`; return; }
        const lijst = (rijen, leeg) => rijen.length ? `<ul class="nl-lijst">${rijen.map((r) => `<li>${r}</li>`).join("")}</ul>` : `<p class="nl-prima">✓ ${leeg}</p>`;
        if (tab === "opbouw") {
          const max = Math.max(...A.alineas, 60), v = N.verdeling(inst);
          uit.innerHTML = `<p class="meta">Elke balk is een alinea; de hoogte is het aantal woorden. Richtlijn voor ${inst.woorden} woorden: inleiding ± ${v.inl}, ${v.n} alinea's in het midden van ± ${v.perAlinea}, slot ± ${v.slot}.</p>
            <div class="nl-staven">${A.alineas.map((n, i) => `<div><i class="${n < 30 && i > 0 && i < A.alineas.length - 1 ? "kort" : n > 170 ? "lang" : ""}" style="height:${Math.max(6, (n / max) * 100)}%"></i><b>${n}</b><span>${i === 0 ? "inl" : i === A.alineas.length - 1 && A.alineas.length > 2 ? "slot" : i + 1}</span></div>`).join("")}</div>
            ${lijst(A.opbouw.map(esc), "Geen opmerkingen over je opbouw.")}`;
        } else if (tab === "verband") {
          const gevonden = Object.keys(A.sig);
          const eenzijdig = gevonden.filter((v) => { const w = Object.entries(A.sig[v]); return w.length === 1 && w[0][1] >= 3; });
          const mis = N.VERBANDEN.filter((v) => !A.sig[v.id]);
          uit.innerHTML = `<p class="meta">${gevonden.length} van de ${N.VERBANDEN.length} verbanden gevonden. Streef naar minstens vier verschillende.</p>
            ${N.VERBANDEN.filter((v) => A.sig[v.id]).map((v) => `<div class="nl-vrij"><span class="nl-v nl-v${N.VERBANDEN.indexOf(v)}">${esc(v.naam)}</span> ${Object.entries(A.sig[v.id]).map(([w, n]) => `${esc(w)}${n > 1 ? " ×" + n : ""}`).join(", ")}</div>`).join("")}
            ${eenzijdig.length ? `<ul class="nl-lijst">${eenzijdig.map((v) => { const w = Object.keys(A.sig[v])[0]; return `<li>Voor ${esc(N.verband(v).naam)} gebruik je alleen '${esc(w)}'. Wissel af met: ${N.verband(v).w.filter((x) => x !== w).slice(0, 4).map(esc).join(", ")}.</li>`; }).join("")}</ul>` : ""}
            ${mis.length ? `<p class="meta">Nog niet gebruikt:</p><div class="nl-chips">${mis.map((v) => `<span class="nl-v nl-leeg">${esc(v.naam)}: ${v.w.slice(0, 2).map(esc).join(", ")}</span>`).join("")}</div>` : ""}`;
        } else if (tab === "zinnen") {
          const max = Math.max(...A.zinnen.map((z) => z.n), 30);
          const oordeel = A.gem > 20 ? "Je zinnen zijn gemiddeld lang. Knip er een paar in tweeën." : A.gem < 10 ? "Je zinnen zijn gemiddeld kort. Verbind er een paar met een signaalwoord." : "Je gemiddelde zinslengte is prettig leesbaar.";
          uit.innerHTML = `<p class="meta">Elke streep is een zin. Een goede tekst wisselt korte en lange zinnen af. ${oordeel}</p>
            <div class="nl-ritme">${A.zinnen.map((z) => `<i class="${z.n > 25 ? "lang" : ""}" style="height:${Math.max(8, (z.n / max) * 100)}%" title="${z.n} woorden"></i>`).join("")}</div>
            ${A.lang.length ? `<p><b>Te lange zinnen</b> <span class="meta">(meer dan 25 woorden; tik om de zin te selecteren)</span></p>${A.lang.map((z, i) => `<button class="nl-zinknop" data-z="${i}"><b>${z.n}</b> ${esc(z.t.slice(0, 90))}${z.t.length > 90 ? "…" : ""}</button>`).join("")}` : `<p class="nl-prima">✓ Geen zin is langer dan 25 woorden.</p>`}
            ${A.begin.length ? `<ul class="nl-lijst">${A.begin.map((b) => `<li>${b.n} zinnen beginnen met '${esc(h.hoofd(b.w))}'. Begin eens met een signaalwoord, een bijzin of een tijdsbepaling.</li>`).join("")}</ul>` : ""}`;
          uit.querySelectorAll("[data-z]").forEach((b) => (b.onclick = () => { const z = A.lang[+b.dataset.z].t, i = ta.value.indexOf(z); if (i >= 0) { ta.focus(); ta.setSelectionRange(i, i + z.length); ta.scrollIntoView({ block: "center", behavior: "smooth" }); } }));
        } else if (tab === "woorden") {
          const rijen = A.spreek.map((s) => `<b>${esc(s.w)}</b>${s.n > 1 ? " ×" + s.n : ""} → ${esc(s.tip)}`);
          if (A.versterkers >= 4) rijen.push(`Je gebruikt ${A.versterkers} keer een versterker (heel, erg, echt). Een sterk argument heeft die niet nodig.`);
          const ik = A.ikvind > 2 ? `<li><b>'Ik vind' en varianten: ${A.ikvind} keer.</b> Dat is te vaak. ${inst.soort === "beschouwing" ? "In een beschouwing hoort je mening hoogstens in het slot." : "Je stelling is al je mening; laat 'ik vind' weg en de zin wordt sterker."}</li>` : "";
          uit.innerHTML = `<p><b>Spreektaal en vage woorden</b></p>${lijst(rijen, "Geen spreektaal gevonden.")}
            <p><b>Herhaalde woorden</b></p>${A.herhaal.length ? `<ul class="nl-lijst">${A.herhaal.map((r) => `<li><b>${esc(r.w)}</b> ×${r.n}${r.syn ? ` → wissel af met: ${esc(r.syn)}` : ""}</li>`).join("")}</ul>` : `<p class="nl-prima">✓ Geen woord valt op door herhaling.</p>`}
            <p><b>Eigen mening</b></p>${ik ? `<ul class="nl-lijst">${ik}</ul>` : `<p class="nl-prima">✓ 'Ik vind' en varianten: ${A.ikvind} keer.</p>`}`;
        } else {
          uit.innerHTML = `<p><b>Aandachtspunten</b></p>${lijst(A.punten.map(esc), "Geen opvallende slordigheden gevonden.")}
            <p><b>Werkwoorden om na te lopen</b></p>${A.ww.length ? `<p class="meta">De app kan niet zien of deze vormen goed zijn; jij wel. Loop ze één voor één na: persoonsvorm of voltooid deelwoord? Welke tijd?</p><div class="nl-chips">${A.ww.map((w) => `<span class="nl-v nl-leeg">${esc(w.w)}${w.n > 1 ? " ×" + w.n : ""}</span>`).join("")}</div>` : `<p class="meta">Nog geen lastige werkwoordsvormen gevonden.</p>`}
            <div class="note tip"><b>Tip</b> Lees je tekst bij het nakijken van achter naar voren, zin voor zin. Dan let je op de vorm in plaats van op de inhoud.</div>`;
        }
      }
      function ververs() { A = N.analyse(opslag.tekst, inst); meter(); analyseTeken(); if (A.woorden >= 150) api.klaar(); }
      ta.oninput = () => {
        opslag.tekst = ta.value;
        clearTimeout(t1); t1 = setTimeout(() => h.schrijf("tekst", opslag), 300);
        clearTimeout(t2); t2 = setTimeout(ververs, 450);
        A.woorden = telWoorden(ta.value); const b = el.querySelector(".nl-m1 b"); if (b) b.textContent = A.woorden;
      };
      $("#nl-ti").oninput = (e) => { opslag.titel = e.target.value; h.schrijf("tekst", opslag); };
      $("#nl-kop").onclick = (e) => h.kopieer((opslag.titel.trim() ? opslag.titel.trim() + "\n\n" : "") + opslag.tekst, e.target);
      $("#nl-wis").onclick = () => { if (opslag.tekst && confirm("Je hele tekst wissen? Dit kan niet ongedaan worden gemaakt.")) { opslag = { titel: "", tekst: "" }; h.schrijf("tekst", opslag); ta.value = ""; $("#nl-ti").value = ""; ververs(); } };

      // ---- zelfbeoordeling ----
      function rubriek() {
        const R = RUBRIEK(inst.soort, inst.bronnen), vink = h.lees("rubriek", {});
        let totaal = 0;
        const html = R.map((c) => {
          const n = c.punten.filter((p, i) => vink[c.id + i]).length; totaal += (n / c.punten.length) * c.gewicht;
          return `<div class="nl-cat"><div class="nl-catkop"><b>${c.naam}</b><span>${n}/${c.punten.length} · weegt ${c.gewicht}%</span></div><div class="bar"><i style="width:${(n / c.punten.length) * 100}%"></i></div>
            ${c.punten.map((p, i) => `<label class="vink"><input type="checkbox" data-r="${c.id + i}" ${vink[c.id + i] ? "checked" : ""}> <span>${esc(p)}</span></label>`).join("")}</div>`;
        }).join("");
        $("#nl-rubriek").innerHTML = `<p class="meta">Lees je tekst na en vink alleen aan wat echt klopt. Dit is een eigen model om jezelf te controleren; je docent kan anders wegen.</p>${html}
          <div class="uit"><span class="meta">Jouw eigen inschatting</span><br><span class="groot">${TW.nl(1 + 9 * (totaal / 100), 1)}</span> <span class="meta">(geen echt cijfer)</span></div>
          <button class="btn link" id="nl-rwis">Vinkjes wissen</button>`;
        $("#nl-rubriek").querySelectorAll("[data-r]").forEach((c) => (c.onchange = () => { const v = h.lees("rubriek", {}); v[c.dataset.r] = c.checked; h.schrijf("rubriek", v); rubriek(); }));
        $("#nl-rwis").onclick = () => { h.schrijf("rubriek", {}); rubriek(); };
      }

      instTeken(); klokTeken(); ververs(); rubriek();
    }
  });
})();
