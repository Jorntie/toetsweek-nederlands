// Gedeeld materiaal voor de widgets: argumentenbank, stellingen, signaalwoorden en de twee voorbeeldteksten.
// Alles is zelf geschreven. Er staan bewust geen cijfers, onderzoeken of bronnen in: alleen redeneringen en algemeen bekende voorbeelden.
(function () {
  "use strict";
  const N = (TW.NED = TW.NED || {});

  // ---------- soorten argumenten ----------
  N.TYPES = {
    feiten: "feiten",
    voorbeelden: "voorbeelden",
    gezag: "gezag",
    gevolgen: "gevolgen of nut",
    vergelijking: "vergelijking",
    normen: "normen en waarden"
  };

  // ---------- argumentenbank ----------
  // kant: kans (AI kost per saldo geen banen), bedreiging (AI kost banen), nuance (het hangt ervan af)
  N.BANK = [
    { id: "k1", kant: "kans", kort: "Taken, geen banen", type: "feiten",
      tekst: "AI neemt losse taken over en geen complete beroepen. Een baan bestaat uit veel verschillende taken en een deel daarvan vraagt om contact met mensen of om handwerk.",
      weer: "Als er genoeg taken wegvallen, heeft een bedrijf voor hetzelfde werk minder mensen nodig. Dan verdwijnen er toch banen." },
    { id: "k2", kant: "kans", kort: "Het ging eerder ook goed", type: "vergelijking",
      tekst: "Bij eerdere technische omwentelingen, zoals de komst van de stoommachine en de computer, verdwenen er beroepen, maar kwamen er ook nieuwe beroepen bij.",
      weer: "De vergelijking gaat mank: eerdere machines vervingen spierkracht, terwijl AI ook denkwerk overneemt. Bovendien gaat het nu veel sneller." },
    { id: "k3", kant: "kans", kort: "Hulp bij personeelstekorten", type: "gevolgen",
      tekst: "Door de vergrijzing is er in de zorg, het onderwijs en de techniek te weinig personeel. Als AI daar administratie en planning overneemt, blijft er meer tijd over voor het echte werk.",
      weer: "Het echte werk in die sectoren (verplegen, lesgeven, installeren) kan AI niet doen. Het tekort wordt er dus maar een beetje kleiner door." },
    { id: "k4", kant: "kans", kort: "Hogere productiviteit, nieuw werk", type: "gevolgen",
      tekst: "Als werknemers met AI meer kunnen doen in dezelfde tijd, worden producten en diensten goedkoper. Mensen houden dan geld over voor andere dingen en dat levert elders nieuw werk op.",
      weer: "Het is niet zeker dat klanten of werknemers van die besparing profiteren. Een bedrijf kan het voordeel ook als winst houden." },
    { id: "k5", kant: "kans", kort: "Nieuwe beroepen", type: "voorbeelden",
      tekst: "Er ontstaan nieuwe functies, bijvoorbeeld voor mensen die AI-systemen ontwikkelen, trainen, controleren en beveiligen.",
      weer: "Voor die nieuwe functies is vaak een hoge opleiding nodig. Wie zijn baan verliest, kan er niet zomaar in stappen." },
    { id: "k6", kant: "kans", kort: "Werk hoort zinvol te zijn", type: "normen",
      tekst: "Mensen horen hun tijd niet te besteden aan eentonig werk dat een machine ook kan doen. Als AI de saaie klussen overneemt, wordt werk interessanter en waardevoller.",
      weer: "Voor veel mensen is juist dat eenvoudige werk de manier om mee te doen. Als het verdwijnt, staan zij aan de kant." },
    { id: "b1", kant: "bedreiging", kort: "Ook denkwerk verdwijnt", type: "voorbeelden",
      tekst: "AI neemt voor het eerst ook denkwerk over, zoals schrijven, vertalen, programmeren en gegevens analyseren. Daardoor lopen nu ook hoogopgeleiden risico.",
      weer: "AI maakt fouten en begrijpt niet wat het schrijft. Er blijven mensen nodig die het resultaat controleren en de verantwoordelijkheid dragen." },
    { id: "b2", kant: "bedreiging", kort: "Het gaat te snel", type: "vergelijking",
      tekst: "De overgang van paard naar auto duurde tientallen jaren, zodat mensen tijd hadden om een ander vak te leren. Nieuwe AI-toepassingen zijn binnen enkele maanden overal beschikbaar. Omscholing houdt dat tempo niet bij.",
      weer: "Dat de techniek er snel is, betekent niet dat bedrijven haar ook snel invoeren. Regels, kosten en gewoontes remmen dat af." },
    { id: "b3", kant: "bedreiging", kort: "Minder kansen voor starters", type: "gevolgen",
      tekst: "AI neemt vooral eenvoudige beginnerstaken over. Daardoor wordt het voor starters moeilijker om een eerste baan te vinden en ervaring op te doen.",
      weer: "Starters zijn met deze techniek opgegroeid en kunnen er vaak juist handiger mee werken dan ervaren collega's." },
    { id: "b4", kant: "bedreiging", kort: "Oneerlijke verdeling", type: "normen",
      tekst: "De winst van AI komt vooral terecht bij de bedrijven die de systemen bezitten, terwijl werknemers het risico dragen. Dat is niet rechtvaardig.",
      weer: "Hoe de winst wordt verdeeld, is een politieke keuze (belastingen, cao's) en geen eigenschap van de techniek." },
    { id: "b5", kant: "bedreiging", kort: "Omscholen lukt niet iedereen", type: "feiten",
      tekst: "Niet iedereen kan zich omscholen. Wie ouder is of weinig opleiding heeft, vindt minder makkelijk ander werk als zijn functie verdwijnt.",
      weer: "Dat is een reden om omscholing en begeleiding beter te regelen, geen reden om de techniek tegen te houden." },
    { id: "n1", kant: "nuance", kort: "Het verschilt per sector", type: "voorbeelden",
      tekst: "Werk achter een beeldscherm verandert veel sneller dan werk met je handen of met mensen. Een loodgieter, een kapper en een verpleegkundige merken voorlopig minder van AI dan een vertaler.",
      weer: "Ook in die beroepen verschuift er werk, bijvoorbeeld doordat de planning en de administratie worden geautomatiseerd." },
    { id: "n2", kant: "nuance", kort: "Het hangt af van keuzes", type: "gevolgen",
      tekst: "Als bedrijven AI gebruiken om personeel te ondersteunen, verandert een baan. Als ze AI inzetten om op loonkosten te besparen, verdwijnt een baan. De gevolgen hangen dus af van keuzes.",
      weer: "Bedrijven die op prijs concurreren, hebben weinig keus: als de concurrent bespaart, moeten zij volgen." },
    { id: "n3", kant: "nuance", kort: "Korte en lange termijn", type: "gevolgen",
      tekst: "Banen kunnen snel verdwijnen, terwijl nieuwe banen pas later ontstaan. Het antwoord hangt dus af van de termijn waarnaar je kijkt.",
      weer: "Wie nu zijn baan verliest, heeft weinig aan de belofte dat het op lange termijn goed komt." },
    { id: "n4", kant: "nuance", kort: "De baan blijft, de inhoud verandert", type: "feiten",
      tekst: "Voor veel mensen verdwijnt de baan niet, maar verandert de inhoud: minder routine, meer controleren, overleggen en beslissen.",
      weer: "Niet iedereen ervaart dat als verbetering. Werk kan ook drukker worden als alleen de moeilijke taken overblijven." },
    { id: "g1", kant: "nuance", kort: "Gezag: gebruik je bron", type: "gezag", sjabloon: true,
      tekst: "Volgens [naam uit je bron], [functie of organisatie], [bewering in je eigen woorden]. Gebruik dit alleen met een bron die je echt hebt gekregen.",
      weer: "Eén deskundige is geen bewijs: is deze persoon deskundig op dit gebied en zijn andere deskundigen het ermee eens?" }
  ];
  N.KANTEN = { kans: "AI is vooral een kans", bedreiging: "AI is vooral een bedreiging", nuance: "Genuanceerd: het hangt ervan af" };

  N.STELLINGEN = [
    { t: "De angst dat AI ons massaal werkloos maakt, is overdreven.", kant: "kans" },
    { t: "AI is geen bedreiging voor de werkgelegenheid, maar een kans.", kant: "kans" },
    { t: "Scholen moeten leerlingen leren werken met AI in plaats van het te verbieden.", kant: "kans" },
    { t: "AI kost de komende tien jaar meer banen dan het oplevert.", kant: "bedreiging" },
    { t: "Werknemers van wie het werk door AI verdwijnt, moeten recht krijgen op betaalde omscholing.", kant: "bedreiging" },
    { t: "Bedrijven horen AI in te zetten om werknemers te ondersteunen, niet om hen te vervangen.", kant: "bedreiging" }
  ];
  N.HOOFDVRAGEN = [
    "Welke gevolgen heeft AI voor de werkgelegenheid?",
    "In hoeverre is AI een bedreiging voor banen?",
    "Hoe verandert AI het werk van de toekomst?",
    "Wie profiteert van AI op de werkvloer en wie betaalt de prijs?",
    "Maakt AI ons werk beter of maakt het ons overbodig?"
  ];

  // ---------- signaalwoorden per verband ----------
  N.VERBANDEN = [
    { id: "opsomming", naam: "opsomming", w: ["ten eerste", "ten tweede", "ten derde", "in de eerste plaats", "in de tweede plaats", "daarnaast", "bovendien", "ook", "verder", "ten slotte", "tot slot", "niet alleen", "daar komt bij", "tevens", "eveneens"] },
    { id: "tegenstelling", naam: "tegenstelling", w: ["maar", "echter", "toch", "daarentegen", "hoewel", "terwijl", "daar staat tegenover", "daartegenover", "aan de ene kant", "aan de andere kant", "enerzijds", "anderzijds", "desondanks", "niettemin", "integendeel", "ondanks", "weliswaar"] },
    { id: "oorzaak", naam: "oorzaak-gevolg", w: ["doordat", "daardoor", "waardoor", "hierdoor", "zodat", "als gevolg van", "als gevolg daarvan", "dat komt doordat", "het gevolg is", "leidt tot", "leiden tot", "te danken aan", "te wijten aan", "met als gevolg"] },
    { id: "reden", naam: "reden", w: ["omdat", "want", "aangezien", "daarom", "immers", "om die reden", "de reden", "namelijk", "vandaar"] },
    { id: "toelichting", naam: "toelichting of voorbeeld", w: ["bijvoorbeeld", "zoals", "ter illustratie", "denk aan", "neem", "dat wil zeggen", "met andere woorden", "een voorbeeld", "onder andere"] },
    { id: "voorwaarde", naam: "voorwaarde", w: ["als", "indien", "wanneer", "mits", "tenzij", "op voorwaarde dat", "in het geval dat", "stel dat"] },
    { id: "vergelijking", naam: "vergelijking", w: ["net als", "net zoals", "net zo", "evenals", "vergeleken met", "in vergelijking met", "hetzelfde geldt voor", "op dezelfde manier", "evenzo"] },
    { id: "conclusie", naam: "conclusie", w: ["dus", "concluderend", "hieruit volgt", "daaruit blijkt", "hieruit blijkt", "dat betekent dat", "de conclusie is", "al met al"] },
    { id: "samenvatting", naam: "samenvatting", w: ["kortom", "samengevat", "samenvattend", "om kort te gaan", "alles bij elkaar"] },
    { id: "doel", naam: "doel-middel", w: ["om te", "opdat", "daartoe", "door middel van", "met behulp van", "met als doel", "daarvoor", "teneinde"] },
    { id: "tijd", naam: "tijd", w: ["eerst", "daarna", "vervolgens", "toen", "vroeger", "tegenwoordig", "later", "voordat", "nadat", "inmiddels", "ondertussen", "sinds", "zodra", "in de toekomst", "straks"] }
  ];
  N.verband = (id) => N.VERBANDEN.find((v) => v.id === id);

  // ---------- voorbeeldteksten (snijtafel) ----------
  // f = functie, k = kernzin (letterlijk uit de alinea), sig = [signaalwoord zoals het in de alinea staat, verband], arg = soort argument
  N.TEKSTEN = [
    {
      id: "betoog", soort: "Betoog", titel: "AI pakt je taken af, niet je baan",
      over: "De schrijver verdedigt één stelling en wil je overtuigen.",
      functies: {
        inl: "Inleiding: aanleiding en stelling",
        arg: "Argument voor de stelling",
        tegen: "Tegenargument met weerlegging",
        slot: "Slot: samenvatting en conclusie"
      },
      alineas: [
        { f: "inl",
          t: "Een chatbot die in een paar seconden een sollicitatiebrief schrijft, software die röntgenfoto's beoordeelt en een programma dat zelf computercode maakt: wat een paar jaar geleden nog toekomstmuziek was, staat nu gewoon op je telefoon. Geen wonder dat veel mensen zich afvragen of er straks nog wel werk voor hen is. Toch is die angst overdreven. Kunstmatige intelligentie (AI) verandert ons werk ingrijpend, maar maakt ons niet massaal werkloos.",
          k: "Kunstmatige intelligentie (AI) verandert ons werk ingrijpend, maar maakt ons niet massaal werkloos.",
          sig: [["Toch", "tegenstelling"], ["maar", "tegenstelling"]],
          uit: "De opening is een rijtje herkenbare voorbeelden (drie stuks: een drieslag). Daarna komt de aanleiding: mensen maken zich zorgen. Met 'Toch' draait de schrijver naar de eigen mening en de laatste zin is de stelling. Je weet nu precies wat er verdedigd gaat worden." },
        { f: "arg", arg: "voorbeelden",
          t: "In de eerste plaats neemt AI vooral losse taken over en geen complete beroepen. Een baan bestaat namelijk uit tientallen verschillende taken, en lang niet al die taken kan een computer uitvoeren. Neem een huisarts. Een AI-programma kan het verslag van een gesprek uittypen of een verwijsbrief opstellen, maar het kan een bezorgde patiënt niet geruststellen en ook geen lichamelijk onderzoek doen. Daardoor blijft er juist meer tijd over voor de patiënten. Hetzelfde geldt voor docenten, monteurs en advocaten: het routinewerk verdwijnt, de kern van het vak blijft.",
          k: "In de eerste plaats neemt AI vooral losse taken over en geen complete beroepen.",
          sig: [["In de eerste plaats", "opsomming"], ["namelijk", "reden"], ["Neem", "toelichting"], ["maar", "tegenstelling"], ["Daardoor", "oorzaak"], ["Hetzelfde geldt voor", "vergelijking"]],
          uit: "De kernzin staat vooraan en bevat het argument. Daarna volgt uitleg ('namelijk'), een uitgewerkt voorbeeld (de huisarts) en een afronding die het voorbeeld breder trekt. Het argument steunt op voorbeelden uit de praktijk." },
        { f: "arg", arg: "vergelijking",
          t: "Daarnaast laat de geschiedenis zien dat nieuwe techniek niet alleen werk kost, maar ook nieuw werk oplevert. Toen de computer op kantoor verscheen, verdween het beroep van typiste vrijwel helemaal. Daar stond tegenover dat er programmeurs, webontwerpers en systeembeheerders nodig waren, beroepen die daarvoor niet eens bestonden. Met AI gaat het waarschijnlijk net zo. Nu al zoeken bedrijven mensen die AI-systemen kunnen trainen, controleren en beveiligen. Wie alleen telt welke banen verdwijnen, vergeet dus de banen die erbij komen.",
          k: "Daarnaast laat de geschiedenis zien dat nieuwe techniek niet alleen werk kost, maar ook nieuw werk oplevert.",
          sig: [["Daarnaast", "opsomming"], ["niet alleen", "opsomming"], ["Toen", "tijd"], ["Daar stond tegenover", "tegenstelling"], ["net zo", "vergelijking"], ["dus", "conclusie"]],
          uit: "Tweede argument, aangekondigd met 'Daarnaast'. De schrijver vergelijkt de komst van AI met de komst van de computer. Let op het voorzichtige 'waarschijnlijk': een vergelijking bewijst niets, maar maakt iets aannemelijk." },
        { f: "arg", arg: "gevolgen",
          t: "Bovendien hebben we AI hard nodig. Nederland vergrijst: steeds meer mensen gaan met pensioen. Als gevolg daarvan kampen de zorg, het onderwijs en de techniek nu al met een tekort aan personeel. Als AI daar een deel van de administratie en de planning overneemt, kunnen verpleegkundigen en leraren meer tijd besteden aan patiënten en leerlingen. In zulke sectoren is AI dus geen bedreiging, maar een oplossing.",
          k: "Bovendien hebben we AI hard nodig.",
          sig: [["Bovendien", "opsomming"], ["Als gevolg daarvan", "oorzaak"], ["Als", "voorwaarde"], ["dus", "conclusie"], ["maar", "tegenstelling"]],
          uit: "Derde argument, op basis van gevolgen en nut: AI lost een probleem op. Dit is het sterkste argument en het staat bewust als laatste van de drie, want wat de lezer het laatst leest, onthoudt hij het best." },
        { f: "tegen",
          t: "Tegenstanders wijzen erop dat sommige mensen wel degelijk hun baan verliezen. Dat klopt: het werk van medewerkers van een klantenservice, vertalers en administratief personeel kan nu al voor een groot deel door software worden gedaan. Bovendien schoolt niet iedereen van vijftig zich zomaar om tot programmeur. Dit is echter geen reden om AI tegen te houden, maar een reden om omscholing goed te regelen. Wanneer werkgevers en de overheid op tijd cursussen en begeleiding aanbieden, hoeft een verdwenen functie niet het einde van iemands loopbaan te betekenen.",
          k: "Dit is echter geen reden om AI tegen te houden, maar een reden om omscholing goed te regelen.",
          sig: [["Bovendien", "opsomming"], ["echter", "tegenstelling"], ["maar", "tegenstelling"], ["Wanneer", "voorwaarde"]],
          uit: "De schrijver noemt eerlijk het sterkste bezwaar ('Tegenstanders wijzen erop dat'), geeft toe wat ervan klopt ('Dat klopt') en weerlegt het daarna ('echter'). De kernzin staat hier niet vooraan, maar in het midden: het is de zin waarmee de weerlegging begint." },
        { f: "slot",
          t: "Kortom, AI neemt taken over en geen hele banen, nieuwe techniek brengt nieuwe beroepen met zich mee en in sectoren met personeelstekorten is slimme software meer dan welkom. Daarom is angst een slechte raadgever. We kunnen onze energie beter steken in bijscholing dan in doemscenario's. De vraag is niet of er straks nog werk is, maar of we bereid zijn om te blijven leren.",
          k: "Daarom is angst een slechte raadgever.",
          sig: [["Kortom", "samenvatting"], ["Daarom", "reden"], ["maar", "tegenstelling"]],
          uit: "Het slot vat de drie argumenten in één zin samen ('Kortom'), herhaalt het standpunt in andere woorden en eindigt met een uitsmijter: een zin die blijft hangen. Er komt geen nieuw argument meer bij." }
      ]
    },
    {
      id: "beschouwing", soort: "Beschouwing", titel: "Collega of concurrent?",
      over: "De schrijver onderzoekt een vraag van meerdere kanten en laat jou zelf oordelen.",
      functies: {
        inl: "Inleiding: aanleiding en hoofdvraag",
        kant1: "Eerste kant: de optimistische visie",
        kant2: "Tweede kant: de bezorgde visie",
        verd: "Verdieping: wie wint en wie verliest",
        voorw: "Voorwaarden: waar het van afhangt",
        slot: "Slot: afweging en voorzichtige conclusie"
      },
      alineas: [
        { f: "inl",
          t: "Vraag leerlingen in een examenklas wat ze later willen worden en je hoort nog steeds beroepen als verpleegkundige, advocaat of grafisch ontwerper. Toch weet niemand zeker hoe die beroepen er over tien jaar uitzien. Programma's die teksten schrijven, beelden maken en gegevens analyseren, worden in hoog tempo beter. Dat roept een vraag op waarover deskundigen het niet eens zijn: zorgt kunstmatige intelligentie (AI) straks voor minder werk, of vooral voor ander werk?",
          k: "Dat roept een vraag op waarover deskundigen het niet eens zijn: zorgt kunstmatige intelligentie (AI) straks voor minder werk, of vooral voor ander werk?",
          sig: [["Toch", "tegenstelling"], ["straks", "tijd"]],
          uit: "De opening is een herkenbare situatie. Daarna volgt de aanleiding (AI wordt snel beter) en de laatste zin is de hoofdvraag. Er staat geen mening in: de schrijver laat zelfs zien dat deskundigen het oneens zijn. Zo weet je dat er meerdere kanten komen." },
        { f: "kant1", arg: "gevolgen",
          t: "Volgens optimisten is er weinig reden tot zorg. Zij wijzen erop dat AI vooral routinetaken overneemt, zoals notuleren, plannen en het samenvatten van dossiers. Daardoor kunnen werknemers in dezelfde tijd meer doen en houden ze tijd over voor werk waarbij contact met mensen belangrijk is. Bovendien ontstaan er nieuwe functies, bijvoorbeeld voor mensen die AI-systemen ontwikkelen en controleren. In een land met personeelstekorten in de zorg en het onderwijs kan die extra hulp goed van pas komen.",
          k: "Volgens optimisten is er weinig reden tot zorg.",
          sig: [["zoals", "toelichting"], ["Daardoor", "oorzaak"], ["Bovendien", "opsomming"], ["bijvoorbeeld", "toelichting"]],
          uit: "De eerste kant. Let op de afstand: 'Volgens optimisten', 'Zij wijzen erop dat'. De schrijver geeft het standpunt van anderen weer, zonder te zeggen dat het klopt. De argumenten gaan over gevolgen: meer productiviteit en nieuwe functies." },
        { f: "kant2", arg: "vergelijking",
          t: "Daartegenover staan mensen die zich wel zorgen maken. Eerdere machines vervingen vooral spierkracht, terwijl AI ook denkwerk overneemt. Hierdoor lopen dit keer niet alleen fabrieksarbeiders risico, maar ook vertalers, juristen en programmeurs. Een tweede zorg is het tempo. De overgang van paard naar auto duurde tientallen jaren, zodat mensen de tijd hadden om een ander vak te leren. Nieuwe AI-toepassingen verspreiden zich daarentegen in enkele maanden over de hele wereld. Omscholing kan dat tempo niet altijd bijhouden.",
          k: "Daartegenover staan mensen die zich wel zorgen maken.",
          sig: [["Daartegenover", "tegenstelling"], ["terwijl", "tegenstelling"], ["Hierdoor", "oorzaak"], ["niet alleen", "opsomming"], ["zodat", "oorzaak"], ["daarentegen", "tegenstelling"]],
          uit: "De tweede kant krijgt net zoveel ruimte als de eerste: dat hoort bij een beschouwing. 'Daartegenover' kondigt de wending aan. De argumenten zijn vergelijkingen met vroeger: toen spierkracht en traag, nu denkwerk en snel." },
        { f: "verd", arg: "normen",
          t: "Daar komt bij dat de voor- en nadelen niet eerlijk verdeeld hoeven te zijn. Wie goed met AI kan werken, wordt productiever en dus aantrekkelijker voor werkgevers. Wie dat niet kan, of wie werk doet dat volledig te automatiseren is, komt moeilijker aan de slag. Zo kan er een kloof ontstaan tussen werknemers die van de techniek profiteren en werknemers die erdoor worden ingehaald. Of dat gebeurt, hangt echter niet alleen af van de techniek zelf.",
          k: "Daar komt bij dat de voor- en nadelen niet eerlijk verdeeld hoeven te zijn.",
          sig: [["Daar komt bij", "opsomming"], ["dus", "conclusie"], ["echter", "tegenstelling"]],
          uit: "De schrijver gaat een laag dieper: het gaat niet alleen om hoeveel werk er is, maar ook om wie ervan profiteert. Het woord 'eerlijk' laat zien dat hier een norm meespeelt. De laatste zin is een brugzin naar de volgende alinea." },
        { f: "voorw", arg: "gevolgen",
          t: "Veel hangt namelijk af van de keuzes die mensen maken. Als bedrijven AI gebruiken om hun personeel te ondersteunen, verandert de inhoud van een baan, maar blijft de baan bestaan. Als ze AI vooral inzetten om op loonkosten te besparen, verdwijnen er functies. Ook het onderwijs speelt een rol: naarmate scholen en werkgevers meer aandacht besteden aan bijscholing, wordt de stap naar ander werk kleiner. De gevolgen van AI zijn dus geen natuurverschijnsel, maar voor een deel het resultaat van beleid.",
          k: "Veel hangt namelijk af van de keuzes die mensen maken.",
          sig: [["namelijk", "reden"], ["Als", "voorwaarde"], ["maar", "tegenstelling"], ["Ook", "opsomming"], ["dus", "conclusie"]],
          uit: "Hier komt de nuance: het antwoord hangt af van voorwaarden. Twee zinnen met 'Als' zetten twee mogelijke uitkomsten naast elkaar. Dit is typisch voor een beschouwing: niet 'het is zo', maar 'onder deze voorwaarde gebeurt dit'." },
        { f: "slot",
          t: "Al met al is er geen eenvoudig antwoord op de vraag of AI banen kost. Waarschijnlijk verdwijnen er taken en soms hele functies, terwijl er op andere plekken werk bij komt. Wie daar het meest van merkt, verschilt per sector en per persoon. Zeker is alleen dat stilzitten geen optie is: hoe beter werknemers, scholen en bedrijven zich voorbereiden, hoe groter de kans dat AI een collega wordt in plaats van een concurrent.",
          k: "Al met al is er geen eenvoudig antwoord op de vraag of AI banen kost.",
          sig: [["Al met al", "conclusie"], ["terwijl", "tegenstelling"]],
          uit: "Het slot keert terug naar de hoofdvraag en weegt de kanten af. De conclusie is voorzichtig ('Waarschijnlijk', 'geen eenvoudig antwoord'). De laatste zin grijpt terug op de titel: zo is de tekst rond. De schrijver dringt geen mening op." }
      ]
    }
  ];

  // ---------- alineapuzzels ----------
  // stukken staan in de goede volgorde; hint = waaraan je de plek herkent
  N.PUZZELS = [
    {
      titel: "Betoog: AI in de klas", soort: "Zet de zes alinea's van dit korte betoog in de goede volgorde.",
      stukken: [
        ["Op veel scholen is het gebruik van AI-chatbots bij huiswerk verboden. Dat is begrijpelijk, maar onverstandig. Scholen moeten leerlingen juist leren hoe ze met AI werken.", "Inleiding: aanleiding (het verbod) en daarna de stelling."],
        ["Ten eerste gebruiken bijna alle bedrijven straks AI. Wie er op school nooit mee heeft geoefend, begint met een achterstand aan zijn eerste baan.", "'Ten eerste' kondigt het eerste argument aan."],
        ["Daarnaast leer je door ermee te werken ook wat AI niet kan. Een leerling die de fouten van een chatbot opspoort, traint precies het kritische denken dat het onderwijs wil bereiken.", "'Daarnaast' kan alleen na een eerder argument staan."],
        ["Bovendien werkt een verbod niet. Thuis gebruikt iedereen de techniek toch, alleen zonder begeleiding van een docent.", "'Bovendien' voegt nog een argument toe: het derde."],
        ["Tegenstanders vrezen dat leerlingen dan niet meer zelf leren schrijven. Dat risico bestaat, maar je voorkomt het niet met een verbod. Je voorkomt het door op school te toetsen zonder hulpmiddelen.", "Tegenargument en weerlegging komen na de eigen argumenten."],
        ["Kortom, AI verdwijnt niet meer. Een school die haar leerlingen wil voorbereiden op later, leert ze er verstandig mee om te gaan.", "'Kortom' vat samen: dit is het slot."]
      ]
    },
    {
      titel: "Beschouwing: de AI-collega", soort: "Zet de vijf alinea's van deze korte beschouwing in de goede volgorde.",
      stukken: [
        ["In steeds meer kantoren werkt een onzichtbare collega mee: software die mails beantwoordt en vergaderingen samenvat. Wat betekent dat voor de mensen die dit werk nu doen?", "Inleiding: aanleiding en daarna de hoofdvraag."],
        ["Aan de ene kant maakt die hulp het werk lichter. Wie minder tijd kwijt is aan administratie, houdt meer tijd over voor klanten en collega's.", "'Aan de ene kant' opent de eerste kant."],
        ["Aan de andere kant heeft een afdeling minder mensen nodig als de software een deel van het werk doet. Vooral eenvoudige functies komen dan onder druk te staan.", "'Aan de andere kant' hoort na 'Aan de ene kant'."],
        ["Welke kant de doorslag geeft, hangt af van de werkgever. Gebruikt die de gewonnen tijd voor beter werk, of voor een kleinere afdeling?", "Deze alinea verwijst terug naar beide kanten ('Welke kant')."],
        ["Al met al is de AI-collega geen vriend en geen vijand. Het is een hulpmiddel, en mensen bepalen wat ermee gebeurt.", "'Al met al' leidt de afweging in het slot in."]
      ]
    },
    {
      titel: "Eén alinea: van kernzin tot afronding", soort: "Zet de vier zinnen van deze alinea in de goede volgorde.",
      stukken: [
        ["Ten tweede levert nieuwe techniek ook nieuw werk op.", "Kernzin: het argument in één zin, met een signaalwoord."],
        ["Elke uitvinding moet namelijk worden gebouwd, verkocht, onderhouden en gecontroleerd.", "Uitleg: 'namelijk' legt uit waarom de kernzin klopt."],
        ["Zo kwamen er na de komst van de computer programmeurs en systeembeheerders bij.", "Voorbeeld: 'Zo' maakt de uitleg concreet."],
        ["Het is dus te eenvoudig om alleen te tellen welke banen verdwijnen.", "Afronding: 'dus' trekt de conclusie van de alinea."]
      ]
    }
  ];
})();
