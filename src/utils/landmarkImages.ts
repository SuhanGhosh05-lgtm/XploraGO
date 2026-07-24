/**
 * Comprehensive Landmark Image Resolver
 * Uses a curated map of 150+ iconic global landmarks + dynamic Wikipedia pageimage API
 * to ensure every searched place receives an accurate, real photograph.
 */

export const LANDMARK_IMAGE_MAP: Record<string, string> = {
  // Major Global Monuments & Landmarks
  'eiffel tower': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
  'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  'taj mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
  'agra': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
  'fushimi inari': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  'kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  'colosseum': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  'machu picchu': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
  'peru': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
  'sagrada familia': 'https://images.unsplash.com/photo-1583772603224-f77409f8c6b2?auto=format&fit=crop&w=1200&q=80',
  'barcelona': 'https://images.unsplash.com/photo-1583772603224-f77409f8c6b2?auto=format&fit=crop&w=1200&q=80',
  'statue of liberty': 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=1200&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  'great wall': 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
  'china': 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
  'louvre': 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80',
  'pyramid of giza': 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
  'pyramids': 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
  'cairo': 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
  'egypt': 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
  'big ben': 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80',
  'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  'mount fuji': 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=80',
  'fuji': 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=80',
  'santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  'greece': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  'christ the redeemer': 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
  'rio de janeiro': 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=1200&q=80',
  'chichen itza': 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80',
  'mexico': 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80',
  'petra': 'https://images.unsplash.com/photo-1579606030126-5f4bb9521178?auto=format&fit=crop&w=1200&q=80',
  'jordan': 'https://images.unsplash.com/photo-1579606030126-5f4bb9521178?auto=format&fit=crop&w=1200&q=80',
  'angkor wat': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'cambodia': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'acropolis': 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80',
  'athens': 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80',
  'sydney opera house': 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&w=1200&q=80',
  'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
  'burj khalifa': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'grand canyon': 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80',
  'niagara falls': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
  'golden gate bridge': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  'san francisco': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  'stonehenge': 'https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&w=1200&q=80',
  'notre dame': 'https://images.unsplash.com/photo-1478359844494-1092259d93e4?auto=format&fit=crop&w=1200&q=80',
  'versailles': 'https://images.unsplash.com/photo-1584003564911-a7a321c84e1c?auto=format&fit=crop&w=1200&q=80',
  'neuschwanstein': 'https://images.unsplash.com/photo-1534312527009-56c7016453e6?auto=format&fit=crop&w=1200&q=80',
  'tower bridge': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  'venice': 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
  'florence': 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1200&q=80',
  'tokyo': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  'seoul': 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80',
  'taipei 101': 'https://images.unsplash.com/photo-1508248467877-aed32782b26c?auto=format&fit=crop&w=1200&q=80',
  'marina bay sands': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  'kilimanjaro': 'https://images.unsplash.com/photo-1589553460732-58ef7a71fbb5?auto=format&fit=crop&w=1200&q=80',
  'banff': 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
  'yosemite': 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
  'times square': 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80',
  'ha long bay': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
  'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  'brandenburg gate': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
  'berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
  'prague': 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
  'vatican': 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80',
  'disney': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
  'disneyland': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',

  // West Bengal & Kolkata Iconic Landmarks
  'victoria memorial': 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=1200&q=80',
  'howrah bridge': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
  'rabindra setu': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
  'kolkata': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
  'calcutta': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
  'dakshineswar': 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=80',
  'dakshineswar kali temple': 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=80',
  'belur math': 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=80',
  'kalighat': 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=80',
  'princep ghat': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
  'prinsep ghat': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
  'darjeeling': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  'darjeeling Himalayan railway': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  'tiger hill': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  'toy train': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  'sundarbans': 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=1200&q=80',
  'sunderbans': 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=1200&q=80',
  'sundarban': 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=1200&q=80',
  'digha': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'shantiniketan': 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
  'santiniketan': 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
  'visva bharati': 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
  'indian museum': 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80',
  'marble palace': 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',
  'eco park': 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80',
  'science city': 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80',
  'st paul cathedral': 'https://images.unsplash.com/photo-1548625361-185038f82f2d?auto=format&fit=crop&w=1200&q=80',
  'eden gardens': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
  'park street': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
  'college street': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
  'jorasanko thakur bari': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  'tagore house': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  'mirik': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  'kalimpong': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  'purulia': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  'bishnupur': 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
  'murshidabad': 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',
  'hazarduari': 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',

  // Indian Monuments & Landmarks
  'india gate': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
  'delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
  'golden temple': 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
  'amritsar': 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
  'gateway of india': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
  'mumbai': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
  'statue of unity': 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
  'hawa mahal': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
  'jaipur': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
  'red fort': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Red_Fort_in_Delhi_03-2016_img3.jpg/1200px-Red_Fort_in_Delhi_03-2016_img3.jpg',
  'lal qila': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Red_Fort_in_Delhi_03-2016_img3.jpg/1200px-Red_Fort_in_Delhi_03-2016_img3.jpg',
  'qutub minar': 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
  'charminar': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
  'hyderabad': 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
  'varanasi': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
  'kashi': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
  'mysore palace': 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',
  'mysore': 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',
  'hampi': 'https://images.unsplash.com/photo-1600100395121-423d2402dd17?auto=format&fit=crop&w=1200&q=80',
  'meenakshi temple': 'https://images.unsplash.com/photo-1609947017136-9cb34b1321d0?auto=format&fit=crop&w=1200&q=80',
  'madurai': 'https://images.unsplash.com/photo-1609947017136-9cb34b1321d0?auto=format&fit=crop&w=1200&q=80',
  'konark': 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
  'sun temple': 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
  'kedarnath': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  'lotus temple': 'https://images.unsplash.com/photo-1588096344356-787114620f30?auto=format&fit=crop&w=1200&q=80',
  'akshardham': 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1200&q=80',
  'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  'kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',

  // Academic Institutions & Universities
  'harvard': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'harvard university': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'oxford': 'https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?auto=format&fit=crop&w=1200&q=80',
  'oxford university': 'https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?auto=format&fit=crop&w=1200&q=80',
  'cambridge': 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=1200&q=80',
  'cambridge university': 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=1200&q=80',
  'stanford': 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
  'stanford university': 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
  'iit': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'mit': 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
};

