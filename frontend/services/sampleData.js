export const categories = [
  {
    name: 'Red Bricks',
    description: 'Kiln-fired clay bricks for strong walls, boundaries, and load-bearing masonry.',
    image: 'https://t4.ftcdn.net/jpg/01/17/35/69/360_F_117356918_z3LDai2waSe9KVimFHlAXMUE3mMyJjO9.jpg',
  },
  {
    name: 'Fly Ash Bricks',
    description: 'Eco-conscious, uniform fly ash bricks for neat commercial and residential work.',
    image: 'https://5.imimg.com/data5/IOS/Default/2025/1/477764211/GY/GP/HE/187981564/product-jpeg.png',
  },
  {
    name: 'Cement',
    description: 'Reliable cement supply for slabs, plastering, RCC, and bulk project procurement.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUlZAIGQivUoyTMvsNhZ1du7SNnn02v8ghag8K4NV2wA&s.png',
  },
  {
    name: 'Jamuna Sand',
    description: 'Clean graded river sand for masonry, concrete mixing, and plaster applications.',
    image: 'https://thumbs.dreamstime.com/b/construction-sand-pile-afternoon-34176790.jpg',
  },
  {
    name: 'Concrete',
    description: 'Ready concrete supply support for foundations, floors, and structural pours.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/071/463/205/small/pouring-concrete-on-construction-site-new-build-photo.jpg',
  },
  {
    name: 'Rodi',
    description: 'Crushed aggregate for RCC work, roads, base layers, and site development.',
    image: 'https://img.freepik.com/premium-photo/gravel-texture-background-small-stones-floor-wall-background_719231-739.jpg?w=360',
  },
  {
    name: 'Dust',
    description: 'Stone dust for paver bedding, levelling, filling, and construction finishing.',
    image: 'https://5.imimg.com/data5/OD/QJ/JJ/SELLER-88767611/sand-dust-500x500.jpg',
  },
]

export const products = [
  {
    _id: 'red-bricks-premium',
    name: 'Premium Red Clay Bricks',
    category: 'Red Bricks',
    description:
      'High-compression clay bricks with consistent size, sharp edges, and dependable strength for boundary walls, masonry, and residential construction.',
    image: 'https://t4.ftcdn.net/jpg/01/17/35/69/360_F_117356918_z3LDai2waSe9KVimFHlAXMUE3mMyJjO9.jpg',
    price: 7.5,
    unit: 'piece',
    location: 'Gurgaon, Delhi, Haryana Region',
  },
  {
    _id: 'fly-ash-bricks-standard',
    name: 'Standard Fly Ash Bricks',
    category: 'Fly Ash Bricks',
    description:
      'Smooth finish fly ash bricks for faster site work, reduced plaster consumption, and predictable bulk supply for commercial projects.',
    image: 'https://5.imimg.com/data5/IOS/Default/2025/1/477764211/GY/GP/HE/187981564/product-jpeg.png',
    price: 6.8,
    unit: 'piece',
    location: 'Gurgaon, Delhi, Haryana Region',
  },
  {
    _id: 'opc-53-cement',
    name: 'OPC 53 Grade Cement',
    category: 'Cement',
    description:
      'Premium OPC cement for RCC, columns, beams, slabs, and infrastructure-grade concrete work with steady dispatch availability.',
    image: 'https://ibb.co/Mrh1pGd.png',
    price: 385,
    unit: 'bag',
    location: 'Gurgaon, Delhi, Haryana Regionr',
  },
  {
    _id: 'jamuna-sand-grade-a',
    name: 'Grade A Jamuna Sand',
    category: 'Jamuna Sand',
    description:
      'Washed and screened Jamuna sand suitable for plaster, masonry, and concrete mixing with flexible tractor and dumper supply.',
    image: 'https://thumbs.dreamstime.com/b/construction-sand-pile-afternoon-34176790.jpg',
    price: 58,
    unit: 'cft',
    location: 'Gurgaon, Delhi, Haryana Region',
  },
  {
    _id: 'ready-mix-concrete-m20',
    name: 'Ready Mix Concrete M20',
    category: 'Concrete',
    description:
      'Reliable M20 concrete coordination for foundations, flooring, and structural work with planned site dispatch and quality checks.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/071/463/205/small/pouring-concrete-on-construction-site-new-build-photo.jpg',
    price: 4600,
    unit: 'cubic meter',
    location: 'Gurgaon, Delhi, Haryana Region',
  },
  {
    _id: 'rodi-20mm-aggregate',
    name: '20mm Construction Rodi',
    category: 'Rodi',
    description:
      'Machine-crushed 20mm aggregate for RCC, road base, pathways, and drainage work supplied in bulk loads.',
    image: 'https://img.freepik.com/premium-photo/gravel-texture-background-small-stones-floor-wall-background_719231-739.jpg?w=360',
    price: 72,
    unit: 'cft',
    location: 'Gurgaon, Delhi, Haryana Regioni',
  },
  {
    _id: 'stone-dust-fine',
    name: 'Fine Stone Dust',
    category: 'Dust',
    description:
      'Fine graded stone dust for levelling, paver installation, filling, and finishing work across active construction sites.',
    image: 'https://5.imimg.com/data5/OD/QJ/JJ/SELLER-88767611/sand-dust-500x500.jpg',
    price: 34,
    unit: 'cft',
    location: 'Gurgaon, Delhi, Haryana Region',
  },
]

export const trackingSteps = [
  'Order Received',
  'Material Processing',
  'Material Loaded',
  'Vehicle Dispatched',
  'Reached Delivery Area',
  'Delivered Successfully',
]

export const deliveryCities = ['Gurgaon', 'Delhi', 'Haryana Region']
