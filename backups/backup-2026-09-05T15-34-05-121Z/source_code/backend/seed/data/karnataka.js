const { img } = require('../helpers');

module.exports = {
  name_en: 'Karnataka',
  name_hi: 'कर्नाटक',
  slug: 'karnataka',
  geoJsonName: 'Karnataka',
  mapCoordinates: { lat: 15.3173, lng: 75.7139 },
  thumbnail: img('Hampi_Virupaksha_Temple.jpg'),
  description_en:
    'Karnataka is home to the ruins of Hampi, the glorious Mysore Palace and the lush coffee estates of Coorg. It is a land of Carnatic music, classical dance and ancient Hoysala temples.',
  description_hi:
    'कर्नाटक हम्पी के खंडहरों, शानदार मैसूर महल और कूर्ग के हरे-भरे कॉफी बागानों का घर है। यह कर्नाटक संगीत, शास्त्रीय नृत्य और प्राचीन होयसला मंदिरों की भूमि है।',

  places: [
    {
      name_en: 'Hampi',
      name_hi: 'हम्पी',
      type: 'monument',
      description_en:
        'Hampi was the capital of the Vijayanagara Empire in the 14th–16th centuries. Its dramatic landscape of boulders, temples and ruined palaces spread over 26 sq km is a UNESCO World Heritage Site.',
      description_hi:
        'हम्पी 14वीं-16वीं शताब्दी में विजयनगर साम्राज्य की राजधानी था। 26 वर्ग किमी में फैले शिलाखंडों, मंदिरों और खंडहर महलों का इसका नाटकीय परिदृश्य यूनेस्को विश्व धरोहर है।',
      images: [img('Hampi_Virupaksha_Temple.jpg'), img('Hampi_ruins.jpg')],
      coordinates: { lat: 15.3350, lng: 76.4600 },
      bestTimeToVisit: 'October to February',
      tags: ['unesco', 'vijayanagara', 'ruins', 'boulder', 'temple'],
    },
    {
      name_en: 'Mysore Palace',
      name_hi: 'मैसूर महल',
      type: 'monument',
      description_en:
        'Mysore Palace is the official residence of the Wadiyar dynasty and one of the most visited attractions in India. The palace is illuminated by 97,000 light bulbs during Dasara, attracting over a million visitors.',
      description_hi:
        'मैसूर महल वाडियार राजवंश का आधिकारिक निवास और भारत में सबसे अधिक देखे जाने वाले आकर्षणों में से एक है। दशहरे के दौरान महल 97,000 प्रकाश बल्बों से रोशन होता है।',
      images: [img('Mysore_Palace_illuminated.jpg')],
      coordinates: { lat: 12.3052, lng: 76.6552 },
      bestTimeToVisit: 'October (Dasara), October to February',
      tags: ['mysore', 'palace', 'wadiyar', 'dasara', 'illumination'],
    },
    {
      name_en: 'Hoysaleswara Temple',
      name_hi: 'होयसलेश्वर मंदिर',
      type: 'temple',
      description_en:
        'The Hoysaleswara Temple at Halebidu is a 12th-century Hindu temple dedicated to Shiva. Every inch of its walls is covered with friezes of gods, goddesses, elephants and dancers — a UNESCO World Heritage Site.',
      description_hi:
        'हलेबिदु का होयसलेश्वर मंदिर शिव को समर्पित 12वीं सदी का हिंदू मंदिर है। इसकी दीवारों का हर इंच देवताओं, देवियों, हाथियों और नर्तकों की उभरी नक्काशी से ढका है। यूनेस्को विश्व धरोहर।',
      images: [img('Hoysaleshwara_temple.jpg')],
      coordinates: { lat: 13.2121, lng: 75.9997 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'hoysala', 'temple', 'sculpture', 'halebidu'],
    },
    {
      name_en: 'Badami Cave Temples',
      name_hi: 'बादामी गुफा मंदिर',
      type: 'monument',
      description_en:
        'Badami was the capital of the early Chalukya dynasty. Its four rock-cut cave temples dating from the 6th century have exquisite sculptures of Vishnu, Shiva and Jain figures carved into sandstone cliffs.',
      description_hi:
        'बादामी प्रारंभिक चालुक्य राजवंश की राजधानी था। 6वीं सदी की इसकी चार पत्थर काटकर बनाई गई गुफा मंदिरों में बलुआ पत्थर की चट्टानों में उत्कृष्ट विष्णु, शिव और जैन आकृतियाँ उकेरी गई हैं।',
      images: [img('Badami_cave_temple.jpg')],
      coordinates: { lat: 15.9200, lng: 75.6800 },
      bestTimeToVisit: 'October to March',
      tags: ['chalukya', 'cave', 'sculpture', 'badami', 'historic'],
    },
    {
      name_en: 'Coorg (Kodagu)',
      name_hi: 'कूर्ग (कोडगु)',
      type: 'tourism',
      description_en:
        'Coorg is a misty hill district in the Western Ghats, known as the Scotland of India. It produces some of India\'s finest coffee and pepper, and is home to the warrior Kodava people with unique traditions.',
      description_hi:
        'कूर्ग पश्चिमी घाट का कोहरे से ढका पहाड़ी जिला है, जिसे भारत का स्कॉटलैंड कहा जाता है। यह भारत की बेहतरीन कॉफी और काली मिर्च उगाता है।',
      images: [img('Coorg_coffee_plantation.jpg')],
      coordinates: { lat: 12.3375, lng: 75.8069 },
      bestTimeToVisit: 'October to March',
      tags: ['coffee', 'hill station', 'western ghats', 'nature', 'coorg'],
    },
  ],

  crafts: [
    {
      name_en: 'Mysore Silk Saree',
      name_hi: 'मैसूर रेशमी साड़ी',
      description_en:
        'Mysore silk sarees are made from pure Mysore silk with a distinctive gold zari border. The Karnataka Silk Industries Corporation (KSIC) produces them using government-regulated processes.',
      description_hi:
        'मैसूर रेशमी साड़ियाँ शुद्ध मैसूर रेशम से एक विशिष्ट सोने की ज़री बॉर्डर के साथ बनाई जाती हैं।',
      images: [img('Mysore_silk_saree.jpg')],
    },
    {
      name_en: 'Channapatna Toys',
      name_hi: 'चन्नपट्ना खिलौने',
      description_en:
        'Channapatna town near Bengaluru is famous for its colourful lacquered wooden toys made from ivory wood (aale mara). They are GI-tagged and known globally as Karnataka\'s toy town.',
      description_hi:
        'बेंगलुरु के पास चन्नपट्ना शहर हाथीदाँत की लकड़ी से बने रंगीन लाख के खिलौनों के लिए प्रसिद्ध है।',
      images: [img('Channapatna_toys.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Mysore Dasara',
      name_hi: 'मैसूर दशहरा',
      description_en:
        'Mysore Dasara is a 10-day festival in October where the city comes alive with processions, cultural events and the illumination of Mysore Palace. The Jumbo Savari elephant procession is the highlight.',
      description_hi:
        'मैसूर दशहरा अक्टूबर में 10 दिवसीय उत्सव है जहाँ शहर जुलूस, सांस्कृतिक कार्यक्रमों और मैसूर महल की रोशनी से जीवंत हो उठता है।',
      images: [img('Mysore_Dasara_procession.jpg')],
    },
    {
      name_en: 'Yakshagana',
      name_hi: 'यक्षगान',
      description_en:
        'Yakshagana is a traditional theatre form of coastal Karnataka combining dance, music, dialogue, costume and make-up. Stories from the Ramayana, Mahabharata and Puranas are enacted through the night.',
      description_hi:
        'यक्षगान तटीय कर्नाटक का पारंपरिक थिएटर रूप है जो नृत्य, संगीत, संवाद, वेशभूषा और श्रृंगार का संयोजन है।',
      images: [img('Yakshagana_performance.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Bisi Bele Bath',
      name_hi: 'बिसी बेले बाथ',
      description_en:
        'Bisi Bele Bath (hot lentil rice) is a hearty one-pot dish of rice, lentils and vegetables cooked together with a special spice powder and finished with ghee and cashews.',
      description_hi:
        'बिसी बेले बाथ (गर्म दाल चावल) चावल, दाल और सब्जियों को विशेष मसाला पाउडर के साथ पकाया गया हार्दिक एक-बर्तन व्यंजन है।',
      images: [img('Bisi_bele_bath.jpg')],
    },
    {
      name_en: 'Mangalorean Fish Curry',
      name_hi: 'मंगलोरियन मछली करी',
      description_en:
        'This coconut milk-based fish curry from Mangalore uses red Byadagi chillies, raw mango and kokum to create a tangy, spicy and aromatic coastal curry best eaten with rice or neer dosa.',
      description_hi:
        'मंगलोर की यह नारियल दूध आधारित मछली करी लाल बयाडगी मिर्च, कच्चे आम और कोकम से खट्टी, मसालेदार और सुगंधित तटीय करी बनाती है।',
      images: [img('Mangalorean_fish_curry.jpg')],
    },
  ],
};
