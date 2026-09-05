const { img } = require('../helpers');

module.exports = {
  name_en: 'Uttar Pradesh',
  name_hi: 'उत्तर प्रदेश',
  slug: 'uttar-pradesh',
  geoJsonName: 'Uttar Pradesh',
  mapCoordinates: { lat: 26.8467, lng: 80.9462 },
  thumbnail: img('Taj_Mahal,_Agra,_India_edit3.jpg'),
  description_en:
    'Uttar Pradesh is the spiritual heartland of India, home to the Taj Mahal, the holy cities of Varanasi and Mathura, and ancient pilgrim sites along the Ganges.',
  description_hi:
    'उत्तर प्रदेश भारत का आध्यात्मिक हृदय है — ताजमहल, वाराणसी और मथुरा की पावन नगरियाँ और गंगा के तट पर अनगिनत तीर्थस्थल यहाँ हैं।',

  places: [
    {
      name_en: 'Taj Mahal, Agra',
      name_hi: 'ताज महल, आगरा',
      type: 'monument',
      description_en:
        'The Taj Mahal is a UNESCO World Heritage Site and one of the Seven Wonders of the World. Built by Emperor Shah Jahan in 1632 in memory of his wife Mumtaz Mahal, it stands as an eternal symbol of love.',
      description_hi:
        'ताजमहल यूनेस्को विश्व धरोहर और दुनिया के सात अजूबों में से एक है। शाहजहाँ ने 1632 में अपनी पत्नी मुमताज की याद में इसे बनवाया था।',
      images: [img('Taj_Mahal,_Agra,_India_edit3.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=FNeToVCFqoY',
      coordinates: { lat: 27.1751, lng: 78.0421 },
      bestTimeToVisit: 'October to March, full moon nights',
      tags: ['agra', 'unesco', 'wonder', 'mughal'],
    },
    {
      name_en: 'Kashi Vishwanath Temple, Varanasi',
      name_hi: 'काशी विश्वनाथ मंदिर, वाराणसी',
      type: 'temple',
      description_en:
        'The Kashi Vishwanath Temple on the banks of the Ganges is one of the twelve Jyotirlingas of Lord Shiva. Varanasi, the oldest living city in the world, has been a centre of learning and spirituality for 3,000 years.',
      description_hi:
        'गंगा के तट पर काशी विश्वनाथ मंदिर भगवान शिव के 12 ज्योतिर्लिंगों में से एक है। वाराणसी, विश्व का सबसे पुराना जीवित शहर, 3,000 वर्षों से आध्यात्मिकता का केंद्र रहा है।',
      images: [img('Kashi_vishwanath.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=J3KFUzT5JuI',
      coordinates: { lat: 25.3109, lng: 83.0107 },
      bestTimeToVisit: 'October to March, Maha Shivratri',
      tags: ['varanasi', 'jyotirlinga', 'shiva', 'pilgrimage'],
    },
    {
      name_en: 'Agra Fort',
      name_hi: 'आगरा का किला',
      type: 'fort',
      description_en:
        'Agra Fort is a massive UNESCO World Heritage red sandstone fort built by Emperor Akbar in 1565. It served as the main residence of the Mughal emperors and contains some of the finest Mughal architecture.',
      description_hi:
        'आगरा किला 1565 में अकबर द्वारा निर्मित लाल बलुआ पत्थर का यूनेस्को विश्व धरोहर किला है। यह मुगल बादशाहों का मुख्य निवास था।',
      images: [img('Agra_fort_Agra_UP_India.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=EX4Ig9zXuZk',
      coordinates: { lat: 27.1799, lng: 78.0216 },
      bestTimeToVisit: 'October to March',
      tags: ['agra', 'fort', 'mughal', 'unesco'],
    },
    {
      name_en: 'Sarnath Buddhist Site',
      name_hi: 'सारनाथ बौद्ध स्थल',
      type: 'monument',
      description_en:
        'Sarnath is where the Buddha delivered his first sermon after attaining enlightenment. The Dhamek Stupa, Mulagandhakuti Temple and Ashoka Pillar make it one of the most sacred Buddhist sites.',
      description_hi:
        'सारनाथ वह स्थान है जहाँ बुद्ध ने ज्ञान प्राप्त करने के बाद पहला उपदेश दिया था। धमेख स्तूप, मूलगंधकुटी मंदिर और अशोक स्तंभ इसे सबसे पवित्र बौद्ध स्थलों में से एक बनाते हैं।',
      images: [img('Dhamekh_stupa.jpg')],
      coordinates: { lat: 25.3791, lng: 83.0238 },
      bestTimeToVisit: 'October to March',
      tags: ['buddhism', 'stupa', 'varanasi', 'ashoka'],
    },
    {
      name_en: 'Banke Bihari Temple, Vrindavan',
      name_hi: 'बाँके बिहारी मंदिर, वृंदावन',
      type: 'temple',
      description_en:
        'The Banke Bihari Temple in Vrindavan is dedicated to Lord Krishna and is one of the most beloved temples in India. The deity is known for its swinging posture and the unique curtain darshan tradition.',
      description_hi:
        'वृंदावन का बाँके बिहारी मंदिर भगवान कृष्ण को समर्पित है। यहाँ विग्रह का अनूठा पर्दा-दर्शन परंपरा और झूलती-सी भंगिमा भक्तों को मंत्रमुग्ध करती है।',
      images: [img('Banke_Bihari_Temple_Vrindavan.jpg')],
      coordinates: { lat: 27.5766, lng: 77.6954 },
      bestTimeToVisit: 'October to March, Holi and Janmashtami',
      tags: ['vrindavan', 'krishna', 'temple', 'mathura'],
    },
    {
      name_en: 'Ram Janmabhoomi Temple, Ayodhya',
      name_hi: 'राम जन्मभूमि मंदिर, अयोध्या',
      type: 'temple',
      description_en:
        'Ayodhya is the birthplace of Lord Ram, one of the holiest cities of Hinduism. The newly built Ram Mandir consecrated in 2024 is a grand sandstone temple embodying the Nagara style of architecture.',
      description_hi:
        'अयोध्या भगवान राम की जन्मभूमि और हिंदुओं के सबसे पवित्र शहरों में से एक है। 2024 में प्रतिष्ठित भव्य राम मंदिर नागर शैली की वास्तुकला का उत्कृष्ट उदाहरण है।',
      images: [img('Ram_Mandir_Ayodhya.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=6VVrFkSK6eQ',
      coordinates: { lat: 26.7969, lng: 82.1942 },
      bestTimeToVisit: 'October to March, Ram Navami',
      tags: ['ayodhya', 'ram', 'temple', 'pilgrimage'],
    },
    {
      name_en: 'Fatehpur Sikri',
      name_hi: 'फतेहपुर सीकरी',
      type: 'monument',
      description_en:
        'Fatehpur Sikri was the Mughal capital under Emperor Akbar from 1571–85. This UNESCO World Heritage city of red sandstone palaces, mosques and courtyards was abandoned due to water scarcity.',
      description_hi:
        'फतेहपुर सीकरी 1571–85 में अकबर के शासन में मुगल राजधानी थी। लाल बलुआ पत्थर के महलों, मस्जिदों और दरबारों का यह यूनेस्को विश्व धरोहर नगर जलाभाव के कारण छोड़ा गया।',
      images: [img('Buland_Darwaza_Fatehpur_Sikri.jpg')],
      coordinates: { lat: 27.0944, lng: 77.6625 },
      bestTimeToVisit: 'October to March',
      tags: ['agra', 'mughal', 'akbar', 'unesco'],
    },
    {
      name_en: 'Dudhwa National Park',
      name_hi: 'दुधवा राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'Dudhwa National Park on the Nepal border is home to Bengal tigers, swamp deer (barasingha), one-horned rhinoceroses and over 450 species of birds in the Terai grasslands.',
      description_hi:
        'नेपाल सीमा पर दुधवा राष्ट्रीय उद्यान में बंगाल टाइगर, दलदली हिरण, एक सींग वाले गैंडे और तराई घास के मैदानों में 450 से अधिक पक्षी प्रजातियाँ हैं।',
      images: [img('Dudhwa_national_park.jpg')],
      coordinates: { lat: 28.6332, lng: 80.6547 },
      bestTimeToVisit: 'November to June',
      tags: ['wildlife', 'tiger', 'terai', 'rhino'],
    },
  ],

  crafts: [
    {
      name_en: 'Varanasi Silk Weaving (Banarasi)',
      name_hi: 'वाराणसी रेशम (बनारसी)',
      description_en:
        'Banarasi silk sarees woven in Varanasi are famous worldwide for their intricate gold and silver zari patterns inspired by Mughal floral motifs. A GI-tagged craft of great cultural significance.',
      description_hi:
        'वाराणसी में बुनी जाने वाली बनारसी रेशम साड़ियाँ मुगल पुष्प प्रेरणा से बनी जटिल सोने-चाँदी की ज़री के काम के लिए विश्व प्रसिद्ध हैं।',
      images: [img('Banarasi_Silk_Saree.jpg')],
    },
    {
      name_en: 'Lucknow Chikankari',
      name_hi: 'लखनऊ चिकनकारी',
      description_en:
        'Chikankari is a delicate shadow embroidery style developed in Lucknow under Nawabi patronage. The fine white thread work on muslin creates ethereal floral designs.',
      description_hi:
        'चिकनकारी लखनऊ में नवाबी संरक्षण में विकसित नाजुक छाया कढ़ाई है। मलमल पर सफेद धागे का बारीक काम अलौकिक पुष्प डिज़ाइन बनाता है।',
      images: [img('Chikankari_embroidery_lucknow.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Ganga Aarti, Varanasi',
      name_hi: 'गंगा आरती, वाराणसी',
      description_en:
        'Every evening at Dashashwamedh Ghat in Varanasi, priests perform the spectacular Ganga Aarti — a ritual of fire, incense and chanting that draws thousands of devotees and tourists.',
      description_hi:
        'वाराणसी के दशाश्वमेध घाट पर हर संध्या पुजारी भव्य गंगा आरती करते हैं — अग्नि, धूप और मंत्रों का यह अनुष्ठान हजारों श्रद्धालुओं और पर्यटकों को आकर्षित करता है।',
      images: [img('Ganga_Aarti_Varanasi.jpg')],
    },
    {
      name_en: 'Kumbh Mela',
      name_hi: 'कुंभ मेला',
      description_en:
        'The Kumbh Mela at Prayagraj is the world\'s largest peaceful gathering. Held every 12 years at the Triveni Sangam of Ganga, Yamuna and mythical Saraswati, it draws over 100 million pilgrims.',
      description_hi:
        'प्रयागराज का कुंभ मेला विश्व का सबसे बड़ा शांतिपूर्ण जनसमूह है। 12 वर्षों में एक बार गंगा-यमुना-सरस्वती के त्रिवेणी संगम पर 10 करोड़ से अधिक तीर्थयात्री आते हैं।',
      images: [img('Kumbh_Mela_Prayagraj.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Kachori Sabzi',
      name_hi: 'कचोरी सब्ज़ी',
      description_en:
        'Crispy deep-fried kachoris stuffed with spiced urad dal, served with a tangy aloo sabzi, tamarind chutney and fresh coriander. The quintessential Uttar Pradesh breakfast.',
      description_hi:
        'उड़द दाल और मसालों से भरी खस्ता कचोरी, खट्टी आलू सब्जी, इमली की चटनी और ताज़े धनिये के साथ — उत्तर प्रदेश का क्विंटेशेंशल नाश्ता।',
      images: [img('Kachori_sabzi_UP.jpg')],
    },
    {
      name_en: 'Lucknowi Biryani (Dum Pukht)',
      name_hi: 'लखनवी बिरयानी (दम पुख़्त)',
      description_en:
        'Lucknowi biryani, prepared by the Dum Pukht slow-cooking method, uses fragrant basmati rice, saffron, rose water and slow-cooked meat sealed in a dough-covered handi for maximum flavour.',
      description_hi:
        'लखनवी बिरयानी दम पुख़्त विधि से बनती है — सुगंधित बासमती, केसर, गुलाब जल और आटे से बंद हांडी में धीमी आँच पर पकाया गया मांस।',
      images: [img('Lucknawi_Biryani.jpg')],
    },
  ],
};
