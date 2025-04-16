// Türkiye'deki havalimanı ve otel verileri
export const cityData = {
  pickup: [
    {
      id: "antalya",
      name: {
        tr: "Antalya",
        en: "Antalya",
        de: "Antalya",
        ru: "Анталья",
      },
      value: "Antalya",
    },
    {
      id: "istanbul",
      name: {
        tr: "İstanbul",
        en: "Istanbul",
        de: "Istanbul",
        ru: "Стамбул",
      },
      value: "İstanbul",
    },
    {
      id: "ankara",
      name: {
        tr: "Ankara",
        en: "Ankara",
        de: "Ankara",
        ru: "Анкара",
      },
      value: "Ankara",
    },
    {
      id: "izmir",
      name: {
        tr: "İzmir",
        en: "Izmir",
        de: "Izmir",
        ru: "Измир",
      },
      value: "İzmir",
    },
    {
      id: "mugla",
      name: {
        tr: "Muğla",
        en: "Mugla",
        de: "Mugla",
        ru: "Мугла",
      },
      value: "Muğla",
    },
  ],

  // Havalimanı bulunan ilçeler
  airports: {
    antalya: [
      {
        id: "antalya_merkez",
        name: {
          tr: "Antalya Merkez",
          en: "Antalya Center",
          de: "Antalya Zentrum",
          ru: "Анталья Центр",
        },
        value: "Antalya Merkez",
      },
      {
        id: "alanya_gazipasa",
        name: {
          tr: "Alanya Gazipaşa",
          en: "Alanya Gazipasa",
          de: "Alanya Gazipasa",
          ru: "Аланья Газипаша",
        },
        value: "Alanya Gazipaşa",
      },
    ],
    istanbul: [
      {
        id: "istanbul_yeni",
        name: {
          tr: "İstanbul (Yeni Havalimanı)",
          en: "Istanbul (New Airport)",
          de: "Istanbul (Neuer Flughafen)",
          ru: "Стамбул (Новый аэропорт)",
        },
        value: "İstanbul Yeni Havalimanı",
      },
      {
        id: "istanbul_sabiha",
        name: {
          tr: "Sabiha Gökçen",
          en: "Sabiha Gokcen",
          de: "Sabiha Gokcen",
          ru: "Сабиха Гёкчен",
        },
        value: "İstanbul Sabiha Gökçen",
      },
    ],
    ankara: [
      {
        id: "ankara_esenboga",
        name: {
          tr: "Esenboğa",
          en: "Esenboga",
          de: "Esenboga",
          ru: "Эсенбога",
        },
        value: "Ankara Esenboğa",
      },
    ],
    izmir: [
      {
        id: "izmir_adnan",
        name: {
          tr: "Adnan Menderes",
          en: "Adnan Menderes",
          de: "Adnan Menderes",
          ru: "Аднан Мендерес",
        },
        value: "İzmir Adnan Menderes",
      },
    ],
    mugla: [
      {
        id: "mugla_dalaman",
        name: {
          tr: "Dalaman",
          en: "Dalaman",
          de: "Dalaman",
          ru: "Даламан",
        },
        value: "Muğla Dalaman",
      },
      {
        id: "mugla_milas",
        name: {
          tr: "Milas-Bodrum",
          en: "Milas-Bodrum",
          de: "Milas-Bodrum",
          ru: "Милас-Бодрум",
        },
        value: "Muğla Milas-Bodrum",
      },
    ],
  },

  // Her ilçedeki havalimanları
  airportTerminals: {
    antalya_merkez: [
      {
        id: "antalya_domestic",
        name: {
          tr: "İç Hatlar Terminali",
          en: "Domestic Terminal",
          de: "Inlandsflug-Terminal",
          ru: "Внутренний терминал",
        },
        value: "Antalya Havalimanı İç Hatlar",
      },
      {
        id: "antalya_international",
        name: {
          tr: "Dış Hatlar Terminali",
          en: "International Terminal",
          de: "Internationaler Terminal",
          ru: "Международный терминал",
        },
        value: "Antalya Havalimanı Dış Hatlar",
      },
    ],
    alanya_gazipasa: [
      {
        id: "gazipasa_terminal",
        name: {
          tr: "Gazipaşa Terminali",
          en: "Gazipasa Terminal",
          de: "Gazipasa Terminal",
          ru: "Терминал Газипаша",
        },
        value: "Gazipaşa Havalimanı Terminal",
      },
    ],
    istanbul_yeni: [
      {
        id: "ist_domestic",
        name: {
          tr: "İç Hatlar Terminali",
          en: "Domestic Terminal",
          de: "Inlandsflug-Terminal",
          ru: "Внутренний терминал",
        },
        value: "İstanbul Havalimanı İç Hatlar",
      },
      {
        id: "ist_international",
        name: {
          tr: "Dış Hatlar Terminali",
          en: "International Terminal",
          de: "Internationaler Terminal",
          ru: "Международный терминал",
        },
        value: "İstanbul Havalimanı Dış Hatlar",
      },
    ],
    istanbul_sabiha: [
      {
        id: "saw_domestic",
        name: {
          tr: "İç Hatlar Terminali",
          en: "Domestic Terminal",
          de: "Inlandsflug-Terminal",
          ru: "Внутренний терминал",
        },
        value: "Sabiha Gökçen Havalimanı İç Hatlar",
      },
      {
        id: "saw_international",
        name: {
          tr: "Dış Hatlar Terminali",
          en: "International Terminal",
          de: "Internationaler Terminal",
          ru: "Международный терминал",
        },
        value: "Sabiha Gökçen Havalimanı Dış Hatlar",
      },
    ],
    ankara_esenboga: [
      {
        id: "esb_domestic",
        name: {
          tr: "İç Hatlar Terminali",
          en: "Domestic Terminal",
          de: "Inlandsflug-Terminal",
          ru: "Внутренний терминал",
        },
        value: "Esenboğa Havalimanı İç Hatlar",
      },
      {
        id: "esb_international",
        name: {
          tr: "Dış Hatlar Terminali",
          en: "International Terminal",
          de: "Internationaler Terminal",
          ru: "Международный терминал",
        },
        value: "Esenboğa Havalimanı Dış Hatlar",
      },
    ],
    izmir_adnan: [
      {
        id: "adb_domestic",
        name: {
          tr: "İç Hatlar Terminali",
          en: "Domestic Terminal",
          de: "Inlandsflug-Terminal",
          ru: "Внутренний терминал",
        },
        value: "Adnan Menderes Havalimanı İç Hatlar",
      },
      {
        id: "adb_international",
        name: {
          tr: "Dış Hatlar Terminali",
          en: "International Terminal",
          de: "Internationaler Terminal",
          ru: "Международный терминал",
        },
        value: "Adnan Menderes Havalimanı Dış Hatlar",
      },
    ],
    mugla_dalaman: [
      {
        id: "dlm_domestic",
        name: {
          tr: "İç Hatlar Terminali",
          en: "Domestic Terminal",
          de: "Inlandsflug-Terminal",
          ru: "Внутренний терминал",
        },
        value: "Dalaman Havalimanı İç Hatlar",
      },
      {
        id: "dlm_international",
        name: {
          tr: "Dış Hatlar Terminali",
          en: "International Terminal",
          de: "Internationaler Terminal",
          ru: "Международный терминал",
        },
        value: "Dalaman Havalimanı Dış Hatlar",
      },
    ],
    mugla_milas: [
      {
        id: "bjv_domestic",
        name: {
          tr: "İç Hatlar Terminali",
          en: "Domestic Terminal",
          de: "Inlandsflug-Terminal",
          ru: "Внутренний терминал",
        },
        value: "Milas-Bodrum Havalimanı İç Hatlar",
      },
      {
        id: "bjv_international",
        name: {
          tr: "Dış Hatlar Terminali",
          en: "International Terminal",
          de: "Internationaler Terminal",
          ru: "Международный терминал",
        },
        value: "Milas-Bodrum Havalimanı Dış Hatlar",
      },
    ],
  },

  dropoff: {
    antalya: [
      {
        id: "manavgat",
        name: {
          tr: "Manavgat",
          en: "Manavgat",
          de: "Manavgat",
          ru: "Манавгат",
        },
        value: "Antalya Manavgat",
      },
      {
        id: "alanya",
        name: {
          tr: "Alanya",
          en: "Alanya",
          de: "Alanya",
          ru: "Аланья",
        },
        value: "Antalya Alanya",
      },
      {
        id: "kemer",
        name: {
          tr: "Kemer",
          en: "Kemer",
          de: "Kemer",
          ru: "Кемер",
        },
        value: "Antalya Kemer",
      },
      {
        id: "belek",
        name: {
          tr: "Belek",
          en: "Belek",
          de: "Belek",
          ru: "Белек",
        },
        value: "Antalya Belek",
      },
      {
        id: "kundu",
        name: {
          tr: "Kundu",
          en: "Kundu",
          de: "Kundu",
          ru: "Кунду",
        },
        value: "Antalya Kundu",
      },
      {
        id: "side",
        name: {
          tr: "Side",
          en: "Side",
          de: "Side",
          ru: "Сиде",
        },
        value: "Antalya Side",
      },
      {
        id: "lara",
        name: {
          tr: "Lara",
          en: "Lara",
          de: "Lara",
          ru: "Лара",
        },
        value: "Antalya Lara",
      },
    ],
    istanbul: [
      {
        id: "taksim",
        name: {
          tr: "Taksim",
          en: "Taksim",
          de: "Taksim",
          ru: "Таксим",
        },
        value: "İstanbul Taksim",
      },
      {
        id: "kadikoy",
        name: {
          tr: "Kadıköy",
          en: "Kadikoy",
          de: "Kadikoy",
          ru: "Кадыкёй",
        },
        value: "İstanbul Kadıköy",
      },
      {
        id: "besiktas",
        name: {
          tr: "Beşiktaş",
          en: "Besiktas",
          de: "Besiktas",
          ru: "Бешикташ",
        },
        value: "İstanbul Beşiktaş",
      },
    ],
    ankara: [
      {
        id: "kizilay",
        name: {
          tr: "Kızılay",
          en: "Kizilay",
          de: "Kizilay",
          ru: "Кызылай",
        },
        value: "Ankara Kızılay",
      },
      {
        id: "cankaya",
        name: {
          tr: "Çankaya",
          en: "Cankaya",
          de: "Cankaya",
          ru: "Чанкая",
        },
        value: "Ankara Çankaya",
      },
    ],
    izmir: [
      {
        id: "konak",
        name: {
          tr: "Konak",
          en: "Konak",
          de: "Konak",
          ru: "Конак",
        },
        value: "İzmir Konak",
      },
      {
        id: "cesme",
        name: {
          tr: "Çeşme",
          en: "Cesme",
          de: "Cesme",
          ru: "Чешме",
        },
        value: "İzmir Çeşme",
      },
    ],
    mugla: [
      {
        id: "bodrum",
        name: {
          tr: "Bodrum",
          en: "Bodrum",
          de: "Bodrum",
          ru: "Бодрум",
        },
        value: "Muğla Bodrum",
      },
      {
        id: "marmaris",
        name: {
          tr: "Marmaris",
          en: "Marmaris",
          de: "Marmaris",
          ru: "Мармарис",
        },
        value: "Muğla Marmaris",
      },
      {
        id: "fethiye",
        name: {
          tr: "Fethiye",
          en: "Fethiye",
          de: "Fethiye",
          ru: "Фетхие",
        },
        value: "Muğla Fethiye",
      },
    ],
  },

  hotels: {
    // Antalya bölgeleri
    manavgat: [
      {
        id: "trendy_manavgat",
        name: "Trendy Manavgat",
        value: "Trendy Manavgat Hotel",
      },
      {
        id: "sueno_manavgat",
        name: "Sueno Manavgat",
        value: "Sueno Manavgat Hotel",
      },
      {
        id: "barut_manavgat",
        name: "Barut Manavgat",
        value: "Barut Manavgat Hotel",
      },
    ],
    alanya: [
      {
        id: "alaiye_resort",
        name: "Alaiye Resort",
        value: "Alaiye Resort Hotel",
      },
      {
        id: "orange_alanya",
        name: "Orange County",
        value: "Orange County Alanya",
      },
      {
        id: "kleopatra_alanya",
        name: "Kleopatra Beach",
        value: "Kleopatra Beach Hotel",
      },
    ],
    kemer: [
      { id: "rixos_kemer", name: "Rixos Kemer", value: "Rixos Kemer Hotel" },
      {
        id: "mirada_kemer",
        name: "Mirada Del Mar",
        value: "Mirada Del Mar Hotel",
      },
      { id: "queen_kemer", name: "Queen's Park", value: "Queen's Park Hotel" },
    ],
    belek: [
      {
        id: "voyage_belek",
        name: "Voyage Belek",
        value: "Voyage Belek Golf & Spa",
      },
      {
        id: "calista_belek",
        name: "Calista Luxury",
        value: "Calista Luxury Resort",
      },
      {
        id: "cornelia_belek",
        name: "Cornelia Diamond",
        value: "Cornelia Diamond Golf Resort",
      },
    ],
    kundu: [
      {
        id: "titanic_kundu",
        name: "Titanic Beach",
        value: "Titanic Beach Lara",
      },
      { id: "baia_kundu", name: "Baia Lara", value: "Baia Lara Hotel" },
    ],
    side: [
      { id: "empire_side", name: "Empire Side", value: "Empire Side Hotel" },
      {
        id: "sentido_side",
        name: "Sentido Side",
        value: "Sentido Side Resort",
      },
    ],
    lara: [
      {
        id: "royal_lara",
        name: "Royal Holiday",
        value: "Royal Holiday Palace",
      },
      {
        id: "delphin_lara",
        name: "Delphin Imperial",
        value: "Delphin Imperial Lara",
      },
    ],

    // İstanbul bölgeleri
    taksim: [
      {
        id: "marmara_taksim",
        name: "The Marmara",
        value: "The Marmara Taksim",
      },
      {
        id: "intercontinental",
        name: "InterContinental",
        value: "InterContinental Istanbul",
      },
    ],
    kadikoy: [
      {
        id: "doubletree_kadikoy",
        name: "DoubleTree",
        value: "DoubleTree by Hilton Kadıköy",
      },
      {
        id: "wyndham_kadikoy",
        name: "Wyndham Grand",
        value: "Wyndham Grand Kadıköy",
      },
    ],
    besiktas: [
      {
        id: "four_seasons",
        name: "Four Seasons",
        value: "Four Seasons Bosphorus",
      },
      { id: "shangri_la", name: "Shangri-La", value: "Shangri-La Bosphorus" },
    ],

    // Diğer şehirlerin otelleri benzer şekilde eklenebilir
    kizilay: [
      { id: "ankara_hilton", name: "Ankara Hilton", value: "Ankara Hilton" },
    ],
    cankaya: [
      {
        id: "sheraton_ankara",
        name: "Sheraton Ankara",
        value: "Sheraton Ankara",
      },
    ],
    konak: [
      {
        id: "swissotel_izmir",
        name: "Swissotel İzmir",
        value: "Swissotel İzmir",
      },
    ],
    cesme: [
      { id: "ilica_cesme", name: "Ilıca Hotel", value: "Ilıca Hotel Çeşme" },
    ],
    bodrum: [
      {
        id: "titanic_bodrum",
        name: "Titanic Bodrum",
        value: "Titanic Deluxe Bodrum",
      },
      { id: "lujo_bodrum", name: "Lujo Bodrum", value: "Lujo Bodrum Hotel" },
    ],
    marmaris: [
      {
        id: "grand_marmaris",
        name: "Grand Marmaris",
        value: "Grand Yazıcı Marmaris",
      },
    ],
    fethiye: [
      {
        id: "hillside_fethiye",
        name: "Hillside Fethiye",
        value: "Hillside Beach Club Fethiye",
      },
    ],
  },
};
