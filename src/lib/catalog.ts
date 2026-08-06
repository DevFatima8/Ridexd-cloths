export type SubCategory = {
  slug: string;
  name: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: SubCategory[];
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  category: string; // category slug
  subcategory: string; // subcategory slug
  image: string;
  gallery: string[];
  description: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
};

export const categories: Category[] = [
  {
    slug: "men",
    name: "Men",
    tagline: "Modern essentials",
    description:
      "Sharp tailoring meets everyday comfort. Discover elevated staples built to last, from heavyweight tees to raw denim.",
    image:
      "https://images.pexels.com/photos/16453876/pexels-photo-16453876.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    subcategories: [
      { slug: "t-shirts", name: "T-Shirts" },
      { slug: "shirts", name: "Shirts" },
      { slug: "jeans", name: "Jeans" },
      { slug: "jackets", name: "Jackets" },
    ],
  },
  {
    slug: "women",
    name: "Women",
    tagline: "Effortless elegance",
    description:
      "Statement silhouettes and refined layers. Curated pieces that move from day to evening with quiet confidence.",
    image:
      "https://images.pexels.com/photos/33402057/pexels-photo-33402057.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    subcategories: [
      { slug: "dresses", name: "Dresses" },
      { slug: "tops", name: "Tops & Co-ords" },
      { slug: "outerwear", name: "Outerwear" },
    ],
  },
  {
    slug: "kids",
    name: "Kids",
    tagline: "Little icons",
    description:
      "Playful, durable and adorable. Outfits designed for movement, mischief and every milestone moment.",
    image:
      "https://images.pexels.com/photos/1620759/pexels-photo-1620759.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    subcategories: [
      { slug: "boys", name: "Boys" },
      { slug: "girls", name: "Girls" },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "Finish the look",
    description:
      "The details that define a look. Bags, hats and eyewear crafted to complete every outfit in your wardrobe.",
    image:
      "https://images.pexels.com/photos/35167842/pexels-photo-35167842.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    subcategories: [
      { slug: "bags", name: "Bags" },
      { slug: "hats", name: "Hats" },
      { slug: "sunglasses", name: "Sunglasses" },
    ],
  },
];

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800`;

export const products: Product[] = [
  // ---------------- MEN · T-SHIRTS ----------------
  {
    slug: "essential-cotton-tee",
    name: "Essential Cotton Tee",
    price: 32,
    compareAt: 45,
    category: "men",
    subcategory: "t-shirts",
    image: px(37704848),
    gallery: [px(37704848), px(37704838), px(37704844)],
    description:
      "A wardrobe cornerstone cut from 220gsm organic cotton with a clean crew neck and a relaxed-but-refined fit.",
    colors: ["White", "Black", "Sand"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 214,
    featured: true,
    bestSeller: true,
  },
  {
    slug: "mint-relaxed-tee",
    name: "Mint Relaxed Tee",
    price: 34,
    category: "men",
    subcategory: "t-shirts",
    image: px(34156905),
    gallery: [px(34156905), px(37704840)],
    description:
      "Soft mint garment-dyed tee with dropped shoulders and a lived-in handfeel from the first wear.",
    colors: ["Mint", "Cloud", "Clay"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 88,
    isNew: true,
  },
  {
    slug: "heavyweight-boxy-tee",
    name: "Heavyweight Boxy Tee",
    price: 38,
    category: "men",
    subcategory: "t-shirts",
    image: px(37704838),
    gallery: [px(37704838), px(37704842)],
    description:
      "Structured 260gsm boxy tee that holds its shape. The go-to layer for a considered street look.",
    colors: ["Off White", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 132,
    featured: true,
  },
  // ---------------- MEN · SHIRTS ----------------
  {
    slug: "beige-linen-overshirt",
    name: "Beige Linen Overshirt",
    price: 89,
    category: "men",
    subcategory: "shirts",
    image: px(16453876),
    gallery: [px(16453876), px(16588066)],
    description:
      "Breathable European linen overshirt with a boxy cut — wear it open as a layer or buttoned as a statement.",
    colors: ["Beige", "Olive", "Stone"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 76,
    bestSeller: true,
    featured: true,
  },
  {
    slug: "monochrome-street-shirt",
    name: "Monochrome Street Shirt",
    price: 72,
    category: "men",
    subcategory: "shirts",
    image: px(8284856),
    gallery: [px(8284856), px(20900511)],
    description:
      "A crisp all-black shirt with a modern collar and a tailored drape for effortless evening dressing.",
    colors: ["Black", "Ink"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 54,
    isNew: true,
  },
  // ---------------- MEN · JEANS ----------------
  {
    slug: "vintage-straight-jeans",
    name: "Vintage Straight Jeans",
    price: 96,
    compareAt: 120,
    category: "men",
    subcategory: "jeans",
    image: px(7764611),
    gallery: [px(7764611), px(6764124), px(10133274)],
    description:
      "Rigid Japanese selvedge denim in a timeless straight leg that fades beautifully with age.",
    colors: ["Mid Blue", "Washed Indigo"],
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.8,
    reviews: 189,
    featured: true,
    bestSeller: true,
  },
  {
    slug: "stacked-denim",
    name: "Stacked Slim Denim",
    price: 88,
    category: "men",
    subcategory: "jeans",
    image: px(6764124),
    gallery: [px(6764124), px(1082526)],
    description:
      "A slim-tapered denim with a slight stack at the ankle and a comfortable stretch weave.",
    colors: ["Indigo", "Jet Black"],
    sizes: ["28", "30", "32", "34"],
    rating: 4.4,
    reviews: 61,
  },
  {
    slug: "classic-blue-jeans",
    name: "Classic Blue Jeans",
    price: 79,
    category: "men",
    subcategory: "jeans",
    image: px(4210864),
    gallery: [px(4210864), px(4713356)],
    description:
      "The everyday five-pocket in a mid-blue wash. Regular fit, endlessly wearable.",
    colors: ["Mid Blue"],
    sizes: ["30", "32", "34", "36"],
    rating: 4.6,
    reviews: 97,
  },
  // ---------------- MEN · JACKETS ----------------
  {
    slug: "urban-field-jacket",
    name: "Urban Field Jacket",
    price: 148,
    category: "men",
    subcategory: "jackets",
    image: px(15880276),
    gallery: [px(15880276), px(10077934)],
    description:
      "A water-repellent field jacket with utility pockets and a clean city silhouette.",
    colors: ["Khaki", "Black"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 143,
    featured: true,
  },
  {
    slug: "utility-overalls-jacket",
    name: "Utility Denim Overalls",
    price: 132,
    category: "men",
    subcategory: "jackets",
    image: px(7326952),
    gallery: [px(7326952), px(7327038)],
    description:
      "Workwear-inspired denim overalls with adjustable straps and reinforced stitching.",
    colors: ["Raw Denim"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.3,
    reviews: 39,
    isNew: true,
  },
  // ---------------- WOMEN · DRESSES ----------------
  {
    slug: "azure-slip-dress",
    name: "Azure Slip Dress",
    price: 118,
    category: "women",
    subcategory: "dresses",
    image: px(37015070),
    gallery: [px(37015070), px(25461034)],
    description:
      "A fluid satin slip dress in vivid azure with a bias cut that skims the figure.",
    colors: ["Azure", "Champagne"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 121,
    featured: true,
    bestSeller: true,
  },
  {
    slug: "scarlet-midi-dress",
    name: "Scarlet Midi Dress",
    price: 129,
    category: "women",
    subcategory: "dresses",
    image: px(34160661),
    gallery: [px(34160661), px(38290945)],
    description:
      "A strapless midi in rich scarlet crepe — structured bodice, soft floating hem.",
    colors: ["Scarlet", "Noir"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 84,
    isNew: true,
  },
  {
    slug: "ivory-summer-dress",
    name: "Ivory Summer Dress",
    price: 98,
    compareAt: 130,
    category: "women",
    subcategory: "dresses",
    image: px(27580017),
    gallery: [px(27580017), px(27292466)],
    description:
      "Lightweight ivory poplin dress with a tie waist — the effortless warm-weather hero.",
    colors: ["Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 66,
    featured: true,
  },
  {
    slug: "sequin-evening-gown",
    name: "Sequin Evening Gown",
    price: 210,
    category: "women",
    subcategory: "dresses",
    image: px(37607882),
    gallery: [px(37607882), px(14801160)],
    description:
      "A show-stopping hand-sequinned gown that catches every light in the room.",
    colors: ["Onyx"],
    sizes: ["XS", "S", "M", "L"],
    rating: 5.0,
    reviews: 42,
    bestSeller: true,
  },
  // ---------------- WOMEN · TOPS & CO-ORDS ----------------
  {
    slug: "oversized-blazer",
    name: "Oversized Tailored Blazer",
    price: 156,
    category: "women",
    subcategory: "tops",
    image: px(33402057),
    gallery: [px(33402057), px(19222080)],
    description:
      "A relaxed power-shoulder blazer with a single-button close. Sharp over everything.",
    colors: ["Sand", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.9,
    reviews: 108,
    featured: true,
  },
  {
    slug: "retro-knit-top",
    name: "Retro Knit Top",
    price: 64,
    category: "women",
    subcategory: "tops",
    image: px(6069816),
    gallery: [px(6069816), px(7070775)],
    description:
      "A ribbed retro knit with a flattering neckline and a nostalgic colour palette.",
    colors: ["Rust", "Cream"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviews: 57,
    isNew: true,
  },
  {
    slug: "studio-two-piece",
    name: "Studio Two-Piece Set",
    price: 142,
    category: "women",
    subcategory: "tops",
    image: px(15127334),
    gallery: [px(15127334), px(19222080)],
    description:
      "A coordinated waistcoat and trouser set in a cool tailored weave. Wear together or apart.",
    colors: ["Powder Blue", "Ecru"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 73,
  },
  // ---------------- WOMEN · OUTERWEAR ----------------
  {
    slug: "leather-statement-coat",
    name: "Leather Statement Coat",
    price: 268,
    category: "women",
    subcategory: "outerwear",
    image: px(20437814),
    gallery: [px(20437814), px(31779379)],
    description:
      "A sculptural leather coat with a belted waist — the ultimate cold-weather investment.",
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.9,
    reviews: 95,
    featured: true,
    bestSeller: true,
  },
  {
    slug: "classic-wool-coat",
    name: "Classic Wool Coat",
    price: 224,
    category: "women",
    subcategory: "outerwear",
    image: px(31779379),
    gallery: [px(31779379), px(20437814)],
    description:
      "A double-faced wool coat with clean minimal lines and a timeless silhouette.",
    colors: ["Camel", "Grey"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 68,
  },
  {
    slug: "crimson-power-suit",
    name: "Crimson Power Suit",
    price: 198,
    category: "women",
    subcategory: "outerwear",
    image: px(38290945),
    gallery: [px(38290945), px(34160661)],
    description:
      "A bold crimson tailored suit that commands the room — blazer and trousers sold as a set.",
    colors: ["Crimson"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 51,
    isNew: true,
  },
  // ---------------- KIDS · BOYS ----------------
  {
    slug: "boys-formal-suit",
    name: "Boys Formal Suit",
    price: 84,
    category: "kids",
    subcategory: "boys",
    image: px(30690921),
    gallery: [px(30690921), px(30690920)],
    description:
      "A dapper two-piece suit for little gentlemen — soft-lined for all-day comfort.",
    colors: ["Black", "Navy"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    rating: 4.8,
    reviews: 44,
    featured: true,
  },
  {
    slug: "boys-bowtie-set",
    name: "Boys Bowtie Set",
    price: 68,
    category: "kids",
    subcategory: "boys",
    image: px(36909815),
    gallery: [px(36909815), px(30690921)],
    description:
      "Occasion-ready shirt, waistcoat and bowtie set for weddings and celebrations.",
    colors: ["Charcoal"],
    sizes: ["2Y", "4Y", "6Y"],
    rating: 4.6,
    reviews: 29,
  },
  {
    slug: "boys-smart-blazer",
    name: "Boys Smart Blazer",
    price: 58,
    category: "kids",
    subcategory: "boys",
    image: px(30690920),
    gallery: [px(30690920), px(36909815)],
    description:
      "A structured mini blazer that dresses up any outfit in an instant.",
    colors: ["Grey", "Navy"],
    sizes: ["4Y", "6Y", "8Y"],
    rating: 4.5,
    reviews: 18,
    isNew: true,
  },
  // ---------------- KIDS · GIRLS ----------------
  {
    slug: "girls-festive-set",
    name: "Girls Festive Set",
    price: 76,
    category: "kids",
    subcategory: "girls",
    image: px(34608858),
    gallery: [px(34608858), px(1620759)],
    description:
      "A vibrant festive outfit with intricate detailing — made to twirl in.",
    colors: ["Emerald"],
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    rating: 4.9,
    reviews: 37,
    featured: true,
    bestSeller: true,
  },
  {
    slug: "playful-print-tee",
    name: "Playful Print Tee",
    price: 28,
    category: "kids",
    subcategory: "girls",
    image: px(8084066),
    gallery: [px(8084066), px(34608858)],
    description:
      "A soft cotton tee with a fun graphic print — the everyday play favourite.",
    colors: ["Pink", "Yellow"],
    sizes: ["2Y", "4Y", "6Y"],
    rating: 4.4,
    reviews: 52,
  },
  {
    slug: "kids-nautical-set",
    name: "Kids Nautical Set",
    price: 62,
    category: "kids",
    subcategory: "girls",
    image: px(1620759),
    gallery: [px(1620759), px(8084066)],
    description:
      "A timeless nautical-themed set for photo-ready summer days.",
    colors: ["Navy/White"],
    sizes: ["2Y", "4Y", "6Y"],
    rating: 4.7,
    reviews: 24,
    isNew: true,
  },
  // ---------------- ACCESSORIES · BAGS ----------------
  {
    slug: "everyday-backpack",
    name: "Everyday Backpack",
    price: 94,
    category: "accessories",
    subcategory: "bags",
    image: px(13250377),
    gallery: [px(13250377), px(35167843)],
    description:
      "A minimalist water-resistant backpack with a padded laptop sleeve and clean hardware.",
    colors: ["Black", "Sand"],
    sizes: ["One Size"],
    rating: 4.8,
    reviews: 112,
    featured: true,
    bestSeller: true,
  },
  {
    slug: "weekend-tote",
    name: "Weekend Tote",
    price: 78,
    category: "accessories",
    subcategory: "bags",
    image: px(35167843),
    gallery: [px(35167843), px(35167842)],
    description:
      "A roomy structured tote that carries everything in effortless style.",
    colors: ["Tan", "Black"],
    sizes: ["One Size"],
    rating: 4.5,
    reviews: 47,
  },
  // ---------------- ACCESSORIES · HATS ----------------
  {
    slug: "classic-cap",
    name: "Classic Logo Cap",
    price: 32,
    category: "accessories",
    subcategory: "hats",
    image: px(35167842),
    gallery: [px(35167842), px(35240266)],
    description:
      "A six-panel cotton cap with an embroidered AURORA mark and adjustable strap.",
    colors: ["Black", "Stone"],
    sizes: ["One Size"],
    rating: 4.6,
    reviews: 83,
    featured: true,
  },
  {
    slug: "summer-straw-hat",
    name: "Summer Straw Hat",
    price: 46,
    category: "accessories",
    subcategory: "hats",
    image: px(33616960),
    gallery: [px(33616960), px(34158117)],
    description:
      "A wide-brim woven hat that adds instant polish to warm-weather looks.",
    colors: ["Natural"],
    sizes: ["One Size"],
    rating: 4.7,
    reviews: 31,
    isNew: true,
  },
  // ---------------- ACCESSORIES · SUNGLASSES ----------------
  {
    slug: "retro-sunglasses",
    name: "Retro Acetate Sunglasses",
    price: 58,
    category: "accessories",
    subcategory: "sunglasses",
    image: px(35240266),
    gallery: [px(35240266), px(34158117)],
    description:
      "UV400 acetate frames with a retro square silhouette and gradient lenses.",
    colors: ["Tortoise", "Black"],
    sizes: ["One Size"],
    rating: 4.8,
    reviews: 74,
    featured: true,
    bestSeller: true,
  },
  {
    slug: "aviator-shades",
    name: "Aviator Shades",
    price: 64,
    category: "accessories",
    subcategory: "sunglasses",
    image: px(34158117),
    gallery: [px(34158117), px(27065147)],
    description:
      "Lightweight metal aviators with polarised lenses for all-day glare protection.",
    colors: ["Gold", "Gunmetal"],
    sizes: ["One Size"],
    rating: 4.6,
    reviews: 58,
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export function newArrivals() {
  return products.filter((p) => p.isNew);
}

export function bestSellers() {
  return products.filter((p) => p.bestSeller);
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}
