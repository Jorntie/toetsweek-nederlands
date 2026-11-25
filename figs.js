// Figuren (inline SVG of opgemaakte blokken). TW.fig(naam, (quiz) => html); bij quiz = true weglaten wat het antwoord verklapt.
(function () {
  "use strict";

  // Drie tekstsoorten op een lijn: hoeveel eigen mening?
  TW.fig("spectrum", () => `<svg class="fig" viewBox="0 0 340 150" role="img" aria-label="Uiteenzetting, beschouwing en betoog op een lijn van weinig naar veel eigen mening">
    <rect x="4" y="6" width="106" height="72" rx="10" class="cel"/>
    <rect x="117" y="6" width="106" height="72" rx="10" class="cel"/>
    <rect x="230" y="6" width="106" height="72" rx="10" class="cel"/>
    <rect x="117" y="6" width="106" height="72" rx="10" class="vlak"/>
    <rect x="230" y="6" width="106" height="72" rx="10" class="vlak"/><rect x="230" y="6" width="106" height="72" rx="10" class="vlak"/>
    <text x="57" y="28" text-anchor="middle" class="b">Uiteenzetting</text>
    <text x="57" y="46" text-anchor="middle" class="k">informeren</text>
    <text x="57" y="64" text-anchor="middle" class="k">‘zo zit het’</text>
    <text x="170" y="28" text-anchor="middle" class="b">Beschouwing</text>
    <text x="170" y="46" text-anchor="middle" class="k">laten nadenken</text>
    <text x="170" y="64" text-anchor="middle" class="k">‘oordeel zelf’</text>
    <text x="283" y="28" text-anchor="middle" class="b">Betoog</text>
    <text x="283" y="46" text-anchor="middle" class="k">overtuigen</text>
    <text x="283" y="64" text-anchor="middle" class="k">‘ik heb gelijk’</text>
    <line x1="10" y1="104" x2="322" y2="104" class="s"/><path d="M322 98 L334 104 L322 110 Z" class="dot"/>
    <text x="170" y="97" text-anchor="middle" class="k b">eigen mening van de schrijver</text>
    <text x="57" y="122" text-anchor="middle" class="k">geen</text>
    <text x="170" y="122" text-anchor="middle" class="k">voorzichtig, in het slot</text>
    <text x="283" y="122" text-anchor="middle" class="k">vanaf de inleiding</text>
    <text x="57" y="140" text-anchor="middle" class="k pa">vraag: hoe zit het?</text>
    <text x="170" y="140" text-anchor="middle" class="k pa">open hoofdvraag</text>
    <text x="283" y="140" text-anchor="middle" class="k pa">stelling</text>
  </svg>`);

  // Bouwtekening van betoog en beschouwing naast elkaar
  TW.fig("skelet", () => `<div class="nl-skelet" role="img" aria-label="Opbouw van een betoog naast de opbouw van een beschouwing">
    <div><h4>Betoog</h4>
      <span class="nl-blok inl">Inleiding<small>aanleiding + <b>stelling</b></small></span>
      <span class="nl-blok">Argument 1</span><span class="nl-blok">Argument 2</span><span class="nl-blok">Argument 3<small>sterkste achteraan</small></span>
      <span class="nl-blok tegen">Tegenargument<small>+ weerlegging</small></span>
      <span class="nl-blok slot">Slot<small>standpunt herhalen</small></span></div>
    <div><h4>Beschouwing</h4>
      <span class="nl-blok inl">Inleiding<small>aanleiding + <b>hoofdvraag</b></small></span>
      <span class="nl-blok">Kant 1<small>visie + argumenten</small></span><span class="nl-blok">Kant 2<small>visie + argumenten</small></span>
      <span class="nl-blok">Verdieping<small>waar hangt het van af?</small></span>
      <span class="nl-blok tegen">Afweging<small>wat weegt het zwaarst?</small></span>
      <span class="nl-blok slot">Slot<small>voorzichtige conclusie</small></span></div>
  </div>`);

  // Inleiding, middenstuk, slot met het aandeel in het aantal woorden
  TW.fig("opbouw", () => `<div class="nl-opbouw" role="img" aria-label="Opbouw van een tekst: titel, inleiding, middenstuk en slot met het aandeel in het aantal woorden">
    <div class="nl-rij titel"><b>Titel</b><span>kort, prikkelend, past bij de inhoud</span></div>
    <div class="nl-rij inl"><b>Inleiding <i>± 10 tot 15%</i></b><span>pakkende opening → aanleiding → stelling of hoofdvraag</span></div>
    <div class="nl-rij mid"><b>Middenstuk <i>± 70 tot 80%</i></b><span>drie tot vijf alinea's, elk met één onderwerp en een kernzin, verbonden met signaalwoorden</span></div>
    <div class="nl-rij slot"><b>Slot <i>± 10 tot 15%</i></b><span>samenvatting → conclusie of afweging → uitsmijter</span></div>
  </div>`);

  // Een alinea in vier lagen
  TW.fig("alinea", () => `<div class="nl-kuva" role="img" aria-label="Een alinea in vier lagen: kernzin, uitleg, voorbeeld, afronding">
    <div><i>K</i><span><b>Kernzin</b> Het argument in één zin, met een signaalwoord.</span></div>
    <div><i>U</i><span><b>Uitleg</b> Waarom klopt dat? Hoe werkt het?</span></div>
    <div><i>V</i><span><b>Voorbeeld of bewijs</b> Een concreet geval, een feit of een bron.</span></div>
    <div><i>A</i><span><b>Afronding</b> Wat betekent dit voor je stelling of hoofdvraag?</span></div>
  </div>`);

  // Vier argumentatiestructuren
  TW.fig("argstructuur", (quiz) => {
    const vak = (x, y, t) => `<rect x="${x}" y="${y}" width="44" height="20" rx="5" class="cel"/><text x="${x + 22}" y="${y + 14}" text-anchor="middle" class="k b">${t}</text>`;
    const pijl = (x1, y1, x2, y2) => {
      const h = Math.atan2(y2 - y1, x2 - x1), a = 5;
      const p = (d) => `${(x2 - a * 1.8 * Math.cos(h) + a * Math.cos(h + d)).toFixed(1)} ${(y2 - a * 1.8 * Math.sin(h) + a * Math.sin(h + d)).toFixed(1)}`;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="s"/><path d="M${x2} ${y2} L${p(Math.PI / 2)} L${p(-Math.PI / 2)} Z" class="dot"/>`;
    };
    const kop = (ox, oy, t, sub) => `<text x="${ox + 85}" y="${oy + 14}" text-anchor="middle" class="b">${quiz ? "?" : t}</text>${quiz ? "" : `<text x="${ox + 85}" y="${oy + 124}" text-anchor="middle" class="k">${sub}</text>`}`;
    const S = (ox, oy) => `<rect x="${ox + 63}" y="${oy + 22}" width="44" height="20" rx="5" class="cel"/><rect x="${ox + 63}" y="${oy + 22}" width="44" height="20" rx="5" class="vlak"/><text x="${ox + 85}" y="${oy + 36}" text-anchor="middle" class="k b">S</text>`;
    let s = "";
    s += kop(0, 0, "Enkelvoudig", "één argument") + S(0, 0) + vak(63, 72, "A") + pijl(85, 72, 85, 43);
    s += kop(170, 0, "Meervoudig", "elk argument telt los") + S(170, 0) + vak(200, 72, "A1") + vak(266, 72, "A2") + pijl(222, 72, 248, 43) + pijl(288, 72, 262, 43);
    s += kop(0, 134, "Nevenschikkend", "alleen samen overtuigend") + S(0, 134) + vak(30, 212, "A1") + vak(96, 212, "A2")
      + `<line x1="52" y1="212" x2="52" y2="198" class="s"/><line x1="118" y1="212" x2="118" y2="198" class="s"/><line x1="52" y1="198" x2="118" y2="198" class="s"/><text x="85" y="227" text-anchor="middle" class="b">+</text>` + pijl(85, 198, 85, 177);
    s += kop(170, 134, "Onderschikkend", "argument bij een argument") + S(170, 134) + vak(233, 186, "A1") + vak(233, 222, "A1.1") + pijl(255, 186, 255, 177) + pijl(255, 222, 255, 207);
    return `<svg class="fig" viewBox="0 0 340 266" role="img" aria-label="Vier argumentatiestructuren: enkelvoudig, meervoudig, nevenschikkend en onderschikkend">
      <line x1="170" y1="4" x2="170" y2="262" class="raster"/><line x1="4" y1="131" x2="336" y2="131" class="raster"/>${s}</svg>`;
  });

  // 't kofschip
  TW.fig("kofschip", () => `<svg class="fig" viewBox="0 0 340 150" role="img" aria-label="Een schip met op de romp de letters t, k, f, s, ch en p">
    <text x="170" y="16" text-anchor="middle" class="g">’t kofschip</text>
    <line x1="170" y1="96" x2="170" y2="26" class="s"/>
    <path d="M175 30 L175 88 L238 88 Z" class="cel"/><path d="M165 38 L165 88 L112 88 Z" class="cel"/>
    <path d="M62 96 L278 96 L250 130 L90 130 Z" class="cel"/><path d="M62 96 L278 96 L250 130 L90 130 Z" class="vlak"/>
    <text x="100" y="119" text-anchor="middle" class="g pa">t</text>
    <text x="128" y="119" text-anchor="middle" class="g pa">k</text>
    <text x="156" y="119" text-anchor="middle" class="g pa">f</text>
    <text x="184" y="119" text-anchor="middle" class="g pa">s</text>
    <text x="214" y="119" text-anchor="middle" class="g pa">ch</text>
    <text x="244" y="119" text-anchor="middle" class="g pa">p</text>
    <text x="197" y="80" text-anchor="middle" class="k b">-te(n)</text>
    <text x="146" y="80" text-anchor="middle" class="k b">-t</text>
    <path d="M20 140 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" class="stip"/>
  </svg>`);

  // Stappenplan werkwoordspelling
  TW.fig("dtschema", () => `<div class="nl-stroom" role="img" aria-label="Stappenplan voor de werkwoordspelling">
    <div class="nl-vraag">Is het de <b>persoonsvorm</b>?<small>Zet de zin in een andere tijd: het werkwoord dat mee verandert, is de persoonsvorm.</small></div>
    <div class="nl-takken">
      <div><em>ja, tegenwoordige tijd</em>
        <span><b>ik</b> → stam<small>ik word, ik vind</small></span>
        <span><b>je/jij achter</b> de persoonsvorm → stam<small>word je, vind jij</small></span>
        <span><b>hij, zij, het, u</b> of <b>je vooraan</b> → stam + t<small>hij wordt, je vindt</small></span>
        <span><b>meervoud</b> → hele werkwoord<small>zij worden, wij vinden</small></span></div>
      <div><em>ja, verleden tijd</em>
        <span>letter vóór -en in <b>’t kofschip</b> → stam + te(n)<small>werken: werkte, werkten</small></span>
        <span><b>anders</b> → stam + de(n)<small>leren: leerde · antwoorden: antwoordde</small></span></div>
      <div><em>nee</em>
        <span><b>voltooid deelwoord</b> (na hebben, zijn, worden) → -t bij ’t kofschip, anders -d<small>gewerkt, geleerd, gebeurd. Nooit -dt.</small></span>
        <span><b>voor een zelfstandig naamwoord</b> → zo kort mogelijk<small>de vergrote kans, de bestede tijd</small></span>
        <span><b>heel werkwoord</b> → -en<small>hij wil antwoorden</small></span></div>
    </div>
  </div>`);
})();
