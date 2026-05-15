import Product from '../models/Product.js'

const sampleProducts = [
  {
    _id: 'red-bricks-premium',
    name: 'Premium Red Clay Bricks',
    category: 'Red Bricks',
    price: 7.5,
    unit: 'piece',
    location: 'Delhi NCR, Gurgaon, Sonipat',
    description: 'High-compression clay bricks with consistent size, sharp edges, and dependable strength for construction work.',
    image: 'https://t4.ftcdn.net/jpg/01/17/35/69/360_F_117356918_z3LDai2waSe9KVimFHlAXMUE3mMyJjO9.jpg',
  },
  {
    _id: 'fly-ash-bricks-standard',
    name: 'Standard Fly Ash Bricks',
    category: 'Fly Ash Bricks',
    price: 6.8,
    unit: 'piece',
    location: 'Delhi, Haryana Region',
    description: 'Uniform fly ash bricks for commercial and residential masonry with dependable bulk dispatch.',
    image: 'https://5.imimg.com/data5/IOS/Default/2025/1/477764211/GY/GP/HE/187981564/product-jpeg.png',
  },
  {
    _id: 'opc-53-cement',
    name: 'OPC 53 Grade Cement',
    category: 'Cement',
    price: 385,
    unit: 'bag',
    location: 'Delhi, Gurgaon, Jhajjar',
    description: 'Premium OPC cement for RCC, columns, beams, slabs, and concrete work.',
    image: 'https://media.istockphoto.com/id/1448349078/photo/cement-bags-o-sacks-isolated-on-white.jpg?s=612x612',
  },
  {
    _id: 'jamuna-sand-grade-a',
    name: 'Grade A Jamuna Sand',
    category: 'Jamuna Sand',
    price: 58,
    unit: 'cft',
    location: 'Delhi NCR, Sonipat',
    description: 'Washed and screened Jamuna sand for plaster, masonry, and concrete mixing.',
    image: 'https://thumbs.dreamstime.com/b/construction-sand-pile-afternoon-34176790.jpg',
  },
  {
    _id: 'ready-mix-concrete-m20',
    name: 'Ready Mix Concrete M20',
    category: 'Concrete',
    price: 4600,
    unit: 'cubic meter',
    location: 'Gurgaon, Delhi, Haryana Region',
    description: 'M20 concrete coordination for foundations, floors, and structural pours.',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/071/463/205/small/pouring-concrete-on-construction-site-new-build-photo.jpg',
  },
  {
    _id: 'rodi-20mm-aggregate',
    name: '20mm Construction Rodi',
    category: 'Rodi',
    price: 72,
    unit: 'cft',
    location: 'Jhajjar, Gurgaon, Delhi',
    description: 'Machine-crushed 20mm aggregate for RCC, road base, pathways, and drainage work.',
    image: 'https://img.freepik.com/premium-photo/gravel-texture-background-small-stones-floor-wall-background_719231-739.jpg?w=360',
  },
  {
    _id: 'stone-dust-fine',
    name: 'Fine Stone Dust',
    category: 'Dust',
    price: 34,
    unit: 'cft',
    location: 'Delhi NCR, Haryana Region',
    description: 'Fine stone dust for levelling, paver bedding, filling, and finishing work.',
    image: 'https://5.imimg.com/data5/OD/QJ/JJ/SELLER-88767611/sand-dust-500x500.jpg',
  },
]

export const getProducts = async (req, res) => {
  const { search = '', category = '' } = req.query
  const query = {}

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ]
  }

  if (category) query.category = category

  const products = await Product.find(query).sort({ createdAt: -1 })
  return res.json(products.length ? products : sampleProducts)
}

export const getProductById = async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const sample = sampleProducts.find((product) => product._id === req.params.id)
    if (sample) return res.json(sample)
  }

  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  return res.json(product)
}

export const createProduct = async (req, res) => {
  const { name, category, price, unit, location, description, image } = req.body
  if (!name || !category || price === undefined || !location || !description) {
    return res.status(400).json({ message: 'All required fields must be provided' })
  }

  const product = await Product.create({
    name,
    category,
    price,
    unit: unit || 'unit',
    location,
    description,
    image: image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  })

  return res.status(201).json(product)
}

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })

  ;['name', 'category', 'price', 'unit', 'location', 'description', 'image'].forEach((field) => {
    if (req.body[field] !== undefined) product[field] = req.body[field]
  })

  await product.save()
  return res.json(product)
}

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  await product.deleteOne()
  return res.json({ message: 'Product deleted successfully' })
}
