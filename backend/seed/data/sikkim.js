const { img } = require('../helpers');

module.exports = {
  name_en: 'Sikkim',
  name_hi: 'सिक्किम',
  slug: 'sikkim',
  geoJsonName: 'Sikkim',
  mapCoordinates: { lat: 27.533, lng: 88.5122 },
  thumbnail: img('Khangchendzonga_Sikkim_Himalayas.jpg'),
  description_en:
    'Sikkim, nestled in the Eastern Himalayas under the guardian shadow of Mount Khangchendzonga (the world’s 3rd highest peak), is renowned for sacred glacial lakes, ancient Buddhist monasteries, rich orchid biodiversity, and vibrant Himalayan culture.',
  description_hi:
    'पूर्वी हिमालय की गोद में कंचनजंगा पर्वत की छांव में बसा सिक्किम पवित्र हिमनद झीलों, प्राचीन बौद्ध गोम्पाओं, रंग-बिरंगे आर्किड और समृद्ध तिब्बती-हिमालयी संस्कृति के लिए जाना जाता है।',

  places: [
    {
      name_en: 'Khangchendzonga National Park',
      name_hi: 'कंचनजंगा राष्ट्रीय उद्यान',
      type: 'monument',
      description_en:
        'India’s first and only UNESCO "Mixed Heritage" Site, celebrating extraordinary biological diversity and sacred Tibetan Buddhist cultural landscapes centered on the world’s 3rd highest mountain (8,586 m).',
      description_hi:
        'भारत का पहला और एकमात्र यूनेस्को "मिश्रित धरोहर" स्थल, जो असाधारण जैविक विविधता और कंचनजंगा पर्वत की पवित्र बौद्ध मान्यताओं को समाहित करता है।',
      images: [img('Khangchendzonga_Sikkim_Himalayas.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=0U7b3P7L5K8',
      coordinates: { lat: 27.7011, lng: 88.1633 },
      bestTimeToVisit: 'March to May and September to November',
      tags: ['unesco', 'mixed heritage', 'khangchendzonga', 'himalayas', 'glacier'],
    },
    {
      name_en: 'Rumtek Monastery',
      name_hi: 'रुमटेक मठ',
      type: 'monument',
      description_en:
        'The largest monastery in Sikkim, serving as the seat of the Karma Kagyu lineage (Dharma Chakra Centre), adorned with golden stupas, rare Tibetan scriptures, and magnificent wall frescoes.',
      description_hi:
        'सिक्किम का सबसे बड़ा बौद्ध मठ जो कर्म काग्यू परंपरा का प्रमुख केंद्र है; यह अपने सुनहरे स्तूप और दुर्लभ तिब्बती पांडुलिपियों के लिए प्रसिद्ध है।',
      images: [img('Rumtek_Monastery_Sikkim.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=kYJvY9F_v24',
      coordinates: { lat: 27.3023, lng: 88.5448 },
      bestTimeToVisit: 'October to May',
      tags: ['monastery', 'buddhism', 'rumtek', 'gangtok', 'karma kagyu'],
    },
    {
      name_en: 'Tsomgo (Changu) Lake',
      name_hi: 'त्सोमगो (चांगु) झील',
      type: 'tourism',
      description_en:
        'A sacred glacial lake at an elevation of 3,753 m reflecting the rugged snow peaks, held sacred by Sikkimese Buddhists and Hindus, surrounded by alpine primulas and rhododendrons.',
      description_hi:
        '3,753 मीटर की ऊँचाई पर स्थित एक पावन हिमनद झील, जो बदलते मौसम के साथ अपना रंग बदलती है और बौद्ध लामाओं द्वारा पूजनीय मानी जाती है।',
      images: [img('Tsomgo_Lake_Sikkim.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=7uU79HkP9rQ',
      coordinates: { lat: 27.3742, lng: 88.7619 },
      bestTimeToVisit: 'October to May; snow viewing in winter',
      tags: ['lake', 'glacial', 'high altitude', 'sacred'],
    },
    {
      name_en: 'Pemayangtse Monastery',
      name_hi: 'पेमायंगत्से मठ',
      type: 'monument',
      description_en:
        'One of the oldest premier monasteries in West Sikkim dating to 1705, renowned for the "Sangtok Palri" — a seven-tiered hand-carved wooden model depicting Guru Rinpoche’s celestial palace.',
      description_hi:
        '1705 में स्थापित पश्चिम सिक्किम का प्राचीनतम बौद्ध मठ, जो सात मंजिला हाथ से तराशे गए काष्ठ मॉडल "सांगतोक पाल्री" के लिए विख्यात है।',
      images: [img('Pemayangtse_Monastery.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=wXW_2195fbc',
      coordinates: { lat: 27.3061, lng: 88.2528 },
      bestTimeToVisit: 'March to June and September to November',
      tags: ['monastery', 'nyingma', 'ancient', 'wood carving'],
    },
    {
      name_en: 'Nathu La Mountain Pass',
      name_hi: 'नाथू ला दर्रा',
      type: 'tourism',
      description_en:
        'A mountain pass on the Old Silk Route at 4,310 m connecting Sikkim with Tibet Autonomous Region of China, offering dramatic panoramic vistas of the Eastern Himalayas.',
      description_hi:
        'प्राचीन रेशम मार्ग पर 4,310 मीटर की ऊँचाई पर स्थित एक ऐतिहासिक पर्वतीय दर्रा जो भारत और तिब्बत को जोड़ता है।',
      images: [img('Nathu_La_Pass_Sikkim.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=zR7z8h7cR98',
      coordinates: { lat: 27.3865, lng: 88.8309 },
      bestTimeToVisit: 'May to October',
      tags: ['pass', 'silk route', 'border', 'snow', 'high altitude'],
    },
  ],

  crafts: [
    {
      name_en: 'Thangka Buddhist Painting',
      name_hi: 'थांगका बौद्ध चित्रकला',
      description_en:
        'Sacred Tibetan Buddhist scroll paintings executed with mineral pigments and gold dust on fine cotton or silk, illustrating Buddhist deities, mandalas, and spiritual journeys.',
      description_hi:
        'सूती या रेशमी वस्त्र पर सोने की भस्म और खनिज रंगों से बौद्ध देवी-देवताओं और मंडलों को चित्रित करने वाली पावन हिमालयी कला।',
      images: [img('Thangka_Painting_Sikkim.jpg')],
      tags: ['thangka', 'buddhist art', 'gold leaf', 'handicraft'],
    },
    {
      name_en: 'Choktse Carved Wooden Tables',
      name_hi: 'चोकत्से नक्काशीदार काष्ठ मेज',
      description_en:
        'Exquisitely carved folding wooden prayer tables lacquered with rich Tibetan floral and dragon motifs, handcrafted by master Sikkimese artisans.',
      description_hi:
        'ड्रैगन और पारंपरिक तिब्बती रूपांकनों से सजी हाथ से तराशी गई तह करने योग्य सुंदर प्रार्थना मेजें।',
      images: [img('Choktse_Table_Sikkim.jpg')],
      tags: ['wood carving', 'choktse', 'tibetan', 'handicraft'],
    },
  ],

  traditions: [
    {
      name_en: 'Cham Sacred Mask Dance',
      name_hi: 'छाम पवित्र मुखौटा नृत्य',
      description_en:
        'A dramatic monastic dance performed by Buddhist lamas wearing ornate masks and silk brocade robes, depicting the triumph of good over evil during Losar and Pang Lhabsol.',
      description_hi:
        'रंग-बिरंगे मुखौटों और रेशमी वस्त्रों में बौद्ध लामाओं द्वारा मठों के प्रांगण में प्रस्तुत किया जाने वाला पावन अनुष्ठानिक नृत्य।',
      images: [img('Cham_Mask_Dance_Sikkim.jpg')],
      tags: ['cham dance', 'mask', 'monastery', 'buddhism', 'losar'],
    },
  ],

  food: [
    {
      name_en: 'Sikkimese Momos & Thukpa',
      name_hi: 'सिक्किमी मोमोज और थुकपा',
      description_en:
        'Authentic steamed dumplings stuffed with spiced cottage cheese or minced meat, accompanied by fiery Dalle Khursani chili chutney and hot comforting noodle broth (Thukpa).',
      description_hi:
        'गर्मागर्म भाप में पके मोमोज जिन्हें तीखी डल्ले खुर्सानी मिर्च की चटनी और गर्मागर्म नूडल सूप (थुकपा) के साथ परोसा जाता है।',
      images: [img('Sikkim_Momos_Thukpa.jpg')],
      tags: ['momos', 'thukpa', 'dalle khursani', 'himalayan food'],
    },
    {
      name_en: 'Gundruk & Sinki',
      name_hi: 'गुंद्रुक और सिंकी',
      description_en:
        'A traditional indigenous fermented leafy vegetable soup made from sun-dried mustard and radish leaves, delivering an appetizing earthy tang high in minerals.',
      description_hi:
        'सरसों और मूली के पत्तों को धूप में खमीरीकृत करके तैयार किया जाने वाला पारंपरिक स्वास्थ्यवर्धक और स्वादिष्ट पहाड़ी सूप।',
      images: [img('Gundruk_Soup_Sikkim.jpg')],
      tags: ['fermented', 'traditional', 'soup', 'organic'],
    },
  ],
};
