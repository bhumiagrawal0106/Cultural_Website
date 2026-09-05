const { img } = require('../helpers');

module.exports = {
  name_en: 'Mizoram',
  name_hi: 'मिज़ोरम',
  slug: 'mizoram',
  geoJsonName: 'Mizoram',
  mapCoordinates: { lat: 23.1645, lng: 92.9376 },
  thumbnail: img('Aizawl_Mizoram.jpg'),
  description_en:
    'Mizoram — the Land of the Hill People — is one of India\'s most literate and Christian states, known for its breathtaking blue Phawngpui Peak, the Mizo singing tradition and vibrant bamboo dance.',
  description_hi:
    'मिज़ोरम — पहाड़ी लोगों की भूमि — भारत के सबसे साक्षर और ईसाई राज्यों में से एक है जो अपने नीले फ़ावंगपुई शिखर, मिज़ो गायन परंपरा और जीवंत बाँस नृत्य के लिए प्रसिद्ध है।',

  places: [
    {
      name_en: 'Phawngpui (Blue Mountain) Peak',
      name_hi: 'फ़ावंगपुई (नीला पर्वत) शिखर',
      type: 'tourism',
      description_en:
        'Phawngpui at 2,157 m is the highest peak in Mizoram, home to rare orchids, rare blue mountain birds and scenic grasslands. Its misty blue appearance on clear days is magical.',
      description_hi:
        'फ़ावंगपुई 2,157 मीटर पर मिज़ोरम की सबसे ऊँची चोटी है, जहाँ दुर्लभ ऑर्किड, नीले पर्वतीय पक्षी और सुंदर घास के मैदान हैं।',
      images: [img('Phawngpui_Blue_Mountain.jpg')],
      coordinates: { lat: 22.6347, lng: 93.1080 },
      bestTimeToVisit: 'October to May',
      tags: ['mountain', 'trek', 'orchid', 'nature'],
    },
    {
      name_en: 'Vantawng Falls',
      name_hi: 'वांटॉन्ग जलप्रपात',
      type: 'tourism',
      description_en:
        'Vantawng Falls at 229 m is the highest waterfall in Mizoram and among the top waterfalls in Northeast India. Surrounded by lush jungle, it is particularly spectacular during monsoon.',
      description_hi:
        'वांटॉन्ग जलप्रपात 229 मीटर पर मिज़ोरम का सबसे ऊँचा झरना और पूर्वोत्तर भारत के शीर्ष झरनों में से एक है।',
      images: [img('Vantawng_Falls_Mizoram.jpg')],
      coordinates: { lat: 23.1023, lng: 92.5840 },
      bestTimeToVisit: 'June to September',
      tags: ['waterfall', 'jungle', 'monsoon', 'scenic'],
    },
    {
      name_en: 'Aizawl — The City on Hills',
      name_hi: 'आइज़ॉल — पहाड़ियों पर शहर',
      type: 'tourism',
      description_en:
        'Aizawl, Mizoram\'s capital city perched on a ridge at 1,132 m, offers panoramic views of forested hills. The Mizoram State Museum, Bara Bazar and Durtlang Hills are key attractions.',
      description_hi:
        'आइज़ॉल, मिज़ोरम की राजधानी 1,132 मीटर पर एक पर्वतश्रेणी पर बसी है जहाँ से जंगली पहाड़ियों का मनोरम दृश्य दिखता है।',
      images: [img('Aizawl_Mizoram.jpg')],
      coordinates: { lat: 23.7271, lng: 92.7176 },
      bestTimeToVisit: 'October to March',
      tags: ['capital', 'hilltop city', 'market', 'museum'],
    },
    {
      name_en: 'Tam Dil Lake',
      name_hi: 'तम दिल झील',
      type: 'tourism',
      description_en:
        'Tam Dil ("Lake of Mustard") is a serene natural lake surrounded by lush hills and pine forests near Saitual. It is Mizoram\'s most popular picnic destination.',
      description_hi:
        'तम दिल ("सरसों की झील") साइतुल के पास हरी-भरी पहाड़ियों और देवदार के जंगलों से घिरी एक शांत प्राकृतिक झील है।',
      images: [img('Tam_Dil_lake_Mizoram.jpg')],
      coordinates: { lat: 23.5790, lng: 93.0340 },
      bestTimeToVisit: 'October to March',
      tags: ['lake', 'nature', 'picnic', 'pine forest'],
    },
  ],

  crafts: [
    {
      name_en: 'Puanchei Textile Weaving',
      name_hi: 'पुआनचेई वस्त्र बुनाई',
      description_en: 'Puanchei is the colourful ceremonial shawl of Mizo women, woven on traditional looms with intricate multicoloured geometric patterns worn during festivals and celebrations.',
      description_hi: 'पुआनचेई मिज़ो महिलाओं का रंगीन समारोही शॉल है जिसे पारंपरिक करघों पर जटिल बहुरंगी ज्यामितीय पैटर्न के साथ बुना जाता है।',
      images: [img('Puanchei_shawl_Mizoram.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Cheraw (Bamboo Dance)',
      name_hi: 'चेराव (बाँस नृत्य)',
      description_en: 'Cheraw — the Bamboo Dance — is Mizoram\'s most famous cultural performance. Dancers step in and out between rhythmically clapping bamboo poles with elegant footwork and colorful costumes.',
      description_hi: 'चेराव — बाँस नृत्य — मिज़ोरम का सबसे प्रसिद्ध सांस्कृतिक प्रदर्शन है। नर्तक लयबद्ध रूप से थपथपाते बाँस के खंभों के बीच सुंदर पैर चाल और रंगीन वेशभूषा के साथ नृत्य करते हैं।',
      images: [img('Cheraw_bamboo_dance.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Bai (Mizo Vegetable Stew)',
      name_hi: 'बाई (मिज़ो सब्जी सूप)',
      description_en: 'Bai is a traditional Mizo stew of leafy greens, pumpkins and beans boiled with fermented soybean paste (bekang) and dried chillies — healthy and hearty.',
      description_hi: 'बाई किण्वित सोयाबीन पेस्ट (बेकांग) और सूखी मिर्चों के साथ उबली हरी पत्तेदार सब्जियों, कद्दू और बीन्स का पारंपरिक मिज़ो स्टू है।',
      images: [img('Bai_stew_Mizoram.jpg')],
    },
  ],
};
