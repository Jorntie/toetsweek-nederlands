// Interactieve onderdelen, deel 1: hulpfuncties en de trainers (drogredenen, formuleren, d/t, signaalwoorden, komma's).
// TW.widget(naam, { titel, icoon, uitleg, maak(el, api) {} });
(function () {
  "use strict";
  const N = (TW.NED = TW.NED || {});
  const NS = "tw:nederlands:";
  const esc = TW.esc, shuffle = TW.shuffle;

  // ---------- gedeelde hulpfuncties ----------
  const h = (N.h = {
    lees(k, d) { try { const r = JSON.parse(localStorage.getItem(NS + k)); return r == null ? d : r; } catch (e) { return d; } },
    schrijf(k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch (e) { /* geen opslag: werkt door */ } },
    // instellingen van de toets: onbekend, dus instelbaar
    inst() { return Object.assign({ woorden: 500, minuten: 90, bronnen: "weetniet", soort: "betoog" }, h.lees("inst", {})); },
    zetInst(o) { const i = Object.assign(h.inst(), o); h.schrijf("inst", i); return i; },
    kopieer(tekst, knop) {
      const klaar = (ok) => { if (!knop) return; const oud = knop.textContent; knop.textContent = ok ? "Gekopieerd ✓" : "Kopiëren lukte niet"; setTimeout(() => { knop.textContent = oud; }, 1600); };
      const oud = () => {
        const ta = document.createElement("textarea"); ta.value = tekst; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); let ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        ta.remove(); klaar(ok);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tekst).then(() => klaar(true), oud); else oud();
    },
    kies(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    hoofd(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  });

  // Een ronde van n vragen met voortgang, reeks, uitleg en eindscore.
  // cfg: { naam, items() → lijst, teken(item, el, klaar(juist, uitlegHtml)), na(fouten, goed, totaal) → html, start(html) }
  h.ronde = function (el, api, cfg) {
    let lijst, i, goed, reeks, fouten;
    function start() { lijst = cfg.items(); i = 0; goed = 0; reeks = 0; fouten = []; toon(); }
    function toon() {
      const it = lijst[i];
      el.innerHTML = `<div class="nl-kop"><span>Vraag ${i + 1} van ${lijst.length}</span><span>${reeks >= 2 ? "🔥 " + reeks + " op rij · " : ""}${goed} goed</span></div>
        <div class="bar"><i style="width:${Math.round((i / lijst.length) * 100)}%"></i></div><div class="nl-item"></div><div class="nl-na"></div>`;
      let af = false;
      cfg.teken(it, el.querySelector(".nl-item"), (juist, uitleg) => {
        if (af) return; af = true;
        if (juist) { goed++; reeks++; } else { reeks = 0; fouten.push(it); }
        const na = el.querySelector(".nl-na");
        na.innerHTML = `<div class="uitleg ${juist ? "ok" : "nok"}"><b>${juist ? "Goed! ✅" : "Niet goed ❌"}</b>${uitleg || ""}</div>
          <button class="btn primary big">${i === lijst.length - 1 ? "Bekijk resultaat" : "Volgende"}</button>`;
        const knop = na.querySelector("button");
        knop.onclick = () => { i++; if (i < lijst.length) toon(); else einde(); };
        knop.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
    function einde() {
      api.klaar();
      const best = h.lees("best:" + cfg.naam, 0), n = lijst.length;
      if (goed > best) h.schrijf("best:" + cfg.naam, goed);
      const tekst = goed === n ? "Foutloos, knap gedaan!" : goed >= n * 0.75 ? "Mooi resultaat." : goed >= n * 0.5 ? "Je bent op weg. Kijk je fouten na en speel nog een ronde." : "Lees de uitleg bij je fouten rustig door en probeer het opnieuw.";
      el.innerHTML = `<p class="score">${goed}/${n}</p><p class="score-sub">${tekst}${best ? ` Je record was ${Math.min(best, n)}.` : ""}</p>
        <div class="bar"><i style="width:${Math.round((goed / n) * 100)}%"></i></div>${cfg.na ? cfg.na(fouten, goed, n) : ""}
        <button class="btn primary big nl-weer">Nog een ronde</button>`;
      el.querySelector(".nl-weer").onclick = start;
      if (cfg.eind) cfg.eind(el);
    }
    start();
  };

  // ======================================================================
  // DROGREDEN-DETECTOR
  // ======================================================================
  const DROG = {
    persoon: ["Persoonlijke aanval", "Je valt de persoon aan in plaats van het argument."],
    gezag: ["Onjuist beroep op gezag", "Je beroept je op iemand die op dit gebied geen deskundige is."],
    cirkel: ["Cirkelredenering", "Het argument herhaalt het standpunt in andere woorden."],
    generalisatie: ["Overhaaste generalisatie", "Je trekt een algemene conclusie uit één of een paar gevallen."],
    dilemma: ["Vals dilemma", "Je doet alsof er maar twee mogelijkheden zijn."],
    hellend: ["Hellend vlak", "Je beweert zonder bewijs dat één stap onvermijdelijk op een ramp uitloopt."],
    vergelijking: ["Verkeerde vergelijking", "Je vergelijkt twee zaken die op het beslissende punt verschillen."],
    bewijslast: ["Ontduiken van de bewijslast", "Je doet alsof bewijs niet nodig is of laat de ander het tegendeel bewijzen."],
    massa: ["Beroep op de massa", "Iets zou waar zijn omdat veel mensen het vinden of doen."],
    stroman: ["Stroman", "Je valt een overdreven versie van het standpunt van de ander aan."],
    gevoel: ["Bespelen van gevoelens", "Je speelt in op angst, medelijden of ijdelheid in plaats van argumenten te geven."],
    oorzaak: ["Onjuist oorzakelijk verband", "Twee dingen gebeuren na of naast elkaar, dus het ene zou het andere veroorzaken."]
  };
  N.DROG = DROG;
  // [uitspraak, soort (null = deugdelijk), uitleg, afleiders die te dichtbij komen]
  const DROG_ITEMS = [
    ["De directeur van dat techbedrijf zegt dat AI nieuwe banen oplevert. Maar hij is steenrijk en heeft zelf nooit hoeven solliciteren, dus zijn mening kun je vergeten.", "persoon", "Of de directeur rijk is, zegt niets over de vraag of zijn bewering klopt. Het argument zelf wordt niet besproken."],
    ["Mijn buurvrouw waarschuwt voor banenverlies door AI, maar zij kan niet eens haar eigen telefoon instellen. Naar haar hoef je dus niet te luisteren.", "persoon", "De spreker maakt de buurvrouw belachelijk en gaat niet in op wat zij zegt."],
    ["Een bekende voetballer zei in een talkshow dat AI geen enkele baan zal kosten. Dan hoeven we ons dus geen zorgen te maken.", "gezag", "Een voetballer is bekend, maar geen deskundige op het gebied van de arbeidsmarkt. Zijn uitspraak bewijst dus niets.", ["massa"]],
    ["Mijn tandarts is ervan overtuigd dat de helft van de kantoorbanen verdwijnt. Hij heeft lang gestudeerd, dus het zal wel kloppen.", "gezag", "De tandarts is deskundig op het gebied van tanden, niet van werkgelegenheid. Gezag telt alleen op het eigen vakgebied."],
    ["AI is gevaarlijk voor de werkgelegenheid, want het vormt een bedreiging voor onze banen.", "cirkel", "'Gevaarlijk voor de werkgelegenheid' en 'een bedreiging voor onze banen' betekenen hetzelfde. Er wordt geen reden gegeven.", ["bewijslast"]],
    ["Omscholing werkt, omdat mensen die een cursus volgen daarna omgeschoold zijn.", "cirkel", "Het argument herhaalt de bewering. Je weet nog steeds niet of mensen na de cursus ook werk vinden.", ["bewijslast"]],
    ["Mijn neef is vertaler en krijgt sinds de komst van vertaalsoftware geen opdrachten meer. AI maakt dus iedereen werkloos.", "generalisatie", "Eén vertaler zegt niets over iedereen. Uit één geval kun je geen algemene regel afleiden.", ["oorzaak"]],
    ["In het bedrijf van mijn moeder is niemand ontslagen sinds ze AI gebruiken. Je ziet: AI kost nergens banen.", "generalisatie", "Eén bedrijf is te weinig om iets over alle bedrijven te zeggen.", ["oorzaak"]],
    ["Of we verbieden AI op de werkvloer, of over tien jaar heeft niemand meer een baan.", "dilemma", "Er zijn veel meer mogelijkheden, zoals regels maken of mensen omscholen. De spreker laat die bewust weg.", ["hellend"]],
    ["Je bent voor vooruitgang en dus voor AI, of je wilt terug naar de tijd van de typemachine.", "dilemma", "Je kunt ook voor vooruitgang zijn en toch kritische vragen stellen. Er zijn meer dan twee keuzes.", ["stroman"]],
    ["Als een chatbot de klantenservice mag doen, neemt AI daarna de administratie over, dan het management, en uiteindelijk bepalen computers alles en zijn mensen overbodig.", "hellend", "Elke volgende stap wordt als onvermijdelijk voorgesteld, zonder bewijs. Na de eerste stap kun je nog altijd stoppen of bijsturen.", ["dilemma"]],
    ["Wie leerlingen één keer een chatbot laat gebruiken, zorgt ervoor dat ze nooit meer zelf nadenken, geen diploma halen en later geen werk vinden.", "hellend", "Van één keer een chatbot gebruiken naar werkloosheid is een keten van stappen die geen van alle bewezen zijn.", ["generalisatie", "oorzaak"]],
    ["Een rekenmachine heeft wiskundeleraren ook niet overbodig gemaakt. AI zal dus geen enkel beroep overbodig maken.", "vergelijking", "Een rekenmachine kan één ding, AI kan heel veel verschillende taken uitvoeren. Op het punt waar het om gaat, verschillen ze dus.", ["generalisatie"]],
    ["AI invoeren op kantoor is hetzelfde als een wolf loslaten in een schaapskudde: je weet hoe dat afloopt.", "vergelijking", "Een wolf wil schapen opeten; software wil niets. De vergelijking klinkt krachtig, maar klopt niet op het beslissende punt.", ["gevoel", "hellend"]],
    ["Het is toch overduidelijk dat AI enorm veel banen gaat kosten? Dat hoef ik echt niet uit te leggen.", "bewijslast", "Wie iets beweert, moet het onderbouwen. 'Dat is overduidelijk' is geen argument.", ["cirkel", "massa"]],
    ["AI kost geen banen. Wie denkt van wel, moet eerst maar eens bewijzen dat ik ongelijk heb.", "bewijslast", "De spreker schuift het bewijs door naar de ander. Wie een standpunt inneemt, moet het zelf verdedigen.", ["cirkel"]],
    ["Iedereen in mijn klas denkt dat AI ons werk gaat overnemen, dus dat gaat ook gebeuren.", "massa", "Dat veel mensen iets denken, maakt het nog niet waar.", ["gezag", "generalisatie"]],
    ["Alle grote bedrijven stappen over op AI. Dan moet het wel goed zijn voor de werknemers.", "massa", "Dat veel bedrijven iets doen, bewijst niet dat het goed is voor werknemers. Bedrijven kunnen andere belangen hebben.", ["gezag", "generalisatie"]],
    ["Vakbonden vragen om regels voor AI op de werkvloer. Zij willen dus alle technologie verbieden en ons terugsturen naar de middeleeuwen.", "stroman", "Regels vragen is iets heel anders dan alles verbieden. De spreker valt een standpunt aan dat de vakbonden niet hebben.", ["dilemma", "hellend"]],
    ["Jij zegt dat AI ook kansen biedt. Jij vindt het dus prima dat mensen hun baan kwijtraken.", "stroman", "Kansen zien is niet hetzelfde als ontslagen goedkeuren. Het standpunt van de ander wordt verdraaid.", ["persoon", "dilemma"]],
    ["Denk aan de vader die na dertig jaar trouwe dienst zijn kinderen moet vertellen dat een computer zijn werk doet. Wie dan nog voor AI is, heeft geen hart.", "gevoel", "Het voorbeeld wekt medelijden op, maar bewijst niet dat AI als geheel slecht is. Wie het oneens is, wordt bovendien harteloos genoemd.", ["persoon", "generalisatie"]],
    ["Jullie zijn slimme, moderne mensen. Jullie snappen dus ook wel dat alleen ouderwetse types bang zijn voor AI.", "gevoel", "De spreker vleit het publiek. Wie het oneens is, hoort blijkbaar bij de 'ouderwetse types'. Een argument ontbreekt.", ["persoon", "massa"]],
    ["Sinds ons kantoor een AI-assistent gebruikt, is het ziekteverzuim gestegen. De AI-assistent maakt mensen dus ziek.", "oorzaak", "Dat twee dingen na elkaar gebeuren, betekent niet dat het ene het andere veroorzaakt. Er kan een heel andere oorzaak zijn, zoals een griepgolf.", ["generalisatie"]],
    ["Vorig jaar kreeg onze school sneller internet en dit jaar zijn de examencijfers hoger. Dat komt dus door het internet.", "oorzaak", "Volgorde in de tijd is nog geen oorzaak. Misschien was er een andere docent, of een makkelijker examen.", ["generalisatie"]],
    ["Een AI-programma kan een gesprek uittypen, maar geen patiënt onderzoeken. Daarom blijft de huisarts nodig, ook als de administratie wordt geautomatiseerd.", null, "Dit deugt: het voorbeeld laat zien welke taak wel en welke niet kan worden overgenomen, en de conclusie gaat niet verder dan dat voorbeeld."],
    ["Toen de computer kwam, verdwenen er beroepen, maar kwamen er ook nieuwe bij. Het is daarom aannemelijk dat AI naast verlies ook nieuw werk oplevert.", null, "Dit deugt: de vergelijking is relevant en de conclusie is voorzichtig ('aannemelijk'). Er wordt niet beweerd dat het zeker zo gaat."],
    ["Als software een deel van het werk van een afdeling overneemt, zijn er voor hetzelfde werk minder mensen nodig. Het is dus mogelijk dat er op die afdeling functies verdwijnen.", null, "Dit deugt: een logische redenering van oorzaak naar gevolg, met een voorzichtige conclusie ('mogelijk')."],
    ["Volgens de hoogleraar arbeidseconomie uit de bron verandert AI vooral de inhoud van banen. Dat past bij de zorg, waar de administratie verandert, maar het verplegen niet.", null, "Dit deugt: een hoogleraar arbeidseconomie is deskundig op precies dit gebied, en de schrijver voegt er een eigen voorbeeld aan toe."],
    ["Niet iedereen kan zich makkelijk omscholen. Daarom is het verstandig dat werkgevers op tijd scholing aanbieden.", null, "Dit deugt: het argument ondersteunt het standpunt en overdrijft niet."],
    ["Werk met vaste, herhaalde handelingen achter een computer is makkelijker te automatiseren dan werk met onverwachte situaties. Een kapper loopt daardoor minder risico dan iemand die gegevens invoert.", null, "Dit deugt: de algemene regel wordt uitgelegd en daarna toegepast op twee beroepen die echt op dat punt verschillen."]
  ];

  TW.widget("drogreden", {
    titel: "Drogreden-detector", icoon: "🕵️",
    uitleg: "Lees de redenering. Deugt ze, of zit er een drogreden in? En zo ja: welke? Let op, niet alles is een drogreden.",
    maak(el, api) {
      h.ronde(el, api, {
        naam: "drogreden",
        items() {
          const fout = shuffle(DROG_ITEMS.filter((x) => x[1])), goed = shuffle(DROG_ITEMS.filter((x) => !x[1]));
          const soorten = new Set(), kies = [];
          fout.forEach((x) => { if (kies.length < 6 && !soorten.has(x[1])) { soorten.add(x[1]); kies.push(x); } });
          return shuffle(kies.concat(goed.slice(0, 2)));
        },
        teken(it, w, klaar) {
          const soort = it[1], d = soort && DROG[soort];
          w.innerHTML = `<blockquote class="nl-quote">${esc(it[0])}</blockquote><p class="meta">Stap 1: deugt deze redenering?</p>
            <div class="two"><button class="btn good" data-k="ok">Deugt</button><button class="btn bad" data-k="drog">Drogreden</button></div><div class="nl-stap2"></div>`;
          const uit = () => (d ? `<p><b>${esc(d[0])}.</b> ${esc(d[1])}</p>` : "") + `<p>${esc(it[2])}</p>`;
          w.querySelectorAll("[data-k]").forEach((b) => (b.onclick = () => {
            w.querySelectorAll("[data-k]").forEach((k) => { k.disabled = true; }); b.classList.add("aan");
            if (b.dataset.k === "ok") return klaar(!soort, uit());
            if (!soort) return klaar(false, uit());
            const mijd = it[3] || [];
            const opties = shuffle([soort].concat(shuffle(Object.keys(DROG).filter((k) => k !== soort && !mijd.includes(k))).slice(0, 3)));
            const s2 = w.querySelector(".nl-stap2");
            s2.innerHTML = `<p class="meta">Stap 2: welke drogreden is het?</p>${opties.map((k) => `<button class="opt" data-d="${k}">${esc(DROG[k][0])}</button>`).join("")}`;
            s2.querySelectorAll("[data-d]").forEach((o) => (o.onclick = () => {
              s2.querySelectorAll("[data-d]").forEach((k) => { k.disabled = true; if (k.dataset.d === soort) k.classList.add("goed"); });
              if (o.dataset.d !== soort) o.classList.add("fout");
              klaar(o.dataset.d === soort, uit());
            }));
            s2.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }));
        },
        na(fouten) {
          const soorten = [...new Set(fouten.map((x) => x[1] || "deugt"))];
          if (!soorten.length) return `<div class="model"><b>Alle redeneringen doorzien.</b><p>Controleer straks je eigen tekst op dezelfde manier: bij elk argument vraag je je af of het echt een reden is.</p></div>`;
          return `<div class="model"><b>Nog eens bekijken</b>${soorten.map((k) => k === "deugt" ? `<p><b>Deugdelijke redenering.</b> Niet elk argument is een drogreden: een relevant voorbeeld met een voorzichtige conclusie is prima.</p>` : `<p><b>${esc(DROG[k][0])}.</b> ${esc(DROG[k][1])}</p>`).join("")}</div>`;
        }
      });
    }
  });

  // ======================================================================
  // FORMULEERDOKTER
  // ======================================================================
  // z: zin met de fout tussen [haken]; naam van de fout; opties (eerste is goed); uitleg
  const DOKTER = [
    { z: "De invloed van slimme programma's op banen [worden] vaak overschat.", n: "Incongruentie",
      o: ["De invloed van slimme programma's op banen wordt vaak overschat.", "De invloed van slimme programma's op banen werden vaak overschat.", "De invloeden van slimme programma's op banen wordt vaak overschat."],
      u: "Het onderwerp is 'de invloed' (enkelvoud), dus de persoonsvorm is ook enkelvoud: wordt. 'Programma's' en 'banen' staan er dichtbij, maar zijn niet het onderwerp." },
    { z: "Het aantal opdrachten voor vertalers [nemen] volgens de bron af.", n: "Incongruentie",
      o: ["Het aantal opdrachten voor vertalers neemt volgens de bron af.", "Het aantal opdracht voor vertalers nemen volgens de bron af.", "De aantal opdrachten voor vertalers nemen volgens de bron af."],
      u: "Het onderwerp is 'het aantal' (enkelvoud): neemt. Laat je niet afleiden door het meervoud 'opdrachten'." },
    { z: "AI kan [snel en vlug] grote hoeveelheden tekst samenvatten.", n: "Dubbelop (tautologie)",
      o: ["AI kan snel grote hoeveelheden tekst samenvatten.", "AI kan vlug en snel grote hoeveelheden tekst samenvatten.", "AI kan snel en ook vlug grote hoeveelheden tekst samenvatten."],
      u: "'Snel' en 'vlug' betekenen hetzelfde. Bij een tautologie zeg je hetzelfde twee keer met verschillende woorden. Eén woord is genoeg." },
    { z: "[Nieuwe innovaties] veranderen de arbeidsmarkt.", n: "Dubbelop (pleonasme)",
      o: ["Innovaties veranderen de arbeidsmarkt.", "Nieuwe vernieuwingen veranderen de arbeidsmarkt.", "Nieuwe innovaties verandert de arbeidsmarkt."],
      u: "Een innovatie is per definitie nieuw. Bij een pleonasme noem je een eigenschap die al in het woord zit, zoals 'witte sneeuw'." },
    { z: "[Naar mijn mening vind ik] dat scholen AI moeten toestaan.", n: "Dubbelop",
      o: ["Naar mijn mening moeten scholen AI toestaan.", "Volgens mij vind ik dat scholen AI moeten toestaan.", "Naar mijn mening denk ik dat scholen AI moeten toestaan."],
      u: "'Naar mijn mening' en 'ik vind' zeggen hetzelfde. Kies er één. In een betoog kun je ze vaak allebei weglaten: 'Scholen moeten AI toestaan.'" },
    { z: "De nieuwe software [kost erg duur].", n: "Contaminatie",
      o: ["De nieuwe software is erg duur.", "De nieuwe software kost erg duur geld.", "De nieuwe software kost heel duur."],
      u: "Twee uitdrukkingen zijn door elkaar gehaald: 'is duur' en 'kost veel'. Dat heet een contaminatie." },
    { z: "[De oorzaak van] het banenverlies [is te wijten aan] de nieuwe software.", n: "Contaminatie",
      o: ["Het banenverlies is te wijten aan de nieuwe software.", "De oorzaak van het banenverlies is te danken aan de nieuwe software.", "De oorzaak van het banenverlies is te wijten door de nieuwe software."],
      u: "Twee constructies zijn door elkaar gehaald: 'de oorzaak van iets is ...' en 'iets is te wijten aan ...'. Kies er één: 'De oorzaak van het banenverlies is de nieuwe software' of 'Het banenverlies is te wijten aan de nieuwe software'." },
    { z: "Veel mensen [beseffen zich] niet hoe snel de techniek verandert.", n: "Contaminatie",
      o: ["Veel mensen beseffen niet hoe snel de techniek verandert.", "Veel mensen beseffen zichzelf niet hoe snel de techniek verandert.", "Veel mensen realiseren niet hoe snel de techniek verandert."],
      u: "Het is 'beseffen' (zonder zich) of 'zich realiseren' (met zich). 'Zich beseffen' haalt die twee door elkaar." },
    { z: "De werknemers moeten de hele cursus [overnieuw] doen.", n: "Contaminatie",
      o: ["De werknemers moeten de hele cursus opnieuw doen.", "De werknemers moeten de hele cursus overopnieuw doen.", "De werknemers moeten de hele cursus weer overnieuw doen."],
      u: "'Overnieuw' is een mengsel van 'over' en 'opnieuw'. In een zakelijke tekst schrijf je 'opnieuw'." },
    { z: "Werkgevers moeten voorkomen dat oudere werknemers [niet] achterblijven.", n: "Dubbele ontkenning",
      o: ["Werkgevers moeten voorkomen dat oudere werknemers achterblijven.", "Werkgevers moeten niet voorkomen dat oudere werknemers niet achterblijven.", "Werkgevers moeten voorkomen dat geen oudere werknemers achterblijven."],
      u: "'Voorkomen' is al ontkennend. Met 'niet' erbij staat er het omgekeerde van wat je bedoelt. Hetzelfde gebeurt na 'verbieden', 'ontkennen' en 'verhinderen'." },
    { z: "Het bedrijf kocht nieuwe software en [werd] meteen door alle afdelingen gebruikt.", n: "Foutieve samentrekking",
      o: ["Het bedrijf kocht nieuwe software en die werd meteen door alle afdelingen gebruikt.", "Het bedrijf kocht nieuwe software en werd meteen door alle afdelingen gebruikt worden.", "Het bedrijf kocht nieuwe software en meteen door alle afdelingen gebruikt."],
      u: "Nu staat er dat het bedrijf werd gebruikt. Je mag een woord alleen weglaten als het in beide zinsdelen dezelfde functie heeft. Hier is het onderwerp van het tweede deel de software, dus dat moet erbij: 'en die werd'." },
    { z: "Zij heeft een cursus gevolgd en [nu] programmeur.", n: "Foutieve samentrekking",
      o: ["Zij heeft een cursus gevolgd en is nu programmeur.", "Zij heeft een cursus gevolgd en heeft nu programmeur.", "Zij heeft een cursus gevolgd en nu programmeur geworden."],
      u: "Het weggelaten werkwoord is 'is', maar in het eerste deel staat 'heeft'. Die zijn niet gelijk, dus je mag niet samentrekken." },
    { z: "Deskundigen verwachten dat als de techniek goedkoper wordt, [dat] meer bedrijven AI gaan gebruiken.", n: "Dat/als-fout",
      o: ["Deskundigen verwachten dat meer bedrijven AI gaan gebruiken als de techniek goedkoper wordt.", "Deskundigen verwachten dat als de techniek goedkoper wordt, dat dan meer bedrijven AI gaan gebruiken.", "Deskundigen verwachten als de techniek goedkoper wordt, dat meer bedrijven AI gaan gebruiken."],
      u: "Na 'dat als ...' wordt 'dat' ten onrechte herhaald. Oplossing: zet de bijzin met 'als' achteraan, of schrap de tweede 'dat'." },
    { z: "Het bedrijf heeft [haar] werknemers een cursus aangeboden.", n: "Verwijsfout",
      o: ["Het bedrijf heeft zijn werknemers een cursus aangeboden.", "Het bedrijf heeft hun werknemers een cursus aangeboden.", "Het bedrijf heeft hen werknemers een cursus aangeboden."],
      u: "'Het bedrijf' is een het-woord. Naar een het-woord verwijs je met 'zijn': het bedrijf en zijn werknemers." },
    { z: "De regering wil dat [hun] plannen voor omscholing snel worden uitgevoerd.", n: "Verwijsfout",
      o: ["De regering wil dat haar plannen voor omscholing snel worden uitgevoerd.", "De regering wil dat hen plannen voor omscholing snel worden uitgevoerd.", "De regering willen dat hun plannen voor omscholing snel worden uitgevoerd."],
      u: "'De regering' is enkelvoud, ook al bestaat ze uit meer mensen. Je verwijst dus met 'haar', niet met 'hun'." },
    { z: "Het programma [die] de roosters maakt, werkt foutloos.", n: "Verwijsfout",
      o: ["Het programma dat de roosters maakt, werkt foutloos.", "Het programma wat de roosters maakt, werkt foutloos.", "Het programma wie de roosters maakt, werkt foutloos."],
      u: "Naar een het-woord verwijs je met 'dat': het programma dat. Naar een de-woord met 'die': de software die." },
    { z: "[Hun] hebben de nieuwe software al getest.", n: "Verwijsfout",
      o: ["Zij hebben de nieuwe software al getest.", "Hen hebben de nieuwe software al getest.", "Hun heeft de nieuwe software al getest."],
      u: "'Hun' kan nooit onderwerp zijn. Als onderwerp gebruik je 'zij' of 'ze'." },
    { z: "AI is het beste hulpmiddel [wat] er op dit moment bestaat.", n: "Verwijsfout",
      o: ["AI is het beste hulpmiddel dat er op dit moment bestaat.", "AI is het beste hulpmiddel die er op dit moment bestaat.", "AI is het beste hulpmiddel wie er op dit moment bestaat."],
      u: "'Hulpmiddel' is een het-woord, dus 'dat'. 'Wat' gebruik je na woorden als alles, iets, niets en het enige, en na een overtreffende trap zonder zelfstandig naamwoord: 'alles wat je schrijft', 'het beste wat er is'." },
    { z: "Een computer rekent sneller [als] een mens.", n: "Als/dan-fout",
      o: ["Een computer rekent sneller dan een mens.", "Een computer rekent even sneller als een mens.", "Een computer rekent meer sneller dan een mens."],
      u: "Na een vergrotende trap (sneller, beter, meer) schrijf je 'dan'. 'Als' gebruik je bij gelijkheid: 'even snel als'." },
    { z: "De software is goedkoop en [kunnen kleine bedrijven] er ook mee werken.", n: "Foutieve inversie",
      o: ["De software is goedkoop en kleine bedrijven kunnen er ook mee werken.", "De software is goedkoop en kunnen er kleine bedrijven ook mee werken.", "De software is goedkoop en kunnen ook kleine bedrijven mee werken."],
      u: "Na 'en' begint een nieuwe hoofdzin met het onderwerp: 'en kleine bedrijven kunnen'. De persoonsvorm staat hier ten onrechte vóór het onderwerp." },
    { z: "Veel banen veranderen door AI. [Omdat computers de routinetaken overnemen.]", n: "Losstaand zinsgedeelte",
      o: ["Veel banen veranderen door AI, omdat computers de routinetaken overnemen.", "Veel banen veranderen door AI. Omdat, computers de routinetaken overnemen.", "Veel banen veranderen door AI. Want omdat computers de routinetaken overnemen."],
      u: "Een bijzin met 'omdat' kan niet los staan: hij hoort bij de hoofdzin ervoor. Maak er één zin van met een komma." },
    { z: "[Na jarenlang te zijn getest,] gebruiken de artsen het programma nu elke dag.", n: "Foutieve beknopte bijzin",
      o: ["Nadat het programma jarenlang was getest, gebruiken de artsen het nu elke dag.", "Na jarenlang getest te zijn, gebruiken de artsen het programma nu elke dag.", "Na jarenlang te zijn getest, de artsen gebruiken het programma nu elke dag."],
      u: "In een beknopte bijzin staat geen onderwerp; de lezer neemt het onderwerp van de hoofdzin. Nu staat er dus dat de artsen jarenlang zijn getest. Maak er een gewone bijzin van, met een eigen onderwerp." },
    { z: "[Door te bezuinigen op personeel,] daalden de kosten van het bedrijf.", n: "Foutieve beknopte bijzin",
      o: ["Doordat het bedrijf bezuinigde op personeel, daalden de kosten.", "Door op personeel te bezuinigen, daalden de kosten van het bedrijf.", "Door te bezuinigen op personeel, de kosten van het bedrijf daalden."],
      u: "Wie bezuinigt er? Het bedrijf, niet 'de kosten'. Het verzwegen onderwerp van de beknopte bijzin moet hetzelfde zijn als het onderwerp van de hoofdzin." },
    { z: "[Door de komst van AI zorgt ervoor] dat veel werk verandert.", n: "Ontspoorde zin",
      o: ["De komst van AI zorgt ervoor dat veel werk verandert.", "Door de komst van AI zorgt het ervoor dat veel werk veranderen.", "Door de komst van AI ervoor zorgt dat veel werk verandert."],
      u: "De zin begint met 'Door ...' en gaat verder alsof er 'De komst van AI zorgt ervoor' stond. Kies één constructie: 'De komst van AI zorgt ervoor dat ...' of 'Door de komst van AI verandert veel werk.'" },
    { z: "AI is [best wel heel erg] handig voor bedrijven.", n: "Spreektaal",
      o: ["AI is zeer nuttig voor bedrijven.", "AI is echt mega handig voor bedrijven.", "AI is best wel superhandig voor bedrijven."],
      u: "'Best wel heel erg' is spreektaal en bovendien vaag. In een zakelijke tekst kies je één precies woord: zeer, bijzonder, uiterst." },
    { z: "Bedrijven kunnen [sowieso] niet meer zonder computers [en zo].", n: "Spreektaal",
      o: ["Bedrijven kunnen in elk geval niet meer zonder computers.", "Bedrijven kunnen sowieso echt niet meer zonder computers.", "Bedrijven kunnen eigenlijk niet meer zonder computers en dat soort dingen."],
      u: "'Sowieso' en 'en zo' hoor je in een gesprek, maar ze passen niet in een betoog of beschouwing. Schrijf precies op wat je bedoelt." }
  ];

  TW.widget("formuleerdokter", {
    titel: "Formuleerdokter", icoon: "🩺",
    uitleg: "Elke zin heeft een formuleerfout. Stap 1: tik het woord aan waar het misgaat. Stap 2: kies de beste verbetering.",
    maak(el, api) {
      h.ronde(el, api, {
        naam: "dokter",
        items: () => shuffle(DOKTER).slice(0, 8),
        teken(it, w, klaar) {
          // zin in woorden; woorden tussen [haken] horen bij de fout
          const woorden = []; let in_ = false;
          it.z.split(/(\[|\])/).forEach((deel) => {
            if (deel === "[") { in_ = true; return; } if (deel === "]") { in_ = false; return; }
            deel.split(/\s+/).filter(Boolean).forEach((t) => woorden.push({ t, f: in_ }));
          });
          let pogingen = 0, raak = false;
          w.innerHTML = `<p class="meta">Stap 1: tik op het woord waar het misgaat.</p>
            <div class="nl-zin">${woorden.map((x, n) => `<button class="nl-w" data-n="${n}">${esc(x.t)}</button>`).join(" ")}</div>
            <div class="fb nl-fb"></div><div class="nl-stap2"></div>`;
          const fb = w.querySelector(".nl-fb");
          const stap2 = () => {
            w.querySelectorAll(".nl-w").forEach((b, n) => { b.disabled = true; if (woorden[n].f) b.classList.add("mark"); });
            const opties = shuffle(it.o), s2 = w.querySelector(".nl-stap2");
            s2.innerHTML = `<p class="meta">Stap 2: welke verbetering is het best?</p>${opties.map((o, n) => `<button class="opt" data-n="${n}">${esc(o)}</button>`).join("")}`;
            s2.querySelectorAll(".opt").forEach((o, n) => (o.onclick = () => {
              const juist = opties[n] === it.o[0];
              s2.querySelectorAll(".opt").forEach((k, m) => { k.disabled = true; if (opties[m] === it.o[0]) k.classList.add("goed"); });
              if (!juist) o.classList.add("fout");
              klaar(juist && raak, `<p><b>${esc(it.n)}.</b> ${esc(it.u)}</p>${juist && !raak ? "<p>De verbetering had je goed, maar de fout had je niet gevonden. Daarom telt deze als fout.</p>" : ""}`);
            }));
            s2.scrollIntoView({ block: "nearest", behavior: "smooth" });
          };
          w.querySelectorAll(".nl-w").forEach((b, n) => (b.onclick = () => {
            if (woorden[n].f) { raak = true; fb.innerHTML = `<span class="nl-ok">Gevonden.</span> De fout is gemarkeerd.`; stap2(); return; }
            pogingen++; b.classList.add("mis"); b.disabled = true;
            if (pogingen >= 2) { fb.innerHTML = `<span class="nok">Niet gevonden.</span> De fout is nu gemarkeerd.`; stap2(); }
            else fb.innerHTML = `<span class="nok">Daar zit het niet.</span> Je mag nog één keer tikken.`;
          }));
        },
        na(fouten) {
          const namen = [...new Set(fouten.map((x) => x.n))];
          return namen.length ? `<div class="model"><b>Deze fouten kwamen terug</b><p>${namen.map(esc).join(" · ")}</p><p>Zoek er straks gericht naar in je eigen tekst.</p></div>` : `<div class="model"><b>Geen fout gemist.</b><p>Lees je eigen tekst straks met dezelfde blik na: zin voor zin, van achter naar voren.</p></div>`;
        }
      });
    }
  });

  // ======================================================================
  // D/T-TRAINER
  // ======================================================================
  const PERS = ["de directeur", "mijn buurvrouw", "die monteur", "onze docent", "haar collega", "de minister", "een vertaler"];
  const MV = ["de docenten", "veel werknemers", "die bedrijven", "mijn collega's", "de onderzoekers"];
  // z: [soort, zin]. {} = het gat, {S} = een persoon (enkelvoud), {P} = meervoud.
  // soorten: hij (stam+t), ik, inv (je achter pv), jou (je is niet het onderwerp), jev (je vóór pv), gw (gebiedende wijs), vt, vtm, vd, bn [zin, goed, fout1, fout2]
  const WW = [
    { inf: "worden", stam: "word", z: [["hij", "Het werk van een vertaler {} steeds anders."], ["hij", "{S} {} volgend jaar omgeschoold."], ["ik", "Ik {} daar soms onzeker van."], ["inv", "{} je daar nu zenuwachtig van?"], ["inv", "Wat {} jij later als je klaar bent met je studie?"], ["jou", "{} je baan straks overgenomen door software?"], ["jou", "{} je broer later ook programmeur?"], ["gw", "{} niet boos als een chatbot je mail beantwoordt."], ["gw", "{} wijzer van je fouten."], ["jev", "Je {} er handiger in als je vaak oefent."]] },
    { inf: "vinden", stam: "vind", z: [["hij", "{S} {} dat AI vooral kansen biedt."], ["ik", "Ik {} die redenering niet sterk."], ["inv", "{} je dat scholen AI moeten verbieden?"], ["inv", "Waarom {} jij dat argument zo overtuigend?"], ["jou", "{} je moeder het goed dat je een chatbot gebruikt?"], ["jev", "Je {} vast wel een baan in de zorg."]] },
    { inf: "houden", stam: "houd", z: [["hij", "{S} {} de ontwikkelingen goed in de gaten."], ["jev", "Je {} zo meer tijd over voor de klant."], ["hij", "Wie zijn administratie automatiseert, {} tijd over."]] },
    { inf: "bieden", stam: "bied", z: [["hij", "De nieuwe techniek {} kansen aan mensen met een goed idee."], ["hij", "Het bedrijf {} alle medewerkers een cursus aan."], ["ik", "Ik {} mijn hulp aan."], ["inv", "{} je die klant nog een oplossing aan?"]] },
    { inf: "verbieden", stam: "verbied", z: [["hij", "De school {} het gebruik van chatbots bij toetsen."], ["inv", "{} je je leerlingen om AI te gebruiken?"], ["ik", "Ik {} niemand om de techniek te proberen."]] },
    { inf: "antwoorden", stam: "antwoord", vt: "antwoordde", vd: "geantwoord", z: [["hij", "De chatbot {} binnen een seconde op elke vraag."], ["hij", "{S} {} niet op mijn mail."], ["ik", "Ik {} altijd dezelfde dag nog."], ["inv", "{} je zelf nog op vragen van klanten?"], ["gw", "{} eerlijk op de vragen van je docent."], ["vt", "Gisteren {} {S} pas na drie uur."], ["vtm", "Vorige week {} {P} niet op de enquête."], ["vd", "{S} heeft nog steeds niet {}."]] },
    { inf: "verwachten", stam: "verwacht", vt: "verwachtte", vd: "verwacht", z: [["hij", "{S} {} dat veel taken zullen veranderen."], ["ik", "Ik {} daar weinig problemen mee."], ["gw", "{} geen wonderen van een chatbot."], ["vt", "Tien jaar geleden {} niemand dat een computer kon schrijven."], ["vtm", "Vroeger {} {P} dat robots alleen in fabrieken zouden werken."], ["vd", "Dat had {S} niet {}."], ["bn", "De {} groei van het aantal banen bleef uit.", "verwachte", "verwachtte", "verwachtde"]] },
    { inf: "besteden", stam: "besteed", vt: "besteedde", vd: "besteed", z: [["hij", "{S} {} veel tijd aan bijscholing."], ["inv", "{} je genoeg aandacht aan je spelling?"], ["gw", "{} niet te veel woorden aan je inleiding."], ["vt", "Vorig jaar {} het bedrijf veel geld aan nieuwe software."], ["vtm", "Vroeger {} {P} uren aan het uittypen van verslagen."], ["vd", "Het ziekenhuis heeft veel geld aan nieuwe software {}."], ["bn", "De {} uren krijg je niet terug.", "bestede", "besteedde", "besteede"]] },
    { inf: "vergroten", stam: "vergroot", vt: "vergrootte", vd: "vergroot", z: [["hij", "Een goede opleiding {} je kans op werk."], ["vt", "De komst van de computer {} destijds de vraag naar programmeurs."], ["vd", "Die cursus heeft haar kans op een baan {}."], ["bn", "Door de {} vraag naar technici stijgen de lonen.", "vergrote", "vergrootte", "vergroote"]] },
    { inf: "veranderen", stam: "verander", vt: "veranderde", vd: "veranderd", z: [["hij", "AI {} het werk van bijna iedereen."], ["hij", "Er {} veel op kantoor."], ["vd", "Het werk van een boekhouder is sterk {}."], ["vd", "De computer heeft het kantoorwerk voorgoed {}."], ["vt", "De uitvinding van de drukpers {} destijds de wereld."]] },
    { inf: "gebeuren", stam: "gebeur", vt: "gebeurde", vd: "gebeurd", z: [["hij", "Wat {} er met mensen van wie de functie verdwijnt?"], ["hij", "Dat {} vaker dan je denkt."], ["vd", "Zoiets is in de geschiedenis al eerder {}."], ["vd", "Wat is er met die afdeling {}?"], ["vt", "Hetzelfde {} toen de computer op kantoor kwam."]] },
    { inf: "betekenen", stam: "beteken", vt: "betekende", vd: "betekend", z: [["hij", "Dat {} niet dat alle banen verdwijnen."], ["hij", "Wat {} die ontwikkeling voor starters?"], ["vd", "De computer heeft veel {} voor de administratie."], ["vt", "De komst van de lopende band {} destijds het einde van veel handwerk."]] },
    { inf: "bepalen", stam: "bepaal", vt: "bepaalde", vd: "bepaald", z: [["hij", "De werkgever {} hoe de software wordt gebruikt."], ["vd", "Wie heeft dat eigenlijk {}?"], ["inv", "{} jij zelf hoe je het programma gebruikt?"]] },
    { inf: "verdienen", stam: "verdien", vt: "verdiende", vd: "verdiend", z: [["hij", "Wie goed met AI kan werken, {} vaak meer."], ["vd", "Het bedrijf heeft goed {} aan de nieuwe software."], ["inv", "{} je genoeg met dat bijbaantje?"]] },
    { inf: "ontwikkelen", stam: "ontwikkel", vt: "ontwikkelde", vd: "ontwikkeld", z: [["hij", "De techniek {} zich sneller dan verwacht."], ["vd", "Het programma is in Nederland {}."], ["vt", "Jaren geleden {} een klein team de eerste versie van het programma."]] },
    { inf: "verdelen", stam: "verdeel", vt: "verdeelde", vd: "verdeeld", z: [["hij", "De planner {} de taken over het team."], ["vd", "De taken zijn eerlijk over het team {}."]] },
    { inf: "verbazen", stam: "verbaas", vt: "verbaasde", vd: "verbaasd", z: [["hij", "Het {} mij dat zo weinig mensen een cursus volgen."], ["vt", "Het {} mij destijds dat niemand protesteerde."], ["vd", "Ik ben {} over de snelheid van de techniek."]] },
    { inf: "werken", stam: "werk", vt: "werkte", vd: "gewerkt", z: [["vt", "Mijn opa {} vroeger in een fabriek."], ["vtm", "Vroeger {} {P} zonder computers."], ["vd", "Mijn oma heeft jarenlang als typiste {}."], ["hij", "{S} {} sinds kort met een AI-assistent."]] },
    { inf: "gebruiken", stam: "gebruik", vt: "gebruikte", vd: "gebruikt", z: [["vtm", "Vroeger {} kantoren typemachines."], ["vd", "Het programma wordt in veel ziekenhuizen {}."], ["vt", "Tot vorig jaar {} de school geen AI."]] },
    { inf: "leren", stam: "leer", vt: "leerde", vd: "geleerd", z: [["vt", "Op de basisschool {} ik nog schrijven met een vulpen."], ["vd", "Wat heb je van die fout {}?"], ["hij", "{S} {} programmeren in de avonduren."]] },
    { inf: "verhuizen", stam: "verhuis", vt: "verhuisde", vd: "verhuisd", z: [["vt", "Het callcenter {} vorig jaar naar het buitenland."], ["vd", "Veel fabriekswerk is naar andere landen {}."], ["hij", "De afdeling {} volgende maand naar een kleiner kantoor."]] },
    { inf: "beloven", stam: "beloof", vt: "beloofde", vd: "beloofd", z: [["vt", "De directeur {} toen dat niemand ontslagen zou worden."], ["vd", "Dat is ons vorig jaar al {}."], ["hij", "De minister {} extra geld voor omscholing."]] },
    { inf: "stoppen", stam: "stop", vt: "stopte", vd: "gestopt", z: [["vt", "De fabriek {} met de nachtdienst toen de robots kwamen."], ["vd", "Het bedrijf is met die afdeling {}."], ["vtm", "Vorig jaar {} {P} met het project."]] },
    { inf: "zetten", stam: "zet", vt: "zette", vd: "gezet", z: [["hij", "Het bedrijf {} AI in bij de klantenservice."], ["vt", "Vorig jaar {} het ziekenhuis een chatbot in voor afspraken."], ["vd", "De eerste stap is {}."]] },
    { inf: "praten", stam: "praat", vt: "praatte", vd: "gepraat", z: [["vt", "{S} {} gisteren een uur met de chatbot."], ["vtm", "Vorige week {} de leerlingen in de les over AI."], ["vd", "Daarover is al genoeg {}."]] },
    { inf: "testen", stam: "test", vt: "testte", vd: "getest", z: [["vt", "Vorig jaar {} het ziekenhuis de software uitgebreid."], ["vtm", "De artsen {} het programma vorig jaar."], ["vd", "De software is uitgebreid {}."]] },
    { inf: "melden", stam: "meld", vt: "meldde", vd: "gemeld", z: [["vt", "De krant {} gisteren dat het bedrijf gaat reorganiseren."], ["vd", "Dat is nog niet bij de directie {}."], ["hij", "{S} {} zich aan voor een cursus."]] },
    { inf: "trainen", stam: "train", vt: "trainde", vd: "getraind", z: [["vd", "Het model is met enorme hoeveelheden tekst {}."], ["hij", "Het bedrijf {} zijn personeel in het gebruik van AI."], ["vt", "Vorig jaar {} de school alle docenten."]] },
    { inf: "downloaden", stam: "download", vt: "downloadde", vd: "gedownload", z: [["hij", "{S} {} het programma meteen."], ["vd", "Heb je de app al {}?"], ["vt", "Gisteren {} ik de nieuwe versie."]] },
    { inf: "updaten", stam: "update", vd: "geüpdatet", z: [["hij", "Het bedrijf {} de software elke maand."], ["vd", "De app is gisteren {}.", "geüpdatet", "geüpdated", "geüpdate"]] },
    { inf: "worden", stam: "word", z: [["vast", "Het typewerk {} vroeger door een aparte afdeling gedaan.", "werd", "werdt", "wert", "De verleden tijd van worden is werd. Achter een sterke verleden tijd komt in het enkelvoud nooit een t."], ["vast", "Het bedrijf {} vorig jaar overgenomen.", "werd", "werdt", "word", "Vorig jaar: verleden tijd. Worden, werd, geworden: 'werd' krijgt geen t."]] },
    { inf: "vinden", stam: "vind", z: [["vast", "Mijn oma {} het werk als typiste erg leuk.", "vond", "vondt", "vont", "Verleden tijd van vinden: vond. Een sterke verleden tijd krijgt in het enkelvoud geen t erbij."]] },
    { inf: "houden", stam: "houd", z: [["vast", "De directeur {} vorige week een toespraak over AI.", "hield", "hieldt", "hielt", "Verleden tijd van houden: hield. Geen t erachter, ook niet bij hij of zij."]] }
  ];
  N.WW = WW;
  const KOF = ["t", "k", "f", "s", "ch", "p", "x"];
  const DT_SOORT = { hij: "stam + t", ik: "ik-vorm", inv: "je achter de persoonsvorm", jou: "je is niet het onderwerp", jev: "je vóór de persoonsvorm", gw: "gebiedende wijs", vt: "verleden tijd enkelvoud", vtm: "verleden tijd meervoud", vd: "voltooid deelwoord", bn: "bijvoeglijk gebruikt", vast: "sterk werkwoord" };
  const uniek = (a) => [...new Set(a)];
  function kofLetter(inf) { const s = inf.slice(0, -2); return s.endsWith("ch") ? "ch" : s.slice(-1); }
  // Maakt van een werkwoord + zin een opgave: { zin, inf, goed, opties, uitleg, soort }
  N.dtOpgave = function (v, z) {
    const soort = z[0], stam = v.stam, hij = stam.endsWith("t") ? stam : stam + "t";
    const laatste = stam.slice(-1);
    const stamVar = () => laatste === "d" ? [stam, stam + "t", stam.slice(0, -1) + "t"] : laatste === "t" ? [stam, stam + "t", stam.slice(0, -1) + "d"] : [stam, stam + "t", stam + "d"];
    let goed, fout, uitleg;
    const letter = kofLetter(v.inf), inKof = KOF.includes(letter);
    const kofTekst = `Haal -en van ${v.inf} af: de laatste letter is dan '${letter}'. Die zit ${inKof ? "wel" : "niet"} in 't kofschip`;
    if (soort === "hij" || soort === "jou" || soort === "jev") {
      goed = hij; fout = stamVar().filter((x) => x !== hij);
      const regel = soort === "jou" ? "Let op: 'je' is hier niet het onderwerp. Je kunt het vervangen door 'jouw' of 'jou', niet door 'jij'. Het onderwerp staat in de derde persoon, dus stam + t."
        : soort === "jev" ? "'Je' is het onderwerp en staat vóór de persoonsvorm: stam + t." : "Het onderwerp is derde persoon enkelvoud (je kunt het vervangen door hij, zij of het), tegenwoordige tijd: stam + t.";
      uitleg = `${regel} De stam van ${v.inf} is '${stam}'${stam.endsWith("t") ? ". Die eindigt al op een t, dus er komt geen tweede t bij" : ""}: ${hij}.`;
    } else if (soort === "ik" || soort === "inv" || soort === "gw") {
      goed = stam; fout = stamVar().filter((x) => x !== stam);
      uitleg = (soort === "ik" ? "Bij 'ik' schrijf je alleen de stam." : soort === "inv" ? "'Je' of 'jij' is het onderwerp en staat achter de persoonsvorm: dan schrijf je alleen de stam. Controle met lopen: 'loop je', niet 'loopt je'." : "Dit is een gebiedende wijs (een opdracht of advies zonder onderwerp): alleen de stam.") + ` De stam van ${v.inf} is '${stam}'.`;
    } else if (soort === "vt" || soort === "vtm") {
      const uitg = inKof ? "te" : "de", ander = inKof ? "de" : "te", n = soort === "vtm" ? "n" : "";
      goed = v.vt + n;
      const infStam = v.inf.slice(0, -2);
      const f2 = laatste === "d" || laatste === "t" ? stam + "e" : (infStam !== stam && /[zv]$/.test(infStam) ? infStam + "de" : stam + uitg.charAt(0) + uitg);
      fout = [stam + ander + n, f2 + n];
      uitleg = `Verleden tijd van een zwak werkwoord. ${kofTekst}, dus stam + ${uitg}${n}: ${stam} + ${uitg}${n} = ${goed}.${laatste === "d" || laatste === "t" ? " De dubbele letter hoor je niet, maar je schrijft hem wel." : ""}${soort === "vtm" && goed !== v.inf ? ` '${v.inf}' is de tegenwoordige tijd.` : ""}`;
    } else if (soort === "vd") {
      goed = z[2] || v.vd;
      fout = z[2] ? [z[3], z[4]] : (goed.endsWith("d") ? [goed.slice(0, -1) + "t", goed + "t"] : [goed.slice(0, -1) + "d", goed.slice(0, -1) + "dt"]);
      uitleg = z[2] ? "Updaten wordt vervoegd als een gewoon Nederlands werkwoord. De stam is 'update'; de t van updaten zit in 't kofschip, dus het voltooid deelwoord eindigt op een t: ge + update + t = geüpdatet. Het trema voorkomt dat je 'geu' leest."
        : `Na een hulpwerkwoord (hebben, zijn, worden) staat het voltooid deelwoord. ${kofTekst}, dus het voltooid deelwoord eindigt op een ${inKof ? "t" : "d"}: ${goed}. Een voltooid deelwoord eindigt nooit op -dt.`;
    } else { // bn, vast: [soort, zin, goed, fout1, fout2, uitleg]
      goed = z[2]; fout = [z[3], z[4]];
      uitleg = z[5] || `Het voltooid deelwoord staat hier vóór een zelfstandig naamwoord en wordt gebruikt als bijvoeglijk naamwoord. Dan schrijf je het zo kort mogelijk: ${goed}. '${z[3]}' is de verleden tijd van ${v.inf}.`;
    }
    let zin = z[1];
    if (zin.includes("{S}")) { const p = h.kies(PERS); zin = zin.replace("{S}", zin.startsWith("{S}") ? h.hoofd(p) : p); }
    if (zin.includes("{P}")) { const p = h.kies(MV); zin = zin.replace("{P}", zin.startsWith("{P}") ? h.hoofd(p) : p); }
    const begin = zin.startsWith("{}");
    const vorm = (x) => (begin ? h.hoofd(x) : x);
    const tijd = ["vt", "vtm", "vast"].includes(soort) ? "verleden tijd" : ["hij", "ik", "inv", "jou", "jev"].includes(soort) ? "tegenwoordige tijd" : "";
    return { zin, inf: v.inf, soort, tijd, goed: vorm(goed), opties: uniek([goed].concat(fout)).map(vorm), uitleg };
  };

  TW.widget("dt", {
    titel: "d/t-trainer", icoon: "🎯",
    uitleg: "Vul de juiste vorm van het werkwoord in. De zinnen zijn elke ronde anders en je zwakke plekken komen vaker terug.",
    maak(el, api) {
      let typen = h.lees("dt:typen", false);
      const stat = () => h.lees("dt", {});
      const alle = WW.flatMap((v) => v.z.map((z) => ({ v, z })));
      function kiesLijst(n) {
        const s = stat(), soorten = Object.keys(DT_SOORT), gekozen = [], gebruikt = new Set();
        const BASIS = { hij: 3, ik: 1.5, inv: 2.5, jou: 1.5, jev: 1, gw: 1, vt: 2.5, vtm: 1.5, vd: 3, bn: 1, vast: 1 };
        const gewicht = (k) => { const r = s[k]; return BASIS[k] * (!r || r[1] < 2 ? 1 : 0.5 + 2.5 * (1 - r[0] / r[1])); };
        let wacht = 0;
        while (gekozen.length < n && wacht++ < 400) {
          let tot = soorten.reduce((a, k) => a + gewicht(k), 0), r = Math.random() * tot, soort = soorten[0];
          for (const k of soorten) { r -= gewicht(k); if (r <= 0) { soort = k; break; } }
          const pool = alle.filter((x, i) => x.z[0] === soort && !gebruikt.has(i));
          if (!pool.length) continue;
          const x = h.kies(pool); gebruikt.add(alle.indexOf(x)); gekozen.push(N.dtOpgave(x.v, x.z));
        }
        return gekozen;
      }
      const profiel = () => {
        const s = stat(), rijen = Object.keys(DT_SOORT).filter((k) => s[k] && s[k][1]);
        if (!rijen.length) return "";
        return `<div class="nl-profiel"><b>Jouw d/t-profiel</b>${rijen.map((k) => { const p = Math.round((s[k][0] / s[k][1]) * 100); return `<div><span>${DT_SOORT[k]}</span><div class="bar"><i class="${p < 60 ? "zwak" : ""}" style="width:${p}%"></i></div><em>${s[k][0]}/${s[k][1]}</em></div>`; }).join("")}</div>`;
      };
      el.innerHTML = `<div class="keuze nl-modus"><button class="btn" data-m="0">Kies de vorm</button><button class="btn" data-m="1">Typ de vorm</button></div><div class="nl-lijf"></div>`;
      const lijf = el.querySelector(".nl-lijf");
      const zetModus = () => el.querySelectorAll("[data-m]").forEach((b) => b.classList.toggle("aan", (b.dataset.m === "1") === typen));
      function start() {
        zetModus();
        h.ronde(lijf, api, {
          naam: "dt",
          items: () => kiesLijst(10),
          teken(it, w, klaar) {
            const delen = it.zin.split("{}");
            const zin = (inv) => `${esc(delen[0])}<span class="nl-gat">${inv}</span>${esc(delen[1] || "")}`;
            const af = (juist, inv) => {
              const s = stat(), r = s[it.soort] || [0, 0]; r[1]++; if (juist) r[0]++; s[it.soort] = r; h.schrijf("dt", s);
              w.querySelector(".nl-dtzin").innerHTML = zin(`<b class="${juist ? "nl-ok" : "nok"}">${esc(inv)}</b>`);
              klaar(juist, `<div class="antw">Goed is: <b>${esc(it.goed)}</b> <span class="soort">${DT_SOORT[it.soort]}</span></div><p>${esc(it.uitleg)}</p>`);
            };
            w.innerHTML = `<p class="nl-dtzin">${zin("&nbsp;…&nbsp;")}</p><p class="meta">Werkwoord: <b>${esc(it.inf)}</b>${typen && it.tijd ? " · " + it.tijd : ""}</p><div class="nl-antw"></div>`;
            const a = w.querySelector(".nl-antw");
            if (typen) {
              a.innerHTML = `<div class="invoer"><input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Typ de vorm" aria-label="Typ de vorm"><button class="btn primary">Controleer</button></div>`;
              const inp = a.querySelector("input"), chk = () => {
                const inv = inp.value.trim(); if (!inv) return;
                inp.disabled = true; a.querySelector("button").disabled = true;
                af(inv.toLowerCase() === it.goed.toLowerCase(), inv);
              };
              a.querySelector("button").onclick = chk; inp.onkeydown = (e) => { if (e.key === "Enter") chk(); };
            } else {
              const opties = shuffle(it.opties);
              a.innerHTML = `<div class="nl-dtopties">${opties.map((o, n) => `<button class="btn" data-n="${n}">${esc(o)}</button>`).join("")}</div>`;
              a.querySelectorAll("button").forEach((b, n) => (b.onclick = () => {
                a.querySelectorAll("button").forEach((k, m) => { k.disabled = true; if (opties[m] === it.goed) k.classList.add("good"); });
                if (opties[n] !== it.goed) b.classList.add("bad");
                af(opties[n] === it.goed, opties[n]);
              }));
            }
          },
          na: () => profiel() + `<p class="meta">Rood in je profiel? Die soort krijg je de volgende ronde vaker.</p>`
        });
      }
      el.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => { typen = b.dataset.m === "1"; h.schrijf("dt:typen", typen); start(); }));
      start();
    }
  });

  // ======================================================================
  // SIGNAALSPRINT
  // ======================================================================
  // [zin met *signaalwoord*, verband]
  const SPRINT = [
    ["AI kan teksten schrijven. *Daarnaast* kan het beelden maken.", "opsomming"],
    ["*Bovendien* is de software goedkoper dan een extra medewerker.", "opsomming"],
    ["*Ten slotte* speelt ook het onderwijs een rol.", "opsomming"],
    ["*Ten eerste* neemt AI vooral routinewerk over.", "opsomming"],
    ["De techniek is er al. *Toch* gebruiken weinig kleine bedrijven haar.", "tegenstelling"],
    ["Vertalers krijgen minder werk. Loodgieters *daarentegen* merken weinig van AI.", "tegenstelling"],
    ["*Hoewel* de software snel is, maakt ze ook fouten.", "tegenstelling"],
    ["Sommige banen verdwijnen. Er komen *echter* ook banen bij.", "tegenstelling"],
    ["*Doordat* software de planning overneemt, houden verpleegkundigen tijd over.", "oorzaak"],
    ["De computer deed het typewerk. *Daardoor* verdween het beroep van typiste.", "oorzaak"],
    ["De vraag naar technici stijgt, *waardoor* de lonen omhooggaan.", "oorzaak"],
    ["*Als gevolg van* de vergrijzing zijn er te weinig verpleegkundigen.", "oorzaak"],
    ["Scholen moeten AI toestaan, *want* leerlingen gebruiken het later ook.", "reden"],
    ["Ik kies voor een betoog, *omdat* ik een duidelijke mening heb.", "reden"],
    ["*Aangezien* de techniek niet meer verdwijnt, kun je er beter mee leren werken.", "reden"],
    ["Een verbod werkt niet. Thuis gebruikt *immers* iedereen de techniek.", "reden"],
    ["AI neemt routinetaken over, *bijvoorbeeld* het inplannen van afspraken.", "toelichting"],
    ["Sommige beroepen veranderen weinig, *zoals* kapper en loodgieter.", "toelichting"],
    ["*Denk aan* de typiste: dat beroep bestaat bijna niet meer.", "toelichting"],
    ["*Als* bedrijven op tijd scholing aanbieden, hoeft niemand achter te blijven.", "voorwaarde"],
    ["AI is een goede hulp, *mits* een mens het resultaat controleert.", "voorwaarde"],
    ["De functie verdwijnt, *tenzij* de werknemer er nieuwe taken bij krijgt.", "voorwaarde"],
    ["*Indien* de kosten dalen, stappen meer bedrijven over.", "voorwaarde"],
    ["*Net als* de computer zal AI het werk veranderen.", "vergelijking"],
    ["*Vergeleken met* tien jaar geleden is de techniek veel beter.", "vergelijking"],
    ["Monteurs houden hun werk. *Hetzelfde geldt voor* kappers.", "vergelijking"],
    ["AI maakt fouten. Er blijft *dus* controle door mensen nodig.", "conclusie"],
    ["*Hieruit volgt* dat niet elk beroep even kwetsbaar is.", "conclusie"],
    ["*Dat betekent dat* omscholing steeds belangrijker wordt.", "conclusie"],
    ["*Kortom*, AI verandert het werk, maar laat het niet verdwijnen.", "samenvatting"],
    ["*Samengevat* zijn er drie redenen om niet bang te zijn.", "samenvatting"],
    ["Bedrijven gebruiken AI *om* kosten *te* besparen.", "doel"],
    ["*Door middel van* cursussen bereidt het bedrijf zijn personeel voor.", "doel"],
    ["*Met behulp van* een chatbot beantwoordt de winkel vragen sneller.", "doel"],
    ["De school geeft les over AI, *opdat* leerlingen er verstandig mee omgaan.", "doel"],
    ["*Vroeger* typte een aparte afdeling alle brieven.", "tijd"],
    ["*Nadat* de software was getest, ging het hele ziekenhuis ermee werken.", "tijd"],
    ["Eerst kwam de computer. *Daarna* volgde het internet.", "tijd"],
    ["*Sinds* de komst van chatbots is de klantenservice veranderd.", "tijd"]
  ];
  const MIJD = { conclusie: ["samenvatting", "reden", "oorzaak"], samenvatting: ["conclusie"], reden: ["oorzaak", "conclusie"], oorzaak: ["reden", "doel", "conclusie"], doel: ["oorzaak", "reden"], tijd: ["voorwaarde"], voorwaarde: ["tijd"] };
  const spZin = (s) => esc(s).replace(/\*(.+?)\*/g, '<mark class="nl-sig">$1</mark>');

  TW.widget("sprint", {
    titel: "Signaalsprint", icoon: "⚡",
    uitleg: "Welk verband geeft het gemarkeerde signaalwoord aan? Kies de sprint (60 seconden, zo veel mogelijk goed) of oefen rustig met uitleg.",
    maak(el, api) {
      let timer = null;
      api.opruimen(() => clearInterval(timer));
      const opties = (v) => shuffle([v].concat(shuffle(N.VERBANDEN.map((x) => x.id).filter((k) => k !== v && !(MIJD[v] || []).includes(k))).slice(0, 3)));
      function menu() {
        clearInterval(timer);
        const best = h.lees("best:sprint", 0);
        el.innerHTML = `<div class="two"><button class="btn primary" data-m="sprint">⚡ Sprint 60 s</button><button class="btn" data-m="rustig">🧘 Rustig oefenen</button></div>${best ? `<p class="meta">Je sprintrecord: ${best} goed.</p>` : ""}
          <div class="nl-legenda">${N.VERBANDEN.map((v, n) => `<span class="nl-v nl-v${n}">${esc(v.naam)}</span>`).join("")}</div>`;
        el.querySelector('[data-m="sprint"]').onclick = sprint;
        el.querySelector('[data-m="rustig"]').onclick = rustig;
      }
      function rustig() {
        h.ronde(el, api, {
          naam: "rustig", items: () => shuffle(SPRINT).slice(0, 10),
          teken(it, w, klaar) {
            const o = opties(it[1]);
            w.innerHTML = `<p class="nl-spzin">${spZin(it[0])}</p><div class="nl-grid2">${o.map((k) => `<button class="btn" data-k="${k}">${esc(N.verband(k).naam)}</button>`).join("")}</div>`;
            w.querySelectorAll("[data-k]").forEach((b) => (b.onclick = () => {
              w.querySelectorAll("[data-k]").forEach((k) => { k.disabled = true; if (k.dataset.k === it[1]) k.classList.add("good"); });
              if (b.dataset.k !== it[1]) b.classList.add("bad");
              const v = N.verband(it[1]);
              klaar(b.dataset.k === it[1], `<p>Dit signaalwoord geeft een <b>${esc(v.naam)}</b> aan. Andere woorden voor dit verband: ${v.w.slice(0, 6).map(esc).join(", ")}.</p>`);
            }));
          },
          na: () => `<button class="btn big" id="nl-terug">Terug naar het menu</button>`,
          eind: (e) => { e.querySelector("#nl-terug").onclick = menu; }
        });
      }
      function sprint() {
        let rij = shuffle(SPRINT), i = 0, goed = 0, tijd = 60, bezig = true; const fouten = [];
        el.innerHTML = `<div class="nl-kop"><span id="nl-tijd">60 s</span><span id="nl-score">0 goed</span></div><div class="bar"><i id="nl-balk" style="width:100%"></i></div><div class="nl-item"></div>`;
        const item = el.querySelector(".nl-item");
        const stop = () => {
          bezig = false; clearInterval(timer); api.klaar();
          const best = h.lees("best:sprint", 0); if (goed > best) h.schrijf("best:sprint", goed);
          el.innerHTML = `<p class="score">${goed}</p><p class="score-sub">goed in 60 seconden${goed > best && best ? " · nieuw record!" : best ? ` · record: ${best}` : ""}</p>
            ${fouten.length ? `<div class="model"><b>Deze had je fout</b>${fouten.map((f) => `<p>${spZin(f[0])}<br><span class="meta">→ ${esc(N.verband(f[1]).naam)}</span></p>`).join("")}</div>` : `<div class="model"><b>Geen enkele fout.</b></div>`}
            <div class="two"><button class="btn primary" id="nl-weer">Nog een sprint</button><button class="btn" id="nl-menu">Menu</button></div>`;
          el.querySelector("#nl-weer").onclick = sprint; el.querySelector("#nl-menu").onclick = menu;
        };
        const toon = () => {
          if (i >= rij.length) { rij = shuffle(SPRINT); i = 0; }
          const it = rij[i], o = opties(it[1]);
          item.innerHTML = `<p class="nl-spzin">${spZin(it[0])}</p><div class="nl-grid2">${o.map((k) => `<button class="btn" data-k="${k}">${esc(N.verband(k).naam)}</button>`).join("")}</div>`;
          item.querySelectorAll("[data-k]").forEach((b) => (b.onclick = () => {
            if (!bezig) return;
            const juist = b.dataset.k === it[1];
            item.querySelectorAll("[data-k]").forEach((k) => { k.disabled = true; if (k.dataset.k === it[1]) k.classList.add("good"); });
            if (juist) goed++; else { b.classList.add("bad"); fouten.push(it); }
            el.querySelector("#nl-score").textContent = goed + " goed";
            i++; setTimeout(() => { if (bezig) toon(); }, juist ? 350 : 1300);
          }));
        };
        clearInterval(timer);
        timer = setInterval(() => {
          tijd--; const t = el.querySelector("#nl-tijd"); if (!t) { clearInterval(timer); return; }
          t.textContent = tijd + " s"; el.querySelector("#nl-balk").style.width = (tijd / 60) * 100 + "%";
          if (tijd <= 0) stop();
        }, 1000);
        toon();
      }
      menu();
    }
  });

  // ======================================================================
  // KOMMAZETTER
  // ======================================================================
  // "|" achter een woord = daar hoort een komma. "~" = een komma mag, maar hoeft niet.
  const KOMMA = [
    ["Wie zich niet bijschoolt| loopt een groter risico.", "Tussen twee persoonsvormen (bijschoolt, loopt) zet je een komma."],
    ["Als AI de administratie overneemt| houden artsen meer tijd over.", "De bijzin staat vooraan. Waar bijzin en hoofdzin elkaar raken, staan twee persoonsvormen naast elkaar: daar komt een komma."],
    ["De techniek is er al| maar veel bedrijven gebruiken haar nog niet.", "Vóór 'maar' zet je een komma als er een nieuwe zin met een eigen persoonsvorm volgt."],
    ["Vertalers| juristen en programmeurs merken de gevolgen nu al.", "In een opsomming staan komma's tussen de delen, maar niet vóór 'en'."],
    ["Mijn buurman| een ervaren vertaler| krijgt steeds minder opdrachten.", "'Een ervaren vertaler' is een bijstelling: extra informatie over de buurman. Die zet je tussen twee komma's."],
    ["De software die de roosters maakt| werkt foutloos.", "Geen komma na 'software': de bijzin zegt over welke software het gaat en is dus onmisbaar. Wel een komma tussen de persoonsvormen 'maakt' en 'werkt'."],
    ["Onze directeur| die zelf nooit programmeert| wil overal AI gebruiken.", "De bijzin geeft extra informatie die je kunt weglaten (er is maar één directeur). Zo'n uitbreidende bijzin staat tussen komma's."],
    ["Het is duidelijk dat AI het werk verandert.", "Geen komma. Vóór 'dat' zet je geen komma als de bijzin het onderwerp of lijdend voorwerp van de zin is."],
    ["Hoewel de software snel is| maakt ze nog veel fouten.", "Bijzin vooraan, dus een komma op de grens van bijzin en hoofdzin (tussen 'is' en 'maakt')."],
    ["Scholen moeten AI toestaan| want leerlingen gebruiken het later ook.", "Vóór 'want' komt een komma: er begint een nieuwe hoofdzin."],
    ["Kortom| AI verandert het werk| maar laat het niet verdwijnen.", "Na een los signaalwoord vooraan (Kortom) komt een komma, en ook vóór 'maar'."],
    ["Omdat de vraag naar technici stijgt| gaan de lonen omhoog.", "Bijzin vooraan: komma tussen de twee persoonsvormen 'stijgt' en 'gaan'."],
    ["Zij volgde een cursus~ omdat haar functie zou verdwijnen.", "Staat de bijzin met 'omdat' achteraan, dan is de komma niet verplicht. Je mag hem zetten als je een pauze hoort; zonder komma is ook goed."],
    ["Het bedrijf dat de software maakt| zoekt nieuwe medewerkers.", "Geen komma na 'bedrijf' (de bijzin is onmisbaar), wel tussen de persoonsvormen 'maakt' en 'zoekt'."],
    ["Volgens de onderzoeker verandert vooral het werk op kantoor.", "Geen komma. Na een korte bepaling vooraan ('Volgens de onderzoeker') volgt meteen de persoonsvorm."],
    ["AI kan schrijven| vertalen| samenvatten en programmeren.", "Opsomming: komma's tussen de delen, geen komma vóór 'en'."],
    ["De vakbond| die al jaren waarschuwt| krijgt nu gelijk.", "Extra informatie over de vakbond die je kunt weglaten: tussen twee komma's."],
    ["Toen de computer op kantoor kwam| verdween het beroep van typiste.", "Bijzin vooraan: komma tussen 'kwam' en 'verdween'."]
  ];

  TW.widget("komma", {
    titel: "Kommazetter", icoon: "✒️",
    uitleg: "Tik op elk woord waarachter een komma hoort. Nog een keer tikken haalt de komma weg. Let op: soms hoort er geen enkele komma.",
    maak(el, api) {
      h.ronde(el, api, {
        naam: "komma", items: () => shuffle(KOMMA).slice(0, 8),
        teken(it, w, klaar) {
          const tok = it[0].split(" ").map((t) => ({ moet: t.endsWith("|"), mag: t.endsWith("~"), t: t.replace(/[|~]$/, ""), aan: false }));
          const nodig = tok.filter((x) => x.moet).length;
          w.innerHTML = `<div class="nl-zin komma">${tok.map((x, n) => `<button class="nl-w" data-n="${n}" ${n === tok.length - 1 ? "disabled" : ""}>${esc(x.t)}<i></i></button>`).join(" ")}</div>
            <button class="btn primary big">Controleer</button>`;
          const knoppen = [...w.querySelectorAll(".nl-w")];
          knoppen.forEach((b, n) => (b.onclick = () => { tok[n].aan = !tok[n].aan; b.classList.toggle("komma", tok[n].aan); }));
          w.querySelector(".big").onclick = (e) => {
            const juist = tok.every((x) => x.mag || x.aan === x.moet);
            knoppen.forEach((b, n) => {
              b.disabled = true; const x = tok[n];
              if (x.moet) b.classList.add("komma", x.aan ? "raak" : "gemist");
              else if (x.aan && !x.mag) b.classList.add("teveel");
            });
            e.target.remove();
            klaar(juist, `<p>${esc(it[1])}</p><p class="meta">${nodig ? `Verplichte komma's: ${nodig}.` : "In deze zin hoort geen komma."} Groen = goed gezet, oranje omlijnd = gemist, rood = hoort er niet.</p>`);
          };
        }
      });
    }
  });
})();
