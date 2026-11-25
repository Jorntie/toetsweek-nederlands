// Hoofdstuk 3: het onderwerp AI en werk, en de schrijfwerkplaats.
// Bewust zonder cijfers, onderzoeken of bronnen: alleen redeneringen en algemeen bekende voorbeelden.
TW.hoofdstuk({
  id: "ai", nr: "Deel 3", titel: "AI en werk: schrijven", icoon: "🤖",
  intro: "Het onderwerp van je tekst en de werkplaats waar je hem schrijft: begrippen, argumenten, een schrijfplan en een schrijfarena met klok.",
  onderdelen: [
    // ------------------------------------------------------------------
    {
      id: "onderwerp", nr: "7", titel: "Het onderwerp: AI en werk",
      kern: [
        "Om goed over AI en werk te schrijven, moet je de begrippen precies kennen en weten welke argumenten er spelen. Cijfers en onderzoeken haal je alleen uit bronnen die je krijgt.",
        { kop: "Begrippen" },
        "[[Kunstmatige intelligentie]] (AI): computersystemen die taken uitvoeren waarvoor normaal menselijk denkwerk nodig is, zoals taal begrijpen, patronen herkennen en voorspellen.",
        "[[Generatieve AI]] maakt zelf nieuwe inhoud: tekst, beelden, geluid of computercode. Een chatbot die een sollicitatiebrief schrijft, is daar een voorbeeld van.",
        "[[Automatisering]] is werk laten doen door machines of software. Dat gebeurt al sinds de industriële revolutie; nieuw is dat AI ook denkwerk kan overnemen.",
        { tabel: { kop: ["Begrip", "Betekenis"], rijen: [
          ["Taken tegenover banen", "Een baan bestaat uit veel taken. AI neemt vaak losse taken over, niet meteen de hele baan."],
          ["Routinetaak", "Taak die steeds op dezelfde manier gaat, zoals gegevens invoeren of afspraken plannen. Die is het makkelijkst te automatiseren."],
          ["Productiviteit", "Hoeveel iemand produceert in een bepaalde tijd. Met AI kan die stijgen."],
          ["Omscholing", "Een nieuw vak leren omdat je oude werk verdwijnt of sterk verandert."],
          ["Bijscholing", "Je kennis en vaardigheden bijwerken binnen je eigen vak."],
          ["Structurele werkloosheid", "Werkloosheid doordat de vaardigheden van werkzoekenden niet passen bij het werk dat er is, bijvoorbeeld door nieuwe techniek."],
          ["Krapte op de arbeidsmarkt", "Er zijn meer vacatures dan geschikte werkzoekenden."],
          ["Vergrijzing", "Het aandeel ouderen in de bevolking groeit, waardoor veel mensen met pensioen gaan."],
          ["Werkgelegenheid", "De hoeveelheid werk (banen) in een land, regio of sector."]
        ] } },
        { kop: "De argumenten op een rij" },
        "Er zijn drie hoofdlijnen. **Vooral een kans**: AI neemt taken over en geen banen, nieuwe techniek brengt nieuw werk en AI helpt bij personeelstekorten. **Vooral een bedreiging**: AI neemt ook denkwerk over, het gaat sneller dan omscholing kan bijhouden en starters en laagopgeleiden zijn de dupe. **Het hangt ervan af**: van de sector, van de termijn en van de keuzes van bedrijven en overheid.",
        { tip: "In de argumentenbank staat bij elk argument het soort argument en een mogelijke weerlegging. Bewaar met de ster de argumenten die je wilt gebruiken: ze verschijnen bovenaan in je schrijfplan." },
        { kop: "Stellingen en hoofdvragen" },
        { tabel: { kop: ["Betoog: stelling", "Beschouwing: hoofdvraag"], rijen: [
          ["De angst dat AI ons massaal werkloos maakt, is overdreven.", "Welke gevolgen heeft AI voor de werkgelegenheid?"],
          ["AI kost de komende tien jaar meer banen dan het oplevert.", "In hoeverre is AI een bedreiging voor banen?"],
          ["Werknemers van wie het werk door AI verdwijnt, moeten recht krijgen op betaalde omscholing.", "Hoe verandert AI het werk van de toekomst?"],
          ["Bedrijven horen AI in te zetten om werknemers te ondersteunen, niet om hen te vervangen.", "Wie profiteert van AI op de werkvloer en wie betaalt de prijs?"]
        ] } },
        { kop: "Werken met bronnen" },
        "Krijg je bronnen, gebruik ze dan als bewijs: noem wie iets zegt en waar ('Volgens ... in bron 2'). Controleer of de bron deskundig is en of het gegeven echt je argument steunt.",
        { let: "Zonder bronnen verzin je geen percentages, onderzoeken of deskundigen. Werk dan met redeneringen ('als ..., dan ...') en algemeen bekende voorbeelden, zoals de typiste die met de komst van de computer verdween of de vertaler die concurrentie krijgt van vertaalsoftware." },
        { voorbeeld: { titel: "een bewering onderbouwen", stappen: ["Bewering: AI neemt vooral taken over en geen hele banen.", "Uitleg: een baan bestaat uit veel taken, en een deel daarvan vraagt om contact met mensen of om handwerk.", "Voorbeeld: een huisarts laat software het gespreksverslag typen, maar onderzoekt de patiënt zelf.", "Met een bron (alleen als je die echt hebt): 'Dat sluit aan bij bron 3, waarin [naam, functie] stelt dat ...'"] } }
      ],
      begrippen: [
        ["Kunstmatige intelligentie (AI)", "Computersystemen die taken uitvoeren waarvoor normaal menselijk denkwerk nodig is."],
        ["Generatieve AI", "AI die zelf nieuwe tekst, beelden, geluid of computercode maakt."],
        ["Automatisering", "Werk laten doen door machines of software in plaats van door mensen."],
        ["Routinetaak", "Taak die steeds op dezelfde manier verloopt en daardoor makkelijk te automatiseren is."],
        ["Taak", "Eén onderdeel van het werk binnen een baan, zoals plannen, schrijven of klanten helpen."],
        ["Productiviteit", "De hoeveelheid werk of productie per werknemer in een bepaalde tijd."],
        ["Omscholing", "Een nieuw vak leren omdat je oude werk verdwijnt of sterk verandert."],
        ["Bijscholing", "Je kennis en vaardigheden bijwerken binnen je eigen vak."],
        ["Structurele werkloosheid", "Werkloosheid doordat vaardigheden van werkzoekenden niet passen bij het beschikbare werk."],
        ["Krapte op de arbeidsmarkt", "Situatie met meer vacatures dan geschikte werkzoekenden."],
        ["Vergrijzing", "Het aandeel ouderen in de bevolking neemt toe."],
        ["Werkgelegenheid", "De hoeveelheid beschikbaar werk in een land, regio of sector."]
      ],
      vragen: [
        { q: "Wat is generatieve AI?", a: ["AI die zelf nieuwe tekst, beelden of code maakt", "AI die alleen bestaande gegevens opslaat", "Een robot die zwaar werk in een fabriek doet", "Software die alleen rekensommen uitvoert"], u: "Generatieve AI genereert (maakt) nieuwe inhoud, zoals een chatbot die een tekst schrijft." },
        { q: "Waarom is het onderscheid tussen taken en banen belangrijk?", a: ["AI neemt vaak losse taken over, terwijl de baan blijft maar verandert", "AI kan alleen hele banen overnemen en nooit losse taken", "Taken hebben niets met werkgelegenheid te maken", "Banen zijn in Nederland wettelijk beschermd tegen AI"], u: "Als AI een deel van de taken overneemt, verandert een baan meestal eerst, in plaats van dat hij verdwijnt. Daar draait de discussie vaak om." },
        { q: "Wat is structurele werkloosheid?", a: ["Werkloosheid doordat vaardigheden niet passen bij het werk dat er is", "Werkloosheid die alleen in bepaalde seizoenen voorkomt", "Werkloosheid doordat mensen kort tussen twee banen zitten", "Werkloosheid doordat de economie tijdelijk minder groeit"], u: "Bij structurele werkloosheid past het aanbod van werknemers niet bij de vraag, bijvoorbeeld doordat nieuwe techniek andere vaardigheden vraagt." },
        { q: "Welk argument hoort bij de kant 'AI is vooral een kans'?", a: ["AI kan helpen bij personeelstekorten in de zorg en het onderwijs", "AI neemt voor het eerst ook denkwerk over", "Omscholing kan het tempo van AI niet bijhouden", "Starters vinden moeilijker een eerste baan"], u: "Hulp bij tekorten is een voordeel. De andere drie argumenten horen bij de kant 'bedreiging'." },
        { q: "Wat is een goede weerlegging van 'Bij eerdere uitvindingen ging het ook goed, dus nu ook'?", a: ["Eerdere machines vervingen spierkracht, AI neemt ook denkwerk over en gaat sneller", "Eerdere uitvindingen waren veel minder bekend dan AI nu", "Niemand weet precies wanneer de computer is uitgevonden", "Wie dat zegt, is waarschijnlijk zelf niet bang voor zijn baan"], u: "De weerlegging laat zien dat de vergelijking op een beslissend punt mank gaat. Het laatste antwoord is een persoonlijke aanval." },
        { q: "Je hebt geen bronnen gekregen. Welke onderbouwing is het best?", a: ["Een redenering met een bekend voorbeeld, zoals de verdwenen typiste", "Een percentage dat je ongeveer nog weet uit het nieuws", "'Uit onderzoek blijkt dat ...', zonder te zeggen welk onderzoek", "Een uitspraak van een bekende influencer op sociale media"], u: "Zonder bron kun je een cijfer of onderzoek niet controleren. Een logische redenering met een algemeen bekend voorbeeld is dan sterker en eerlijker." },
        { q: "Wat betekent krapte op de arbeidsmarkt?", a: ["Er zijn meer vacatures dan geschikte werkzoekenden", "Er zijn meer werkzoekenden dan vacatures", "De lonen dalen omdat er te veel personeel is", "Bedrijven mogen geen nieuwe mensen aannemen"], u: "Bij krapte zoeken werkgevers personeel dat er niet is. Dat argument gebruiken voorstanders van AI: het kan tekorten opvangen." },
        { q: "Wat bedoel je met 'de productiviteit stijgt door AI'?", a: ["Werknemers maken in dezelfde tijd meer of beter werk", "Er komen meer werknemers bij in een bedrijf", "Werknemers werken meer uren per week", "De prijs van software met AI daalt"], u: "Productiviteit is de opbrengst per werknemer per tijdseenheid." },
        { q: "Welke stelling is het meest geschikt voor een betoog?", a: ["Werknemers van wie het werk door AI verdwijnt, moeten recht krijgen op omscholing.", "AI is een onderwerp waarover tegenwoordig veel wordt gesproken.", "Welke gevolgen heeft AI voor de werkgelegenheid in Nederland?", "Sommige mensen vinden AI eng en anderen vinden het juist leuk."], u: "De eerste zin is een bewering waarover je kunt discussiëren. De tweede en vierde zijn vaststellingen, de derde is een hoofdvraag." },
        { q: "Welk argument is genuanceerd?", a: ["Werk achter een beeldscherm verandert sneller dan werk met je handen", "AI maakt over een paar jaar iedereen werkloos", "AI kost nooit en nergens ook maar één baan", "Alle beroepen veranderen even snel door AI"], u: "Het eerste argument maakt onderscheid tussen soorten werk. De andere zijn overdreven generalisaties." },
        { q: "In een bron zegt een hoogleraar arbeidseconomie dat AI vooral de inhoud van banen verandert. Hoe gebruik je dat het best?", a: ["Als argument op basis van gezag, met naam en bron, plus een eigen voorbeeld", "Je neemt de hele bron letterlijk over zonder aanhalingstekens", "Je laat de naam weg, zodat het jouw eigen idee lijkt", "Je schrijft dat 'alle deskundigen' het hiermee eens zijn"], u: "Een deskundige op dit gebied is een sterk argument op basis van gezag, mits je de bron noemt. Overnemen zonder bron is plagiaat, en 'alle deskundigen' is een overdrijving." }
      ],
      oefen: [
        { type: "sorteer", q: "Hoort dit argument bij kans, bedreiging of genuanceerd?", groepen: ["Kans", "Bedreiging", "Genuanceerd"], items: [["Taken, geen banen", 0], ["Nieuwe beroepen", 0], ["Hulp bij personeelstekorten", 0], ["Ook denkwerk verdwijnt", 1], ["Minder kansen voor starters", 1], ["Omscholen lukt niet iedereen", 1], ["Het verschilt per sector", 2], ["Korte en lange termijn", 2], ["Het hangt af van keuzes", 2]], u: "Een genuanceerd argument zegt niet 'goed' of 'slecht', maar 'het hangt af van ...'." },
        { type: "koppel", q: "Koppel het begrip aan de betekenis.", paren: [["Generatieve AI", "maakt zelf nieuwe tekst of beelden"], ["Omscholing", "een nieuw vak leren"], ["Krapte", "meer vacatures dan werkzoekenden"], ["Vergrijzing", "het aandeel ouderen groeit"], ["Productiviteit", "opbrengst per werknemer per uur"], ["Structurele werkloosheid", "vaardigheden passen niet bij het werk"]], u: "Gebruik deze begrippen precies in je tekst. Dat maakt je argumenten sterker." },
        { type: "invul", q: "Vul de begrippen in.", tekst: "Door de {vergrijzing} gaan veel mensen met pensioen, waardoor er in de zorg {krapte} ontstaat. AI kan daar helpen, omdat het {routinetaken} overneemt. Wie zijn werk ziet verdwijnen, heeft {omscholing} nodig.", extra: ["productiviteit", "automatisering"], u: "Let op het verband: vergrijzing (oorzaak) leidt tot krapte (gevolg)." }
      ],
      open: [
        { q: "Geef bij de stelling 'AI is geen bedreiging voor de werkgelegenheid, maar een kans' twee argumenten van een verschillend soort. Noem bij elk argument het soort.",
          a: "1. Door de vergrijzing is er in de zorg en het onderwijs te weinig personeel; als AI daar administratie en planning overneemt, houden verpleegkundigen en leraren meer tijd over voor hun eigenlijke werk (gevolgen of nut). 2. Toen de computer op kantoor kwam, verdween de typiste, maar kwamen er programmeurs en systeembeheerders bij; zo kan AI ook nieuwe beroepen opleveren (vergelijking).",
          punten: ["twee argumenten die de stelling steunen", "twee verschillende soorten, juist benoemd", "geen verzonnen cijfers"] },
        { q: "Schrijf een genuanceerde conclusie van twee of drie zinnen voor een beschouwing met de hoofdvraag 'In hoeverre is AI een bedreiging voor banen?'",
          a: "Al met al is AI niet voor iedereen in dezelfde mate een bedreiging. Werk achter een beeldscherm verandert snel en soms verdwijnen functies, terwijl beroepen met veel menselijk contact of handwerk voorlopig blijven. Hoe groot de gevolgen worden, hangt vooral af van de keuzes van bedrijven en van de mogelijkheden om je om te scholen.",
          punten: ["signaalwoord van conclusie (al met al)", "voorzichtig geformuleerd, geen stellige mening", "beide kanten komen terug", "antwoord op de hoofdvraag met een voorwaarde"] }
      ],
      widgets: ["argumentenbank", "snijtafel"]
    },
    // ------------------------------------------------------------------
    {
      id: "schrijven", nr: "8", titel: "Schrijven: van plan tot nagekeken tekst",
      kern: [
        "Op de toets heb je beperkt tijd. Met een vast stappenplan raak je niet in paniek en houd je tijd over om na te lezen.",
        { voorbeeld: { titel: "stappenplan voor de toets", stappen: ["Lees de opdracht twee keer: welke tekstsoort, hoeveel woorden, voor welke lezer, en krijg je bronnen?", "Kies je stelling of hoofdvraag en schrijf die meteen op.", "Maak een bouwplan: per alinea één steekwoord voor het argument of de kant, plus het signaalwoord waarmee je begint.", "Schrijf de tekst: inleiding, middenstuk (één alinea per argument of kant) en slot. De titel als laatste.", "Lees na in rondes: eerst opbouw en inhoud, dan formuleren, dan d/t en komma's.", "Tel je woorden en controleer of je binnen de opdracht blijft."] } },
        { widget: "verdeler" },
        { kop: "Een bouwplan" },
        "Een [[bouwplan]] is je tekst in [[steekwoorden]]: per alinea het onderwerp, het soort argument en het signaalwoord. Met een plan schrijf je sneller en blijft je tekst samenhangend.",
        { tabel: { kop: ["Alinea", "Inhoud", "Begint met"], rijen: [
          ["1 Inleiding", "voorbeelden van AI, aanleiding (zorgen over werk), stelling: de angst is overdreven", "(opening)"],
          ["2", "AI neemt taken over, geen banen (voorbeeld: huisarts)", "In de eerste plaats"],
          ["3", "nieuwe techniek, nieuw werk (vergelijking met de computer)", "Daarnaast"],
          ["4", "hulp bij personeelstekorten (gevolgen)", "Bovendien"],
          ["5", "tegenargument: sommigen verliezen hun baan; weerlegging: regel omscholing", "Tegenstanders wijzen erop ... echter"],
          ["6 Slot", "samenvatting, standpunt, uitsmijter over blijven leren", "Kortom"]
        ] } },
        { kop: "Nalezen in drie rondes" },
        { tabel: { kop: ["Ronde", "Waar let je op?"], rijen: [
          ["1 Opbouw en inhoud", "Staat de stelling of hoofdvraag in de inleiding? Heeft elke alinea één onderwerp en een kernzin? Geen nieuw argument in het slot?"],
          ["2 Formuleren", "Lange zinnen knippen, spreektaal schrappen, verwijswoorden controleren, 'ik vind' weghalen."],
          ["3 Spelling", "Alle persoonsvormen en voltooide deelwoorden op d/t, komma's tussen persoonsvormen, hoofdletters, samenstellingen."]
        ] } },
        { tip: "Oefen in de schrijfarena met de klok aan en het woorddoel dat je op de toets verwacht. Zo merk je hoeveel woorden je per minuut haalt." },
        { let: "De automatische tips in de schrijfarena zijn een hulpmiddel. Een computer kan niet zien of je redenering klopt of of elke d/t goed is. Lees altijd zelf na." }
      ],
      begrippen: [
        ["Bouwplan", "Je tekst in steekwoorden: per alinea het onderwerp, het soort argument en het signaalwoord."],
        ["Steekwoorden", "Losse kernwoorden waarmee je een idee noteert, zonder hele zinnen."],
        ["Schrijfopdracht", "De vraag van de toets: tekstsoort, onderwerp, aantal woorden, doelgroep en eventueel bronnen."],
        ["Woordaantal", "Het aantal woorden dat de opdracht vraagt; blijf er ongeveer binnen 10% van."],
        ["Nalezen in rondes", "Je tekst meerdere keren nalezen, elke keer met één aandachtspunt."],
        ["Beoordelingsmodel", "Lijst met punten waarop een tekst wordt beoordeeld, zoals inhoud, opbouw, taalgebruik en spelling."],
        ["Samenhang", "De mate waarin zinnen en alinea's logisch op elkaar aansluiten, onder meer door signaalwoorden."],
        ["Doelgroep", "De lezers voor wie je schrijft; die bepalen je woordkeus en toon."]
      ],
      vragen: [
        { q: "Wat doe je als eerste op de toets?", a: ["De opdracht goed lezen: tekstsoort, woorden, lezer en bronnen", "Meteen de inleiding uitschrijven om tijd te winnen", "Eerst een mooie, prikkelende titel bedenken", "De bronnen alvast overschrijven in je tekst"], u: "Wie de opdracht verkeerd leest, schrijft misschien een betoog terwijl er een beschouwing werd gevraagd. Lees de opdracht daarom eerst zorgvuldig." },
        { q: "Waarom maak je een bouwplan?", a: ["Zodat je tekst samenhangt en je niet vastloopt tijdens het schrijven", "Omdat je het plan inlevert in plaats van de tekst zelf", "Omdat je met een plan altijd meer woorden haalt", "Omdat de docent alleen het plan beoordeelt"], u: "Met een plan weet je bij elke alinea wat erin komt. Dat scheelt tijd en voorkomt herhaling." },
        { q: "Je moet 600 woorden schrijven. Hoe lang is een redelijke inleiding?", a: ["Ongeveer 60 tot 90 woorden", "Ongeveer 300 woorden", "Ongeveer 10 woorden", "Ongeveer 200 tot 250 woorden"], u: "De inleiding is ongeveer 10 tot 15% van de tekst: 10% van 600 is 60 en 15% van 600 is 90." },
        { q: "Hoe lees je je tekst het best na?", a: ["In rondes, met per ronde één aandachtspunt", "Eén keer snel, van begin tot eind", "Alleen de inleiding en het slot", "Niet, want nalezen kost alleen maar tijd"], u: "Wie op alles tegelijk let, ziet weinig. Met één aandachtspunt per ronde vind je meer fouten." },
        { q: "Het is tien minuten voor het einde en je slot staat er nog niet. Wat doe je?", a: ["Een kort slot schrijven met samenvatting en conclusie, dan nalezen", "Doorgaan met een extra argument in het middenstuk", "De inleiding herschrijven zodat die mooier wordt", "Het slot weglaten, want dat telt toch niet mee"], u: "Een tekst zonder slot is niet af. Een kort slot met samenvatting en conclusie is belangrijker dan een extra argument." },
        { q: "Wat is de doelgroep van je tekst?", a: ["De lezers voor wie je de tekst schrijft", "De mensen over wie je tekst gaat", "De schrijvers van de bronnen die je krijgt", "De klasgenoten die dezelfde toets maken"], u: "De doelgroep staat vaak in de opdracht, bijvoorbeeld 'lezers van een krant' of 'leerlingen van je school'. Die bepaalt je toon en woordkeus." },
        { q: "Je hebt 90 minuten voor 500 woorden. Welke verdeling is verstandig?", a: ["Ongeveer 15 minuten plannen, 55 schrijven, 20 nalezen", "Meteen 90 minuten schrijven, zonder plan vooraf", "45 minuten plannen, 45 schrijven en niet nalezen", "80 minuten schrijven en 10 minuten een titel kiezen"], u: "Plan eerst kort en houd altijd tijd over om na te lezen. Daar haal je de meeste punten voor taalgebruik en spelling." },
        { q: "Wat kan de automatische terugkoppeling in de schrijfarena niet beoordelen?", a: ["Of je redenering logisch is en je argumenten kloppen", "Hoeveel woorden je tekst heeft", "Hoe lang je zinnen gemiddeld zijn", "Welke signaalwoorden je gebruikt"], u: "Tellen en zoeken kan een computer goed. Of een argument klopt en of je redenering logisch is, moet je zelf beoordelen." }
      ],
      oefen: [
        { type: "volgorde", q: "Zet de stappen voor de toets in de goede volgorde.", items: ["Opdracht lezen", "Stelling of hoofdvraag kiezen", "Bouwplan maken", "Tekst schrijven", "Nalezen in rondes", "Woorden tellen en inleveren"], u: "Eerst denken, dan schrijven, dan controleren." },
        { type: "sorteer", q: "In welke nakijkronde let je hierop?", groepen: ["Opbouw en inhoud", "Formuleren en stijl", "Spelling en interpunctie"], items: [["Staat de stelling in de inleiding?", 0], ["Staat er geen nieuw argument in het slot?", 0], ["Zijn er zinnen van meer dan 25 woorden?", 1], ["Staat er spreektaal in?", 1], ["Kloppen de d's en t's?", 2], ["Staat er een komma tussen twee persoonsvormen?", 2]], u: "Met één bril per ronde zie je meer." }
      ],
      open: [
        { q: "Maak in steekwoorden een bouwplan voor een beschouwing van 500 woorden met de hoofdvraag 'Hoe verandert AI het werk van de toekomst?'",
          a: "1 Inleiding (± 60 woorden): opening met een vraag aan de lezer; aanleiding: chatbots overal; hoofdvraag. 2 Kant 1 (± 100): routinetaken verdwijnen, meer tijd voor mensenwerk (gevolgen); 'Volgens optimisten'. 3 Kant 2 (± 100): ook denkwerk, tempo te hoog voor omscholing (vergelijking); 'Daartegenover'. 4 Verdieping (± 100): verschil per sector, kantoorwerk tegenover handwerk (voorbeelden); 'Daar komt bij'. 5 Voorwaarden (± 80): keuzes van werkgevers en scholing; 'Veel hangt af van'. 6 Slot (± 60): afweging, voorzichtig antwoord, blik op de toekomst; 'Al met al'.",
          punten: ["inleiding met hoofdvraag, middenstuk, slot", "minstens twee kanten met ongeveer even veel ruimte", "per alinea een signaalwoord", "woorden verdeeld over de alinea's (samen ± 500)"] }
      ],
      widgets: ["schrijfplan", "schrijfarena"]
    }
  ]
});
