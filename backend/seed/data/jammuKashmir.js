const { img } = require('../helpers');

module.exports = {
  name_en: 'Jammu and Kashmir',
  name_hi: 'जम्मू और कश्मीर',
  slug: 'jammu-and-kashmir',
  geoJsonName: 'Jammu and Kashmir',
  mapCoordinates: { lat: 33.7782, lng: 76.5762 },
  thumbnail: img('Dal_Lake_Srinagar.jpg'),
  description_en:
    'Celebrated as "Paradise on Earth", Jammu & Kashmir features the serene waters of Dal Lake, snow-capped Pir Panjal ranges, Mughal gardens, sacred shrines, and masterful handcrafts.',
  description_hi:
    'धरती का स्वर्ग कहे जाने वाले जम्मू और कश्मीर में डल झील का शांत जल, पीर पंजाल की बर्फीली चोटियाँ, मुग़ल बाग़, पवित्र तीर्थ और बेजोड़ हस्तकलाएं हैं।',

  places: [
    {
      name_en: 'Dal Lake',
      name_hi: 'डल झील',
      type: 'monument',
      description_en:
        'Srinagar’s iconic urban lake famous for carved cedar houseboats, floating vegetable markets, and colorful shikara rides against the Zabarwan mountains.',
      description_hi:
        'श्रीनगर की प्रसिद्ध झील जो नक्काशीदार हाउसबोटों, तैरते सब्जी बाजारों और शिकारों के लिए दुनिया भर में जानी जाती है।',
      images: [img('Dal_Lake_Srinagar.jpg')],
      coordinates: { lat: 34.1136, lng: 74.8698 },
      bestTimeToVisit: 'April to October',
      tags: ['lake', 'shikara', 'houseboat', 'srinagar'],
    },
    {
      name_en: 'Shalimar Bagh Mughal Garden',
      name_hi: 'शालीमार बाग़',
      type: 'monument',
      description_en:
        'A magnificent Mughal terraced garden built in 1619 by Emperor Jahangir for his wife Nur Jahan, fed by a canal of mountain spring water through carved fountains.',
      description_hi:
        '1619 में मुग़ल सम्राट जहांगीर द्वारा नूरजहां के लिए बनवाया गया सीढ़ीदार बाग़, जो फव्वारों और चिनार के पेड़ों से सुशोभित है।',
      images: [img('Shalimar_Bagh_Srinagar.jpg')],
      coordinates: { lat: 34.1504, lng: 74.873 },
      bestTimeToVisit: 'May to October',
      tags: ['mughal garden', 'unesco tentative', 'fountains', 'heritage'],
    },
    {
      name_en: 'Vaishno Devi Shrine',
      name_hi: 'वैष्णो देवी मंदिर',
      type: 'temple',
      description_en:
        'A revered Hindu cave temple located in the Trikuta Mountains at 5,200 ft, visited by millions of pilgrims each year.',
      description_hi:
        'त्रिकुटा पर्वत पर स्थित एक अत्यंत पावन गुफा मंदिर जहाँ प्रतिवर्ष लाखों श्रद्धालु माता के दर्शन के लिए आते हैं।',
      images: [img('Vaishno_Devi_Bhavan.jpg')],
      coordinates: { lat: 33.0308, lng: 74.949 },
      bestTimeToVisit: 'March to October',
      tags: ['temple', 'pilgrimage', 'cave shrine', 'katra'],
    },
    {
      name_en: 'Shankaracharya Temple',
      name_hi: 'शंकराचार्य मंदिर',
      type: 'temple',
      description_en:
        'An ancient stone temple dedicated to Lord Shiva, crowning the Gopadari Hill at 1,000 feet above the Srinagar valley, dating back to 200 BCE.',
      description_hi:
        'श्रीनगर घाटी से 1000 फीट ऊँची पहाड़ी पर स्थित भगवान शिव का प्राचीन पाषाण मंदिर।',
      images: [img('Shankaracharya_Temple_Srinagar.jpg')],
      coordinates: { lat: 34.0722, lng: 74.8458 },
      bestTimeToVisit: 'May to September',
      tags: ['temple', 'ancient', 'shiva', 'viewpoint'],
    },
    {
      name_en: 'Gulmarg Meadow of Flowers',
      name_hi: 'गुलमर्ग',
      type: 'monument',
      description_en:
        'A world-renowned ski resort nestled in the Pir Panjal range, featuring the Gulmarg Gondola, one of the highest cable cars in the world at 3,979 m.',
      description_hi:
        'पीर पंजाल श्रृंखला में स्थित विश्व प्रसिद्ध स्की रिसॉर्ट, जहाँ दुनिया के सबसे ऊँचे केबल कार (गोंडोला) में से एक स्थित है।',
      images: [img('Gulmarg_Kashmir.jpg')],
      coordinates: { lat: 34.0484, lng: 74.3805 },
      bestTimeToVisit: 'December to March for snow, May to September for flowers',
      tags: ['ski', 'gondola', 'snow', 'meadow'],
    },
  ],

  crafts: [
    {
      name_en: 'Pashmina Shawl Weaving',
      name_hi: 'पश्मीना शॉल बुनाई',
      description_en:
        'Hand-spun cashmere fleece from Changthangi goats of Ladakh woven on traditional wooden looms in Srinagar, known for feather-light warmth.',
      description_hi:
        'लद्दाख की चांगथांगी बकरियों के ऊन से श्रीनगर के पारंपरिक करघों पर हाथ से बुने जाने वाले अत्यंत मुलायम और गर्म शॉल।',
      images: [img('Kashmir_Pashmina_Shawl.jpg')],
      tags: ['pashmina', 'cashmere', 'weaving', 'gi tag'],
    },
    {
      name_en: 'Kashmiri Papier-Mâché',
      name_hi: 'कश्मीरी पेपर-मैशी',
      description_en:
        'A Persian-influenced decorative art using layered paper pulp molded and painted with intricate floral motifs and gold leaf.',
      description_hi:
        'कागज की लुगदी से सुंदर वस्तुएं बनाकर उन पर सोने के वर्क और बारीक फूलों के चित्रों से सजाई जाने वाली कला।',
      images: [img('Kashmir_Paper_Mache.jpg')],
      tags: ['papier-mache', 'handicraft', 'floral', 'gi tag'],
    },
  ],

  traditions: [
    {
      name_en: 'Sufiana Kalam',
      name_hi: 'सूफियाना कलाम',
      description_en:
        'The classical music tradition of Kashmir accompanied by the santoor, saaz, and tabla, reciting the mystic poetry of Lal Ded and Sheikh Noor-ud-Din.',
      description_hi:
        'कश्मीर की शास्त्रीय संगीत परंपरा जो संतूर, साज़ और तबले के साथ सूफी संतों के वचनों का गायन करती है।',
      images: [img('Santoor_Kashmir_Music.jpg')],
      tags: ['music', 'sufi', 'santoor', 'poetry'],
    },
  ],

  food: [
    {
      name_en: 'Rogan Josh (Wazwan)',
      name_hi: 'रोग़न जोश',
      description_en:
        'The centerpiece of the royal 36-course Wazwan feast — tender lamb braised in an aromatic gravy of Kashmiri dried chillies, fennel, and maval flowers.',
      description_hi:
        'कश्मीरी वाज़वान का मुख्य व्यंजन — कश्मीरी लाल मिर्च, सौंफ और खुशबूदार मसालों में धीमी आंच पर पकाया गया मटन।',
      images: [img('Rogan_Josh_Kashmiri.jpg')],
      tags: ['wazwan', 'lamb', 'curry', 'traditional'],
    },
    {
      name_en: 'Kashmiri Kahwa',
      name_hi: 'कश्मीरी कहवा',
      description_en:
        'An invigorating green tea brewed in a copper samovar with crushed saffron strands, cinnamon, green cardamom pods, and slivered almonds.',
      description_hi:
        'तांबे के समोवार में केसर, दालचीनी, इलायची और बादाम के साथ तैयार की जाने वाली कश्मीरी हरी चाय।',
      images: [img('Kashmiri_Kahwa_Tea.jpg')],
      tags: ['tea', 'saffron', 'kahwa', 'warm drink'],
    },
  ],
};
