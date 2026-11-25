// Interactieve onderdelen, deel 2: werken met teksten (snijtafel, alineapuzzel, alineabouwer, argumentenbank).
(function () {
  "use strict";
  const N = TW.NED, h = N.h, esc = TW.esc, shuffle = TW.shuffle;
  const vIdx = (id) => N.VERBANDEN.findIndex((v) => v.id === id);
  const LETTER = /[A-Za-zÀ-ÿ]/;

  // Posities van de signaalwoorden in een alinea: [{ s, e, v }]
  function sigRanges(a) {
    const t = a.t, R = [];
    a.sig.forEach(([w, v]) => {
      let van = 0;
      while (van <= t.length) {
        const s = t.indexOf(w, van); if (s < 0) break;
        const e = s + w.length, voor = t[s - 1] || " ", na = t[e] || " ";
        if (!LETTER.test(voor) && !LETTER.test(na) && !R.some((r) => s < r.e && e > r.s)) { R.push({ s, e, v, w }); break; }
        van = s + 1;
      }
    });
    return R;
  }

  // Alinea als html, met signaalwoorden en/of kernzin gemarkeerd.
  function alineaHtml(a, toonSig, toonKern) {
    const t = a.t, R = toonSig ? sigRanges(a) : [];
    const ks = toonKern ? t.indexOf(a.k) : -1, ke = ks + a.k.length;
    const punten = [...new Set([0, t.length].concat(R.flatMap((r) => [r.s, r.e]), ks >= 0 ? [ks, ke] : []))].sort((x, y) => x - y);
    let html = "";
    for (let i = 0; i < punten.length - 1; i++) {
      const s = punten[i], e = punten[i + 1]; let stuk = esc(t.slice(s, e));
      const r = R.find((x) => x.s <= s && x.e >= e);
      if (r) stuk = `<mark class="nl-sig nl-v${vIdx(r.v)}">${stuk}</mark>`;
      if (toonKern) stuk = `<span class="${ks >= 0 && s >= ks && e <= ke ? "nl-kern" : "nl-dof"}">${stuk}</span>`;
      html += stuk;
    }
    return html;
  }

  // ======================================================================
  // TEKST OP DE SNIJTAFEL
  // ======================================================================
  TW.widget("snijtafel", {
    titel: "Tekst op de snijtafel", icoon: "🔬",
    uitleg: "Twee voorbeeldteksten over AI en werk. Tik op een alinea om te zien wat die doet: functie, soort argument en signaalwoorden. Of wijs ze eerst zelf aan.",
    maak(el, api) {
      let ti = h.lees("snij:tekst", 0), modus = "kijk", sig = false, kern = false;
      const open = new Set();
      function kader() {
        el.innerHTML = `<div class="keuze">${N.TEKSTEN.map((t, n) => `<button class="btn ${n === ti ? "aan" : ""}" data-t="${n}">${esc(t.soort)}</button>`).join("")}</div>
          <div class="keuze"><button class="btn ${modus === "kijk" ? "aan" : ""}" data-m="kijk">👀 Bekijken</button><button class="btn ${modus === "test" ? "aan" : ""}" data-m="test">☝️ Zelf aanwijzen</button></div>
          <div class="nl-lijf"></div>`;
        el.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => { ti = +b.dataset.t; h.schrijf("snij:tekst", ti); open.clear(); kader(); }));
        el.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => { modus = b.dataset.m; kader(); }));
        (modus === "kijk" ? kijk : test)(el.querySelector(".nl-lijf"), N.TEKSTEN[ti]);
      }
      const woorden = (T) => T.alineas.reduce((n, a) => n + a.t.split(/\s+/).length, 0);

      function kijk(w, T) {
        const gebruikt = [...new Set(T.alineas.flatMap((a) => a.sig.map((s) => s[1])))];
        w.innerHTML = `<div class="nl-schakel"><label class="vink"><input type="checkbox" id="nl-sig" ${sig ? "checked" : ""}> <span>Signaalwoorden</span></label><label class="vink"><input type="checkbox" id="nl-kern" ${kern ? "checked" : ""}> <span>Kernzinnen</span></label></div>
          ${sig ? `<div class="nl-legenda">${gebruikt.map((v) => `<span class="nl-v nl-v${vIdx(v)}">${esc(N.verband(v).naam)}</span>`).join("")}</div>` : ""}
          ${kern ? `<p class="meta">Lees alleen de oplichtende zinnen achter elkaar: samen vormen ze een samenvatting van de tekst.</p>` : ""}
          <h4 class="nl-titel">${esc(T.titel)}</h4><p class="meta">${esc(T.soort)} · ${woorden(T)} woorden · ${esc(T.over)}</p>
          <div class="nl-tekst">${T.alineas.map((a, n) => `<div class="nl-al ${open.has(n) ? "open" : ""}" data-n="${n}" role="button" tabindex="0" aria-expanded="${open.has(n)}">
            <span class="nl-nr">${n + 1}</span><p>${alineaHtml(a, sig, kern)}</p>
            ${open.has(n) ? `<div class="nl-ann"><b>${esc(T.functies[a.f])}</b><p>${esc(a.uit)}</p>
              ${a.arg ? `<p><span class="soort">soort argument</span> ${esc(N.TYPES[a.arg])}</p>` : ""}
              <p class="nl-chips">${a.sig.map((s) => `<span class="nl-v nl-v${vIdx(s[1])}">${esc(s[0])} · ${esc(N.verband(s[1]).naam)}</span>`).join("")}</p></div>` : ""}
          </div>`).join("")}</div>
          <p class="meta">${open.size} van ${T.alineas.length} alinea's bekeken</p>`;
        w.querySelector("#nl-sig").onchange = (e) => { sig = e.target.checked; kijk(w, T); };
        w.querySelector("#nl-kern").onchange = (e) => { kern = e.target.checked; kijk(w, T); };
        w.querySelectorAll(".nl-al").forEach((d) => {
          const tik = () => { const n = +d.dataset.n; if (open.has(n)) open.delete(n); else open.add(n); if (open.size === T.alineas.length) api.klaar(); kijk(w, T); };
          d.onclick = tik; d.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tik(); } };
        });
      }

      function test(w, T) {
        let i = 0, goed = 0, tot = 0;
        const functies = Object.keys(T.functies), types = Object.keys(N.TYPES);
        function toon() {
          const a = T.alineas[i];
          w.innerHTML = `<div class="nl-kop"><span>Alinea ${i + 1} van ${T.alineas.length}</span><span>${goed} goed</span></div><div class="bar"><i style="width:${Math.round((i / T.alineas.length) * 100)}%"></i></div>
            <h4 class="nl-titel">${esc(T.titel)}</h4>
            <div class="nl-al vast"><span class="nl-nr">${i + 1}</span><p>${alineaHtml(a, false, false)}</p></div>
            <p class="vraag">Welke functie heeft deze alinea?</p>
            <div class="nl-vr1">${shuffle(functies).map((f) => `<button class="opt" data-f="${f}">${esc(T.functies[f])}</button>`).join("")}</div><div class="nl-vr2"></div><div class="nl-sigstap"></div><div class="nl-na"></div>`;
          const na = () => {
            w.querySelector(".nl-al p").innerHTML = alineaHtml(a, true, true);
            w.querySelector(".nl-na").innerHTML = `<div class="uitleg"><b>${esc(T.functies[a.f])}</b><p>${esc(a.uit)}</p></div><button class="btn primary big">${i === T.alineas.length - 1 ? "Bekijk resultaat" : "Volgende alinea"}</button>`;
            const k = w.querySelector(".nl-na button");
            k.onclick = () => { i++; if (i < T.alineas.length) toon(); else einde(); };
            k.scrollIntoView({ block: "nearest", behavior: "smooth" });
          };
          // stap 3: zelf de signaalwoorden aanwijzen
          const sigStap = () => {
            const R = sigRanges(a), tok = [], re = /\S+/g; let m;
            while ((m = re.exec(a.t))) { const s = m.index, e = s + m[0].length; tok.push({ t: m[0], r: R.findIndex((x) => s < x.e && e > x.s), aan: false }); }
            const v3 = w.querySelector(".nl-sigstap");
            v3.innerHTML = `<p class="vraag">Tik de signaalwoorden in deze alinea aan.</p><p class="meta">Er staan er ${R.length} in. Bestaat een signaalwoord uit meer woorden, dan is één woord aantikken genoeg.</p>
              <div class="nl-zin">${tok.map((x, n) => `<button class="nl-w" data-w="${n}">${esc(x.t)}</button>`).join(" ")}</div>
              <button class="btn primary big" id="nl-sigchk">Controleer de signaalwoorden</button><div class="nl-sigfb"></div>`;
            const knoppen = [...v3.querySelectorAll("[data-w]")];
            knoppen.forEach((b, n) => (b.onclick = () => { tok[n].aan = !tok[n].aan; b.classList.toggle("sel", tok[n].aan); }));
            v3.querySelector("#nl-sigchk").onclick = (e) => {
              // losse signaalwoorden die niet in de lijst van deze alinea staan (zoals 'ook'), tellen niet als fout
              const los = new Set(N.VERBANDEN.flatMap((v) => v.w).filter((x) => !x.includes(" ")));
              const ookGoed = (x) => los.has(x.t.toLowerCase().replace(/[^a-zà-ÿ]/g, ""));
              const raak = new Set(tok.filter((x) => x.aan && x.r >= 0).map((x) => x.r)), mis = tok.filter((x) => x.aan && x.r < 0 && !ookGoed(x)).length;
              knoppen.forEach((b, n) => {
                const x = tok[n]; b.disabled = true; b.classList.remove("sel");
                if (x.r >= 0) b.classList.add(raak.has(x.r) ? "raak" : "gemist"); else if (x.aan) b.classList.add(ookGoed(x) ? "ook" : "teveel");
              });
              const juist = raak.size >= Math.ceil(R.length * 0.75) && mis <= 1;
              tot++; if (juist) goed++;
              e.target.remove();
              v3.querySelector(".nl-sigfb").innerHTML = `<p class="fb">${juist ? `<span class="nl-ok">Goed gezien:</span>` : `<span class="nok">Nog niet:</span>`} ${raak.size} van de ${R.length} gevonden${mis ? `, ${mis} ${mis === 1 ? "woord" : "woorden"} ten onrechte aangetikt` : ""}. Groen = gevonden, oranje omlijnd = gemist, rood = geen signaalwoord${tok.some((x) => x.aan && x.r < 0 && ookGoed(x)) ? ", blauw = ook een signaalwoord (telt niet als fout)" : ""}.</p>
                <p class="nl-chips">${R.map((r) => `<span class="nl-v nl-v${vIdx(r.v)}">${esc(r.w)} · ${esc(N.verband(r.v).naam)}</span>`).join("")}</p>`;
              na();
            };
            v3.scrollIntoView({ block: "nearest", behavior: "smooth" });
          };
          w.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => {
            tot++; const juist = b.dataset.f === a.f; if (juist) goed++;
            w.querySelectorAll("[data-f]").forEach((k) => { k.disabled = true; if (k.dataset.f === a.f) k.classList.add("goed"); });
            if (!juist) b.classList.add("fout");
            if (!a.arg) return sigStap();
            const v2 = w.querySelector(".nl-vr2");
            v2.innerHTML = `<p class="vraag">Op wat voor soort argument steunt deze alinea vooral?</p><div class="nl-grid2">${types.map((t) => `<button class="btn" data-a="${t}">${esc(N.TYPES[t])}</button>`).join("")}</div>`;
            v2.querySelectorAll("[data-a]").forEach((k) => (k.onclick = () => {
              tot++; const ok = k.dataset.a === a.arg; if (ok) goed++;
              v2.querySelectorAll("[data-a]").forEach((x) => { x.disabled = true; if (x.dataset.a === a.arg) x.classList.add("good"); });
              if (!ok) k.classList.add("bad");
              sigStap();
            }));
            v2.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }));
        }
        function einde() {
          api.klaar();
          w.innerHTML = `<p class="score">${goed}/${tot}</p><p class="score-sub">${goed === tot ? "Je doorziet de hele opbouw." : goed >= tot * 0.7 ? "Goed gezien. Bekijk de alinea's die je miste nog eens." : "Bekijk de tekst eerst rustig in de stand Bekijken en probeer het daarna opnieuw."}</p>
            <div class="model"><b>Zo zit deze tekst in elkaar</b><ol class="stappen">${T.alineas.map((a) => `<li>${esc(T.functies[a.f])}${a.arg ? ` <span class="meta">(${esc(N.TYPES[a.arg])})</span>` : ""}</li>`).join("")}</ol></div>
            <div class="two"><button class="btn" id="nl-weer">Opnieuw</button><button class="btn primary" id="nl-ander">${esc(N.TEKSTEN[1 - ti].soort)} proberen</button></div>`;
          w.querySelector("#nl-weer").onclick = () => test(w, T);
          w.querySelector("#nl-ander").onclick = () => { ti = 1 - ti; h.schrijf("snij:tekst", ti); kader(); };
        }
        toon();
      }
      kader();
    }
  });

  // ======================================================================
  // ALINEAPUZZEL
  // ======================================================================
  TW.widget("alineapuzzel", {
    titel: "Alineapuzzel", icoon: "🧩",
    uitleg: "De stukken staan door elkaar. Zet ze met de pijlen in de goede volgorde. Let op de signaalwoorden: die verraden de plek.",
    maak(el, api) {
      let pi = 0;
      function start() {
        const P = N.PUZZELS[pi];
        let rij = shuffle(P.stukken.map((s, n) => n));
        if (rij.every((n, p) => n === p)) rij.push(rij.shift());
        let pogingen = 0, klaar = false, toonHint = false;
        function teken(fb) {
          el.innerHTML = `<div class="keuze">${N.PUZZELS.map((p, n) => `<button class="btn ${n === pi ? "aan" : ""}" data-p="${n}">${n + 1}</button>`).join("")}</div>
            <h4 class="nl-titel">${esc(P.titel)}</h4><p class="meta">${esc(P.soort)}</p>
            <div class="nl-puzzel">${rij.map((n, p) => `<div class="nl-stuk ${klaar || toonHint ? (n === p ? "goed" : "fout") : ""}">
              <div class="nl-pijlen"><button class="btn" data-op="${p}" ${p === 0 || klaar ? "disabled" : ""} aria-label="Omhoog">▲</button><button class="btn" data-neer="${p}" ${p === rij.length - 1 || klaar ? "disabled" : ""} aria-label="Omlaag">▼</button></div>
              <div><p>${esc(P.stukken[n][0])}</p>${klaar ? `<small>${esc(P.stukken[n][1])}</small>` : ""}</div></div>`).join("")}</div>
            <div class="fb">${fb || ""}</div>
            ${klaar ? `<button class="btn primary big" id="nl-volg">${pi < N.PUZZELS.length - 1 ? "Volgende puzzel" : "Eerste puzzel opnieuw"}</button>` : `<button class="btn primary big" id="nl-chk">Controleer</button>${pogingen >= 2 ? `<button class="btn big" id="nl-opl">Toon de oplossing</button>` : ""}`}`;
          el.querySelectorAll("[data-p]").forEach((b) => (b.onclick = () => { pi = +b.dataset.p; start(); }));
          const wissel = (a, b) => { [rij[a], rij[b]] = [rij[b], rij[a]]; toonHint = false; teken(); };
          el.querySelectorAll("[data-op]").forEach((b) => (b.onclick = () => wissel(+b.dataset.op, +b.dataset.op - 1)));
          el.querySelectorAll("[data-neer]").forEach((b) => (b.onclick = () => wissel(+b.dataset.neer, +b.dataset.neer + 1)));
          if (klaar) { el.querySelector("#nl-volg").onclick = () => { pi = (pi + 1) % N.PUZZELS.length; start(); }; return; }
          el.querySelector("#nl-chk").onclick = () => {
            const n = rij.filter((x, p) => x === p).length;
            if (n === rij.length) { klaar = true; api.klaar(); teken(`<span class="nl-ok">Helemaal goed${pogingen ? "" : ", in één keer"}!</span> Onder elk stuk staat waaraan je de plek kunt herkennen.`); }
            else { pogingen++; toonHint = true; teken(`<span class="nok">${n} van de ${rij.length} staan op de goede plek</span> (groen). Verplaats de rode stukken en let op woorden als 'Daarnaast', 'Tegenstanders' en 'Kortom'.`); }
          };
          const opl = el.querySelector("#nl-opl");
          if (opl) opl.onclick = () => { rij = P.stukken.map((s, n) => n); klaar = true; teken("Dit is de goede volgorde. Lees bij elk stuk waaraan je de plek herkent."); };
        }
        teken();
      }
      start();
    }
  });

  // ======================================================================
  // VAN ARGUMENT NAAR ALINEA
  // ======================================================================
  const LAAG = { K: "Kernzin", U: "Uitleg", V: "Voorbeeld of bewijs", A: "Afronding" };
  const VOORBEELD = [
    [["K", "Ten eerste neemt AI vooral losse taken over en geen hele beroepen."], ["U", "Een beroep bestaat namelijk uit veel verschillende taken, en een deel daarvan vraagt om contact met mensen."], ["V", "Zo kan software voor een docent toetsen nakijken, maar geen onzekere leerling moed inspreken."], ["A", "Het beroep verandert dus, maar het verdwijnt niet."]],
    [["K", "Daarnaast gaat de verandering sneller dan mensen kunnen bijhouden."], ["U", "Wie zijn werk verliest, heeft tijd nodig om een nieuw vak te leren, en die tijd is er dit keer nauwelijks."], ["V", "De overgang van paard naar auto duurde tientallen jaren, terwijl een nieuwe chatbot binnen enkele maanden overal wordt gebruikt."], ["A", "Daarom is het risico op werkloosheid nu groter dan bij eerdere uitvindingen."]],
    [["K", "De gevolgen van AI hangen bovendien af van de keuzes van werkgevers."], ["U", "Dezelfde software kan immers op twee manieren worden ingezet: om werknemers te helpen of om hen te vervangen."], ["V", "Een ziekenhuis dat AI de administratie laat doen, geeft verpleegkundigen meer tijd, terwijl een callcenter met dezelfde techniek medewerkers kan ontslaan."], ["A", "Het is dus te simpel om te zeggen dat de techniek zelf banen kost of oplevert."]]
  ];
  const STARTERS = {
    K: ["Ten eerste", "Daarnaast", "Bovendien", "Een belangrijk argument is dat"],
    U: ["Dat komt doordat", "De reden daarvoor is dat", "Dit betekent dat"],
    V: ["Zo", "Neem bijvoorbeeld", "Denk aan", "Volgens"],
    A: ["Daarom", "Dat betekent dat", "Hieruit blijkt dat", "Kortom,"]
  };
  const HULP = {
    K: "Je argument in één zin. Begin met een signaalwoord.",
    U: "Leg uit waarom je kernzin klopt. Hoe werkt het?",
    V: "Maak het concreet: een voorbeeld, een feit of iets uit je bron.",
    A: "Rond af: wat betekent dit voor je stelling of hoofdvraag?"
  };
  const telWoorden = (s) => (s.match(/[A-Za-zÀ-ÿ0-9]+(?:['’-][A-Za-zÀ-ÿ0-9]+)*/g) || []).length;
  N.telWoorden = telWoorden;

  TW.widget("alineabouwer", {
    titel: "Van argument naar alinea", icoon: "🏗️",
    uitleg: "Een sterke alinea heeft vier lagen: kernzin, uitleg, voorbeeld, afronding. Herken ze eerst en bouw er daarna zelf een.",
    maak(el, api) {
      let tab = h.lees("bouwer:tab", 0), vi = 0;
      function kader() {
        el.innerHTML = `<div class="keuze"><button class="btn ${tab === 0 ? "aan" : ""}" data-tab="0">1 · Herkennen</button><button class="btn ${tab === 1 ? "aan" : ""}" data-tab="1">2 · Zelf bouwen</button></div><div class="nl-lijf"></div>`;
        el.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { tab = +b.dataset.tab; h.schrijf("bouwer:tab", tab); kader(); }));
        (tab === 0 ? herken : bouw)(el.querySelector(".nl-lijf"));
      }
      function herken(w) {
        const zinnen = shuffle(VOORBEELD[vi]); const keus = zinnen.map(() => null); let na = false;
        function teken() {
          w.innerHTML = `<p class="meta">Voorbeeld ${vi + 1} van ${VOORBEELD.length}. De zinnen staan door elkaar. Geef elke zin het juiste label.</p>
            ${zinnen.map((z, n) => `<div class="nl-label ${na ? (keus[n] === z[0] ? "goed" : "fout") : ""}"><p>${esc(z[1])}</p><div class="nl-kuva-knop">${Object.keys(LAAG).map((k) => `<button class="btn ${keus[n] === k ? "aan" : ""} ${na && z[0] === k ? "good" : ""}" data-n="${n}" data-k="${k}" ${na ? "disabled" : ""} aria-label="${LAAG[k]}">${k}</button>`).join("")}</div></div>`).join("")}
            <p class="meta">K = kernzin · U = uitleg · V = voorbeeld of bewijs · A = afronding</p>
            ${na ? `<div class="model"><b>De alinea in de goede volgorde</b><p>${["K", "U", "V", "A"].map((k) => `<span class="nl-laag nl-l${k}">${esc(VOORBEELD[vi].find((z) => z[0] === k)[1])}</span>`).join(" ")}</p></div>
              <div class="two"><button class="btn" id="nl-nog">Volgend voorbeeld</button><button class="btn primary" id="nl-bouw">Zelf bouwen</button></div>`
              : `<button class="btn primary big" id="nl-chk" ${keus.includes(null) ? "disabled" : ""}>Controleer</button>`}`;
          w.querySelectorAll("[data-k]").forEach((b) => (b.onclick = () => { keus[+b.dataset.n] = b.dataset.k; teken(); }));
          if (na) {
            w.querySelector("#nl-nog").onclick = () => { vi = (vi + 1) % VOORBEELD.length; herken(w); };
            w.querySelector("#nl-bouw").onclick = () => { tab = 1; h.schrijf("bouwer:tab", 1); kader(); };
          } else w.querySelector("#nl-chk").onclick = () => { na = true; teken(); };
        }
        teken();
      }
      function bouw(w) {
        const d = Object.assign({ arg: "k1", K: "", U: "", V: "", A: "" }, h.lees("bouwer", {}));
        const plan = h.lees("plan", {}), eigen = (plan.args || []).filter((a) => a.eigen && a.tekst);
        const opties = N.BANK.filter((a) => !a.sjabloon).map((a) => [a.id, `${N.KANTEN[a.kant].split(":")[0].replace("AI is vooral een ", "")}: ${a.kort}`]).concat(eigen.map((a, n) => ["eigen" + n, "Uit mijn plan: " + a.tekst.slice(0, 40)]), [["vrij", "Eigen argument"]]);
        const argTekst = () => { const b = N.BANK.find((a) => a.id === d.arg); if (b) return b.tekst; const m = /^eigen(\d+)$/.exec(d.arg); return m && eigen[+m[1]] ? eigen[+m[1]].tekst : "Bedenk zelf een argument en werk het hieronder uit."; };
        w.innerHTML = `<label class="nl-veld"><span>Welk argument werk je uit?</span><select id="nl-arg">${opties.map((o) => `<option value="${o[0]}" ${o[0] === d.arg ? "selected" : ""}>${esc(o[1])}</option>`).join("")}</select></label>
          <div class="uit" id="nl-argt"></div>
          ${Object.keys(LAAG).map((k) => `<div class="nl-bouwveld nl-l${k}"><label for="nl-t${k}"><b>${k} · ${LAAG[k]}</b><small>${HULP[k]}</small></label>
            <div class="nl-starters">${STARTERS[k].map((s) => `<button class="chip" data-k="${k}" data-s="${esc(s)}">${esc(s)} …</button>`).join("")}</div>
            <textarea id="nl-t${k}" rows="2" data-veld="${k}" placeholder="${LAAG[k]}">${esc(d[k])}</textarea></div>`).join("")}
          <h4 class="nl-titel">Jouw alinea</h4><div class="nl-voorbeeld" id="nl-uit"></div><div id="nl-check"></div>
          <div class="two"><button class="btn" id="nl-kop">Kopieer alinea</button><button class="btn primary" id="nl-naar">Zet in de schrijfarena</button></div>
          <p style="text-align:center"><button class="btn link" id="nl-wis">Velden leegmaken</button></p>`;
        const alinea = () => ["K", "U", "V", "A"].map((k) => d[k].trim()).filter(Boolean).join(" ");
        const sigIn = (s) => N.VERBANDEN.some((v) => v.w.some((x) => new RegExp("(^|[^a-zà-ÿ])" + x + "(?![a-zà-ÿ])").test(s.toLowerCase())));
        function ververs() {
          w.querySelector("#nl-argt").innerHTML = `<span class="meta">Het argument</span><br>${esc(argTekst())}`;
          const t = alinea(), n = telWoorden(t);
          w.querySelector("#nl-uit").innerHTML = t ? ["K", "U", "V", "A"].filter((k) => d[k].trim()).map((k) => `<span class="nl-laag nl-l${k}">${esc(d[k].trim())}</span>`).join(" ") : `<span class="meta">Vul de vier lagen in; hier groeit je alinea.</span>`;
          const vol = ["K", "U", "V", "A"].every((k) => d[k].trim());
          const punten = [
            [vol, "Alle vier de lagen zijn ingevuld"],
            [d.K.trim() && telWoorden(d.K) <= 25, "De kernzin is kort en krachtig (hoogstens 25 woorden)"],
            [sigIn(t), "Er staat minstens één signaalwoord in"],
            [n >= 50 && n <= 130, `De alinea heeft een goede lengte (nu ${n} woorden, richtlijn 50 tot 130)`]
          ];
          w.querySelector("#nl-check").innerHTML = punten.map((p) => `<div class="nl-punt ${p[0] ? "ok" : ""}">${p[0] ? "✓" : "○"} ${esc(p[1])}</div>`).join("");
          if (vol && n >= 40) api.klaar();
        }
        w.querySelector("#nl-arg").onchange = (e) => { d.arg = e.target.value; h.schrijf("bouwer", d); ververs(); };
        w.querySelectorAll("textarea").forEach((ta) => (ta.oninput = () => { d[ta.dataset.veld] = ta.value; h.schrijf("bouwer", d); ververs(); }));
        w.querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => {
          const ta = w.querySelector("#nl-t" + b.dataset.k), oud = ta.value.trim();
          ta.value = b.dataset.s + " " + (oud ? oud.charAt(0).toLowerCase() + oud.slice(1) : "");
          d[b.dataset.k] = ta.value; h.schrijf("bouwer", d); ververs(); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
        }));
        w.querySelector("#nl-kop").onclick = (e) => { if (alinea()) h.kopieer(alinea(), e.target); };
        w.querySelector("#nl-naar").onclick = (e) => {
          if (!alinea()) return;
          const s = h.lees("tekst", { titel: "", tekst: "" }); s.tekst = (s.tekst ? s.tekst.replace(/\s+$/, "") + "\n\n" : "") + alinea(); h.schrijf("tekst", s);
          e.target.textContent = "Toegevoegd ✓"; setTimeout(() => { e.target.textContent = "Zet in de schrijfarena"; }, 1600);
        };
        w.querySelector("#nl-wis").onclick = () => { if (confirm("De vier velden leegmaken?")) { h.schrijf("bouwer", { arg: d.arg }); bouw(w); } };
        ververs();
      }
      kader();
    }
  });

  // ======================================================================
  // ARGUMENTENBANK
  // ======================================================================
  TW.widget("argumentenbank", {
    titel: "Argumentenbank", icoon: "🗂️",
    uitleg: "Argumenten voor, tegen en genuanceerd. Tik er een open, raad het soort argument en bekijk een mogelijke weerlegging. Met de ster bewaar je een argument voor je schrijfplan.",
    maak(el, api) {
      let filter = "alle"; const open = new Set(), geraden = {};
      const fav = () => h.lees("fav", []);
      function teken() {
        const lijst = N.BANK.filter((a) => filter === "alle" || a.kant === filter), f = fav();
        el.innerHTML = `<div class="keuze">${[["alle", "Alle"], ["kans", "Kans"], ["bedreiging", "Bedreiging"], ["nuance", "Genuanceerd"]].map((k) => `<button class="btn ${filter === k[0] ? "aan" : ""}" data-f="${k[0]}">${k[1]}</button>`).join("")}</div>
          <p class="meta">${lijst.length} argumenten · ${f.length} bewaard voor je plan</p>
          ${lijst.map((a) => `<div class="nl-arg ${a.kant} ${open.has(a.id) ? "open" : ""}">
            <div class="nl-argkop"><button class="nl-argtitel" data-o="${a.id}" aria-expanded="${open.has(a.id)}"><span class="nl-kant">${a.kant === "nuance" ? "genuanceerd" : a.kant}</span><b>${esc(a.kort)}</b></button>
              <button class="nl-ster ${f.includes(a.id) ? "aan" : ""}" data-s="${a.id}" aria-label="Bewaar voor mijn plan" aria-pressed="${f.includes(a.id)}">${f.includes(a.id) ? "★" : "☆"}</button></div>
            ${open.has(a.id) ? `<div class="nl-arglijf"><p>${esc(a.tekst)}</p>
              ${geraden[a.id] ? `<p><span class="soort">soort argument</span> <b>${esc(N.TYPES[a.type])}</b> ${geraden[a.id] === a.type ? "· goed geraden" : "· jij dacht: " + esc(N.TYPES[geraden[a.id]])}</p>
                <div class="nl-weer"><b>${a.sjabloon ? "Let op" : "Mogelijke weerlegging"}</b><p>${esc(a.weer)}</p></div>`
                : `<p class="meta">Wat voor soort argument is dit?</p><div class="nl-grid2">${Object.keys(N.TYPES).map((t) => `<button class="btn klein" data-a="${a.id}" data-t="${t}">${esc(N.TYPES[t])}</button>`).join("")}</div>`}
            </div>` : ""}</div>`).join("")}`;
        el.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => { filter = b.dataset.f; teken(); }));
        el.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => { const id = b.dataset.o; if (open.has(id)) open.delete(id); else open.add(id); teken(); }));
        el.querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => { const id = b.dataset.s; let f2 = fav(); f2 = f2.includes(id) ? f2.filter((x) => x !== id) : f2.concat(id); h.schrijf("fav", f2); teken(); }));
        el.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => { geraden[b.dataset.a] = b.dataset.t; if (Object.keys(geraden).length >= 5) api.klaar(); teken(); }));
      }
      teken();
    }
  });
})();
