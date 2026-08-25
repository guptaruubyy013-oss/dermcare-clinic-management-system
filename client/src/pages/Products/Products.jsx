import React, { useState } from "react";

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80";

// --- CURATED CLINICAL KITS & HAMPERS ---
export const clinicalHampers = [
  {
    id: "h-1",
    name: "Complete Acne Clarifying 4-Step Clinical Hamper",
    category: "Skin Care",
    typeCategory: "Oily & Acne-Prone",
    price: 1999,
    originalPrice: 2450,
    savings: "18% OFF",
    rating: "4.9 ★",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    desc: "All-in-one breakout elimination kit containing Salicylic Cleanser, Niacinamide Serum, Oil-Free Matte Gel, and Benzoyl Peroxide Spot Gel.",
    includes: ["2% Salicylic Cleanser", "10% Niacinamide Serum", "Oil-Free Hydration Gel", "2.5% Benzoyl Spot Gel"],
  },
  {
    id: "h-2",
    name: "Barrier Repair & Intensive Hydration Deluxe Hamper",
    category: "Skin Care",
    typeCategory: "Dry & Barrier-Damaged",
    price: 2150,
    originalPrice: 2680,
    savings: "20% OFF",
    rating: "5.0 ★",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
    desc: "Intense barrier restoration set with Oat Cleanser, Hyaluronic 2% Serum, Triple Ceramide Cream, and Pure Squalane Oil.",
    includes: ["Oat & Ceramide Cleanser", "Hyaluronic Acid 2% Serum", "Triple Ceramide Cream", "100% Squalane Elixir"],
  },
  {
    id: "h-3",
    name: "Clinical Pigmentation & Luminous Radiance Box",
    category: "Skin Care",
    typeCategory: "Hyperpigmented & Dull",
    price: 2399,
    originalPrice: 3010,
    savings: "20% OFF",
    rating: "4.9 ★",
    img: "https://images.unsplash.com/photo-1608248597359-0a69a4e0be88?auto=format&fit=crop&w=600&q=80",
    desc: "Dermatologist regimen to fade stubborn sunspots, dark patches, and uneven skin tone.",
    includes: ["Vitamin C Cleanser", "20% L-Ascorbic Serum", "Alpha Arbutin 2% Serum", "Tinted Radiance SPF 50"],
  },
  {
    id: "h-4",
    name: "Youth Defense & Retinol Age-Reversal Hamper",
    category: "Skin Care",
    typeCategory: "Mature & Anti-Aging",
    price: 2650,
    originalPrice: 3340,
    savings: "21% OFF",
    rating: "4.8 ★",
    img: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
    desc: "Complete collagen boosting kit targeting wrinkles, loss of elasticity, and dullness.",
    includes: ["Glycolic 7% Cleanser", "0.3% Encapsulated Retinol", "Copper Tripeptide Cream", "Caffeine Eye Serum"],
  },
  {
    id: "h-5",
    name: "Advanced Hair Density & Follicle Revival Hamper",
    category: "Hair Care",
    typeCategory: "Thinning & Hair Fall",
    price: 2499,
    originalPrice: 3300,
    savings: "24% OFF",
    rating: "5.0 ★",
    img: "https://images.unsplash.com/photo-1608248597359-0a69a4e0be88?auto=format&fit=crop&w=600&q=80",
    desc: "Trichology regimen to stop excessive hair fall, activate dormant roots, and increase volume.",
    includes: ["Biotin Hair Wash", "Redensyl 3% Booster Serum", "Rosemary Scalp Oil", "Root Anchor Conditioner"],
  },
  {
    id: "h-6",
    name: "Complete Anti-Dandruff & Scalp Detox Hamper",
    category: "Hair Care",
    typeCategory: "Dandruff & Flaky Scalp",
    price: 1850,
    originalPrice: 2250,
    savings: "18% OFF",
    rating: "4.9 ★",
    img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    desc: "Medicated clinical protocol that clears severe dandruff flakes, stops itching, and rebalances scalp microbiota.",
    includes: ["Ketoconazole 2% Shampoo", "Salicylic Scalp Scrub", "Tea Tree Scalp Serum", "Neem Medicated Oil"],
  },
  {
    id: "h-7",
    name: "Intense Moisture & Bond Repair Hair Kit",
    category: "Hair Care",
    typeCategory: "Dry & Damaged Hair",
    price: 2199,
    originalPrice: 2800,
    savings: "21% OFF",
    rating: "4.8 ★",
    img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    desc: "Nourishing butter and keratin kit that seals split ends, reverses thermal damage, and eliminates frizz.",
    includes: ["Keratin Bond Wash", "Silk Protein Hair Mask", "Argan Gloss Serum", "Leave-In 230°C Shield"],
  },
];

