/* ======================================================================
   CONTENU DU PORTFOLIO — c'est le seul fichier à modifier pour ajouter
   une soirée, un projet, des images, une vidéo.
   ====================================================================== */

window.PORTFOLIO = {
  site: {
    name: "Tim Malaisé",
    role: {
      en: "Engineering student · lighting programmer · software developer · Brest, France",
      fr: "Élève ingénieur · programmeur lumière · développeur logiciel · Brest, France",
    },
    statement: {
      en: "I program stage lighting and build software.",
      fr: "Je programme des lumières de scène et je développe des logiciels.",
    },
    availability: {
      en: "Looking for a 2–4 month engineering internship abroad, starting April or June 2027.",
      fr: "À la recherche d'un stage ingénieur de 2 à 4 mois à l'étranger, à partir d'avril ou juin 2027.",
    },
    focus: [
      { en: "Space", fr: "Spatial" },
      { en: "Embedded systems", fr: "Systèmes embarqués" },
      { en: "Software development", fr: "Développement logiciel" },
    ],
    email: "tim.malaise@imt-atlantique.net",
    cv: null, // ex: "media/CV_Tim_Malaise.pdf"  (le bouton apparaît tout seul)
    links: [
      { label: "GitHub",   url: "https://github.com/Timplasma" },
      { label: "LinkedIn", url: "www.linkedin.com/in/tim-malaisé-161a58303" }
    ],
    ticker: [
      "grandMA3",
      "Busking",
      "Show files",
      "Linux",
      "Self-hosting",
      "FreeCAD",
      "Web (HTML/CSS/JS)",
      "C",
      "OCaml",
      "Rust",
      "Python",
      "Embedded Systems (FPGA)",
      "VHDL",
      "Reaper",
      "VR",
    ],
  },

  about: {
    text: {
      en: [
        "Second-year engineering student at IMT Atlantique (Embedded and Heterogeneous Systems specialisation), I have experience in hardware design and integration, in embedded (FPGA), microcontroller programming (Arduino), low-level languages (C, Rust, VHDL), testing and debugging, and technical project management.",
        "I’m also the deputy treasurer of my school’s Arts Society, and I’m very involved in event organisation (lighting design and operation), which is why I’ve put together this portfolio."
      ],
      fr: [
        "Étudiant en deuxième année d'ingénierie à l'IMT Atlantique (spécialisation « Systèmes embarqués et hétérogènes »), j'ai de l'expérience en conception et intégration matérielle, en embarqué (VHDL), en programmation de microcontrôleurs (Arduino), en langages de bas niveau (C, Rust, VHDL), en tests et débogage, ainsi qu'en gestion de projets techniques.",
        "À côté, je suis vice-trésorier du Bureau Des Arts de mon école, et je suis très investi dans l'événementiel (conception et opération des lumières), d'où ce portfolio."
      ],
    },
    skills: [
      {
        title: { en: "Lighting", fr: "Lumière" },
        items: [
          { en: "grandMA3, console and onPC", fr: "grandMA3, console et onPC" },
          {
            en: "Busking and live programming",
            fr: "Busking et programmation en direct",
          },
          {
            en: "Organisation of parties and events",
            fr: "Organisation de soirées et d'événements",
          },
        ],
      },
      {
        title: { en: "Embedded Systems", fr: "Systèmes embarqués" },
        items: [
          "VHDL (Vivado)",
          "FPGA",
        ],
      },
      {
        title: { en: "Software", fr: "Logiciel" },
        items: [
          {
            en: "Linux (Fedora) and shell tooling",
            fr: "Linux (Fedora) et outils en ligne de commande",
          },
          { en: "Self-hosting", fr: "Auto-hébergement" },
          "Python, C, OCaml, VHDL, Java, Javascript, HTML/CSS, Kotlin"
        ],
      },
      {
        title: { en: "Also", fr: "Aussi" },
        items: [
          {
            en: "3D modelling for hardware parts (FreeCAD)",
            fr: "Modélisation 3D de pièces (FreeCAD)",
          },
          {
            en: "Music production in Reaper",
            fr: "Production musicale sous Reaper",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------
     SON & LUMIÈRE — une entrée = une ligne de la « cue list »
     --------------------------------------------------------------- */
  light: [
    // ATLANTICUP
    {
      id: "atlanticup",
      title: {
        en: "Atlanticup: evening of a sports competition",
        fr: "Atlanticup : soirée d'une compétition sportive",
      },
      category: { en: "Party", fr: "Soirée" },
      date: "2026-10",
      place: "Brest, France",
      role: { en: "Light Op", fr: "Opérateur lumière" },
      summary: {
        en: "Complete encoding of a show and live busking for a 6-hour evening with more than 34 lights, and a suspended circle of lights. 500 people were expected.",
        fr: "Encodage complet d'un show et busking en live pour une soirée de 6 heures avec plus de 34 lumières, et un cercle de lights suspendu. 500 personnes étaient attendues.",
      },
      tags: ["grandMA3", "Wing GMA3"],
      color: "#FFB26B",
      cover:"media/atlanticup/cover.jpg",
      // art: { kind: "beams", seed: 4 },
      blocks: [
        {
          type: "text",
          title: { en: "The idea", fr: "L'idée" },
          body: {
            en: "Encoding on GrandMA3 on PC several months in advance. Setting up the evening for several days then finishing encoding with the rented equipment (Wing + touch screens). \n\nUse of the Wing, executors, faders, bumpers, for live busking.\n\nComplete use of GrandMA3 with MAtricks, layouts, selection grid,...",
            fr: "Encodage sur GrandMA3 on PC plusieurs mois à l'avance. Montage de la soirée pendant plusieurs jours puis finition d'encodage avec le matériel loué (Wing + écrans tactiles). \n\nUtilisation de la Wing, des exécuteurs, faders, bumpers, pour du live busking.\n\nUtilisation complète de GrandMA3 avec les MAtricks, layouts, selection grid,...",
          },
        },
        {
          type: "text",
          title: { en: "The result", fr: "Le résultat" },
          body: {
            en: "A dynamic evening, with permanent lighting on the DJs. A very satisfied audience.",
            fr: "Une soirée dynamique, avec de l'éclairage permanent sur les DJs. Un public très satisfait.",
          },
        },
        {
          type: "text",
          title: { en: "The assembly", fr: "Le montage" },
        },
        {
          type: "gallery",
          images: [
            {
              src: "media/atlanticup/debut_montage.jpg",
              caption: {
                en: "Start of assembly",
                fr: "Début du montage",
              },
            },
            {
              src: "media/atlanticup/debut_montage_2.jpg",
              caption: {
                en: "Start of assembly",
                fr: "Début du montage",
              },
            },
            {
              src: "media/atlanticup/vue_montage_milieu.jpg",
              caption: {
                en: "Assembly",
                fr: "Montage",
              },
            },
            {
              src: "media/atlanticup/fin_montage_jour.jpg",
              caption: {
                en: "End of assembly",
                fr: "Fin du montage",
              },
            },
            {
              src: "media/atlanticup/fin_montage.jpg",
              caption: {
                en: "End of assembly",
                fr: "Fin du montage",
              },
            },
          ],
        },

        {
          type: "text",
          title: { en: "The party", fr: "La soirée" },
        },

        {
          type: "gallery",
          images: [
            {
              src: "media/atlanticup/soiree1.jpg",
            },
            {
              src: "media/atlanticup/soiree2.jpg",
            },
            {
              src: "media/atlanticup/soiree3.jpg",
            },
            {
              src: "media/atlanticup/soiree4.jpg",
            },
            {
              src: "media/atlanticup/soiree5.jpg",
            },
            {
              src: "media/atlanticup/vue_moi.jpg",
            },
          ],
        },
      ],
    },

    // ESCAPE GAME
    // TODO : ADD THE VIDEOS
    {
      id: "escape-game",
      title: {
        en: "Escape Game: an entire escape game home made",
        fr: "Escape Game: un escape game de A à Z",
      },
      category: { en: "Games", fr: "Jeux" },
      date: "2026-05",
      place: "Brest, France",
      role: { en: "Light Op · Game designer", fr: "Opérateur lumière · Designer du jeu" },
      summary: {
        en: "Organisation of an escape game for a night, consisting in 6 sessions of 45 minutes each. All the riddles were all made and I did all the light effects and operated it.",
        fr: "Organisation d'un escape game pour une soirée, comprenant 6 sessions de 45 minutes chacune. J'ai participé à la rédaction des énigmes, et réalisé tous les effets lumineux et assuré leur mise en œuvre.",
      },
      tags: ["grandMA3", "Home made", "Activity"],
      color: "#FFB26B",
      cover:"media/escape_game/vue_dessus.jpg",
      // art: { kind: "beams", seed: 4 },
      blocks: [
        {
          type: "text",
          title: { en: "The idea", fr: "L'idée" },
          body: {
            en: "We put together a team to organise an escape game. From the initial idea through to its realisation, we met and discussed things on numerous occasions, drew up plans and, finally, spent several days setting up the rooms. Finally, we ensured the event ran smoothly and safely.",
            fr: "Nous avons monté une équipe pour organiser un escape game. De l'idée à sa réalisation, nous nous sommes souvent réunis et concertés, nous avons fait des plans et enfin, nous avons passé plusieurs jours à monter les salles. Enfin, nous avons assuré la sécurité et le bon déroulement de l'événement.",
          },
        },
        {
          type: "text",
          title: { en: "What I did", fr: "Ma contribution" },
          body: {
            en: "I attended all the meetings and helped to devise several puzzles and floor plans. I also spent several days setting up the game. Finally, I designed the entire lighting scheme for the escape game and managed it throughout all the sessions. I had a dozen machines at my disposal.",
            fr: "J'ai participé à l'ensemble des réunions, contribué à l'établissement de plusieurs énigmes et des plans. Également, j'ai monté sur plusieurs jours le jeu. Enfin, j'ai développé l'ensemble de l'ambiance lumineuse de l'escape game et j'ai assuré le contrôle de celle-ci pendant toutes les sessions. J'avais à disposition une douzaine de machines.",
          },
        },
        {
          type: "text",
          title: { en: "An example of an enigma using lights", fr: "Un exemple d'énigme utilisant les lumières" },
          body: {
            en: "Two pixbars were suspended from the ceiling in an airlock that served as a lift. At the start of the game, this lift was broken, and the pixels on the pixbars were flashing erratically. To repair it, you had to realise that one of the pixels, which was a different colour, was spelling out a message in Morse code.",
            fr: "Deux pixbars étaient accrochées au plafond dans un sas qui servait d'ascenseur. Au départ du jeu, cet ascenseur était cassé, les pixels des pixbars clignotaient de façon saccadée. Pour le réparer, il fallait comprendre qu'un des pixels, d'une couleur différente, écrivait un message codé en morse.",
          },
        },
        {
          type: "text",
          title: { en: "The particularities of the technique", fr: "Les particularités de la réalisation technique" },
          body: {
            en: "We installed microphones on the ceiling in each of the game rooms (four rooms in total). We were in a separate room, and the only way to understand what was happening was by listening to the audio feed from the microphones in each room. We also had a walkie-talkie to communicate with the players. We had a control room for sound and lighting (lighting and sound effects), as well as support for the players.\n\nAs for the rooms, we are creating new ones on our premises by erecting partition walls.",
            fr: "Nous avons mis des micros au plafond dans chacune des salles du jeu (en tout 4 salles). Nous étions dans une salle à part et la seule façon de comprendre ce qu'il se passait, était en écoutant le retour des micros de chaque salle. Nous avions aussi un talkie-walkie pour communiquer avec les joueurs. Nous avions une régie pour le son et lumière (ambiance lumineuse et sonore), ainsi que l'aide pour les joueurs.\n\nConcernant les salles, nous avons créé de nouvelles salles dans nos locaux en posant des faux murs.",
          },
        },
        {
          type: "gallery",
          images: [
            {
              src: "media/escape_game/vue_dessus.jpg",
              caption: {
                en: "View of the top",
                fr: "Vue du dessus",
              },
            },

          ],
        },
        {
          type: "text",
          title: { en: "The script", fr: "L'histoire de l'escape game" },
          body: {
            en: "We are in Paris, and more specifically in the Eiffel Tower. A bomb has been hidden beneath it and must be defused. The bomb disposal team has just 45 minutes. As they make their way through the floors (using a lift to move between them), the bomb disposal team will face numerous puzzles and inconsistencies left behind by the criminals. Will the team make it in time to defuse the bomb?",
            fr: "Nous sommes à Paris, et plus précisément dans la tour Eiffel. Une bombe est cachée sous celle-ci et il faut la désamorcer. L'équipe de déminage n'a que 45 minutes. En traversant les étages (en changeant d'étage par un ascenseur), l'équipe de déminage se confrontera à de nombreuses énigmes et incohérences laissées par les malfaiteurs. L'équipe arrivera-t-elle à temps pour désamorcer la bombe ?",
          },
        },
        {
          type: "text",
          title: { en: "The result", fr: "Le résultat" },
          body: {
            en: "Six hours of non-stop play, six sessions completed without a hitch and with warm thanks.",
            fr: "6 heures non-stop de jeu, 6 sessions réalisées sans accroc et avec des remerciements chaleureux.",
          },
        },
        {
          type: "specs",
          title: { en: "Figures and stats", fr: "Des chiffres et des statistiques intéressantes" },
          items: [
            {
              k: { en: "Number of sessions", fr: "Nombre de sessions" },
              v: "6",
            },
            {
              k: { en: "Duration of one session", fr: "Durée d'une session" },
              v: "45 min",
            },
            {
              k: { en: "Floors available", fr: "Étages disponibles" },
              v: "3"
            },
            {
              k: { en: "The management", fr: "La régie" },
              v: {
                en: "A separate room, linked to the microphone system in all the other rooms.",
                fr: "Une salle isolée, connectée au micro de toutes les autres salles.",
              },
            },
          ],
        },
        {
          type: "text",
          title: { en: "The assembly", fr: "Le montage" },
        },
        {
          type: "gallery",
          images: [
            {
              src: "media/escape_game/truss_ascenseur.jpg",
              caption: {
                en: "The setup for the elevator",
                fr: "Disposition du matériel pour l'ascenseur",
              },
            },
          ]
        },

        {
          type: "text",
          title: { en: "The game", fr: "Le jeu" },
        },

        {
          type: "gallery",
          images: [
            {
              src: "media/escape_game/accueil_tour_eiffel.jpg",
              caption: {
                en: "The entry",
                fr: "L'entrée",
              },
            },
            {
              src: "media/escape_game/ambiance_bar.jpg",
              caption: {
                en: "Some lights for a floor",
                fr: "Exemple de lumières pour un étage",
              },
            },
          ],
        },
      ],
    },

    // THEATRE
    {
      id: "theatre",
      title: { en: "Theatre lighting", fr: "Lumière de théâtre" },
      category: { en: "Theatre", fr: "Théâtre" },
      date: "2026-03",
      place: "Brest, France",
      role: { en: "Light Op", fr: "Opérateur lumière" },
      summary: {
        en: "Lighting design and operation for a theatre performance in two places (school and city's theatre).",
        fr: "Conception et conduite lumière pour une représentation théâtrale dans deux lieux différents (école et théâtre de la commune).",
      },
      tags: ["Lighting", "Theatre"],
      color: "#FF9E7A",
      cover: "media/theatre/theatre_imt.jpg",
      blocks: [
        {
          type: "text",
          title: { en: "The play", fr: "La pièce de théâtre" },
          body: {
            en: "It was a production of Eugène Ionesco’s play *The King Is Dying*.\n\nThe performance was staged by students from several engineering schools",
            fr: "Il s'agissait de la pièce d'Eugène Ionesco : Le roi se meurt.\n\nPerformance réalisée par les élèves de plusieurs écoles d'ingénieur.",
          },
        },
        {
          type: "text",
          title: { en: "The setup at the school", fr: "L'installation à l'école" },
        },
        
        {
          type: "gallery",
          images: [
            { src: "media/theatre/theatre_imt.jpg"},
          ],
        },
        {
          type: "text",
          title: { en: "The setup at the theatre", fr: "L'installation au théâtre" },
        },
        
        {
          type: "gallery",
          images: [
            { src: "media/theatre/couleurs.jpg", caption: { en: "Lighting colours", fr: "Couleurs lumière" } },
            { src: "media/theatre/structure.jpg", caption: { en: "Stage structure", fr: "Structure scénique" } },
            { src: "media/theatre/regie_int.jpg", caption: { en: "Inside the control room", fr: "Intérieur de la régie" } },
            { src: "media/theatre/regie.jpg", caption: { en: "Control room", fr: "Régie" } },
            { src: "media/theatre/vue_globale.jpg", caption: { en: "Overall view", fr: "Vue globale" } },
          ],
        },
      ],
    },

    // LOUPS-GAROUS
    {
      id: "loups-garous",
      title: { en: "Werewolves game nights", fr: "Soirées Loups-garous" },
      category: { en: "Games", fr: "Jeux" },
      date: "2026",
      place: "Brest, France",
      role: { en: "Light Op", fr: "Opérateur lumière" },
      summary: {
        en: "Lighting design and technical management for several games of Werewolf.",
        fr: "Réalisation lumière et gestion technique de plusieurs jeux de Loup-garou.",
      },
      tags: ["Lighting", "Activity"],
      color: "#B4A7FF",
      cover: "media/loups_garous/session1.jpg",
      blocks: [
        {
          type: "text",
          title: { en: "The sessions", fr: "Les sessions" },
          body: {
            en: "Throughout the year, we organised several immersive Werewolf games, complete with lighting and sound effects.\n\nFor the lighting, I set up a system to reveal the dead at the start of each new day, with the option to shine a light on any of the 20 players (up to four at a time).\nThis allowed us to highlight the day’s victims, those singled out by the vote, or simply whoever was speaking.",
            fr: "Tout au long de l'année, nous avons proposé plusieurs parties de Loup-garou immersives, avec une ambiance lumineuse et sonore.\n\nPour la partie lumière, j'ai réalisé un système de révélation des morts à chaque nouvelle journée, avec la possibilité d'éclairer chacun des 20 joueurs (jusqu'à 4 en même temps).\nCela permettait d'éclairer les morts du jour, les désignés par le vote, ou simplement, celui qui prenait la parole.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/loups_garous/session1.jpg", caption: { en: "Game session", fr: "Session de jeu" } },
            { src: "media/loups_garous/session2.jpg", caption: { en: "Game session", fr: "Session de jeu" } },
          ],
        },
      ],
    },

    // DIVERS
    {
      id: "divers",
      title: { en: "Various events", fr: "Événements divers" },
      category: { en: "Events", fr: "Événements" },
      date: "2026",
      place: "Brest, France",
      role: { en: "Light Op", fr: "Opérateur lumière" },
      summary: {
        en: "A concise selection of various events, evenings out, meals, etc.",
        fr: "Une sélection condensée de divers événements, de soirées, de repas,...",
      },
      tags: ["Lighting", "Events"],
      color: "#FF9E7A",
      cover: "media/divers/banquet/banquet1.jpg",
      blocks: [
        {
          type: "text",
          title: { en: "DJ contest", fr: "DJ contest" },
          body: {
            en: "I programmed the intro for a DJ contest using the timeline, and I also operated the lighting for the whole evening.",
            fr: "J'ai programmé une introduction d'une DJ contest avec la timeline, puis j'ai aussi opéré toute la soirée aux lumières.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/divers/DJ_contest/montage_photo.jpg" },
            { src: "media/divers/DJ_contest/montage_photo2.jpg" },
          ],
        },
        {
          type: "text",
          title: { en: "Banquet", fr: "Banquet" },
          body: {
            en: "Lighting and atmosphere for a banquet with a Gallic theme.",
            fr: "Lumière et ambiance autour d'un banquet dans le thème gaulois.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/divers/banquet/banquet1.jpg" },
            { src: "media/divers/banquet/banquet2.jpg" },
            { src: "media/divers/banquet/banquet3.jpg" },
          ],
        },
        {
          type: "text",
          title: { en: "Casino evening", fr: "Soirée casino" },
          body: {
            en: "A casino-themed setup, from the room atmosphere to the poker table.",
            fr: "Une installation sur le thème du casino, de l'ambiance de la salle à la table de poker.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/divers/casino/ambiance.jpg" },
            { src: "media/divers/casino/avant_foule.jpg" },
            { src: "media/divers/casino/table_poker.jpg" },
          ],
        },
        {
          type: "text",
          title: { en: "Crepes at Dellec", fr: "Crêpes au Dellec" },
          body: {
            en: "An outdoor evening.",
            fr: "Une soirée en extérieur.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/divers/crepes_dellec/crepes.jpg" },
            { src: "media/divers/crepes_dellec/exte_nuit.jpg" },
          ],
        },
        {
          type: "text",
          title: { en: "IMTV: A comedy live show", fr: "L'événement: Un live-show humoristique" },
          body: {
            en: "Organisation of a live comedy show featuring presenters and guests. The video projector and our lighting equipment helped to create an immersive experience for the audience. I was responsible for the lighting design.",
            fr: "Organisation d'un live-show humoristique avec des présentateurs et des invités. Le vidéoprojecteur ainsi que notre équipement lumineux permettait l'immersion du spectateur. J'ai réalisé l'ambiance lumineuse.",
          },
        },
        { type: "gallery", images: [{ src: "media/imtv/ambiance.jpg", caption: { en: "Event atmosphere", fr: "Ambiance de l'événement" } }] },
      
      ],
    },

    // ARTLIVE
    {
      id: "artlive",
      title: { en: "Artlive events", fr: "Événements Artlive" },
      category: { en: "Events", fr: "Événements" },
      date: "2026-10",
      place: "Brest, France",
      role: { en: "Light Op", fr: "Opérateur lumière" },
      summary: {
        en: "As part of a week dedicated to the Bureau Des Arts, a number of events – ranging from concerts to a hypnosis show – were organised.",
        fr: "Dans le cadre d'une semaine réservée au Bureau Des Arts, plusieurs événements allant de concerts à un spectacle d'hypnose ont été organisés.",
      },
      tags: ["Lighting", "Concert", "Artlive"],
      color: "#FFB26B",
      cover: "media/artlive/concert/vue_groupe1.jpg",
      blocks: [
        {
          type: "text",
          title: { en: "The 12 Kers", fr: "Les 12 Kers : un quiz de culture général" },
          body: {
            en: "I organised and operated all the lighting for the game show. As well as creating atmospheric lighting for the audience, the contestants were illuminated by coloured lights depending on their answers, mimicking a real television studio.",
            fr: "J'ai organisé et opéré l'ensemble des lumières pour le jeu. En plus d'avoir des ambiances lumineuses pour le public, les candidats étaient éclairés par des lumières colorées en fonction de leur réponse, imitant un vrai plateau télévisé.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/artlive/12_kers/kahoot.jpg" },
            { src: "media/artlive/12_kers/regie_floue.jpg" },
          ],
        },
        {
          type: "text",
          title: { en: "Concerts", fr: "Concerts" },
          body: {
            en: "A concert featuring several student performers. I helped set up the lighting in the lecture theatres.",
            fr: "Concert avec plusieurs artistes étudiants. J'ai participé à la mise en place de l'éclairage dans les amphithéâtres.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/artlive/concert/vue_groupe1.jpg" },
            { src: "media/artlive/concert/vue_groupe2.jpg" },
            { src: "media/artlive/concert/vue_groupe3.jpg" },
          ],
        },
        {
          type: "text",
          title: { en: "Hypnosis", fr: "Hypnose" },
          body: {
            en: "A hypnosis show with lighting similar to that at concerts.",
            fr: "Un spectacle d'hypnose avec une ambiance lumineuse semblable aux concerts.",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/artlive/hypnose/salle nuit.jpg" },
            { src: "media/artlive/hypnose/salle_jour.jpg" },
          ],
        },
        {
          type: "text",
          title: { en: "Party", fr: "Fête" },
          body: {
            en: "I organised the entire event, including setting up a stage in the centre of the venue. I set up and operated the lighting throughout the evening (over four hours of non-stop entertainment).",
            fr: "Organisation complète d'une fête avec une scène au milieu de l'espace prévu pour la soirée. J'ai préparé et opéré les lumières toute la soirée (plus de 4h de show continu).",
          },
        },
        {
          type: "gallery",
          images: [
            { src: "media/artlive/soiree.jpg" },
          ],
        },
      ],
    },

  ],

  /* ---------------------------------------------------------------
     INFORMATIQUE — une entrée = une carte
     --------------------------------------------------------------- */
  code: [
    {
      id: "fosm1",
      title: {
        en: "FOSM-1 Ground Station",
        fr: "Station au sol pour FOSM-1",
      },
      category: "Python, RF, Satellite",
      date: "2026",
      role: { en: "Developer", fr: "Développeur" },
      summary: {
        en: "Modular Python/Flask-based ground station software for the FOSM-1 satellite communication system. Provides a web UI for commanding the satellite via UHF uplink and monitoring telemetry via RX frames in real-time.",
        fr: "Logiciel modulaire de station au sol basé sur Python/Flask, destiné au système de communication par satellite FOSM-1. Il offre une interface Web permettant de commander le satellite via une liaison montante UHF et de surveiller la télémétrie en temps réel grâce aux trames de réception.",
      },
      tags: ["Satellite", "Communication", "WEB Interface"],
      color: "#8FC9FF",
      art: { kind: "rings", seed: 14 },
      blocks: [
        {
          type: "text",
          title: { en: "Github link", fr: "Lien Github" },
          
        },
        {
          type: "links",
          items:
            [{
              label: "GitHub",   url: "https://github.com/Matei6/PRONTO_RX-TX_chain"},]
        }
      ],
    },

    {
      id: "home-server",
      title: { en: "Home server", fr: "Serveur maison" },
      category: { en: "Infrastructure", fr: "Infrastructure" },
      date: "2026",
      role: {
        en: "Setup and administration",
        fr: "Mise en place et administration",
      },
      summary: {
        en: "A self-hosted server running on an old HP laptop with Fedora.",
        fr: "Un serveur auto-hébergé sur un vieux portable HP sous Fedora.",
      },
      tags: ["Fedora", "Self-hosting", "Linux"],
      color: "#7FD6C8",
      art: { kind: "bars", seed: 2 },
      blocks: [
        {
          type: "text",
          title: { en: "What it runs", fr: "Ce qu'il héberge" },
          body: "Podman, Nextcloud, Immich, Jellyfin, Bitwarden..."
        },
      ],
    },

    {
      id: "association-cashflow",
      title: {
        en: "Budgets and cash flow monitoring for the Bureau Des Arts",
        fr: "Budgets et suivi de trésorerie pour le Bureau Des Arts",
      },
      category: { en: "Tools", fr: "Outils" },
      date: "2026",
      role: { en: "Design, formulas, tracking and establishment of budgets", fr: "Conception, formules, suivi et établissement de budgets" },
      summary: {
        en: "As Deputy Treasurer of the BDA, I am responsible for drawing up budgets and ensuring they are adhered to throughout the year and for our events.",
        fr: "En tant que vice-trésorier du BDA, je m'occupe de l'établissement de budgets et j'assure le respect de ceux-ci pour l'année et nos événements.",
      },
      tags: ["Spreadsheet", "Formulas"],
      color: "#8FC9FF",
      art: { kind: "bars", seed: 17 },
    },
  ],
};