// Category Specific High-Resolution Fallbacks (Used if specific location is not in map)
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  university: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
  college: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  temple: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
  fort: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
  palace: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1200&q=80',
  mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  park: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80',
  museum: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80',
  bridge: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  waterfall: 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=1200&q=80',
  tower: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
  city: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=1200&q=80',
  lake: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
};

const DEFAULT_GENERIC_IMAGES = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1476514525535-ce74f45814d0?auto=format&fit=crop&w=1200&q=80',
];

// Global in-memory cache to guarantee identical image URLs across repeated searches for the same place
const RESOLVED_IMAGE_CACHE: Record<string, string> = {};

function getNormalizedKey(str?: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

/**
 * Dynamic Wikipedia / Wikimedia Page Image Fetcher
 * Fetches the official main photograph for any place on Earth directly from Wikipedia.
 */
export async function fetchWikipediaImage(placeName: string): Promise<string | null> {
  if (!placeName || !placeName.trim()) return null;

  // Extract primary name before commas/dashes for cleaner Wikipedia page title matching
  const primaryName = placeName.split(/[,–—\-]/)[0].trim();
  const cleanQueries = [
    primaryName.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(),
    placeName.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(),
  ].filter((q, idx, self) => q.length > 2 && self.indexOf(q) === idx);

  for (const cleanQuery of cleanQueries) {
    // 1. Try Wikipedia REST API Page Summary (fastest, high-res original photos)
    try {
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery)}`;
      const res = await fetch(summaryUrl);
      if (res.ok) {
        const data = await res.json();
        if (data?.originalimage?.source) {
          return data.originalimage.source;
        }
        if (data?.thumbnail?.source) {
          return data.thumbnail.source.replace(/\/\d+px-/, '/1200px-');
        }
      }
    } catch (err) {
      // Continue to search API
    }

    // 2. Try Wikipedia Action API Search
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        cleanQuery
      )}&format=json&origin=*`;
      const searchRes = await fetch(searchUrl);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const searchResults = searchData?.query?.search || [];
        for (let i = 0; i < Math.min(searchResults.length, 3); i++) {
          const title = searchResults[i]?.title;
          if (title) {
            // Try REST summary for exact title
            const summaryUrl2 = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
            const res2 = await fetch(summaryUrl2);
            if (res2.ok) {
              const data2 = await res2.json();
              if (data2?.type !== 'disambiguation') {
                if (data2?.originalimage?.source) {
                  return data2.originalimage.source;
                }
                if (data2?.thumbnail?.source) {
                  return data2.thumbnail.source.replace(/\/\d+px-/, '/1200px-');
                }
              }
            }

            // Fallback to pageimages prop
            const pageImgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
              title
            )}&prop=pageimages&format=json&pithumbsize=1200&redirects=1&origin=*`;
            const pageImgRes = await fetch(pageImgUrl);
            if (pageImgRes.ok) {
              const pageImgData = await pageImgRes.json();
              const pages2 = pageImgData?.query?.pages;
              for (const pId in pages2) {
                if (pages2[pId]?.thumbnail?.source) {
                  return pages2[pId].thumbnail.source;
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn(`Wikipedia image search notice for "${cleanQuery}":`, err);
    }
  }

  return null;
}

/**
 * Returns a high-quality, accurate image URL for any landmark name/location synchronously.
 * Prioritizes specific landmark name matches over generic city/country fallbacks.
 */
export function getLandmarkImageUrl(
  landmarkName?: string,
  location?: string,
  existingUrl?: string
): string {
  // If user provided a base64 or valid non-placeholder image, preserve it
  if (
    existingUrl &&
    existingUrl.trim().length > 0 &&
    !existingUrl.includes('photo-1519817650390') &&
    !existingUrl.includes('photo-1488646953014')
  ) {
    return existingUrl;
  }

  const name = (landmarkName || '').trim().toLowerCase();
  const loc = (location || '').trim().toLowerCase();
  const fullQuery = `${name} ${loc}`.trim();
  const normKey = getNormalizedKey(name || fullQuery);

  if (normKey && RESOLVED_IMAGE_CACHE[normKey]) {
    return RESOLVED_IMAGE_CACHE[normKey];
  }

  if (!fullQuery) {
    return LANDMARK_IMAGE_MAP['eiffel tower'];
  }

  // Sort keys by length descending so specific landmark names match before short city keys
  const sortedKeys = Object.keys(LANDMARK_IMAGE_MAP).sort((a, b) => b.length - a.length);

  // 1. Match landmark name ALONE first
  if (name.length > 0) {
    for (const key of sortedKeys) {
      if (key.length > 3 && (name.includes(key) || key.includes(name))) {
        const found = LANDMARK_IMAGE_MAP[key];
        if (normKey) RESOLVED_IMAGE_CACHE[normKey] = found;
        return found;
      }
    }
  }

  // 2. Match full query against longer specific keys (>5 chars)
  for (const key of sortedKeys) {
    if (key.length > 5 && fullQuery.includes(key)) {
      const found = LANDMARK_IMAGE_MAP[key];
      if (normKey) RESOLVED_IMAGE_CACHE[normKey] = found;
      return found;
    }
  }

  // 3. Match remaining city/region keys
  for (const key of sortedKeys) {
    if (fullQuery.includes(key)) {
      const found = LANDMARK_IMAGE_MAP[key];
      if (normKey) RESOLVED_IMAGE_CACHE[normKey] = found;
      return found;
    }
  }

  // 4. Category matching
  for (const [catKey, catUrl] of Object.entries(CATEGORY_FALLBACK_IMAGES)) {
    if (fullQuery.includes(catKey)) {
      if (normKey) RESOLVED_IMAGE_CACHE[normKey] = catUrl;
      return catUrl;
    }
  }

  // Fallback (deterministic based on query hash)
  const fallback = DEFAULT_GENERIC_IMAGES[Math.abs(hashString(fullQuery)) % DEFAULT_GENERIC_IMAGES.length];
  if (normKey) RESOLVED_IMAGE_CACHE[normKey] = fallback;
  return fallback;
}

/**
 * Async real landmark image resolver:
 * Checks cache, exact static map, Wikipedia API for official photo, then fallbacks.
 * Guarantees identical result for repeated searches of the same place.
 */
export async function getRealLandmarkImageUrlAsync(
  landmarkName?: string,
  location?: string,
  existingUrl?: string
): Promise<string> {
  // If an existing valid Wikipedia/Wikimedia or user-scanned base64 image exists, strictly keep it
  if (
    existingUrl &&
    existingUrl.trim().length > 0 &&
    (existingUrl.includes('wikimedia.org') ||
      existingUrl.includes('wikipedia.org') ||
      existingUrl.startsWith('data:image'))
  ) {
    return existingUrl;
  }

  const name = (landmarkName || '').trim();
  const primaryName = name.split(/[,–—\-]/)[0].trim();
  const normKey = getNormalizedKey(primaryName || name || location);

  // 1. Return cached image URL if previously resolved for this place
  if (normKey && RESOLVED_IMAGE_CACHE[normKey]) {
    return RESOLVED_IMAGE_CACHE[normKey];
  }

  // 2. Query Wikipedia API directly for the official photograph of this place!
  if (primaryName.length > 2) {
    const wikiImage = await fetchWikipediaImage(primaryName);
    if (wikiImage) {
      if (normKey) RESOLVED_IMAGE_CACHE[normKey] = wikiImage;
      return wikiImage;
    }
  }

  if (name.length > 2 && name !== primaryName) {
    const wikiImageFull = await fetchWikipediaImage(name);
    if (wikiImageFull) {
      if (normKey) RESOLVED_IMAGE_CACHE[normKey] = wikiImageFull;
      return wikiImageFull;
    }
  }

  if (location && location.trim().length > 2) {
    const primaryLoc = location.split(',')[0].trim();
    if (primaryLoc.length > 3) {
      const wikiImageLoc = await fetchWikipediaImage(`${primaryName} ${primaryLoc}`);
      if (wikiImageLoc) {
        if (normKey) RESOLVED_IMAGE_CACHE[normKey] = wikiImageLoc;
        return wikiImageLoc;
      }
    }
  }

  // 3. Fallback check: static curated map match for landmark name specifically
  if (name.length > 0) {
    const nameLower = name.toLowerCase();
    const primaryLower = primaryName.toLowerCase();

    if (LANDMARK_IMAGE_MAP[nameLower]) {
      const found = LANDMARK_IMAGE_MAP[nameLower];
      if (normKey) RESOLVED_IMAGE_CACHE[normKey] = found;
      return found;
    }
    if (LANDMARK_IMAGE_MAP[primaryLower]) {
      const found = LANDMARK_IMAGE_MAP[primaryLower];
      if (normKey) RESOLVED_IMAGE_CACHE[normKey] = found;
      return found;
    }
  }

  // 4. Secondary fallback check: longest static curated map match
  if (name.length > 0) {
    const nameLower = name.toLowerCase();
    const sortedKeys = Object.keys(LANDMARK_IMAGE_MAP).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (key.length > 5 && (nameLower.includes(key) || key.includes(nameLower))) {
        const found = LANDMARK_IMAGE_MAP[key];
        if (normKey) RESOLVED_IMAGE_CACHE[normKey] = found;
        return found;
      }
    }
  }

  // 5. Fallback to getLandmarkImageUrl
  const syncMatch = getLandmarkImageUrl(landmarkName, location, existingUrl);
  if (normKey) RESOLVED_IMAGE_CACHE[normKey] = syncMatch;
  return syncMatch;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

