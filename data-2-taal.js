// Hoofdstuk 2: taal en stijl. Signaalwoorden, formuleren en spelling.
TW.hoofdstuk({
  id: "taal", nr: "Deel 2", titel: "Taal en stijl", icoon: "🔤",
  intro: "Een sterke tekst hangt goed aan elkaar, is helder geformuleerd en foutloos gespeld. Hier oefen je de regels die je op de toets nodig hebt.",
  onderdelen: [
    // ------------------------------------------------------------------
    {
      id: "signaalwoorden", nr: "4", titel: "Signaalwoorden en verbanden",
      kern: [
        "Een [[signaalwoord]] laat zien hoe zinnen of alinea's met elkaar te maken hebben: het geeft een [[verband]] aan.",
        "Signaalwoorden helpen de lezer. Ze dwingen jou ook om na te denken over hoe je argumenten samenhangen. Gebruik in je tekst minstens vier verschillende verbanden.",
        { tabel: { kop: ["Verband", "Signaalwoorden", "Voorbeeld"], rijen: [
          ["Opsomming", "ten eerste, daarnaast, bovendien, ook, ten slotte", "Daarnaast levert AI nieuw werk op."],
          ["Tegenstelling", "maar, echter, toch, daarentegen, hoewel", "AI is snel. Het maakt echter ook fouten."],
          ["Oorzaak-gevolg", "doordat, daardoor, waardoor, zodat, als gevolg van", "Doordat software de planning doet, houden artsen tijd over."],
          ["Reden", "omdat, want, aangezien, daarom, immers", "Een verbod werkt niet, want thuis gebruikt iedereen het toch."],
          ["Toelichting of voorbeeld", "bijvoorbeeld, zoals, ter illustratie, denk aan", "Routinetaken, zoals afspraken plannen, verdwijnen."],
          ["Voorwaarde", "als, indien, mits, tenzij, op voorwaarde dat", "AI helpt, mits een mens het resultaat controleert."],
          ["Vergelijking", "net als, evenals, vergeleken met, hetzelfde geldt voor", "Net als de computer verandert AI het kantoorwerk."],
          ["Conclusie", "dus, concluderend, hieruit volgt, al met al", "Er blijft dus controle door mensen nodig."],
          ["Samenvatting", "kortom, samengevat, om kort te gaan", "Kortom, AI verandert het werk."],
          ["Doel-middel", "om ... te, opdat, door middel van, met behulp van", "Bedrijven zetten AI in om kosten te besparen."],
          ["Tijd", "eerst, daarna, vervolgens, vroeger, sinds", "Vroeger typte een aparte afdeling alle brieven."]
        ] } },
        { kop: "Oorzaak of reden?" },
        "Bij [[oorzaak-gevolg]] gebeurt iets vanzelf, zonder dat iemand ervoor kiest: 'Doordat de vraag naar technici stijgt, gaan de lonen omhoog.' Bij een [[reden]] zit er een bewuste keuze of een redenering achter: 'Het bedrijf kiest voor AI, omdat het kosten wil besparen.'",
        { let: "'Doordat' gebruik je alleen bij een oorzaak. 'Ik schrijf een betoog doordat ik een duidelijke mening heb' is fout: het is een keuze, dus 'omdat'." },
        { ezel: "Kun je vragen 'wilde iemand dat?' en is het antwoord ja? Dan is het een reden (omdat). Is het antwoord nee, dan is het een oorzaak (doordat)." },
        { kop: "Conclusie of samenvatting?" },
        "Een [[conclusie]] trekt een gevolgtrekking uit wat ervoor staat (dus, hieruit blijkt). Een [[samenvatting]] herhaalt kort de hoofdzaken (kortom, samengevat).",
        { kop: "Let op de zinsbouw" },
        "Na 'want' blijft de volgorde van een gewone hoofdzin: 'want leerlingen gebruiken het later'. Na 'omdat' staat de persoonsvorm achteraan: 'omdat leerlingen het later gebruiken'.",
        { let: "Dubbelop: 'zoals bijvoorbeeld', 'maar echter' en 'dus daarom' zeggen twee keer hetzelfde. Kies één van de twee woorden." },
        { tip: "Begin niet elke zin met een signaalwoord. Zet wel in elke kernzin een signaalwoord dat laat zien hoe de alinea aansluit op de vorige." }
      ],
      begrippen: [
        ["Signaalwoord", "Woord of woordgroep dat het verband tussen zinnen of alinea's aangeeft."],
        ["Verband", "De manier waarop twee zinnen of tekstdelen met elkaar samenhangen."],
        ["Opsomming", "Verband waarbij iets wordt toegevoegd: ten eerste, daarnaast, bovendien."],
        ["Tegenstelling", "Verband waarbij iets ingaat tegen het voorgaande: maar, echter, toch."],
        ["Oorzaak-gevolg", "Verband waarbij iets vanzelf uit iets anders voortkomt: doordat, daardoor."],
        ["Reden", "Verband met een bewuste keuze of een redenering: omdat, want, daarom."],
        ["Toelichting", "Verband waarbij een voorbeeld of uitleg volgt: bijvoorbeeld, zoals."],
        ["Voorwaarde", "Verband waarbij iets alleen geldt als aan iets anders is voldaan: als, mits, tenzij."],
        ["Vergelijking", "Verband waarbij twee zaken naast elkaar worden gezet: net als, evenals."],
        ["Conclusie", "Verband waarbij een gevolgtrekking volgt: dus, hieruit blijkt."],
        ["Samenvatting", "Verband waarbij de hoofdzaken kort worden herhaald: kortom, samengevat."],
        ["Doel-middel", "Verband tussen wat je wilt bereiken en hoe: om ... te, door middel van."],
        ["Tijd", "Verband in de tijd: eerst, daarna, vroeger, sinds."]
      ],
      vragen: [
        { q: "Welk verband geeft 'daarentegen' aan?", a: ["Tegenstelling", "Oorzaak-gevolg", "Opsomming", "Conclusie"], u: "'Daarentegen' zet twee dingen tegenover elkaar: 'Vertalers krijgen minder werk. Loodgieters daarentegen merken weinig.'" },
        { q: "'Doordat software de planning overneemt, houden verpleegkundigen tijd over.' Welk verband?", a: ["Oorzaak-gevolg", "Reden", "Doel-middel", "Voorwaarde"], u: "De extra tijd ontstaat vanzelf door de software. Niemand kiest ervoor: oorzaak-gevolg." },
        { q: "'Het bedrijf schakelt over op AI, omdat het kosten wil besparen.' Welk verband?", a: ["Reden", "Oorzaak-gevolg", "Tegenstelling", "Toelichting"], u: "Er zit een bewuste keuze achter: het bedrijf wil iets. Dan is het een reden." },
        { q: "Welk signaalwoord past op de puntjes? 'AI is een goede hulp, ... een mens het resultaat controleert.'", a: ["mits", "zodat", "hoewel", "kortom"], u: "'Mits' geeft een voorwaarde: AI is alleen een goede hulp als er controle is." },
        { q: "Welk signaalwoord past op de puntjes? 'Vertalers krijgen minder opdrachten. Loodgieters ... merken weinig van AI.'", a: ["daarentegen", "bovendien", "daardoor", "kortom"], u: "De tweede zin staat tegenover de eerste: een tegenstelling." },
        { q: "Welk signaalwoord kondigt een samenvatting aan?", a: ["Kortom", "Daardoor", "Bijvoorbeeld", "Mits"], u: "'Kortom' en 'samengevat' kondigen een samenvatting aan. 'Daardoor' is oorzaak-gevolg, 'bijvoorbeeld' toelichting en 'mits' voorwaarde." },
        { q: "In welke zin is het signaalwoord fout gekozen?", a: ["Ik kies voor een beschouwing doordat ik geen duidelijke mening heb.", "Doordat de software goedkoper wordt, stappen meer bedrijven over.", "Ik kies voor een betoog, omdat ik een duidelijke mening heb.", "De vraag naar technici stijgt, waardoor de lonen omhooggaan."], u: "Een keuze is een reden, dus 'omdat': 'Ik kies voor een beschouwing, omdat ik geen duidelijke mening heb.'" },
        { q: "Welk verband geeft 'om ... te' aan in 'Bedrijven gebruiken AI om kosten te besparen'?", a: ["Doel-middel", "Oorzaak-gevolg", "Voorwaarde", "Vergelijking"], u: "Het doel is kosten besparen, het middel is AI." },
        { q: "Waarom is 'zoals bijvoorbeeld' fout?", a: ["Beide woorden geven een voorbeeld aan: dubbelop", "'Zoals' mag nooit midden in een zin staan", "'Bijvoorbeeld' is spreektaal en past niet", "Na 'zoals' moet altijd een komma staan"], u: "'Zoals' en 'bijvoorbeeld' kondigen allebei een voorbeeld aan. Kies er één." },
        { q: "Welke zin heeft een goede woordvolgorde?", a: ["Scholen moeten AI toestaan, want leerlingen gebruiken het later ook.", "Scholen moeten AI toestaan, want leerlingen het later ook gebruiken.", "Scholen moeten AI toestaan, omdat leerlingen gebruiken het later ook.", "Scholen moeten AI toestaan, doordat leerlingen het later ook gebruiken."], u: "Na 'want' volgt een gewone hoofdzin, na 'omdat' staat de persoonsvorm achteraan. 'Doordat' is fout gekozen: het is een reden." },
        { q: "'Er verdwijnen banen. ... komen er ook nieuwe banen bij.' Welk signaalwoord past het best?", a: ["Toch", "Daardoor", "Dus", "Bijvoorbeeld"], u: "De tweede zin gaat in tegen wat je na de eerste zou verwachten: een tegenstelling, dus 'Toch'." }
      ],
      oefen: [
        { type: "sorteer", q: "Welk verband geeft dit signaalwoord aan?", groepen: ["Opsomming", "Tegenstelling", "Oorzaak-gevolg", "Conclusie of samenvatting"], items: [["bovendien", 0], ["tevens", 0], ["echter", 1], ["desondanks", 1], ["waardoor", 2], ["als gevolg van", 2], ["kortom", 3], ["al met al", 3]], u: "Leer de signaalwoorden per verband. Twijfel je, zet het woord dan tussen twee voorbeeldzinnen en kijk wat het doet." },
        { type: "invul", q: "Vul de passende signaalwoorden in.", tekst: "AI neemt vooral routinetaken over, {bijvoorbeeld} het plannen van afspraken. {Daardoor} houden werknemers meer tijd over voor hun klanten. {Toch} zijn er ook zorgen: niet iedereen kan zich omscholen. {Kortom}, AI verandert het werk ingrijpend.", extra: ["Omdat", "Mits"], u: "Toelichting (bijvoorbeeld), oorzaak-gevolg (Daardoor), tegenstelling (Toch) en samenvatting (Kortom)." },
        { type: "koppel", q: "Koppel het verband aan een signaalwoord.", paren: [["Voorwaarde", "mits"], ["Doel-middel", "opdat"], ["Vergelijking", "evenals"], ["Tijd", "vervolgens"], ["Toelichting", "ter illustratie"], ["Reden", "aangezien"]], u: "Bij twijfel: zet het woord in een zin over AI en werk en kijk welk verband er ontstaat." }
      ],
      open: [
        { q: "Verbind elk zinnenpaar met een passend signaalwoord en noem het verband. a) 'Software neemt de administratie over.' + 'Verpleegkundigen houden meer tijd over voor patiënten.' b) 'AI schrijft snel teksten.' + 'Er blijft een mens nodig die de tekst controleert.'",
          a: "a) Doordat software de administratie overneemt, houden verpleegkundigen meer tijd over voor patiënten (oorzaak-gevolg). Ook goed: 'Software neemt de administratie over, waardoor ...'. b) AI schrijft snel teksten, maar er blijft een mens nodig die de tekst controleert (tegenstelling). Ook goed: 'Hoewel AI snel teksten schrijft, blijft er ...'.",
          punten: ["a: oorzaak-gevolg (doordat, waardoor, daardoor)", "b: tegenstelling (maar, toch, hoewel)", "juiste woordvolgorde na het signaalwoord"] }
      ],
      widgets: ["sprint"]
    },
    // ------------------------------------------------------------------
    {
      id: "formuleren", nr: "5", titel: "Formuleren en stijl",
      kern: [
        "Zakelijk schrijven betekent: helder, precies en zonder spreektaal. De lezer moet je tekst in één keer kunnen volgen.",
        { kop: "Formuleerfouten" },
        { tabel: { kop: ["Fout", "Wat gaat er mis?", "Fout → goed"], rijen: [
          ["Incongruentie", "onderwerp en persoonsvorm passen niet bij elkaar", "Het aantal banen dalen → daalt."],
          ["Tautologie", "twee woorden met dezelfde betekenis", "snel en vlug → snel"],
          ["Pleonasme", "een eigenschap die al in het woord zit", "nieuwe innovaties → innovaties"],
          ["Contaminatie", "twee uitdrukkingen door elkaar gehaald", "kost erg duur → is erg duur"],
          ["Dubbele ontkenning", "twee ontkenningen heffen elkaar op", "voorkomen dat niemand achterblijft → voorkomen dat iemand achterblijft"],
          ["Foutieve samentrekking", "een woord weglaten dat in het andere zinsdeel een andere functie heeft", "Het bedrijf kocht software en werd gebruikt → en die werd gebruikt"],
          ["Dat/als-fout", "'dat' herhaald na een ingeschoven bijzin", "dat als het goedkoper wordt, dat ... → dat meer bedrijven AI gebruiken als het goedkoper wordt"],
          ["Verwijsfout", "het verwijswoord past niet bij het woord waarnaar het verwijst", "het bedrijf en haar personeel → zijn personeel"],
          ["Foutieve inversie", "na 'en' staat de persoonsvorm vóór het onderwerp", "en kunnen kleine bedrijven → en kleine bedrijven kunnen"],
          ["Losstaand zinsgedeelte", "een bijzin staat als losse zin", "Omdat computers routinewerk doen. → aan de vorige zin vast"],
          ["Foutieve beknopte bijzin", "het verzwegen onderwerp past niet bij de hoofdzin", "Na jarenlang te zijn getest, gebruiken artsen het programma → Nadat het programma jarenlang was getest, ..."]
        ] } },
        { kop: "Verwijswoorden" },
        "Bij een het-woord hoort 'dat' en 'zijn': het bedrijf dat de software maakt, het bedrijf en zijn werknemers. Bij een de-woord hoort 'die': de software die. Bij woorden op -heid, -ing en -teit hoort 'haar': de regering en haar plannen.",
        "'Hun' is nooit onderwerp. Je gebruikt het als bezittelijk voornaamwoord (hun baan) of als meewerkend voorwerp (de werkgever gaf hun een cursus). Als onderwerp schrijf je 'zij' of 'ze'.",
        { kop: "Stijl" },
        "Vermijd [[spreektaal]] (best wel, sowieso, gewoon, super) en vage woorden (dingen, iets, heel erg). Kies het precieze woord: niet 'dingen', maar 'taken', 'gevolgen' of 'problemen'.",
        "Zorg voor [[variatie]]: wissel korte en langere zinnen af, begin niet elke zin met hetzelfde woord en gebruik synoniemen (banen, functies, beroepen, werk). Een zin van meer dan ongeveer 25 woorden knip je bij een signaalwoord in tweeën.",
        { let: "'Ik vind' hoeft in een betoog bijna nooit: je stelling is al je mening. Schrijf niet 'Ik vind dat scholen AI moeten toestaan', maar 'Scholen moeten AI toestaan'." },
        { voorbeeld: { titel: "van spreektaal naar zakelijk", stappen: ["Spreektaal: 'AI is best wel heel erg handig en zo, want het doet gewoon allemaal dingen sneller.'", "Schrap de vulwoorden: best wel, heel erg, en zo, gewoon.", "Maak het vage woord precies: 'dingen' wordt 'routinetaken zoals plannen en notuleren'.", "Zakelijk: 'AI is nuttig, omdat het routinetaken zoals plannen en notuleren sneller uitvoert.'"] } },
        { tip: "Lees je tekst bij het nakijken langzaam en zin voor zin. Waar je hapert, zit vaak een formuleerfout." }
      ],
      begrippen: [
        ["Incongruentie", "Onderwerp en persoonsvorm komen niet overeen in getal (enkelvoud of meervoud)."],
        ["Tautologie", "Twee woorden met dezelfde betekenis naast elkaar: snel en vlug."],
        ["Pleonasme", "Een eigenschap noemen die al in het woord zit: nieuwe innovaties."],
        ["Contaminatie", "Twee uitdrukkingen door elkaar gehaald: kost duur (is duur + kost veel)."],
        ["Dubbele ontkenning", "Twee ontkenningen die elkaar opheffen, zodat het omgekeerde er staat."],
        ["Foutieve samentrekking", "Een woord weglaten dat in het andere zinsdeel een andere vorm of functie heeft."],
        ["Dat/als-fout", "'Dat' onnodig herhaald na een ingeschoven bijzin met 'als'."],
        ["Verwijsfout", "Een verwijswoord dat niet past bij het woord waarnaar het verwijst."],
        ["Foutieve inversie", "Na 'en' komt de persoonsvorm ten onrechte vóór het onderwerp."],
        ["Losstaand zinsgedeelte", "Een bijzin of zinsdeel dat als losse zin is geschreven."],
        ["Beknopte bijzin", "Bijzin zonder onderwerp en persoonsvorm, met 'te' + werkwoord: Om tijd te besparen, ..."],
        ["Spreektaal", "Woorden die je in een gesprek gebruikt, maar niet in een zakelijke tekst: sowieso, best wel."],
        ["Variatie", "Afwisseling in zinslengte, zinsbegin en woordkeus."],
        ["Zakelijke stijl", "Heldere, precieze schrijfstijl zonder spreektaal en emoties."]
      ],
      vragen: [
        { q: "'Het aantal banen in de administratie dalen.' Welke fout zit hierin?", a: ["Incongruentie", "Contaminatie", "Foutieve inversie", "Verwijsfout"], u: "Het onderwerp is 'het aantal' (enkelvoud), dus de persoonsvorm is 'daalt'." },
        { q: "'Nieuwe innovaties veranderen de arbeidsmarkt.' Welke fout zit hierin?", a: ["Pleonasme", "Tautologie", "Contaminatie", "Dubbele ontkenning"], u: "Een innovatie is altijd nieuw: 'nieuwe' noemt een eigenschap die al in het woord zit. Bij een tautologie staan twee woorden met dezelfde betekenis naast elkaar." },
        { q: "'De software werkt snel en vlug.' Welke fout zit hierin?", a: ["Tautologie", "Pleonasme", "Incongruentie", "Contaminatie"], u: "'Snel' en 'vlug' betekenen hetzelfde. Twee gelijke woorden naast elkaar is een tautologie." },
        { q: "'Werkgevers moeten verhinderen dat niemand achterblijft.' Welke fout zit hierin?", a: ["Dubbele ontkenning", "Tautologie", "Losstaand zinsgedeelte", "Foutieve samentrekking"], u: "'Verhinderen' is al ontkennend. Met 'niemand' erbij staat er dat werkgevers moeten zorgen dat er wél iemand achterblijft." },
        { q: "Welke zin bevat een foutieve beknopte bijzin?", a: ["Na jaren trouwe dienst te hebben gedaan, verving het bedrijf de medewerker door software.", "Na lang te hebben getwijfeld, kocht de directie het nieuwe programma toch.", "Om tijd te besparen, gebruikt de school een programma voor het rooster.", "Nadat de medewerker jaren trouwe dienst had gedaan, werd hij vervangen."], u: "In de eerste zin is 'het bedrijf' het onderwerp van de hoofdzin. Er staat dus dat het bedrijf jaren trouwe dienst had gedaan. In de andere zinnen klopt het verzwegen onderwerp wel." },
        { q: "Welke zin is goed?", a: ["Het bedrijf heeft zijn personeel een cursus aangeboden.", "Het bedrijf heeft haar personeel een cursus aangeboden.", "Het bedrijf heeft hun personeel een cursus aangeboden.", "Het bedrijf die de software maakt, zoekt personeel."], u: "'Het bedrijf' is een het-woord: je verwijst met 'zijn' en 'dat'." },
        { q: "'De directeur beloofde dat als de winst stijgt, dat iedereen een bonus krijgt.' Welke fout zit hierin?", a: ["Dat/als-fout", "Incongruentie", "Foutieve inversie", "Pleonasme"], u: "'Dat' staat er twee keer. Beter: 'De directeur beloofde dat iedereen een bonus krijgt als de winst stijgt.'" },
        { q: "'Het programma is goedkoop en kunnen scholen het makkelijk aanschaffen.' Welke fout zit hierin?", a: ["Foutieve inversie", "Foutieve samentrekking", "Verwijsfout", "Contaminatie"], u: "Na 'en' begint een nieuwe hoofdzin met het onderwerp: 'en scholen kunnen het makkelijk aanschaffen'." },
        { q: "'Steeds meer bedrijven gebruiken AI. Omdat het tijd bespaart.' Welke fout zit hierin?", a: ["Losstaand zinsgedeelte", "Dubbele ontkenning", "Dat/als-fout", "Tautologie"], u: "Een bijzin met 'omdat' kan niet los staan. Maak er één zin van: 'Steeds meer bedrijven gebruiken AI, omdat het tijd bespaart.'" },
        { q: "Welke zin is het meest zakelijk?", a: ["De gevolgen van AI verschillen sterk per beroep.", "AI heeft echt mega veel gevolgen voor allerlei beroepen.", "Nou, AI doet best wel wat met banen en zo.", "AI is gewoon superbelangrijk voor heel veel dingen."], u: "De eerste zin is precies en bevat geen spreektaal. 'Mega', 'best wel', 'en zo', 'gewoon' en 'dingen' passen niet in een zakelijke tekst." },
        { q: "'Veel mensen beseffen zich niet hoe snel de techniek verandert.' Welke fout zit hierin?", a: ["Contaminatie", "Pleonasme", "Incongruentie", "Foutieve samentrekking"], u: "Het is 'beseffen' (zonder 'zich') of 'zich realiseren'. 'Zich beseffen' haalt die twee door elkaar." },
        { q: "'Zij heeft een cursus gevolgd en nu programmeur.' Welke fout zit hierin?", a: ["Foutieve samentrekking", "Losstaand zinsgedeelte", "Foutieve inversie", "Verwijsfout"], u: "Het weggelaten werkwoord moet 'is' zijn, maar in het eerste deel staat 'heeft'. Die mag je niet samentrekken: 'en is nu programmeur'." }
      ],
      oefen: [
        { type: "koppel", q: "Koppel de formuleerfout aan het voorbeeld.", paren: [["Tautologie", "snel en vlug"], ["Pleonasme", "nieuwe innovaties"], ["Contaminatie", "de software kost erg duur"], ["Incongruentie", "het aantal banen dalen"], ["Dubbele ontkenning", "voorkomen dat niemand achterblijft"], ["Foutieve inversie", "en kunnen kleine bedrijven ermee werken"]], u: "Leer van elke fout één herkenbaar voorbeeld. Dan zie je hem sneller in je eigen tekst." },
        { type: "sorteer", q: "Zakelijk of spreektaal?", groepen: ["Zakelijk", "Spreektaal of vaag"], items: [["in elk geval", 0], ["sowieso", 1], ["zeer", 0], ["best wel", 1], ["routinetaken", 0], ["dingen", 1], ["bovendien", 0], ["en zo", 1]], u: "Spreektaal en vage woorden maken je tekst minder overtuigend. Kies het precieze, zakelijke woord." },
        { type: "invul", q: "Vul de juiste verwijswoorden in.", tekst: "Het bedrijf {dat} de software maakt, heeft {zijn} personeel een cursus gegeven. De regering wil dat {haar} plannen snel worden uitgevoerd. De werknemers {die} een cursus volgen, krijgen {hun} kosten vergoed.", extra: ["wat", "hen"], u: "Het-woord: dat en zijn. De regering: haar. Meervoud (de werknemers): die en hun." }
      ],
      open: [
        { q: "Verbeter deze tekst. Er staan drie formuleerfouten in: 'De invloed van chatbots op banen worden vaak overschat. Volgens mij vind ik dat dat geen probleem is. De software is goedkoop en kunnen ook kleine bedrijven ermee werken.'",
          a: "De invloed van chatbots op banen wordt vaak overschat (incongruentie: het onderwerp is 'de invloed'). Volgens mij is dat geen probleem, of: Ik vind dat geen probleem (dubbelop: 'volgens mij' en 'ik vind'). De software is goedkoop en ook kleine bedrijven kunnen ermee werken (foutieve inversie).",
          punten: ["'worden' moet 'wordt' zijn (incongruentie)", "'volgens mij' of 'ik vind' schrappen (dubbelop)", "'en ook kleine bedrijven kunnen' (inversie)"] },
        { q: "Herschrijf deze zin zakelijk: 'AI is sowieso best wel een ding waar je echt rekening mee moet houden en zo.'",
          a: "Bijvoorbeeld: 'Met AI moeten werknemers en werkgevers rekening houden.' of 'AI is een ontwikkeling die de arbeidsmarkt ingrijpend verandert.'",
          punten: ["sowieso, best wel, echt en en zo geschrapt", "'een ding' vervangen door een precies woord", "zakelijke, korte zin"] }
      ],
      widgets: ["formuleerdokter"]
    },
    // ------------------------------------------------------------------
    {
      id: "spelling", nr: "6", titel: "Spelling en interpunctie",
      kern: [
        { kop: "Werkwoordspelling (d/t)" },
        "Zoek eerst de [[persoonsvorm]]. In de tegenwoordige tijd: bij 'ik' alleen de stam, bij hij, zij, het en 'je' vóór de persoonsvorm stam + t, bij 'je' of 'jij' achter de persoonsvorm weer alleen de stam.",
        { fig: "dtschema", bij: "Volg de vragen van boven naar beneden." },
        "Verleden tijd van zwakke werkwoorden: haal -en van het hele werkwoord af. Zit de laatste letter in [[’t kofschip]] (t, k, f, s, ch, p en ook x), dan wordt het stam + te(n); anders stam + de(n).",
        { fig: "kofschip", bij: "De medeklinkers van ’t kofschip krijgen -te(n) in de verleden tijd en een voltooid deelwoord op -t." },
        "Het [[voltooid deelwoord]] krijgt dezelfde letter: -t bij ’t kofschip, anders -d. Een voltooid deelwoord eindigt nooit op -dt: het werk is veranderd, het is gebeurd.",
        { let: "Sterke werkwoorden veranderen van klinker in de verleden tijd en krijgen daar nooit een t achter: hij werd, hij vond, hij hield." },
        { ezel: "Twijfel je bij hij of je? Vervang het werkwoord door 'lopen'. Hoor je 'loopt', dan schrijf je stam + t: hij loopt, dus hij wordt. Hoor je 'loop', dan alleen de stam: loop je, dus word je." },
        { kop: "Samenstellingen en hoofdletters" },
        "Een [[samenstelling]] schrijf je aan elkaar: arbeidsmarkt, werkgelegenheid, personeelstekort, beroepsonderwijs. Staat er een afkorting of cijfer in, dan gebruik je een [[koppelteken]]: AI-systeem, AI-toepassing, 18-jarige.",
        "Een hoofdletter schrijf je aan het begin van een zin, bij namen (Nederland, de Europese Unie) en bij afkortingen die je letter voor letter uitspreekt (AI, EU).",
        { kop: "Komma's" },
        { tabel: { kop: ["Regel", "Voorbeeld"], rijen: [
          ["Tussen twee persoonsvormen", "Wie zich niet bijschoolt, loopt meer risico."],
          ["Na een bijzin vooraan", "Als AI de administratie doet, houden artsen tijd over."],
          ["Vóór maar en want (nieuwe hoofdzin)", "De techniek is er al, maar veel bedrijven gebruiken haar nog niet."],
          ["In een opsomming, niet vóór 'en'", "Vertalers, juristen en programmeurs merken het nu al."],
          ["Rond een bijstelling", "Mijn buurman, een ervaren vertaler, krijgt minder opdrachten."],
          ["Rond een uitbreidende bijzin", "De vakbond, die al jaren waarschuwt, krijgt gelijk."],
          ["Geen komma vóór een beperkende bijzin", "De software die de roosters maakt, werkt foutloos."]
        ] } },
        { kop: "Citeren en parafraseren" },
        "Bij [[citeren]] neem je letterlijk over, tussen aanhalingstekens, met de bron erbij. Bij [[parafraseren]] geef je de inhoud in je eigen woorden weer, zonder aanhalingstekens, maar ook met [[bronvermelding]].",
        { voorbeeld: { titel: "een bron gebruiken (verzonnen bron, alleen om de vorm te laten zien)", stappen: ["Citaat: Econoom Jansen schrijft in bron 2: 'AI verandert vooral de inhoud van banen, niet het aantal.'", "Parafrase: Econoom Jansen stelt in bron 2 dat AI eerder de inhoud van banen verandert dan het aantal.", "Noem bij een toets de schrijver of organisatie en het nummer of de titel van de bron. Volg de afspraken van je docent."] } },
        { tip: "Lees aan het eind je tekst één keer alleen op d/t na en één keer alleen op komma's. Gericht zoeken werkt beter dan alles tegelijk." }
      ],
      begrippen: [
        ["Persoonsvorm", "Het werkwoord dat verandert als je de zin in een andere tijd of in het meervoud zet."],
        ["Stam", "Het hele werkwoord min -en (de ik-vorm): werk, word, vind."],
        ["’t Kofschip", "Ezelsbruggetje met t, k, f, s, ch en p (en x): bij die letters krijgt een zwak werkwoord -te(n) en een voltooid deelwoord op -t."],
        ["Zwak werkwoord", "Werkwoord dat in de verleden tijd -te(n) of -de(n) krijgt: werkte, leerde."],
        ["Sterk werkwoord", "Werkwoord dat in de verleden tijd van klinker verandert: vinden, vond."],
        ["Voltooid deelwoord", "Werkwoordsvorm na hebben, zijn of worden: gewerkt, veranderd."],
        ["Gebiedende wijs", "Werkwoordsvorm voor een opdracht of advies, zonder onderwerp: alleen de stam (Word wijzer)."],
        ["Samenstelling", "Woord dat uit twee of meer woorden bestaat en aan elkaar wordt geschreven: arbeidsmarkt."],
        ["Koppelteken", "Streepje in een samenstelling, onder meer bij een afkorting of cijfer: AI-systeem."],
        ["Bijstelling", "Woordgroep die extra uitleg geeft over het woord ervoor, tussen komma's."],
        ["Beperkende bijzin", "Bijzin die zegt welke persoon of zaak je bedoelt; geen komma ervoor."],
        ["Uitbreidende bijzin", "Bijzin met extra informatie die je kunt weglaten; tussen komma's."],
        ["Citeren", "Letterlijk overnemen, tussen aanhalingstekens en met bronvermelding."],
        ["Parafraseren", "In eigen woorden weergeven, met bronvermelding."],
        ["Bronvermelding", "Noemen waar een gegeven vandaan komt: wie het zegt en in welke bron."]
      ],
      vragen: [
        { q: "Welke vorm is goed? 'De techniek ... zich sneller dan verwacht.' (ontwikkelen)", a: ["ontwikkelt", "ontwikkeld", "ontwikkeldt", "ontwikkel"], u: "Onderwerp 'de techniek' = hij, tegenwoordige tijd: stam (ontwikkel) + t." },
        { q: "Welke vorm is goed? '... je baan straks overgenomen door software?' (worden)", a: ["Wordt", "Word", "Wort", "Worden"], u: "'Je' betekent hier 'jouw'. Het onderwerp is 'je baan' (= hij), dus stam + t: wordt." },
        { q: "Welke vorm is goed? 'Gisteren ... de chatbot pas na een uur.' (antwoorden)", a: ["antwoordde", "antwoorde", "antwoordte", "antwoordden"], u: "Verleden tijd, enkelvoud. De d van antwoorden zit niet in ’t kofschip: stam (antwoord) + de = antwoordde." },
        { q: "Welke vorm is goed? 'Het werk van een boekhouder is sterk ...' (veranderen)", a: ["veranderd", "verandert", "veranderdt", "veranderde"], u: "Na 'is' staat een voltooid deelwoord. De r zit niet in ’t kofschip, dus -d: veranderd." },
        { q: "Welke vorm is goed? 'De ... uren krijg je niet terug.' (besteden)", a: ["bestede", "besteedde", "besteede", "besteedden"], u: "Het voltooid deelwoord 'besteed' staat als bijvoeglijk naamwoord voor 'uren' en krijgt een -e: bestede. 'Besteedde' is de verleden tijd." },
        { q: "Welke schrijfwijze is goed?", a: ["AI-systeem", "AI systeem", "A.I.-systeem", "AIsysteem"], u: "Een samenstelling met een afkorting krijgt een koppelteken. AI schrijf je met hoofdletters en zonder punten." },
        { q: "Waar hoort een komma? 'Als bedrijven op tijd scholing aanbieden hoeft niemand achter te blijven.'", a: ["Na 'aanbieden'", "Na 'bedrijven'", "Na 'scholing'", "Er hoort geen komma"], u: "De bijzin staat vooraan. Op de grens staan twee persoonsvormen naast elkaar (aanbieden, hoeft): daar komt een komma." },
        { q: "In welke zin staan de komma's goed?", a: ["Mijn buurman, een ervaren vertaler, krijgt minder opdrachten.", "Mijn buurman een ervaren vertaler, krijgt minder opdrachten.", "Mijn buurman, een ervaren vertaler krijgt minder opdrachten.", "Mijn buurman een, ervaren vertaler, krijgt minder opdrachten."], u: "Een bijstelling staat tussen twee komma's." },
        { q: "Wat is het verschil tussen citeren en parafraseren?", a: ["Citeren is letterlijk met aanhalingstekens; parafraseren is in eigen woorden", "Bij citeren noem je de bron, bij parafraseren hoeft dat niet", "Parafraseren is letterlijk overnemen, citeren is samenvatten", "Citeren mag alleen in een uiteenzetting, nooit in een betoog"], u: "Bij allebei vermeld je de bron. Het verschil zit in letterlijk (citeren) of in eigen woorden (parafraseren)." },
        { q: "Welke vorm is goed? 'Vroeger ... een aparte afdeling alle brieven.' (typen)", a: ["typte", "typtte", "typde", "typten"], u: "Verleden tijd, enkelvoud (een afdeling). De p zit in ’t kofschip: typ + te = typte." },
        { q: "Welke zin is goed gespeld?", a: ["Het bedrijf biedt alle medewerkers een cursus aan.", "Het bedrijf bied alle medewerkers een cursus aan.", "Het bedrijf biedde alle medewerkers een cursus aan.", "Het bedrijf biet alle medewerkers een cursus aan."], u: "Het bedrijf = het, tegenwoordige tijd: stam (bied) + t = biedt. Bieden is sterk: de verleden tijd is 'bood'." },
        { q: "Wanneer zet je een komma vóór een bijzin met 'die'?", a: ["Als de bijzin extra informatie geeft die je kunt weglaten", "Altijd, want vóór 'die' staat steeds een komma", "Nooit, want vóór 'die' staat nooit een komma", "Alleen als de zin langer is dan twintig woorden"], u: "Een uitbreidende bijzin (weglaatbaar) staat tussen komma's. Een beperkende bijzin, die zegt welke je bedoelt, krijgt geen komma ervoor." }
      ],
      reken: [
        { gen: (R) => {
          const L = [
            ["Het bedrijf ... (bieden) alle medewerkers een cursus aan.", "biedt", ["Onderwerp: het bedrijf (= het), tegenwoordige tijd.", "Stam van bieden: bied.", "Stam + t = biedt."]],
            ["... (worden) je baan straks overgenomen door software?", "wordt", ["'Je' betekent hier 'jouw': het onderwerp is 'je baan' (= hij).", "Stam van worden: word.", "Stam + t = wordt."]],
            ["... (vinden) jij dat scholen AI moeten verbieden?", "vind", ["Onderwerp: jij, en het staat achter de persoonsvorm.", "Dan schrijf je alleen de stam.", "Stam van vinden: vind."]],
            ["Tien jaar geleden ... (verwachten) niemand dat een computer kon schrijven.", "verwachtte", ["Verleden tijd, enkelvoud (niemand).", "Verwachten zonder -en eindigt op t: die zit in ’t kofschip.", "Stam + te = verwacht + te = verwachtte."]],
            ["Het werk van een boekhouder is sterk ... (veranderen).", "veranderd", ["Na 'is' staat een voltooid deelwoord.", "De r van veranderen zit niet in ’t kofschip, dus -d.", "veranderd"]],
            ["De ... (besteden) uren krijg je niet terug.", "bestede", ["Het voltooid deelwoord (besteed) staat voor een zelfstandig naamwoord.", "Dan krijgt het een -e en schrijf je het zo kort mogelijk.", "bestede"]],
            ["Gisteren ... (antwoorden) de chatbot pas na een uur.", "antwoordde", ["Verleden tijd, enkelvoud.", "De d van antwoorden zit niet in ’t kofschip: stam + de.", "antwoord + de = antwoordde."]],
            ["Mijn oma ... (vinden) het werk als typiste vroeger erg leuk.", "vond", ["Verleden tijd van een sterk werkwoord: vinden, vond, gevonden.", "Een sterke verleden tijd krijgt geen t erachter.", "vond"]],
            ["Wat ... (gebeuren) er met mensen van wie de functie verdwijnt?", "gebeurt", ["Onderwerp: wat (= het), tegenwoordige tijd.", "Stam van gebeuren: gebeur.", "Stam + t = gebeurt."]],
            ["De software is vorig jaar uitgebreid ... (testen).", "getest", ["Na 'is' staat een voltooid deelwoord.", "De t van testen zit in ’t kofschip, dus het eindigt op een t.", "ge + test = getest (er komt geen tweede t bij)."]],
            ["... (worden) niet boos als een chatbot je mail beantwoordt.", "word", ["Dit is een gebiedende wijs: een advies zonder onderwerp.", "Dan schrijf je alleen de stam.", "word"]],
            ["Vroeger ... (gebruiken) kantoren typemachines.", "gebruikten", ["Verleden tijd, meervoud (kantoren).", "De k van gebruiken zit in ’t kofschip: stam + ten.", "gebruik + ten = gebruikten."]]
          ];
          const [zin, antwoord, stappen] = R.kies(L);
          return { q: `Typ de juiste vorm: ${zin}`, antwoord, hint: "Zoek eerst het onderwerp en de tijd. Is het een persoonsvorm of een voltooid deelwoord?", stappen };
        } },
        { q: "Schrijf als één woord, met of zonder koppelteken: AI + toepassing", antwoord: "AI-toepassing", hint: "Er staat een afkorting in de samenstelling.", stappen: ["Een samenstelling schrijf je aan elkaar.", "Met een afkorting erin komt er een koppelteken.", "AI-toepassing"] },
        { q: "Schrijf als één woord: personeel + tekort (met de verbindings-s die je hoort)", antwoord: "personeelstekort", hint: "Hoor je een s tussen de delen? Dan schrijf je die.", stappen: ["Een samenstelling schrijf je aan elkaar.", "Je hoort een s tussen de delen: personeel-s-tekort.", "personeelstekort"] }
      ],
      oefen: [
        { type: "sorteer", q: "Stam + t of alleen de stam?", groepen: ["stam + t", "alleen de stam"], items: [["Het bedrijf ... (bieden) een cursus aan.", 0], ["... (worden) je daar zenuwachtig van?", 1], ["... (vinden) je moeder dat goed?", 0], ["Ik ... (houden) tijd over.", 1], ["Je ... (worden) er handiger in als je oefent.", 0], ["... (antwoorden) eerlijk op de vragen!", 1]], u: "Je vóór de persoonsvorm: stam + t. Je achter de persoonsvorm: stam. Maar betekent 'je' 'jouw' (je moeder), dan is het niet het onderwerp en volgt stam + t." },
        { type: "invul", q: "Vul de juiste werkwoordsvormen in.", tekst: "Vroeger {werkte} mijn opa in een fabriek. Het werk is sinds die tijd sterk {veranderd}. Nu {wordt} veel werk door machines gedaan en {verdwijnt} een deel van de banen.", extra: ["werkten", "verandert", "word", "verdwijnd"], u: "werkte (verleden tijd, k in ’t kofschip), veranderd (voltooid deelwoord), wordt en verdwijnt (derde persoon, stam + t)." },
        { type: "koppel", q: "Koppel de kommaregel aan het voorbeeld.", paren: [["Tussen twee persoonsvormen", "Wie zich bijschoolt, loopt minder risico."], ["Opsomming", "Vertalers, juristen en programmeurs"], ["Bijstelling", "Mijn buurman, een vertaler, krijgt minder werk."], ["Vóór want", "..., want leerlingen gebruiken het later ook."], ["Geen komma", "Het is duidelijk dat AI het werk verandert."]], u: "De meeste komma's horen op een grens: tussen twee persoonsvormen, vóór een nieuwe hoofdzin of rond extra informatie." }
      ],
      open: [
        { q: "In bron 1 staat de zin: 'Kunstmatige intelligentie verandert vooral de inhoud van banen.' Een onderzoeker die in de bron wordt genoemd, zegt dit. Gebruik de informatie één keer als citaat en één keer als parafrase, allebei met bronvermelding.",
          a: "Citaat: De onderzoeker in bron 1 stelt: 'Kunstmatige intelligentie verandert vooral de inhoud van banen.' (Een citaat neem je letterlijk over, dus ook de woordvolgorde.) Parafrase: De onderzoeker uit bron 1 stelt dat AI eerder de taken binnen een baan verandert dan dat het banen laat verdwijnen.",
          punten: ["citaat letterlijk en tussen aanhalingstekens", "parafrase in eigen woorden zonder aanhalingstekens", "bij allebei de bron genoemd"] },
        { q: "Leg uit waarom 'Het werk is veranderd' met een d eindigt en 'AI verandert het werk' met een t.",
          a: "In 'Het werk is veranderd' is 'veranderd' een voltooid deelwoord (na 'is'). De r van veranderen zit niet in ’t kofschip, dus eindigt het op -d. In 'AI verandert het werk' is 'verandert' de persoonsvorm in de tegenwoordige tijd bij een onderwerp in de derde persoon enkelvoud (AI = het): stam + t.",
          punten: ["veranderd = voltooid deelwoord, ’t kofschip: -d", "verandert = persoonsvorm, derde persoon: stam + t"] }
      ],
      widgets: ["dt", "komma"]
    }
  ]
});