// --- INDIVIDUAL CLINICAL PRODUCTS ---
export const clinicProducts = [
  // 1. SKIN CARE - OILY & ACNE-PRONE
  { id: 1, name: "DermCare Salicylic Acid 2% Purifying Gel Cleanser", mainCategory: "Skin Care", typeCategory: "Oily & Acne-Prone", productType: "Cleanser", price: 549, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", desc: "Unclogs deep micro-pores, clears blackheads, and prevents cystic acne formation." },
  { id: 2, name: "DermCare 10% Niacinamide + 1% Zinc PCA Sebum Serum", mainCategory: "Skin Care", typeCategory: "Oily & Acne-Prone", productType: "Serum", price: 699, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80", desc: "Regulates sebum production, minimizes open pores, and fades post-acne dark marks." },
  { id: 3, name: "DermCare Oil-Free Matte Hydration Gel", mainCategory: "Skin Care", typeCategory: "Oily & Acne-Prone", productType: "Moisturizer", price: 580, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80", desc: "Ultra-weightless water gel offering 72h oil-free hydration with zero greasy residue." },
  { id: 4, name: "DermCare 2.5% Micronized Benzoyl Peroxide Spot Gel", mainCategory: "Skin Care", typeCategory: "Oily & Acne-Prone", productType: "Spot Treatment", price: 420, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", desc: "Penetrates deep into active breakouts to eliminate acne-causing bacteria within 48h." },
  { id: 5, name: "DermCare Ultra-Matte Fluid Sunscreen SPF 50+ PA++++", mainCategory: "Skin Care", typeCategory: "Oily & Acne-Prone", productType: "Sunscreen", price: 799, rating: "5.0 ★", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80", desc: "Non-comedogenic, shine-control physical shield that prevents clogged pores." },

  // 2. SKIN CARE - DRY & BARRIER-DAMAGED
  { id: 6, name: "DermCare Gentle Oat & Ceramide Nourishing Cleanser", mainCategory: "Skin Care", typeCategory: "Dry & Barrier-Damaged", productType: "Cleanser", price: 499, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?auto=format&fit=crop&w=600&q=80", desc: "Non-foaming milky wash designed to clean without stripping essential lipids." },
  { id: 7, name: "DermCare Multi-Molecular Hyaluronic Acid 2% Serum", mainCategory: "Skin Care", typeCategory: "Dry & Barrier-Damaged", productType: "Serum", price: 650, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1608248597359-0a69a4e0be88?auto=format&fit=crop&w=600&q=80", desc: "Multi-depth hydration booster that replenishes depleted dermal moisture levels." },
  { id: 8, name: "DermCare Triple Ceramide (1,3,6-II) Barrier Cream", mainCategory: "Skin Care", typeCategory: "Dry & Barrier-Damaged", productType: "Moisturizer", price: 749, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=600&q=80", desc: "Restores compromised skin barriers, prevents moisture loss, and heals flaky skin." },
  { id: 9, name: "DermCare 100% Plant-Derived Squalane Elixir", mainCategory: "Skin Care", typeCategory: "Dry & Barrier-Damaged", productType: "Facial Oil", price: 680, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80", desc: "Biocompatible facial lipid drops to lock in moisture and soften rough dry patches." },
  { id: 10, name: "DermCare Rich Comfort Hydrating Sun Cream SPF 50", mainCategory: "Skin Care", typeCategory: "Dry & Barrier-Damaged", productType: "Sunscreen", price: 780, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80", desc: "Deeply moisturizing physical sun cream with peptides for all-day comfort." },

  // 3. SKIN CARE - SENSITIVE & ROSACEA
  { id: 11, name: "DermCare Centella Asiatica (Cica) Calming Cleanser", mainCategory: "Skin Care", typeCategory: "Sensitive & Rosacea", productType: "Cleanser", price: 575, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80", desc: "Soothes inflamed, stinging, or reactive skin while maintaining natural pH." },
  { id: 12, name: "DermCare 10% Azelaic Acid Redness Relief Serum", mainCategory: "Skin Care", typeCategory: "Sensitive & Rosacea", productType: "Serum", price: 650, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80", desc: "Visibly calms vascular flushing, reduces redness, and smooths skin texture." },
  { id: 13, name: "DermCare Madecassoside & Panthenol Recovery Balm", mainCategory: "Skin Care", typeCategory: "Sensitive & Rosacea", productType: "Moisturizer", price: 799, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=600&q=80", desc: "Clinical post-procedure recovery cream designed to accelerate cellular healing." },
  { id: 14, name: "DermCare Hypoallergenic Thermal Mist Toner", mainCategory: "Skin Care", typeCategory: "Sensitive & Rosacea", productType: "Toner", price: 450, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", desc: "Mineral-rich soothing facial mist that instantly relieves hot flashes and tightness." },
  { id: 15, name: "DermCare Pure 100% Zinc Physical Sun Block SPF 50", mainCategory: "Skin Care", typeCategory: "Sensitive & Rosacea", productType: "Sunscreen", price: 820, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80", desc: "Zero-chemical filter formula that prevents UV-triggered redness and stinging." },

  // 4. SKIN CARE - MATURE & ANTI-AGING
  { id: 16, name: "DermCare Glycolic Acid 7% Renewal Cleanser", mainCategory: "Skin Care", typeCategory: "Mature & Anti-Aging", productType: "Cleanser", price: 599, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?auto=format&fit=crop&w=600&q=80", desc: "Promotes cell turnover and fades dull, rough dead skin layers." },
  { id: 17, name: "DermCare 0.3% Encapsulated Retinol Youth Serum", mainCategory: "Skin Care", typeCategory: "Mature & Anti-Aging", productType: "Serum", price: 999, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1608248597359-0a69a4e0be88?auto=format&fit=crop&w=600&q=80", desc: "Micro-encapsulated slow-release Vitamin A to boost collagen and smooth fine lines." },
  { id: 18, name: "DermCare Copper Tripeptide-1 Firming Cream", mainCategory: "Skin Care", typeCategory: "Mature & Anti-Aging", productType: "Moisturizer", price: 890, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80", desc: "Peptide formulation that enhances skin firmness and elasticity." },
  { id: 19, name: "DermCare Caffeine 5% + EGCG Eye Contour Solution", mainCategory: "Skin Care", typeCategory: "Mature & Anti-Aging", productType: "Eye Care", price: 620, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80", desc: "Reduces under-eye puffiness, crow's feet, and persistent dark circles." },
  { id: 20, name: "DermCare Peptide Age-Defense Sunscreen SPF 50+ PA++++", mainCategory: "Skin Care", typeCategory: "Mature & Anti-Aging", productType: "Sunscreen", price: 850, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80", desc: "Guards against photoaging and breakdown of collagen caused by UV rays." },

  // 5. SKIN CARE - HYPERPIGMENTATION & DULLNESS
  { id: 21, name: "DermCare Brightening Vitamin C Foaming Cleanser", mainCategory: "Skin Care", typeCategory: "Hyperpigmented & Dull", productType: "Cleanser", price: 540, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", desc: "Removes environmental pollutants while imparting a visible luminous glow." },
  { id: 22, name: "DermCare 20% Pure L-Ascorbic Acid + Ferulic Serum", mainCategory: "Skin Care", typeCategory: "Hyperpigmented & Dull", productType: "Serum", price: 899, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80", desc: "Clinically proven antioxidant serum that visibly fades sunspots and melasma." },
  { id: 23, name: "DermCare Alpha Arbutin 2% + Tranexamic Pigment Corrector", mainCategory: "Skin Care", typeCategory: "Hyperpigmented & Dull", productType: "Serum", price: 820, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80", desc: "Dual-action tyrosinase inhibitor targeting stubborn post-inflammatory hyperpigmentation." },
  { id: 24, name: "DermCare Kojic & Glycolic Night Radiance Cream", mainCategory: "Skin Care", typeCategory: "Hyperpigmented & Dull", productType: "Moisturizer", price: 760, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=600&q=80", desc: "Overnight renewal treatment to even out skin tone and diminish discoloration." },
  { id: 25, name: "DermCare Tinted Radiance Sun Screen SPF 50+", mainCategory: "Skin Care", typeCategory: "Hyperpigmented & Dull", productType: "Sunscreen", price: 850, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80", desc: "Provides broad-spectrum UV protection and camouflages uneven skin patches." },

  // 6. HAIR CARE - HAIR THINNING & LOSS
  { id: 26, name: "DermCare Biotin & Keratin Volumizing Hair Wash", mainCategory: "Hair Care", typeCategory: "Thinning & Hair Fall", productType: "Shampoo", price: 580, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80", desc: "Fortifies weak strands from root to tip, preventing breakage and boosting body." },
  { id: 27, name: "DermCare Redensyl 3% + Procapil Follicle Booster Serum", mainCategory: "Hair Care", typeCategory: "Thinning & Hair Fall", productType: "Hair Serum", price: 1199, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1608248597359-0a69a4e0be88?auto=format&fit=crop&w=600&q=80", desc: "Clinical trichology formula that reactivates hair stem cells and extends growth phase." },
  { id: 28, name: "DermCare Anagain & Multi-Peptide Hair Density Drops", mainCategory: "Hair Care", typeCategory: "Thinning & Hair Fall", productType: "Hair Serum", price: 1050, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80", desc: "Targeted organic pea sprout extract that visibly boosts hair density in 84 days." },
  { id: 29, name: "DermCare Rosemary & Bhringraj Scalp Stimulating Oil", mainCategory: "Hair Care", typeCategory: "Thinning & Hair Fall", productType: "Scalp Oil", price: 480, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80", desc: "Cold-pressed herbal oil that stimulates micro-circulation around the hair follicles." },
  { id: 30, name: "DermCare Red Onion & Castor Root Anchor Conditioner", mainCategory: "Hair Care", typeCategory: "Thinning & Hair Fall", productType: "Conditioner", price: 540, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80", desc: "Strengthens root anchoring and seals cuticles without weighing hair down." },

  // 7. HAIR CARE - DANDRUFF & FLAKY SCALP
  { id: 31, name: "DermCare Ketoconazole 2% Anti-Dandruff Treatment Shampoo", mainCategory: "Hair Care", typeCategory: "Dandruff & Flaky Scalp", productType: "Shampoo", price: 520, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80", desc: "Eradicates stubborn fungal dandruff flakes and controls Malassezia fungus." },
  { id: 32, name: "DermCare Salicylic Acid 1% Scalp Clarifying Exfoliator", mainCategory: "Hair Care", typeCategory: "Dandruff & Flaky Scalp", productType: "Scalp Scrub", price: 550, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", desc: "Dissolves dead cell buildup and excess sebum without causing scalp dryness." },
  { id: 33, name: "DermCare Tea Tree & Zinc Pyrithione Scalp Serum", mainCategory: "Hair Care", typeCategory: "Dandruff & Flaky Scalp", productType: "Hair Serum", price: 680, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80", desc: "Leave-on antibacterial serum that calms intense itching and stops recurrent flakes." },
  { id: 34, name: "DermCare Neem & Camphor Medicated Scalp Oil", mainCategory: "Hair Care", typeCategory: "Dandruff & Flaky Scalp", productType: "Scalp Oil", price: 499, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80", desc: "Cooling botanical infusion that detoxifies scalp roots and softens dry crusts." },
  { id: 35, name: "DermCare Soothing Aloe Scalp Balance Conditioner", mainCategory: "Hair Care", typeCategory: "Dandruff & Flaky Scalp", productType: "Conditioner", price: 510, rating: "4.7 ★", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", desc: "Hydrates lengths while maintaining the scalp's delicate acid mantle." },

  // 8. HAIR CARE - FRIZZY, DRY & DAMAGED
  { id: 36, name: "DermCare Keratin Bond Repair Hydrating Hair Wash", mainCategory: "Hair Care", typeCategory: "Dry & Damaged Hair", productType: "Shampoo", price: 590, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80", desc: "Gentle sulfate-free cleanser that repairs micro-fissures in damaged hair shafts." },
  { id: 37, name: "DermCare Silk Protein & Argan Intense Repair Mask", mainCategory: "Hair Care", typeCategory: "Dry & Damaged Hair", productType: "Hair Mask", price: 699, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80", desc: "Deep butter treatment that restores elasticity and seals split ends." },
  { id: 38, name: "DermCare Pure Moroccan Argan Anti-Frizz Gloss Serum", mainCategory: "Hair Care", typeCategory: "Dry & Damaged Hair", productType: "Hair Serum", price: 720, rating: "4.9 ★", img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80", desc: "Locks in hydration and adds long-lasting shine to rough, coarse hair strands." },
  { id: 39, name: "DermCare Golden Jojoba & Sweet Almond Length Oil", mainCategory: "Hair Care", typeCategory: "Dry & Damaged Hair", productType: "Hair Oil", price: 520, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80", desc: "Nourishes the hair cortex and prevents heat styling dehydration." },
  { id: 40, name: "DermCare Leave-In 230°C Thermal Shield Crème", mainCategory: "Hair Care", typeCategory: "Dry & Damaged Hair", productType: "Leave-In Cream", price: 580, rating: "4.8 ★", img: "https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=600&q=80", desc: "High-temperature heat protectant that shields hair from blow-drying and straighteners." },
];

const skinTypes = [
  "All Skin Types",
  "Oily & Acne-Prone",
  "Dry & Barrier-Damaged",
  "Sensitive & Rosacea",
  "Mature & Anti-Aging",
  "Hyperpigmented & Dull",
];

const hairTypes = [
  "All Hair Types",
  "Thinning & Hair Fall",
  "Dandruff & Flaky Scalp",
  "Dry & Damaged Hair",
];

const Products = ({ cart, addToCart }) => {
  const [activeTab, setActiveTab] = useState("Hampers"); // "Hampers" | "Skin Care" | "Hair Care"
  const [selectedType, setSelectedType] = useState("All");
  const [search, setSearch] = useState("");

  const activeTypeList = activeTab === "Skin Care" ? skinTypes : hairTypes;

  const filteredHampers = clinicalHampers.filter((h) => {
    return (
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.typeCategory.toLowerCase().includes(search.toLowerCase())
    );
  });

  const filteredProducts = clinicProducts.filter((p) => {
    const matchMain = p.mainCategory === activeTab;
    const matchType = selectedType === "All" || selectedType.startsWith("All") || p.typeCategory === selectedType;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.typeCategory.toLowerCase().includes(search.toLowerCase()) ||
      p.productType.toLowerCase().includes(search.toLowerCase());
    return matchMain && matchType && matchSearch;
  });

  return (
    <div style={{ backgroundColor: "#f8fafb", minHeight: "88vh", padding: "2.5rem 0 5rem 0" }}>
      <div className="container">
        
        {/* Banner */}
        <div
          className="p-4 p-md-5 rounded-4 shadow-sm mb-4 text-white position-relative"
          style={{ background: "linear-gradient(135deg, #0e3b43 0%, #175a66 100%)" }}
        >
          <span className="badge bg-white text-dark rounded-pill px-3 py-1 mb-2 fw-semibold">
            🎁 All-in-One Clinical Treatment Kits & Hampers
          </span>
          <h2 className="fw-bold mb-2">Prescription Formulations & Complete Regimen Hampers</h2>
          <p className="text-white-50 mb-0" style={{ maxWidth: "680px" }}>
            Order bundled doctor-recommended kits tailored for specific skin & scalp concerns, or select individual clinical products.
          </p>
        </div>

        {/* Master Tab Switcher */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div className="d-flex gap-2">
            <button
              onClick={() => {
                setActiveTab("Hampers");
                setSelectedType("All");
              }}
              className={`btn rounded-pill px-4 py-2 fw-bold shadow-sm ${
                activeTab === "Hampers" ? "btn-warning text-dark fw-bolder" : "btn-light border"
              }`}
            >
              🎁 Curated Hampers & Regimen Kits ({clinicalHampers.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("Skin Care");
                setSelectedType("All");
              }}
              className={`btn rounded-pill px-4 py-2 fw-bold shadow-sm ${
                activeTab === "Skin Care" ? "btn-dark" : "btn-light border"
              }`}
            >
              🧴 Skin Care by Skin Type
            </button>
            <button
              onClick={() => {
                setActiveTab("Hair Care");
                setSelectedType("All");
              }}
              className={`btn rounded-pill px-4 py-2 fw-bold shadow-sm ${
                activeTab === "Hair Care" ? "btn-dark" : "btn-light border"
              }`}
            >
              💆 Hair Care by Concern
            </button>
          </div>

          <input
            type="text"
            className="form-control rounded-pill px-3 form-control-sm"
            style={{ maxWidth: "300px" }}
            placeholder="Search hampers, ingredients, concerns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sub-Category Type Filter (Shown only for individual products) */}
        {activeTab !== "Hampers" && (
          <div className="d-flex flex-wrap gap-2 mb-4 pb-2 border-bottom">
            {activeTypeList.map((type) => {
              const isAll = type.startsWith("All");
              const isSelected = selectedType === type || (isAll && selectedType === "All");
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(isAll ? "All" : type)}
                  className={`btn btn-sm rounded-pill px-3 ${
                    isSelected ? "btn-primary text-white" : "btn-outline-secondary"
                  }`}
                  style={{ fontSize: "0.82rem" }}
                >
                  {type}
                </button>
              );
            })}
          </div>
        )}

        {/* 1. HAMPERS VIEW */}
        {activeTab === "Hampers" && (
          <div className="row g-4">
            {filteredHampers.map((hamper) => (
              <div key={hamper.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden d-flex flex-column">
                  <div className="position-relative" style={{ height: "220px", overflow: "hidden", backgroundColor: "#f2f5f6" }}>
                    <span
                      className="position-absolute top-0 end-0 badge bg-danger m-3 shadow-sm"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {hamper.savings}
                    </span>
                    <img
                      src={hamper.img}
                      alt={hamper.name}
                      className="w-100 h-100 object-fit-cover"
                      style={{ transition: "transform 0.3s ease" }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_FALLBACK;
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-primary border">{hamper.typeCategory}</span>
                      <span className="small text-warning fw-bold">{hamper.rating}</span>
                    </div>

                    <h5 className="fw-bold text-dark mb-2">{hamper.name}</h5>
                    <p className="small text-muted mb-3">{hamper.desc}</p>

                    {/* Includes Checklist */}
                    <div className="bg-light p-3 rounded-3 mb-3 border">
                      <div className="small fw-bold text-dark mb-1">🎁 Hamper Contains (Full Size):</div>
                      <ul className="list-unstyled mb-0 small text-secondary">
                        {hamper.includes.map((item, idx) => (
                          <li key={idx} className="d-flex align-items-center gap-1">
                            <span className="text-success">✔</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                      <div>
                        <div className="text-muted text-decoration-line-through small" style={{ fontSize: "0.75rem" }}>
                          ₹{hamper.originalPrice}
                        </div>
                        <h4 className="fw-bold text-dark mb-0">₹{hamper.price}</h4>
                      </div>
                      <button
                        onClick={() => addToCart(hamper)}
                        className="btn rounded-pill px-4 fw-bold text-white shadow-sm"
                        style={{ backgroundColor: "#0e3b43" }}
                      >
                        Order Hamper →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. INDIVIDUAL PRODUCTS VIEW */}
        {activeTab !== "Hampers" && (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden d-flex flex-column">
                  <div style={{ height: "190px", overflow: "hidden", backgroundColor: "#f2f5f6" }}>
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-100 h-100 object-fit-cover"
                      style={{ transition: "transform 0.3s ease" }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_FALLBACK;
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>

                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="badge bg-light text-secondary border small">{product.productType}</span>
                      <span className="small text-warning fw-bold">{product.rating}</span>
                    </div>

                    <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "0.92rem" }}>
                      {product.name}
                    </h6>
                    <p className="small text-muted mb-2 flex-grow-1" style={{ fontSize: "0.78rem" }}>
                      {product.desc}
                    </p>
                    
                    <div className="small fw-semibold mb-2" style={{ color: "#0e3b43", fontSize: "0.75rem" }}>
                      Target: {product.typeCategory}
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                      <div>
                        <span className="text-muted" style={{ fontSize: "0.7rem" }}>Clinic Price</span>
                        <h5 className="fw-bold text-dark mb-0">₹{product.price}</h5>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn btn-sm rounded-pill px-3 fw-bold text-white shadow-sm"
                        style={{ backgroundColor: "#0e3b43", fontSize: "0.82rem" }}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;