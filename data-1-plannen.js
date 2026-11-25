// Hoofdstuk 1: plannen en opbouwen. Tekstsoort kiezen, opbouw van de tekst en argumenteren.
TW.hoofdstuk({
  id: "plannen", nr: "Deel 1", titel: "Plannen en opbouwen", icoon: "🧭",
  intro: "Voordat je schrijft: welke tekstsoort kies je, hoe bouw je de tekst op en hoe overtuig je met argumenten?",
  onderdelen: [
    // ------------------------------------------------------------------
    {
      id: "tekstsoort", nr: "1", titel: "Betoog, beschouwing of uiteenzetting",
      kern: [
        "Bij een schrijfopdracht kies je eerst de [[tekstsoort]]: die bepaalt je doel, je opbouw en je toon.",
        "Een [[betoog]] wil de lezer **overtuigen** van één standpunt. In de inleiding neem je een [[stelling]] in, in het middenstuk verdedig je die met argumenten.",
        "Een [[beschouwing]] wil de lezer **laten nadenken**. Je belicht het onderwerp van meerdere kanten en geeft hoogstens in het slot voorzichtig een eigen oordeel.",
        "Een [[uiteenzetting]] wil **informeren**: je legt uit hoe iets zit, zonder mening. Die schrijf je op deze toets niet, maar je moet hem kunnen onderscheiden.",
        { fig: "spectrum", bij: "Van links naar rechts neemt de eigen mening van de schrijver toe." },
        { kop: "Stelling of hoofdvraag" },
        "Een stelling is een bewering waarover je van mening kunt verschillen, bijvoorbeeld: 'AI kost de komende tien jaar meer banen dan het oplevert.'",
        "Een [[hoofdvraag]] is een open vraag die je van meerdere kanten bekijkt, bijvoorbeeld: 'In hoeverre is AI een bedreiging voor banen?' Het antwoord volgt pas in het slot.",
        { tabel: { kop: ["", "Betoog", "Beschouwing"], rijen: [
          ["Doel", "overtuigen", "laten nadenken, kanten laten zien"],
          ["Inleiding", "aanleiding + stelling", "aanleiding + hoofdvraag"],
          ["Middenstuk", "argumenten voor de stelling, tegenargument met weerlegging", "standpunten en argumenten van verschillende kanten, ongeveer even veel ruimte"],
          ["Slot", "samenvatting, standpunt herhalen", "afweging, voorzichtige conclusie"],
          ["Toon", "stellig, maar zakelijk", "evenwichtig, afstandelijk, voorzichtig"],
          ["Typische woorden", "daarom, dus, het is duidelijk dat", "volgens voorstanders, aan de andere kant, waarschijnlijk"]
        ] } },
        { fig: "skelet", bij: "De bouwtekening van een betoog en van een beschouwing." },
        { tip: "Mag je kiezen? Heb je een duidelijke mening en twee of drie sterke argumenten, kies dan een betoog. Zie je vooral 'het hangt ervan af', kies dan een beschouwing." },
        { let: "Een beschouwing is geen betoog zonder het woord 'ik'. Wijzen bijna alle argumenten één kant op, dan is het een [[verkapt betoog]], ook als er nergens 'ik vind' staat." },
        { ezel: "Betoog: je bent een advocaat die voor één kant pleit. Beschouwing: je bent een rechter die beide kanten hoort en afweegt. Uiteenzetting: je bent een docent die uitlegt." }
      ],
      begrippen: [
        ["Tekstsoort", "Soort tekst met een eigen doel en opbouw, zoals een betoog, een beschouwing of een uiteenzetting."],
        ["Betoog", "Tekst waarin de schrijver de lezer wil overtuigen van één standpunt, met argumenten."],
        ["Beschouwing", "Tekst waarin de schrijver een onderwerp van meerdere kanten belicht en de lezer laat nadenken."],
        ["Uiteenzetting", "Informatieve tekst die uitlegt hoe iets zit, zonder mening van de schrijver."],
        ["Stelling", "Bewering waarover je van mening kunt verschillen; staat in de inleiding van een betoog."],
        ["Hoofdvraag", "Open vraag die in een beschouwing van meerdere kanten wordt bekeken."],
        ["Standpunt", "De mening die de schrijver over een kwestie heeft."],
        ["Schrijfdoel", "Wat je met je tekst wilt bereiken: informeren, overtuigen of laten nadenken."],
        ["Doelgroep", "De lezers voor wie je de tekst schrijft."],
        ["Toon", "De manier waarop je tekst klinkt, bijvoorbeeld stellig, voorzichtig, zakelijk of persoonlijk."],
        ["Verkapt betoog", "Tekst die zich voordoet als beschouwing, maar eigenlijk één kant verdedigt."],
        ["Afweging", "Het tegen elkaar afzetten van de kanten om tot een voorzichtig oordeel te komen."]
      ],
      vragen: [
        { q: "Wat is het hoofddoel van een betoog?", a: ["De lezer overtuigen van één standpunt", "De lezer informeren over hoe iets werkt", "Verschillende visies naast elkaar zetten", "De lezer vermaken met een verhaal"], u: "Een betoog verdedigt een stelling en wil de lezer overtuigen. Informeren is het doel van een uiteenzetting, visies naast elkaar zetten past bij een beschouwing." },
        { q: "Wat is het hoofddoel van een beschouwing?", a: ["De lezer laten nadenken over meerdere kanten", "De lezer overhalen tot één bepaalde mening", "Alleen feiten geven, zonder afweging", "Een probleem oplossen met een stappenplan"], u: "In een beschouwing belicht je meerdere kanten en laat je de lezer nadenken. Overhalen is het doel van een betoog." },
        { q: "Welke zin is een goede stelling voor een betoog?", a: ["Bedrijven horen AI in te zetten om werknemers te ondersteunen, niet om hen te vervangen.", "In hoeverre heeft AI gevolgen voor de werkgelegenheid in Nederland?", "Veel bedrijven gebruiken tegenwoordig software met kunstmatige intelligentie.", "In deze tekst ga ik het hebben over AI en de gevolgen voor werk."], u: "Een stelling is een bewering waarover je van mening kunt verschillen. De tweede zin is een hoofdvraag, de derde een feit (daar valt niet over te discussiëren) en de vierde een aankondiging." },
        { q: "Welke zin is een goede hoofdvraag voor een beschouwing?", a: ["Welke gevolgen heeft AI voor de werkgelegenheid?", "Waarom is AI zo slecht voor werknemers?", "AI kost meer banen dan het oplevert.", "Wanneer werd de eerste chatbot gemaakt?"], u: "Een hoofdvraag is open en neutraal. De tweede vraag verraadt al een mening, de derde zin is een stelling en de vierde vraag heeft maar één feitelijk antwoord." },
        { q: "Waar staat in een beschouwing het eigen oordeel van de schrijver?", a: ["Hoogstens in het slot, voorzichtig geformuleerd", "In de inleiding, direct na de aanleiding", "In elke alinea van het middenstuk", "In de titel, zodat de lezer het meteen weet"], u: "In een beschouwing blijft de mening van de schrijver op de achtergrond. Een oordeel komt hoogstens in het slot, met woorden als 'waarschijnlijk' of 'veel hangt af van'." },
        { q: "Een tekst met de titel 'Zo maakt een chatbot een tekst' legt stap voor stap uit hoe zo'n programma werkt. Welke tekstsoort is dit?", a: ["Uiteenzetting", "Betoog", "Beschouwing", "Verkapt betoog"], u: "De tekst legt uit hoe iets werkt, zonder standpunt of afweging. Dat is een uiteenzetting." },
        { q: "Een 'beschouwing' heeft drie alinea's over de gevaren van AI en één zin over de kansen. Wat is het probleem?", a: ["De kanten zijn niet in balans: het is een verkapt betoog", "Een beschouwing mag helemaal geen nadelen noemen", "Er hoort een stelling in de inleiding te staan", "Een beschouwing heeft altijd precies vijf alinea's"], u: "In een beschouwing krijgen de kanten ongeveer even veel ruimte. Als één kant overheerst, verdedig je eigenlijk een standpunt." },
        { q: "Welke formulering past het best in een beschouwing?", a: ["Voorstanders wijzen erop dat AI saai werk kan overnemen.", "Het is overduidelijk dat AI al het saaie werk overneemt.", "Iedereen die nadenkt, ziet dat AI een zegen is voor werk.", "AI neemt saai werk over, dat staat gewoon vast."], u: "In een beschouwing geef je standpunten met afstand weer ('Voorstanders wijzen erop dat'). De andere zinnen zijn stellig en bevatten zelfs drogredenen." },
        { q: "Wat is het verschil tussen een stelling en een hoofdvraag?", a: ["Een stelling is een bewering, een hoofdvraag een open vraag", "Een stelling staat in het slot, een hoofdvraag in de inleiding", "Een stelling is een feit, een hoofdvraag is een mening", "Er is geen verschil: beide eindigen op een vraagteken"], u: "Een stelling (betoog) is een bewering waarover je kunt discussiëren. Een hoofdvraag (beschouwing) is een open vraag die je van meerdere kanten bekijkt. Allebei staan ze in de inleiding." },
        { q: "Welke toon past het best bij een betoog voor de toets?", a: ["Stellig en overtuigend, maar zakelijk", "Boos en emotioneel, zodat de lezer schrikt", "Twijfelend, zodat je niet arrogant overkomt", "Grappig en informeel, zoals in een appje"], u: "Een betoog is stellig: je staat achter je standpunt. Maar je overtuigt met argumenten en een zakelijke toon, niet met emoties of spreektaal." }
      ],
      oefen: [
        { type: "sorteer", q: "Hoort dit kenmerk bij een betoog of bij een beschouwing?", groepen: ["Betoog", "Beschouwing"], items: [["Stelling in de inleiding", 0], ["Hoofdvraag in de inleiding", 1], ["Tegenargument met weerlegging", 0], ["Kanten krijgen even veel ruimte", 1], ["Voorzichtige conclusie in het slot", 1], ["Standpunt herhalen in het slot", 0], ["Doel: overtuigen", 0], ["Doel: laten nadenken", 1]], u: "Betoog: één standpunt verdedigen. Beschouwing: kanten belichten en afwegen." },
        { type: "sorteer", q: "Is dit een stelling, een hoofdvraag of geen van beide?", groepen: ["Stelling", "Hoofdvraag", "Geen van beide"], items: [["Scholen moeten leerlingen leren werken met AI.", 0], ["Hoe verandert AI het werk van de toekomst?", 1], ["Chatbots kunnen teksten schrijven.", 2], ["De angst voor massale werkloosheid door AI is overdreven.", 0], ["In hoeverre is AI een bedreiging voor banen?", 1], ["In deze tekst bespreek ik AI.", 2]], u: "Een feit of een aankondiging is geen stelling: daar valt niet over te discussiëren en er valt niets af te wegen." },
        { type: "koppel", q: "Koppel de tekstsoort aan de rol van de schrijver.", paren: [["Betoog", "advocaat die voor één kant pleit"], ["Beschouwing", "rechter die beide kanten afweegt"], ["Uiteenzetting", "docent die uitlegt hoe iets zit"]], u: "Het doel van de tekst bepaalt de rol: overtuigen, afwegen of uitleggen." }
      ],
      open: [
        { q: "De opdracht luidt: 'Schrijf een tekst over de vraag of kunstmatige intelligentie gevolgen heeft voor de werkgelegenheid.' Je mag kiezen tussen een betoog en een beschouwing. Leg uit hoe je kiest en formuleer bij je keuze een stelling of een hoofdvraag.",
          a: "Ik kies een betoog als ik een duidelijke mening heb en daar twee of drie sterke argumenten voor kan geven. Mijn stelling is dan bijvoorbeeld: 'De angst dat AI ons massaal werkloos maakt, is overdreven.' Zie ik vooral dat het ervan afhangt (per sector, per termijn), dan kies ik een beschouwing met de hoofdvraag: 'In hoeverre is AI een bedreiging voor banen?'",
          punten: ["keuze gekoppeld aan een duidelijke mening (betoog) of aan meerdere kanten (beschouwing)", "stelling is een bewering waarover je kunt discussiëren", "of: hoofdvraag is open en neutraal"] },
        { q: "Leg uit waarom 'Waarom is AI slecht voor werknemers?' geen goede hoofdvraag is voor een beschouwing. Verbeter de vraag.",
          a: "De vraag gaat er al van uit dat AI slecht is voor werknemers. Daarmee kies je één kant en dat past niet bij een beschouwing. Beter is een open, neutrale vraag, zoals: 'Welke gevolgen heeft AI voor werknemers?' of 'In hoeverre is AI een bedreiging voor werknemers?'",
          punten: ["de vraag verraadt een mening (niet neutraal)", "een beschouwing belicht meerdere kanten", "verbetering is open en neutraal"] }
      ],
      widgets: ["snijtafel"]
    },
    // ------------------------------------------------------------------
    {
      id: "opbouw", nr: "2", titel: "Opbouw: inleiding, middenstuk, slot en titel",
      kern: [
        "Elke tekst heeft een [[inleiding]], een [[middenstuk]] en een [[slot]]. Daarboven staat een [[titel]].",
        { fig: "opbouw", bij: "Een richtlijn voor de verdeling van je woorden." },
        { kop: "De inleiding" },
        "Een inleiding trekt de aandacht, geeft de [[aanleiding]] (waarom gaat het hier nu over?) en noemt de stelling of de hoofdvraag.",
        { tabel: { kop: ["Manier van openen", "Voorbeeld bij AI en werk"], rijen: [
          ["Kort voorbeeld of verhaal", "Een vertaler die opeens geen opdrachten meer krijgt."],
          ["Actuele aanleiding", "Chatbots die sinds kort voor iedereen beschikbaar zijn."],
          ["Vraag aan de lezer", "Bestaat het beroep waarvoor jij gaat studeren over tien jaar nog?"],
          ["Prikkelende uitspraak", "'De typiste is verdwenen. De vertaler is de volgende.'"],
          ["Tegenstelling", "De één ziet massale werkloosheid, de ander een oplossing voor personeelstekorten."],
          ["Citaat uit een bron", "Alleen als je bronnen krijgt, met de naam van wie het zegt."]
        ] } },
        { let: "Begin niet met 'In deze tekst ga ik het hebben over ...' of met een woordenboekdefinitie. Dat trekt geen aandacht en kost woorden." },
        { kop: "Het middenstuk" },
        "Elke alinea heeft één onderwerp. De [[kernzin]] noemt dat onderwerp; meestal is het de eerste zin. Een nieuwe alinea maak je zichtbaar met een witregel of door de eerste regel te laten inspringen.",
        { fig: "alinea", bij: "Een sterke alinea in vier lagen." },
        "De volgorde van de alinea's volgt een vaste [[tekststructuur]]. Kies de structuur die bij je tekstsoort past:",
        { tabel: { kop: ["Tekststructuur", "Vaste onderdelen"], rijen: [
          ["Betogende structuur (betoog)", "stelling, argumenten, tegenargument en weerlegging, conclusie"],
          ["Voor-nadelenstructuur (beschouwing)", "onderwerp, voordelen, nadelen, afweging"],
          ["Probleem-oplossings­structuur (beschouwing of betoog)", "probleem, oorzaken, gevolgen, oplossingen"],
          ["Vraag-antwoordstructuur (beschouwing)", "hoofdvraag, deelvragen met antwoorden, conclusie"],
          ["Vergelijkings­structuur (beschouwing)", "twee zaken, overeenkomsten en verschillen"],
          ["Verklarings­structuur (uiteenzetting)", "verschijnsel, oorzaken of verklaring"]
        ] } },
        { kop: "Het slot en de titel" },
        "Het slot rondt af: een korte samenvatting, de conclusie (betoog: standpunt in andere woorden; beschouwing: afweging en voorzichtig antwoord) en eventueel een [[uitsmijter]], zoals een oproep, een blik op de toekomst of een verwijzing naar je opening.",
        "Een goede titel is kort, maakt nieuwsgierig en past bij de inhoud. Een [[ondertitel]] kan het onderwerp precies noemen: 'Collega of concurrent? Over AI en de banen van morgen'.",
        { let: "Geen nieuw argument in het slot. Wat je nog wilt zeggen, hoort in het middenstuk." },
        { tip: "Schrijf je titel als laatste. Dan weet je pas echt waar je tekst over gaat." }
      ],
      begrippen: [
        ["Inleiding", "Eerste deel van de tekst: opening, aanleiding en stelling of hoofdvraag."],
        ["Aanleiding", "De reden waarom het onderwerp nu belangrijk of actueel is."],
        ["Middenstuk", "Kern van de tekst, met per alinea één argument, kant of deelonderwerp."],
        ["Slot", "Afronding van de tekst: samenvatting, conclusie of afweging en eventueel een uitsmijter."],
        ["Alinea", "Tekstgedeelte over één onderwerp, zichtbaar gemaakt met een witregel of inspringing."],
        ["Kernzin", "Zin die het onderwerp of de hoofdgedachte van een alinea noemt; meestal de eerste zin."],
        ["Brugzin", "Zin aan het eind van een alinea die de volgende alinea inleidt."],
        ["Tekststructuur", "Vast patroon waarin de delen van een tekst op elkaar volgen."],
        ["Betogende structuur", "Stelling, argumenten, tegenargument met weerlegging en conclusie."],
        ["Voor-nadelenstructuur", "Onderwerp, voordelen, nadelen en een afweging."],
        ["Probleem-oplossingsstructuur", "Probleem, oorzaken, gevolgen en mogelijke oplossingen."],
        ["Uitsmijter", "Krachtige slotzin die blijft hangen, zoals een oproep of een vraag."],
        ["Titel", "Korte kop boven de tekst die nieuwsgierig maakt en bij de inhoud past."],
        ["Ondertitel", "Regel onder de titel die het onderwerp precies noemt."]
      ],
      vragen: [
        { q: "Wat hoort in elk geval in de inleiding van een betoog?", a: ["De aanleiding en de stelling", "Alle argumenten in het kort", "Het tegenargument met weerlegging", "De samenvatting en een uitsmijter"], u: "De inleiding geeft de aanleiding en noemt de stelling. Argumenten en tegenargumenten horen in het middenstuk, de samenvatting en de uitsmijter in het slot." },
        { q: "Welke opening is het minst geschikt?", a: ["In deze tekst ga ik het hebben over AI en banen.", "Weet jij zeker dat jouw droombaan over tien jaar nog bestaat?", "Mijn tante vertaalde jarenlang handleidingen. Vorige maand kreeg ze geen enkele opdracht.", "De één ziet in AI een banenvreter, de ander een redder in nood."], u: "Een aankondiging trekt geen aandacht. De andere openingen gebruiken een vraag, een kort verhaal en een tegenstelling." },
        { q: "Waar staat de kernzin van een alinea meestal?", a: ["Aan het begin van de alinea", "Precies in het midden van de alinea", "Alleen in de laatste alinea van de tekst", "In de titel boven de tekst"], u: "Meestal is de eerste zin de kernzin. Soms staat hij elders, bijvoorbeeld in een alinea die met een tegenargument begint: daar is de zin met de weerlegging de kernzin." },
        { q: "Wat doe je niet in het slot van een betoog?", a: ["Een nieuw argument noemen", "Je argumenten kort samenvatten", "Je standpunt in andere woorden herhalen", "Afsluiten met een oproep aan de lezer"], u: "Het slot rondt af. Een nieuw argument hoort in het middenstuk, waar je het kunt uitwerken." },
        { q: "Welke tekststructuur past het best bij een beschouwing over de voor- en nadelen van AI voor werknemers?", a: ["Voor-nadelenstructuur", "Verklaringsstructuur", "Betogende structuur", "Verhalende structuur"], u: "Voordelen en nadelen naast elkaar zetten en afwegen: dat is de voor-nadelenstructuur. Een betogende structuur verdedigt één standpunt." },
        { q: "Een tekst bespreekt het tekort aan personeel in de zorg, de oorzaken daarvan en de vraag of AI kan helpen. Welke structuur is dat?", a: ["Probleem-oplossingsstructuur", "Vergelijkingsstructuur", "Vraag-antwoordstructuur", "Voor-nadelenstructuur"], u: "Een probleem (tekort), oorzaken en een mogelijke oplossing (AI): dat is de probleem-oplossingsstructuur." },
        { q: "Welke titel is het sterkst voor een beschouwing over AI en werk?", a: ["Collega of concurrent?", "Mijn tekst over AI", "Een beschouwing over de gevolgen van kunstmatige intelligentie voor de werkgelegenheid", "AI is gewoon slecht!"], u: "Een goede titel is kort en maakt nieuwsgierig. De derde titel is te lang (geschikt als ondertitel) en de vierde verraadt een mening, wat niet past bij een beschouwing." },
        { q: "Welk deel van je woorden besteed je ongeveer aan het middenstuk?", a: ["Ongeveer driekwart", "Ongeveer een kwart", "Ongeveer de helft", "Bijna alles, want inleiding en slot zijn één zin"], u: "Inleiding en slot zijn elk ongeveer 10 tot 15% van de tekst. Het middenstuk is dus ongeveer 70 tot 80%." },
        { q: "Wat is een uitsmijter?", a: ["Een krachtige slotzin die blijft hangen", "Het sterkste argument, dat vooraan staat", "De zin in de inleiding met de aanleiding", "Een tegenargument dat je niet weerlegt"], u: "Een uitsmijter is de laatste zin van je tekst: een oproep, een vraag, een blik op de toekomst of een verwijzing naar de opening." },
        { q: "'Of dat gebeurt, hangt echter niet alleen af van de techniek zelf.' Dit is de laatste zin van een alinea. Wat is de functie ervan?", a: ["Een brugzin naar de volgende alinea", "De kernzin van deze alinea", "Een samenvatting van de hele tekst", "Een uitsmijter die de tekst afsluit"], u: "De zin roept een nieuwe vraag op (waar hangt het dan van af?) en leidt zo de volgende alinea in." },
        { q: "Hoe maak je in een getypte tekst duidelijk dat er een nieuwe alinea begint?", a: ["Met een witregel of door de eerste regel te laten inspringen", "Door de eerste zin van de alinea vet te maken", "Door elke nieuwe alinea met 'En' te beginnen", "Dat hoeft niet, de lezer ziet het aan de inhoud"], u: "Een witregel of een inspringing laat zien dat er een nieuw onderwerp begint. Zonder die markering wordt je tekst één lange lap." }
      ],
      oefen: [
        { type: "volgorde", q: "Zet de lagen van een sterke alinea in de goede volgorde.", items: ["Kernzin: het argument in één zin", "Uitleg: waarom klopt dat?", "Voorbeeld of bewijs", "Afronding: wat betekent dit voor je stelling?"], u: "Eerst de bewering, dan de uitleg, dan een concreet voorbeeld en tot slot de koppeling met je stelling of hoofdvraag." },
        { type: "koppel", q: "Koppel de manier van openen aan het voorbeeld.", paren: [["Kort verhaal", "Mijn tante vertaalde jarenlang handleidingen."], ["Vraag aan de lezer", "Bestaat jouw droombaan over tien jaar nog?"], ["Prikkelende uitspraak", "De typiste is verdwenen. De vertaler is de volgende."], ["Tegenstelling", "De één ziet werkloosheid, de ander een oplossing."], ["Actuele aanleiding", "Sinds kort kan iedereen een chatbot gebruiken."]], u: "Elke opening trekt op een eigen manier de aandacht. Daarna volgen de aanleiding en de stelling of hoofdvraag." },
        { type: "sorteer", q: "Hoort deze zin in de inleiding, het middenstuk of het slot?", groepen: ["Inleiding", "Middenstuk", "Slot"], items: [["Weet jij zeker dat jouw droombaan over tien jaar nog bestaat?", 0], ["Daarnaast levert nieuwe techniek ook nieuw werk op.", 1], ["Kortom, AI verandert ons werk, maar maakt ons niet werkloos.", 2], ["Tegenstanders wijzen erop dat sommige mensen hun baan verliezen.", 1], ["De vraag is niet of er werk blijft, maar of we bereid zijn te blijven leren.", 2], ["Sinds chatbots voor iedereen beschikbaar zijn, vragen veel mensen zich af of hun baan veilig is.", 0]], u: "Signaalwoorden helpen: 'Daarnaast' kondigt een argument aan, 'Kortom' een samenvatting. Een vraag aan de lezer en een actuele aanleiding horen bij de inleiding." }
      ],
      open: [
        { q: "Schrijf een inleiding van drie of vier zinnen voor een betoog met de stelling 'Werknemers van wie het werk door AI verdwijnt, moeten recht krijgen op betaalde omscholing.' Gebruik een van de manieren om te openen.",
          a: "Mijn tante vertaalde jarenlang handleidingen voor technische bedrijven. Sinds vertaalsoftware dat werk in een paar seconden doet, krijgt ze bijna geen opdrachten meer. Zij is niet de enige: steeds meer werk wordt door AI overgenomen. Werknemers van wie het werk door AI verdwijnt, moeten daarom recht krijgen op betaalde omscholing.",
          punten: ["pakkende opening (hier: kort verhaal)", "aanleiding: AI neemt werk over", "de stelling staat aan het eind van de inleiding", "zakelijke toon, geen aankondiging"] },
        { q: "Leg uit wat het verschil is tussen het slot van een betoog en het slot van een beschouwing.",
          a: "In het slot van een betoog vat je je argumenten samen en herhaal je je standpunt stellig, in andere woorden. In het slot van een beschouwing vat je de kanten samen, weeg je ze af en geef je een voorzichtig antwoord op de hoofdvraag. Dat kan ook zijn dat het antwoord van voorwaarden afhangt. In beide gevallen komt er geen nieuw argument bij.",
          punten: ["betoog: samenvatting + standpunt herhalen", "beschouwing: afweging + voorzichtige conclusie", "geen nieuw argument in het slot"] }
      ],
      widgets: ["alineapuzzel", "alineabouwer"]
    },
    // ------------------------------------------------------------------
    {
      id: "argumenteren", nr: "3", titel: "Argumenteren: argumenten, tegenargumenten en drogredenen",
      kern: [
        "Een [[standpunt]] is wat je vindt; een [[argument]] is de reden waarom. Zonder argument blijft een standpunt een losse mening.",
        "Een argument overtuigt als het **aanvaardbaar** is (de lezer gelooft het) en **relevant** (het gaat echt over je standpunt).",
        { kop: "Soorten argumenten" },
        { tabel: { kop: ["Soort: wat je doet", "Voorbeeld bij AI en werk"], rijen: [
          ["**Feiten**: iets noemen wat controleerbaar waar is", "Software kan nu al teksten vertalen en samenvatten."],
          ["**Voorbeelden**: het concreet maken met een geval", "Een huisarts laat software het verslag typen, maar onderzoekt zelf de patiënt."],
          ["**Gezag**: je beroepen op een deskundige of instantie", "Volgens de deskundige uit bron 2 ... (alleen met een echte bron)."],
          ["**Gevolgen of nut**: wijzen op een gewenst of ongewenst effect", "Als AI de administratie doet, houden verpleegkundigen meer tijd over."],
          ["**Vergelijking**: vergelijken met een andere situatie", "Toen de computer kwam, verdwenen beroepen, maar kwamen er ook nieuwe bij."],
          ["**Normen en waarden**: je beroepen op wat goed of rechtvaardig is", "Het is niet eerlijk als alleen de eigenaren van de software profiteren."]
        ] } },
        { let: "Verzin geen cijfers, onderzoeken of deskundigen. Zonder bronnen werk je met redeneringen en algemeen bekende voorbeelden; met bronnen noem je wie het zegt." },
        { kop: "Argumentatiestructuren" },
        "Bij [[enkelvoudige argumentatie]] steunt één argument het standpunt. Bij [[meervoudige argumentatie]] staan meerdere argumenten los naast elkaar: elk argument steunt het standpunt op zichzelf.",
        "Bij [[nevenschikkende argumentatie]] overtuigen de argumenten pas samen. Bij [[onderschikkende argumentatie]] wordt een argument zelf weer onderbouwd met een [[subargument]].",
        { fig: "argstructuur", bij: "S = standpunt, A = argument. Een pijl betekent 'ondersteunt'." },
        { let: "Methodes gebruiken deze namen niet allemaal op dezelfde manier. In sommige boeken heet een rijtje losse argumenten 'nevenschikkend'. Let vooral op het verschil: losse argumenten naast elkaar, argumenten die alleen samen werken, of een argument onder een argument." },
        { voorbeeld: { titel: "onderschikkend argumenteren", stappen: ["Standpunt: scholen moeten leerlingen leren werken met AI.", "Argument: bijna alle bedrijven gaan AI gebruiken.", "Subargument: AI maakt veel kantoorwerk sneller en goedkoper.", "Lees van onder naar boven: het subargument steunt het argument, het argument steunt het standpunt."] } },
        { kop: "Tegenargument en weerlegging" },
        "Een [[tegenargument]] is een argument tegen je standpunt. In de [[weerlegging]] laat je zien waarom het je standpunt niet onderuithaalt: het klopt niet, het weegt minder zwaar, of het vraagt om een andere oplossing.",
        { voorbeeld: { titel: "weerleggen in drie stappen", stappen: ["Noem het bezwaar eerlijk: 'Tegenstanders wijzen erop dat sommige mensen hun baan verliezen.'", "Geef toe wat klopt: 'Dat is waar: niet iedereen kan zich zomaar omscholen.'", "Laat zien waarom je standpunt overeind blijft: 'Dat is echter een reden om omscholing goed te regelen, niet om AI tegen te houden.'"] } },
        { kop: "Drogredenen" },
        "Een [[drogreden]] is een redenering die overtuigend klinkt, maar niet deugt. Herken ze bij anderen en vermijd ze in je eigen tekst.",
        { tabel: { kop: ["Drogreden", "Kenmerk"], rijen: [
          ["Persoonlijke aanval", "je valt de persoon aan in plaats van het argument"],
          ["Onjuist beroep op gezag", "de 'deskundige' is geen deskundige op dit gebied"],
          ["Cirkelredenering", "het argument herhaalt het standpunt in andere woorden"],
          ["Overhaaste generalisatie", "een algemene conclusie uit één of een paar gevallen"],
          ["Vals dilemma", "je doet alsof er maar twee mogelijkheden zijn"],
          ["Hellend vlak", "één stap zou zonder bewijs op een ramp uitlopen"],
          ["Verkeerde vergelijking", "de vergeleken zaken verschillen op het beslissende punt"],
          ["Ontduiken van de bewijslast", "je weigert je standpunt te onderbouwen of schuift het bewijs door"],
          ["Beroep op de massa", "iets zou waar zijn omdat veel mensen het vinden"],
          ["Stroman", "je bestrijdt een verdraaide versie van het standpunt van de ander"],
          ["Bespelen van gevoelens", "je speelt in op angst of medelijden in plaats van argumenten te geven"],
          ["Onjuist oorzakelijk verband", "omdat B na A gebeurt, zou A de oorzaak zijn"]
        ] } },
        { tip: "Zet je sterkste argument achteraan: wat de lezer het laatst leest, onthoudt hij het best. Het zwakste argument hoort in het midden." }
      ],
      begrippen: [
        ["Argument", "Reden die een standpunt ondersteunt."],
        ["Subargument", "Argument dat een ander argument ondersteunt."],
        ["Tegenargument", "Argument tegen het standpunt van de schrijver."],
        ["Weerlegging", "Uitleg waarom een tegenargument het standpunt niet onderuithaalt."],
        ["Enkelvoudige argumentatie", "Eén argument ondersteunt het standpunt."],
        ["Meervoudige argumentatie", "Meerdere argumenten die elk los van elkaar het standpunt ondersteunen."],
        ["Nevenschikkende argumentatie", "Argumenten die pas samen het standpunt ondersteunen (in sommige methodes: losse argumenten naast elkaar)."],
        ["Onderschikkende argumentatie", "Een argument wordt zelf weer ondersteund door een subargument."],
        ["Argument op basis van gezag", "Je beroept je op een deskundige of instantie; alleen sterk als die echt deskundig is op dit gebied."],
        ["Drogreden", "Redenering die overtuigend lijkt, maar niet deugt."],
        ["Persoonlijke aanval", "Drogreden: de persoon aanvallen in plaats van het argument."],
        ["Cirkelredenering", "Drogreden: het argument herhaalt het standpunt in andere woorden."],
        ["Overhaaste generalisatie", "Drogreden: een algemene conclusie trekken uit te weinig gevallen."],
        ["Vals dilemma", "Drogreden: doen alsof er maar twee keuzes zijn."],
        ["Stroman", "Drogreden: een verdraaide of overdreven versie van het standpunt van de ander bestrijden."]
      ],
      vragen: [
        { q: "'Toen de computer kwam, verdwenen er beroepen, maar kwamen er ook nieuwe bij.' Wat voor argument is dit?", a: ["Een argument op basis van een vergelijking", "Een argument op basis van gezag", "Een argument op basis van normen en waarden", "Een argument op basis van gevolgen"], u: "De schrijver vergelijkt de komst van AI met de komst van de computer." },
        { q: "'Het is niet rechtvaardig dat alleen de eigenaren van AI-bedrijven rijker worden.' Wat voor argument is dit?", a: ["Een argument op basis van normen en waarden", "Een argument op basis van gevolgen of nut", "Een argument op basis van een vergelijking", "Een argument op basis van voorbeelden"], u: "'Rechtvaardig' is een norm: het gaat over wat eerlijk of goed is." },
        { q: "'Als AI de planning overneemt, houden verpleegkundigen meer tijd over voor patiënten.' Wat voor argument is dit?", a: ["Een argument op basis van gevolgen of nut", "Een argument op basis van feiten", "Een argument op basis van gezag", "Een argument op basis van een vergelijking"], u: "De schrijver wijst op een gewenst gevolg: meer tijd voor patiënten." },
        { q: "Wanneer is een argument op basis van gezag sterk?", a: ["Als de persoon deskundig is op dit onderwerp en je de bron noemt", "Als de persoon bekend is bij een groot publiek", "Als de persoon veel volgers heeft op sociale media", "Als de persoon het met jouw standpunt eens is"], u: "Gezag telt alleen op het eigen vakgebied. Bekendheid of volgers maken iemand nog geen deskundige." },
        { q: "Standpunt: scholen moeten AI toestaan. Argument 1: leerlingen werken er later mee. Argument 2: een verbod is niet te controleren. Elk argument steunt het standpunt op zichzelf. Welke argumentatie is dit?", a: ["Meervoudige argumentatie", "Onderschikkende argumentatie", "Enkelvoudige argumentatie", "Een cirkelredenering"], u: "Twee argumenten die los van elkaar het standpunt steunen: meervoudig. Let op: sommige methodes noemen dit nevenschikkend." },
        { q: "Welke argumentatie is onderschikkend?", a: ["AI kost banen, want het neemt denkwerk over, want het kan zelf teksten schrijven.", "AI kost banen, want het neemt denkwerk over en het gaat sneller dan vroeger.", "AI kost banen, want kunstmatige intelligentie is een bedreiging voor het werk.", "AI kost banen, want mijn neef is zijn baan als vertaler kwijtgeraakt."], u: "In de eerste zin steunt 'het kan zelf teksten schrijven' het argument 'het neemt denkwerk over': een argument onder een argument. De tweede is meervoudig, de derde een cirkelredenering, de vierde een overhaaste generalisatie." },
        { q: "Wat is de beste weerlegging van 'AI maakt fouten, dus bedrijven zullen het niet gebruiken'?", a: ["Dat klopt, maar dan controleert een mens het werk dat de AI voorbereidt.", "Dat is onzin, want iedereen gebruikt AI tegenwoordig al.", "Wie dat zegt, begrijpt helemaal niets van techniek.", "Mensen maken ook fouten, dus AI is eigenlijk foutloos."], u: "Een goede weerlegging geeft toe wat klopt en laat zien waarom het standpunt overeind blijft. De andere antwoorden zijn een beroep op de massa, een persoonlijke aanval en een onlogische redenering." },
        { q: "Waarom noem je in een betoog een tegenargument?", a: ["Je laat zien dat je de andere kant kent en dat je standpunt overeind blijft", "Je laat zien dat je eigenlijk twijfelt aan je eigen standpunt", "Een betoog wordt anders te kort voor de opdracht", "Het tegenargument wordt daarna de conclusie van je tekst"], u: "Door een tegenargument te noemen en te weerleggen, word je geloofwaardiger: je hebt over de andere kant nagedacht." },
        { q: "'Iedereen gebruikt tegenwoordig een chatbot, dus het is goed voor je ontwikkeling.' Welke drogreden is dit?", a: ["Beroep op de massa", "Persoonlijke aanval", "Cirkelredenering", "Vals dilemma"], u: "Dat veel mensen iets doen, bewijst niet dat het goed is." },
        { q: "'Als we AI op school toestaan, schrijft straks niemand meer zelf een zin en is het onderwijs waardeloos.' Welke drogreden is dit?", a: ["Hellend vlak", "Stroman", "Onjuist beroep op gezag", "Verkeerde vergelijking"], u: "Eén stap zou zonder bewijs uitlopen op een ramp. Dat is een hellend vlak." },
        { q: "'Jij wilt regels voor AI? Dan wil jij dus terug naar de middeleeuwen.' Welke drogreden is dit?", a: ["Stroman", "Overhaaste generalisatie", "Beroep op de massa", "Onjuist oorzakelijk verband"], u: "Het standpunt 'regels voor AI' wordt verdraaid tot 'terug naar de middeleeuwen' en die verdraaide versie wordt bestreden." },
        { q: "Wanneer is een argument relevant?", a: ["Als het echt over het standpunt gaat dat je verdedigt", "Als het lang is en moeilijke woorden bevat", "Als het afkomstig is van een bekende Nederlander", "Als het het eerste argument is dat je bedenkt"], u: "Een relevant argument heeft echt met het standpunt te maken. Een waar, maar irrelevant argument overtuigt niet." }
      ],
      oefen: [
        { type: "sorteer", q: "Op welk soort argument steunt deze zin vooral?", groepen: ["Feiten of voorbeelden", "Gevolgen of nut", "Vergelijking", "Normen en waarden"], items: [["Een huisarts laat software het verslag typen, maar onderzoekt zelf de patiënt.", 0], ["Software kan nu al teksten vertalen en samenvatten.", 0], ["Als AI de administratie doet, houden leraren meer tijd over voor hun leerlingen.", 1], ["Wanneer starters geen eenvoudige taken meer krijgen, doen ze minder ervaring op.", 1], ["Net als bij de komst van de computer verdwijnen er beroepen en komen er nieuwe bij.", 2], ["De overgang van paard naar auto duurde tientallen jaren; AI verspreidt zich veel sneller.", 2], ["Mensen horen hun tijd niet te besteden aan werk dat een machine ook kan doen.", 3], ["Het is oneerlijk als werknemers het risico dragen en bedrijven de winst krijgen.", 3]], u: "Let op de signalen: 'als ..., dan' wijst op gevolgen, 'net als' op een vergelijking en woorden als 'horen' of 'oneerlijk' op normen en waarden." },
        { type: "koppel", q: "Koppel de drogreden aan het voorbeeld.", paren: [["Persoonlijke aanval", "Hij is zelf rijk, dus zijn mening over banen telt niet."], ["Vals dilemma", "Of we verbieden AI, of niemand heeft straks nog werk."], ["Cirkelredenering", "AI is een gevaar voor banen, want het bedreigt de werkgelegenheid."], ["Overhaaste generalisatie", "Mijn neef is zijn baan kwijt, dus AI maakt iedereen werkloos."], ["Onjuist beroep op gezag", "Een bekende zanger zegt dat AI geen banen kost, dus het klopt."], ["Onjuist oorzakelijk verband", "Sinds de AI-assistent er is, is het verzuim gestegen. Hij maakt mensen dus ziek."]], u: "Vraag je bij elke redenering af: gaat het over het argument, of over iets anders?" },
        { type: "volgorde", q: "Zet de stappen van deze weerlegging in de goede volgorde.", items: ["Tegenstanders zeggen dat sommige mensen hun baan verliezen.", "Dat klopt: niet iedereen kan zich zomaar omscholen.", "Dat is echter een reden om omscholing goed te regelen, niet om AI tegen te houden."], u: "Eerst het bezwaar eerlijk noemen, dan toegeven wat klopt, dan laten zien waarom je standpunt toch overeind blijft." }
      ],
      open: [
        { q: "Schrijf bij de stelling 'AI kost de komende tien jaar meer banen dan het oplevert' één argument op basis van gevolgen en één argument op basis van een vergelijking. Verzin geen cijfers.",
          a: "Gevolgen: als AI vooral eenvoudige beginnerstaken overneemt, vinden starters moeilijker een eerste baan, waardoor er voor een hele groep minder werk is. Vergelijking: de overgang van paard naar auto duurde tientallen jaren, zodat mensen tijd hadden om een ander vak te leren; AI verspreidt zich in enkele maanden, dus omscholing kan dat tempo niet bijhouden.",
          punten: ["argument op basis van gevolgen (als ..., dan ...)", "argument op basis van een vergelijking met vroeger", "beide steunen de stelling", "geen verzonnen cijfers"] },
        { q: "Bedenk een tegenargument bij de stelling 'De angst dat AI ons massaal werkloos maakt, is overdreven' en schrijf een weerlegging in drie stappen.",
          a: "Tegenargument: AI neemt voor het eerst ook denkwerk over, zoals vertalen en programmeren. Weerlegging: Dat klopt, en daardoor verandert ook het werk van hoogopgeleiden. Toch verdwijnt hun baan meestal niet: er blijven mensen nodig die het resultaat controleren, de verantwoordelijkheid dragen en met klanten overleggen.",
          punten: ["tegenargument eerlijk genoemd", "toegeven wat klopt", "laten zien waarom het standpunt overeind blijft", "signaalwoord van tegenstelling (toch, echter)"] },
        { q: "In een betoog staat: 'Mijn oom is programmeur en heeft het nog steeds druk, dus AI kost geen banen.' Benoem de drogreden en verbeter de redenering.",
          a: "Dit is een overhaaste generalisatie: uit één geval (de oom) wordt een conclusie over alle banen getrokken. Beter: 'Het werk van programmeurs verandert door AI, maar verdwijnt niet vanzelf: er blijven mensen nodig die de code controleren en beveiligen. Het is dus te kort door de bocht om te zeggen dat AI hier banen kost.'",
          punten: ["overhaaste generalisatie genoemd", "uitleg: één geval is te weinig", "verbetering met een algemene redenering en een voorzichtige conclusie"] }
      ],
      widgets: ["argumentenbank", "drogreden"]
    }
  ]
});
