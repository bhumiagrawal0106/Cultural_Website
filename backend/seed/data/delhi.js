const { img } = require('../helpers');

module.exports = {
  name_en: 'Delhi',
  name_hi: 'दिल्ली',
  slug: 'delhi',
  geoJsonName: 'NCT of Delhi',
  mapCoordinates: { lat: 28.6139, lng: 77.209 },
  thumbnail: img('Qutub_Minar_in_the_monsoons.jpg'),
  description_en:
    'Delhi, the capital of India, has been the seat of empires for over a thousand years. Mughal monuments, Sufi shrines, colonial buildings and legendary street food sit side by side here.',
  description_hi:
    'भारत की राजधानी दिल्ली एक हज़ार से अधिक वर्षों से साम्राज्यों का केंद्र रही है। यहाँ मुग़ल स्मारक, सूफी दरगाहें, औपनिवेशिक इमारतें और मशहूर स्ट्रीट फूड साथ-साथ मिलते हैं।',

  places: [
    {
      name_en: 'Qutub Minar',
      name_hi: 'कुतुब मीनार',
      type: 'monument',
      description_en:
        'Qutub Minar is a 73-metre tall red sandstone tower started in 1193 by Qutb-ud-din Aibak. It is the tallest brick minaret in the world and a UNESCO World Heritage Site.',
      description_hi:
        'कुतुब मीनार 73 मीटर ऊँची लाल पत्थर की मीनार है जिसे 1193 में कुतुबुद्दीन ऐबक ने बनवाना शुरू किया। यह दुनिया की सबसे ऊँची ईंट की मीनार और यूनेस्को विश्व धरोहर स्थल है।',
      images: [img('Qutub_Minar_in_the_monsoons.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=7uU79HkP9rQ',
      coordinates: { lat: 28.5245, lng: 77.1855 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'minaret', 'mehrauli'],
    },
    {
      name_en: 'Red Fort',
      name_hi: 'लाल क़िला',
      type: 'fort',
      description_en:
        'The Red Fort was the main residence of the Mughal emperors for nearly 200 years. Every Independence Day the Prime Minister hoists the national flag from its ramparts.',
      description_hi:
        'लाल क़िला लगभग 200 वर्षों तक मुग़ल बादशाहों का मुख्य निवास था। हर स्वतंत्रता दिवस पर प्रधानमंत्री इसकी प्राचीर से राष्ट्रीय ध्वज फहराते हैं।',
      images: [img('Red_Fort_in_Delhi_03-2016.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=wXW_2195fbc',
      coordinates: { lat: 28.6562, lng: 77.241 },
      bestTimeToVisit: 'October to March, closed on Mondays',
      tags: ['unesco', 'mughal', 'independence day'],
    },
    {
      name_en: 'Hazrat Nizamuddin Dargah',
      name_hi: 'हज़रत निज़ामुद्दीन दरगाह',
      type: 'dargah',
      description_en:
        'This is the shrine of the 14th-century Sufi saint Nizamuddin Auliya. On Thursday evenings, qawwali singers fill the courtyard with soulful music.',
      description_hi:
        'यह 14वीं सदी के सूफी संत निज़ामुद्दीन औलिया की दरगाह है। गुरुवार की शाम कव्वाल आँगन को रूहानी संगीत से भर देते हैं।',
      images: [img('Nizamuddin_Dargah.jpg')],
      coordinates: { lat: 28.5914, lng: 77.242 },
      bestTimeToVisit: 'Thursday evenings for qawwali',
      tags: ['sufi', 'qawwali', 'shrine'],
    },
    {
      name_en: 'Akshardham Temple',
      name_hi: 'अक्षरधाम मंदिर',
      type: 'temple',
      description_en:
        'Swaminarayan Akshardham is a huge modern temple complex opened in 2005, carved entirely from pink sandstone and white marble without steel. Its evening water show is a highlight.',
      description_hi:
        'स्वामिनारायण अक्षरधाम 2005 में खुला एक विशाल आधुनिक मंदिर परिसर है, जो बिना स्टील के गुलाबी पत्थर और सफ़ेद संगमरमर से बना है। शाम का वॉटर शो इसका मुख्य आकर्षण है।',
      images: [img('Akshardham_Delhi.jpg')],
      coordinates: { lat: 28.6127, lng: 77.2773 },
      bestTimeToVisit: 'October to March, closed on Mondays',
      tags: ['modern temple', 'water show', 'sandstone'],
    },
    {
      name_en: 'Agrasen ki Baoli',
      name_hi: 'अग्रसेन की बावली',
      type: 'haunted',
      description_en:
        'Agrasen ki Baoli is a 60-metre long stepwell with 108 steps hidden among the offices of Connaught Place. Locals tell stories of its black water calling people to jump in.',
      description_hi:
        'अग्रसेन की बावली कनॉट प्लेस के दफ्तरों के बीच छुपी 108 सीढ़ियों वाली 60 मीटर लंबी बावली है। स्थानीय लोग कहते हैं कि इसका काला पानी लोगों को अपनी ओर बुलाता था।',
      images: [img('Agrasen_ki_Baoli.jpg')],
      coordinates: { lat: 28.626, lng: 77.2249 },
      bestTimeToVisit: 'October to March, daytime',
      tags: ['stepwell', 'haunted', 'connaught place'],
    },
    {
      name_en: 'India Gate',
      name_hi: 'इंडिया गेट',
      type: 'monument',
      description_en:
        'India Gate is a 42-metre war memorial on Kartavya Path dedicated to 82,000 soldiers of WWI. The Amar Jawan Jyoti burns beneath its arch and the National War Memorial stands nearby.',
      description_hi:
        'इंडिया गेट कर्तव्य पथ पर 42 मीटर ऊँचा युद्ध स्मारक है जो प्रथम विश्वयुद्ध में शहीद 82,000 सैनिकों को समर्पित है।',
      images: [img('India_Gate_in_New_Delhi.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=8IiIFRTKxnA',
      coordinates: { lat: 28.6129, lng: 77.2295 },
      bestTimeToVisit: 'October to March, evening',
      tags: ['war memorial', 'kartavya path', 'national landmark'],
    },
    {
      name_en: "Humayun's Tomb",
      name_hi: 'हुमायूँ का मकबरा',
      type: 'monument',
      description_en:
        "Humayun's Tomb (1570) is the first garden-tomb in the Indian subcontinent and a UNESCO World Heritage Site — the direct precursor that inspired the Taj Mahal's design.",
      description_hi:
        'हुमायूँ का मकबरा (1570) भारतीय उपमहाद्वीप का पहला बगीचा-मकबरा और यूनेस्को विश्व धरोहर है। इसी ने ताजमहल की वास्तुकला को प्रेरित किया।',
      images: [img('Humayun_tomb.jpg')],
      coordinates: { lat: 28.5933, lng: 77.2507 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'mughal', 'garden tomb'],
    },
    {
      name_en: 'Lotus Temple',
      name_hi: 'कमल मंदिर',
      type: 'temple',
      description_en:
        "The Lotus Temple is a Bahá'í House of Worship shaped like a giant lotus flower with 27 free-standing marble petals. Open to all faiths, it draws 10,000 visitors daily.",
      description_hi:
        'कमल मंदिर कमल के विशाल फूल के आकार में बना बहाई उपासना गृह है। सभी धर्मों के लिए खुला यह मंदिर प्रतिदिन 10,000 आगंतुकों को आकर्षित करता है।',
      images: [img('Lotus_Temple_in_New_Delhi.jpg')],
      coordinates: { lat: 28.5535, lng: 77.2588 },
      bestTimeToVisit: 'October to March, closed Mondays',
      tags: ['bahai', 'modern architecture', 'all faiths'],
    },
    {
      name_en: 'Jama Masjid',
      name_hi: 'जामा मस्जिद',
      type: 'dargah',
      description_en:
        "Jama Masjid (1656) built by Shah Jahan is India's largest mosque, capacity 25,000 worshippers. Its 40-metre minarets and massive courtyard are iconic Delhi landmarks.",
      description_hi:
        'शाहजहाँ द्वारा 1656 में बनी जामा मस्जिद भारत की सबसे बड़ी मस्जिद है जहाँ एक साथ 25,000 नमाज़ी नमाज़ पढ़ सकते हैं।',
      images: [img('Jama_Masjid_Delhi.jpg')],
      coordinates: { lat: 28.6507, lng: 77.2334 },
      bestTimeToVisit: 'October to March, outside prayer times',
      tags: ['mosque', 'mughal', 'shah jahan'],
    },
    {
      name_en: 'Lodhi Garden',
      name_hi: 'लोधी गार्डन',
      type: 'heritage',
      description_en:
        'Lodhi Garden is a 90-acre park with 15th-century tombs of Lodhi dynasty sultans amid lush lawns — a serene heritage escape in the heart of New Delhi.',
      description_hi:
        'लोधी गार्डन 90 एकड़ का उद्यान है जिसमें 15वीं सदी के लोधी राजवंश की कब्रें हरे-भरे मैदानों के बीच हैं।',
      images: [img('Lodhi_Gardens.jpg')],
      coordinates: { lat: 28.5932, lng: 77.2199 },
      bestTimeToVisit: 'October to March, morning',
      tags: ['garden', 'lodhi', 'heritage'],
    },
  ],

  crafts: [
    {
      name_en: 'Zardozi Embroidery',
      name_hi: 'ज़रदोज़ी',
      description_en:
        'Zardozi is heavy embroidery with gold and silver threads, pearls and beads, once used to decorate the robes of Mughal royalty. Today it shines on bridal wear and wall hangings.',
      description_hi:
        'ज़रदोज़ी सोने-चाँदी के धागों, मोतियों और मणियों की भारी कढ़ाई है, जो कभी मुग़ल शाही पोशाकों को सजाती थी। आज यह दुल्हन के परिधान और दीवार सजावट पर चमकती है।',
      images: [img('Zardozi.jpg')],
    },
    {
      name_en: 'Meenakari Jewellery of Dariba Kalan',
      name_hi: 'दरीबा कलां की मीनाकारी',
      description_en:
        'Dariba Kalan in Old Delhi is a 17th-century street of silversmiths. Its artisans are known for meenakari, the art of filling engraved metal with bright coloured enamel.',
      description_hi:
        'पुरानी दिल्ली का दरीबा कलां 17वीं सदी की सुनारों की गली है। यहाँ के कारीगर मीनाकारी के लिए प्रसिद्ध हैं, जिसमें उकेरे गए धातु में चमकीले रंग भरे जाते हैं।',
      images: [img('Meenakari_jewellery.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Phool Walon Ki Sair',
      name_hi: 'फूल वालों की सैर',
      description_en:
        'Phool Walon Ki Sair is a 200-year-old festival in Mehrauli where flower sellers offer floral fans (pankhas) at both a Hindu temple and a Sufi dargah, celebrating communal harmony.',
      description_hi:
        'फूल वालों की सैर महरौली का 200 साल पुराना उत्सव है जिसमें फूल विक्रेता एक हिंदू मंदिर और एक सूफी दरगाह दोनों पर फूलों के पंखे चढ़ाते हैं, जो सांप्रदायिक सद्भाव का प्रतीक है।',
      images: [img('Phool_Walon_Ki_Sair.jpg')],
    },
    {
      name_en: 'Republic Day Parade',
      name_hi: 'गणतंत्र दिवस परेड',
      description_en:
        'Every 26 January, Kartavya Path hosts the Republic Day Parade with marching regiments, tableaux from every state and a fly-past by the Air Force, watched by the whole nation.',
      description_hi:
        'हर 26 जनवरी को कर्तव्य पथ पर गणतंत्र दिवस परेड होती है जिसमें सेना की टुकड़ियाँ, हर राज्य की झाँकियाँ और वायु सेना का फ्लाई पास्ट होता है, जिसे पूरा देश देखता है।',
      images: [img('Republic_Day_Parade.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Chole Bhature',
      name_hi: 'छोले भटूरे',
      description_en:
        'Chole Bhature is the ultimate Delhi breakfast: spicy chickpea curry served with puffy deep-fried bread, pickled onions and a glass of lassi.',
      description_hi:
        'छोले भटूरे दिल्ली का सबसे मशहूर नाश्ता है: मसालेदार छोले, फूले हुए तले भटूरे, सिरके वाले प्याज़ और एक गिलास लस्सी।',
      images: [img('Chole_Bhature.jpg')],
    },
    {
      name_en: 'Paranthe Wali Gali Paranthas',
      name_hi: 'परांठे वाली गली के परांठे',
      description_en:
        'Paranthe Wali Gali in Chandni Chowk has served stuffed, deep-fried paranthas since the 1870s. Fillings range from potato and paneer to rabri, banana and dry fruits.',
      description_hi:
        'चांदनी चौक की परांठे वाली गली 1870 के दशक से भरवाँ, तले परांठे परोस रही है। इनमें आलू और पनीर से लेकर रबड़ी, केला और मेवे तक की भरावट मिलती है।',
      images: [img('Paratha.jpg')],
    },
  ],
};
