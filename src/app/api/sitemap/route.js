import { NextResponse } from "next/server";
import pool from "@/src/helper/db/db";
// Helper function to generate filter combinations (SEO-optimized)
function generateFilterUrls() {
  const filters = {
    category: ["fireplace", "fireplace-mantels", "outdoor", "cast-iron"],
    fuelType: ["wood", "electric", "gas", "cooker"],
    placement: ["freestanding", "inbuilt", "outdoor"],
    design: ["single-sided", "two-sided", "three-sided"],
    brand: [
      "esse",
      "gazco",
      "stovax",
      "regency",
      "morso",
      "living-fire",
      "paul-agnew-designs",
    ],
  };

  const urlCombinations = [];

  // 1. High-value: Category + Brand (e.g., /Fireplace/Esse)
  filters.category.forEach((cat) => {
    filters.brand.forEach((brand) => {
      urlCombinations.push(`/allProducts/${cat}/${brand}`);
    });
  });

  // 2. Medium-value: Category + Fuel Type (e.g., /Fireplace/Wood)
  filters.category.forEach((cat) => {
    filters.fuelType.forEach((fuel) => {
      urlCombinations.push(`/allProducts/${cat}/${fuel}`);
    });
  });

  // 3. Medium-value: Category + Placement (e.g., /Fireplace/Freestanding)
  filters.category.forEach((cat) => {
    filters.placement.forEach((place) => {
      urlCombinations.push(`/allProducts/${cat}/${place}`);
    });
  });

  // 4. Limited 3-filter combinations (avoid spammy URLs)
  const topCategories = ["fireplace", "outdoor"];
  topCategories.forEach((cat) => {
    filters.fuelType.slice(0, 2).forEach((fuel) => {
      filters.placement.slice(0, 2).forEach((place) => {
        urlCombinations.push(`/allProducts/${cat}/${fuel}/${place}`);
      });
    });
  });

  return [...new Set(urlCombinations)]; // Remove duplicates
}

async function getAllPages() {
  // Your existing product data
  const products = [
  { brand: "kalora", product: "600c" },
  { brand: "kalora", product: "500bx-woodstack" },
  { brand: "kalora", product: "chalet-5" },
  { brand: "gazco", product: "onyx-150rw" },
  { brand: "kalora", product: "urban-ls" },
  { brand: "kalora", product: "urban-pt" },
  { brand: "kalora", product: "zenith-electric-fire-36in" },
  { brand: "kalora", product: "zenith-electric-fire-42in" },
  { brand: "icon-fires", product: "nero-framed-slimline-black-fascia-1450mm" },
  { brand: "gazco", product: "estudio-es135r" },
  { brand: "gazco", product: "onyx-190rw" },
  { brand: "icon-fires", product: "slimline-firebox-2000-black-fascia" },
  { brand: "kalora", product: "nexus-electric-fire-36in" },
  { brand: "gazco", product: "riva2" },
  { brand: "stovax", product: "studio-2-freestanding" },
  { brand: "kalora", product: "nexus-electric-fire-60in" },
  { brand: "austroflamm", product: "s120-45s-cassette" },
  { brand: "adf", product: "hayra-85vp-freestanding" },
  { brand: "heatmaster", product: "a650-body" },
  { brand: "austroflamm", product: "woody" },
  { brand: "bosq", product: "aere-70s-freestanding" },
  { brand: "adf", product: "linea-100-b-duo-l-freestanding-heater" },
  { brand: "paul-agnew-designs", product: "siena-750-tunnel-freestanding" },
  { brand: "heatmaster", product: "b650-body" },
  { brand: "heatmaster", product: "enviro-lpg-unit-to-suit-coals" },
  { brand: "heatmaster", product: "a750-body" },
  { brand: "heatmaster", product: "a900-body" },
  { brand: "heatmaster", product: "b900-body" },
  { brand: "regency", product: "gfi750" },
  { brand: "adf", product: "linea-85-insert" },
  { brand: "paul-agnew-designs", product: "siena-750gf2l" },
  { brand: "adf", product: "linea-100-insert-duo" },
  { brand: "morso", product: "1440-freestanding" },
  { brand: "morso", product: "6148-freestanding" },
  { brand: "morso", product: "7943-freestanding" },
  { brand: "esse", product: "ironheart-outside-air-wet" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-glass-fronted" },
  { brand: "morso", product: "7948-freestanding" },
  { brand: "morso", product: "7970-wall-mounted" },
  { brand: "morso", product: "8843-freestanding" },
  { brand: "gazco", product: "onyx-110rw" },
  { brand: "paul-agnew-designs", product: "ilektro-2000-landscape" },
  { brand: "paul-agnew-designs", product: "siena-750-g4-freestanding" },
  { brand: "paul-agnew-designs", product: "ilektro-woodland-stove" },
  { brand: "paul-agnew-designs", product: "alto-tunnel" },
  { brand: "morso", product: "morso-culi-bbq-grill-tongs" },
  { brand: "paul-agnew-designs", product: "alto-glass-fronted" },
  { brand: "adf", product: "hayra-85vl-freestanding" },
  { brand: "paul-agnew-designs", product: "vue-1250-left-corner" },
  { brand: "adf", product: "linea-100-l-freestanding-with-steel-base" },
  { brand: "paul-agnew-designs", product: "quadro-800-tunnel" },
  { brand: "paul-agnew-designs", product: "vue-1250-glass-fronted" },
  { brand: "morso", product: "kamino-outdoor-fireplace" },
  { brand: "paul-agnew-designs", product: "vue-1410-right-corner" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-glass-fronted" },
  { brand: "paul-agnew-designs", product: "hestia-1000-peninsula-guillotine" },
  { brand: "paul-agnew-designs", product: "ilektro-1650-landscape" },
  { brand: "hergom", product: "hergom-fire-pit-meteor" },
  { brand: "morso", product: "1410-freestanding" },
  { brand: "paul-agnew-designs", product: "vue-1250-bay" },
  { brand: "paul-agnew-designs", product: "vue-1410-bay" },
  { brand: "bosq", product: "aere-70s-insert" },
  { brand: "paul-agnew-designs", product: "vue-1410-glass-fronted" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2l" },
  { brand: "regency", product: "san-francisco-bay-60" },
  { brand: "adf", product: "hayra-85vb-freestanding" },
  { brand: "paul-agnew-designs", product: "700-square-w-motif-fascia-black" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-60in-1524mm" },
  { brand: "paul-agnew-designs", product: "milos-lu-grey-1310" },
  { brand: "kalora", product: "425r" },
  { brand: "paul-agnew-designs", product: "700-victorian-fascia-polished" },
  { brand: "regency", product: "ei25-electric-insert" },
  { brand: "paul-agnew-designs", product: "new-william-iv-italian-cararra-1500" },
  { brand: "paul-agnew-designs", product: "paros-lu-grey-1459" },
  { brand: "kalora", product: "fusion" },
  { brand: "regency", product: "fg39" },
  { brand: "paul-agnew-designs", product: "siena-750-tunnel-inbuilt" },
  { brand: "paul-agnew-designs", product: "siena-750-g4-inbuilt" },
  { brand: "kalora", product: "500c" },
  { brand: "paul-agnew-designs", product: "siena-750gf-inbuilt" },
  { brand: "paul-agnew-designs", product: "naxos-mantel-luna-grey-1420" },
  { brand: "paul-agnew-designs", product: "victorian-arched-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "modica-600-inbuilt" },
  { brand: "kalora", product: "600bx-woodstack" },
  { brand: "paul-agnew-designs", product: "victorian-arched-mocha-beige-1650" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1470" },
  { brand: "stovax", product: "studio-2-insert" },
  { brand: "stovax", product: "aeris-hanging-black-shell-s-s-pole" },
  { brand: "stovax", product: "cocoon-pedestal-standing-black-shell-s-s-stand" },
  { brand: "stovax", product: "vellum-wall-mounted-s-s" },
  { brand: "metters", product: "kosi-no-25" },
  { brand: "kalora", product: "zenith-electric-fire-60in" },
  { brand: "kalora", product: "zenith-electric-fire-72in" },
  { brand: "paul-agnew-designs", product: "windsor-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "hampshire-large-raw-1650" },
  { brand: "kalora", product: "zenith-electric-fire-88in" },
  { brand: "morso", product: "morso-culi-bbq-grill-fork" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-arched-polished" },
  { brand: "paul-agnew-designs", product: "700-decorative-square-fascia-polished" },
  { brand: "paul-agnew-designs", product: "850-victorian-arch-fascia-black" },
  { brand: "paul-agnew-designs", product: "camden-insert-black" },
  { brand: "morso", product: "grill-71" },
  { brand: "austroflamm", product: "dexter-door-hinge-right" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-black" },
  { brand: "metters", product: "kosi-no-35" },
  { brand: "paul-agnew-designs", product: "dublin-insert-black" },
  { brand: "eurostove", product: "churchill-5-convection-dual-control" },
  { brand: "living-fire", product: "black-brass-trim-4pc-set" },
  { brand: "paul-agnew-designs", product: "550-classic-fascia-black" },
  { brand: "paul-agnew-designs", product: "integra-anson" },
  { brand: "morso", product: "6143-freestanding" },
  { brand: "esse", product: "700-wood-heater" },
  { brand: "esse", product: "ironheart-outside-air-dry" },
  { brand: "kalora", product: "accent" },
  { brand: "eurostove", product: "churchill-5-dual-control" },
  { brand: "esse", product: "ironheart-dry" },
  { brand: "esse", product: "ironheart-wet" },
  { brand: "esse", product: "bakeheart-outside-air-dry" },
  { brand: "esse", product: "warmheart-s-outside-air-dry" },
  { brand: "esse", product: "ironheart-dry" },
  { brand: "esse", product: "ironheart-wet" },
  { brand: "adf", product: "linea-100-duo-freestanding" },
  { brand: "esse", product: "bakeheart-outside-air-dry" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "kalora", product: "chalet-6" },
  { brand: "esse", product: "bakeheart-outside-air-wet" },
  { brand: "esse", product: "warmheart-s-outside-air-wet" },
  { brand: "esse", product: "warmheart-s-outside-air-wet" },
  { brand: "kalora", product: "sorrento" },
  { brand: "eurostove", product: "churchill-5-convection-dual-control-logstore" },
  { brand: "living-fire", product: "2-tier-wood-rack-w/-firetools-large" },
  { brand: "living-fire", product: "fire-grate-745mm" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "living-fire", product: "black-pewter-handle-4pc-set" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "living-fire", product: "black-pewter-trim-4pc-set" },
  { brand: "kalora", product: "nexus-electric-fire-50in" },
  { brand: "living-fire", product: "black-3pc-set" },
  { brand: "living-fire", product: "fire-grate-915mm" },
  { brand: "kalora", product: "nexus-electric-fire-74in" },
  { brand: "paul-agnew-designs", product: "ilektro-2600-landscape" },
  { brand: "living-fire", product: "fire-grates-premium-range-600mm" },
  { brand: "esse", product: "1000-h" },
  { brand: "living-fire", product: "4-fold-fire-screen-black-w/-pewter-finish" },
  { brand: "living-fire", product: "fire-grates-premium-range-8-bar-750mm" },
  { brand: "paul-agnew-designs", product: "ilektro-950lt" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-72in-1828mm" },
  { brand: "living-fire", product: "black-4pc-set" },
  { brand: "paul-agnew-designs", product: "quadro-800-glass-fronted" },
  { brand: "living-fire", product: "fixed-wing-sloping--large-fire-screen" },
  { brand: "living-fire", product: "fixed-wing-sloping-fire-screen--small" },
  { brand: "paul-agnew-designs", product: "vue-1410-left-corner" },
  { brand: "living-fire", product: "black-with-scraper-4pc-set" },
  { brand: "living-fire", product: "flaming-magic-30g" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-tunnel" },
  { brand: "living-fire", product: "heavy-duty-classic--black-brass-4pc-set" },
  { brand: "living-fire", product: "tongio-forging--tongs" },
  { brand: "morso", product: "grill-71-table" },
  { brand: "esse", product: "700-wood-heater-outside-air" },
  { brand: "esse", product: "775-wood-heater-outside-air" },
  { brand: "living-fire", product: "tongio-forging-deluxe-3pc-set" },
  { brand: "morso", product: "ignis-outdoor-fire-pit" },
  { brand: "paul-agnew-designs", product: "siena-750gf2r" },
  { brand: "esse", product: "vector" },
  { brand: "living-fire", product: "3-fold-rounded-black-w/-nickel-plated-top-frame" },
  { brand: "living-fire", product: "tongio-forging-deluxe-poker-log-roller" },
  { brand: "living-fire", product: "tongio-forging-rake" },
  { brand: "paul-agnew-designs", product: "siena-750gf3" },
  { brand: "esse", product: "bakeheart-outside-air-wet" },
  { brand: "esse", product: "1000-w" },
  { brand: "esse", product: "1000-h" },
  { brand: "esse", product: "1000-w" },
  { brand: "living-fire", product: "tongio-forging-riviera-3pc-set" },
  { brand: "living-fire", product: "tongio-forging-deluxe-4pc-set" },
  { brand: "living-fire", product: "wood-storage-wood-ring-with-tray" },
  { brand: "hergom", product: "e-30-freestanding" },
  { brand: "hergom", product: "e-40-freestanding" },
  { brand: "living-fire", product: "gated-fire-screen" },
  { brand: "paul-agnew-designs", product: "ilektro-insert" },
  { brand: "hergom", product: "hergom-fire-pit-ignis" },
  { brand: "eurostove", product: "loxton-5-standard" },
  { brand: "paul-agnew-designs", product: "hestia-1000-bay-guillotine" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2r" },
  { brand: "regency", product: "windsor" },
  { brand: "paul-agnew-designs", product: "modica-600-freestanding" },
  { brand: "paul-agnew-designs", product: "i700-stove" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape-tunnel" },
  { brand: "paul-agnew-designs", product: "siena-750gf-freestanding" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-950-aspect" },
  { brand: "paul-agnew-designs", product: "ilektro-950-landscape" },
  { brand: "paul-agnew-designs", product: "vue-1250-right-corner" },
  { brand: "paul-agnew-designs", product: "vue-1410-tunnel" },
  { brand: "paul-agnew-designs", product: "ilektro-freestanding" },
  { brand: "morso", product: "morso-culi-bbq-grill-turner-spatula" },
  { brand: "morso", product: "morso-multi-cocotte-4.6l-w-griddle-lid" },
  { brand: "morso", product: "forno-door" },
  { brand: "heatmaster", product: "seamless-body" },
  { brand: "paul-agnew-designs", product: "vue-1410-peninsula" },
  { brand: "icon-fires", product: "double-sided-slimline-firebox-1350-brushed-s-s-fascia" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-50in-1270mm" },
  { brand: "heatmaster", product: "b750-body" },
  { brand: "esse", product: "ironheart-outside-air-dry" },
  { brand: "esse", product: "ironheart-outside-air-wet" },
  { brand: "heatmaster", product: "z1200-unit" },
  { brand: "esse", product: "warmheart-s-outside-air-dry" },
  { brand: "regency", product: "gf1500lst-lpg" },
  { brand: "regency", product: "gosford" },
  { brand: "gazco", product: "estudio-es165r" },
  { brand: "gazco", product: "estudio-es60r" },
  { brand: "gazco", product: "estudio-es105r" },
  { brand: "gazco", product: "estudio-es85r" },
  { brand: "regency", product: "gf1500l" },
  { brand: "regency", product: "narrabri" },
  { brand: "paul-agnew-designs", product: "850-classic-fascia-black" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "living-fire", product: "3-fold--squared-fire-screen" },
  { brand: "living-fire", product: "curved-stand-4pc-set" },
  { brand: "morso", product: "forno-outdoor-oven" },
  { brand: "living-fire", product: "tongio-forging-tongs-4pc-set" },
  { brand: "morso", product: "forno-terra-set" },
  { brand: "morso", product: "grill-forno-cover" },
  { brand: "paul-agnew-designs", product: "6000-pattern-square-fascia-black" },
  { brand: "paul-agnew-designs", product: "athena-black-granite-1500" },
  { brand: "paul-agnew-designs", product: "bouvet-italian-carrara-1310" },
  { brand: "paul-agnew-designs", product: "hampshire-standard-raw-1500" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-white-1470" },
  { brand: "paul-agnew-designs", product: "700-classic-fascia-black" },
  { brand: "regency", product: "hzo42-outdoor-lpg" },
  { brand: "regency", product: "pg36" },
  { brand: "regency", product: "chicago-corner-40-left" },
  { brand: "regency", product: "albany" },
  { brand: "regency", product: "hzo42-outdoor" },
  { brand: "regency", product: "chicago-corner-40-right" },
  { brand: "regency", product: "renmark" },
  { brand: "regency", product: "new-york-view-40" },
  { brand: "regency", product: "hume" },
  { brand: "regency", product: "new-york-view-60" },
  { brand: "regency", product: "dvi34l" },
  { brand: "regency", product: "gf950-lpg" },
  { brand: "regency", product: "gf950l" },
  { brand: "regency", product: "mansfield" },
  { brand: "regency", product: "montrose" },
  { brand: "regency", product: "bellerive" },
  { brand: "regency", product: "berwick" },
  { brand: "regency", product: "cardinia" },
  { brand: "regency", product: "alterra" },
  { brand: "regency", product: "san-san-francisco-bay-40" },
  { brand: "hergom", product: "glance-l-freestanding" },
  { brand: "hergom", product: "glance" },
  { brand: "morso", product: "ignis-grill-grate" },
  { brand: "morso", product: "morso-brush-and-scraper-set" },
  { brand: "morso", product: "grill-forno-ii-outdoor-oven" },
  { brand: "morso", product: "forno-s-s-fire-divide" },
  { brand: "morso", product: "forno-garden-set" },
  { brand: "morso", product: "morso-faro-lantern-80h" },
  { brand: "morso", product: "forno-terra-table" },
  { brand: "morso", product: "forno-outdoor-garden-table" },
  { brand: "morso", product: "forno-garden-table-cover" },
  { brand: "morso", product: "grill-forno-door" },
  { brand: "morso", product: "morso-faro-lantern-30h" },
  { brand: "morso", product: "morso-faro-lantern-55h" },
  { brand: "morso", product: "forno-cover" },
  { brand: "morso", product: "forno-flue-pipe" },
  { brand: "morso", product: "morso-fire-tongs" },
  { brand: "morso", product: "morso-garden-table-shelf" },
  { brand: "morso", product: "morso-kamino-cover" },
  { brand: "morso", product: "morso-outdoor-side-table" },
  { brand: "morso", product: "morso-pizza-&-herb-cutter" },
  { brand: "morso", product: "morso-pizza-peel" },
  { brand: "morso", product: "morso-smokeeper" },
  { brand: "morso", product: "morso-smoker-box" },
  { brand: "morso", product: "morso-steel-handle" },
  { brand: "morso", product: "morso-grill-17" },
  { brand: "morso", product: "morso-table-cover" },
  { brand: "morso", product: "morso-tuscan-grill" },
  { brand: "morso", product: "morso-tuscan-plancha" },
  { brand: "morso", product: "morso-vetro-pizza-&-frying-plate" },
  { brand: "morso", product: "morso-grill-cover" },
  { brand: "morso", product: "forno-brick-set" },
  { brand: "morso", product: "forno-terra-table-shelf" },
  { brand: "morso", product: "morso-ash-scraper" },
  { brand: "bosq", product: "aere-70s-freestanding-l-black-steel-base" },
  { brand: "adf", product: "linea-100-insert" },
  { brand: "adf", product: "linea-85-b-freestanding" },
  { brand: "adf", product: "linea-100-b-freestanding" },
  { brand: "austroflamm", product: "dexter-door-hinge-left" },
  { brand: "austroflamm", product: "clou-xtra" },
  { brand: "hergom", product: "hergom-fire-pit-zenith" },
  { brand: "morso", product: "morso-frying-dish-and-serving-plate" },
  { brand: "paul-agnew-designs", product: "riversdale-white-1500" },
  { brand: "paul-agnew-designs", product: "chilton-white-1370" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1500" },
  { brand: "paul-agnew-designs", product: "malvern-insert-black" },
  { brand: "paul-agnew-designs", product: "royal-arch-insert-black" }
];


  // Construct product URLs
  const productUrls = products.map(
    ({ brand, product }) =>
      `/${encodeURIComponent(brand)}/${encodeURIComponent(product)}`
  );
  const filters = [
    ["fireplace"],
    ["fireplace-mantels"],
    ["fire-tools"],
    ["outdoor"],
    ["cast-iron"],
    ["cooker"],
    ["bio-ethanol"],
    ["gas"],
    ["wood"],
    ["electric"],
    ["outdoor"],
    ["inbuilt"],
    ["freestanding"],
    ["three-Sided"],
    ["two-Sided"],
    ["single-Sided"],
    ["four-Sided"],
    ["esse"],
    ["kalora"],
    ["adf"],
    ["austroflamm"],
    ["bosq"],
    ["eurostove"],
    ["gazco"],
    ["heatmaster"],
    ["hergom"],
    ["living-fire"],
    ["paul-agnew-designs"],
    ["regency"],
    ["morso"],
    ["stovax"],
    ["firepit"],
    ["heatmaster-wood"],
    ["studio-2"],
    ["greenfire"],
    ["city-series"],
    ["heatmaster-gas"],
    ["ilektro-freestanding"],
    ["aerion"],
    ["ilektro-insert"],
    ["hestia"],
    ["pyro"],
    ["ilektro"],
    ["ilektro-slimline"],
    ["ironheart-range"],
    ["aere"],
    ["churchill"],
    ["e-series"],
    ["estudio"],
    ["glance"],
    ["hayra"],
    ["linea"],
    ["nero"],
    ["onyx"],
    ["siena"],
    ["slimline"],
    ["zenitth"],
    ["cocoon-pedestal"],
    ["vellum"],
    ["1000"],
    ["regency-wood"],
    ["regency-gas"],
    ["regency-electric"],
    ["forno"],
    ["ignis"],
    ["kamino"],
    ["lanterns"],
    ["morso-grill-17"],
    ["tuscan"],
    ["austroflamm-wood"],
    ["dexter"],
    ["kalora-wood"],
  ];

  const filterSingleUrls = filters.map(
    (filterArray) =>
      `/allProducts/${filterArray.map(encodeURIComponent).join("/")}`
  );

  // Generate SEO-optimized filter URLs
  const filterUrls = generateFilterUrls();

  // Static pages (with corrected paths)
  const staticPages = [
    "/",
    "/home",
    "/our-story",
    "/maintenance-service",
    "/about",
    "/contact",
    "/warranty",
    "/terms",
    "/specificationSheet",
    "/privacy-policy",
    "/specification-sheet", // Changed from specificationSheet
    "/blog", // Added for content marketing
    "/showrooms", // Added if applicable
  ];

  return [...staticPages, ...productUrls, ...filterUrls, ...filterSingleUrls];
}

// export async function GET() {
//   const siteUrl = "https://livingfire.com.au";
//   const lastModDate = new Date().toISOString().split("T")[0];

//   let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//   xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
//   xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
//   xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

//   // 1. Get all pages (static + dynamic)
//   const pages = await getAllPages();
//   const urlSet = new Set();

//   // 2. Process all URLs
//   for (const page of pages) {
//     if (!page || typeof page !== "string" || page.includes("undefined"))
//       continue;

//     const cleanedUrl = page.replace(/\/{2,}/g, "/").replace(/\/$/, "");
//     if (urlSet.has(cleanedUrl)) continue;
//     urlSet.add(cleanedUrl);

//     // Priority logic
//     const isProductUrl = /\/[^/]+\/[^/]+$/.test(cleanedUrl);
//     const priority =
//       cleanedUrl == "/"
//         ? "1.0"
//         : isProductUrl
//         ? "0.9"
//         : cleanedUrl.startsWith("/allProducts")
//         ? "0.7"
//         : "0.8";

//     xml += `  <url>\n`;
//     xml += `    <loc>${siteUrl}${cleanedUrl}</loc>\n`;
//     xml += `    <lastmod>${lastModDate}</lastmod>\n`;
//     xml += `    <changefreq>${
//       cleanedUrl.includes("/blog/") ? "weekly" : "monthly"
//     }</changefreq>\n`;
//     xml += `    <priority>${priority}</priority>\n`;

//     // Add hero images for product pages
//     if (isProductUrl) {
//       const [brand, productName] = cleanedUrl.split("/").filter(Boolean);

//       try {
//         // Fetch product data with hero images
//         const { rows } = await pool.query(
//           `SELECT
//             name,
//             brand_name,
//             hero_image
//           FROM tbl_master
//           WHERE name = $1 AND brand_name = $2`,
//           [decodeURIComponent(productName), decodeURIComponent(brand)]
//         );
//         if (rows.length > 0) {
//           const product = rows[0];

//           // Handle hero_image format (array or single object)
//           let heroImages = [];
//           if (Array.isArray(product?.hero_image)) {
//             heroImages = product?.hero_image;
//           } else if (product?.hero_image?.value) {
//             heroImages = [product?.hero_image];
//           }

//           // Add all hero images to sitemap
//           heroImages.forEach((image, index) => {
//             if (image?.value && image.value !== "TBC") {
//               xml += `    <image:image>\n`;
//               xml += `      <image:loc>${image.value}</image:loc>\n`;
//               xml += `      <image:title>${product.brand_name} ${
//                 product.name
//               } ${index > 0 ? `- Image ${index + 1}` : ""}</image:title>\n`;
//               xml += `      <image:caption>${product.brand_name} ${product.name}</image:caption>\n`;
//               xml += `    </image:image>\n`;
//             }
//           });
//         }
//       } catch (error) {
//         console.error(`Error fetching product data for ${cleanedUrl}:`, error);
//       }
//     }

//     xml += `  </url>\n`;
//   }

//   xml += `</urlset>`;

//   return new NextResponse(xml, {
//     headers: {
//       "Content-Type": "application/xml",
//       "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
//     },
//   });
// }

// Helper function to verify images with Googlebot

export async function GET() {
  const siteUrl = "https://livingfire.com.au";
  const lastModDate = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  const pages = await getAllPages();
  const urlSet = new Set();

  for (const page of pages) {
    if (!page || typeof page !== "string") continue;

    const cleanedUrl = page.replace(/\/{2,}/g, "/").replace(/\/$/, "");

    if (urlSet.has(cleanedUrl)) continue;
    urlSet.add(cleanedUrl);

    // Priority logic - SIMPLIFIED
    // alert(cleanedUrl)
    //   const priority =
    // cleanedUrl === "/" ? "1.0" : // Highest priority for homepage
    // !cleanedUrl?"1.0":
    // cleanedUrl.includes("/allProducts") ? "0.8" :
    // cleanedUrl.includes(product)? "0.9": "0.7"; // Default priorities
    const products = [
  { brand: "kalora", product: "600c" },
  { brand: "kalora", product: "500bx-woodstack" },
  { brand: "kalora", product: "chalet-5" },
  { brand: "gazco", product: "onyx-150rw" },
  { brand: "kalora", product: "urban-ls" },
  { brand: "kalora", product: "urban-pt" },
  { brand: "kalora", product: "zenith-electric-fire-36in" },
  { brand: "kalora", product: "zenith-electric-fire-42in" },
  { brand: "icon-fires", product: "nero-framed-slimline-black-fascia-1450mm" },
  { brand: "gazco", product: "estudio-es135r" },
  { brand: "gazco", product: "onyx-190rw" },
  { brand: "icon-fires", product: "slimline-firebox-2000-black-fascia" },
  { brand: "kalora", product: "nexus-electric-fire-36in" },
  { brand: "gazco", product: "riva2" },
  { brand: "stovax", product: "studio-2-freestanding" },
  { brand: "kalora", product: "nexus-electric-fire-60in" },
  { brand: "austroflamm", product: "s120-45s-cassette" },
  { brand: "adf", product: "hayra-85vp-freestanding" },
  { brand: "heatmaster", product: "a650-body" },
  { brand: "austroflamm", product: "woody" },
  { brand: "bosq", product: "aere-70s-freestanding" },
  { brand: "adf", product: "linea-100-b-duo-l-freestanding-heater" },
  { brand: "paul-agnew-designs", product: "siena-750-tunnel-freestanding" },
  { brand: "heatmaster", product: "b650-body" },
  { brand: "heatmaster", product: "enviro-lpg-unit-to-suit-coals" },
  { brand: "heatmaster", product: "a750-body" },
  { brand: "heatmaster", product: "a900-body" },
  { brand: "heatmaster", product: "b900-body" },
  { brand: "regency", product: "gfi750" },
  { brand: "adf", product: "linea-85-insert" },
  { brand: "paul-agnew-designs", product: "siena-750gf2l" },
  { brand: "adf", product: "linea-100-insert-duo" },
  { brand: "morso", product: "1440-freestanding" },
  { brand: "morso", product: "6148-freestanding" },
  { brand: "morso", product: "7943-freestanding" },
  { brand: "esse", product: "ironheart-outside-air-wet" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-glass-fronted" },
  { brand: "morso", product: "7948-freestanding" },
  { brand: "morso", product: "7970-wall-mounted" },
  { brand: "morso", product: "8843-freestanding" },
  { brand: "gazco", product: "onyx-110rw" },
  { brand: "paul-agnew-designs", product: "ilektro-2000-landscape" },
  { brand: "paul-agnew-designs", product: "siena-750-g4-freestanding" },
  { brand: "paul-agnew-designs", product: "ilektro-woodland-stove" },
  { brand: "paul-agnew-designs", product: "alto-tunnel" },
  { brand: "morso", product: "morso-culi-bbq-grill-tongs" },
  { brand: "paul-agnew-designs", product: "alto-glass-fronted" },
  { brand: "adf", product: "hayra-85vl-freestanding" },
  { brand: "paul-agnew-designs", product: "vue-1250-left-corner" },
  { brand: "adf", product: "linea-100-l-freestanding-with-steel-base" },
  { brand: "paul-agnew-designs", product: "quadro-800-tunnel" },
  { brand: "paul-agnew-designs", product: "vue-1250-glass-fronted" },
  { brand: "morso", product: "kamino-outdoor-fireplace" },
  { brand: "paul-agnew-designs", product: "vue-1410-right-corner" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-glass-fronted" },
  { brand: "paul-agnew-designs", product: "hestia-1000-peninsula-guillotine" },
  { brand: "paul-agnew-designs", product: "ilektro-1650-landscape" },
  { brand: "hergom", product: "hergom-fire-pit-meteor" },
  { brand: "morso", product: "1410-freestanding" },
  { brand: "paul-agnew-designs", product: "vue-1250-bay" },
  { brand: "paul-agnew-designs", product: "vue-1410-bay" },
  { brand: "bosq", product: "aere-70s-insert" },
  { brand: "paul-agnew-designs", product: "vue-1410-glass-fronted" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2l" },
  { brand: "regency", product: "san-francisco-bay-60" },
  { brand: "adf", product: "hayra-85vb-freestanding" },
  { brand: "paul-agnew-designs", product: "700-square-w-motif-fascia-black" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-60in-1524mm" },
  { brand: "paul-agnew-designs", product: "milos-lu-grey-1310" },
  { brand: "kalora", product: "425r" },
  { brand: "paul-agnew-designs", product: "700-victorian-fascia-polished" },
  { brand: "regency", product: "ei25-electric-insert" },
  { brand: "paul-agnew-designs", product: "new-william-iv-italian-cararra-1500" },
  { brand: "paul-agnew-designs", product: "paros-lu-grey-1459" },
  { brand: "kalora", product: "fusion" },
  { brand: "regency", product: "fg39" },
  { brand: "paul-agnew-designs", product: "siena-750-tunnel-inbuilt" },
  { brand: "paul-agnew-designs", product: "siena-750-g4-inbuilt" },
  { brand: "kalora", product: "500c" },
  { brand: "paul-agnew-designs", product: "siena-750gf-inbuilt" },
  { brand: "paul-agnew-designs", product: "naxos-mantel-luna-grey-1420" },
  { brand: "paul-agnew-designs", product: "victorian-arched-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "modica-600-inbuilt" },
  { brand: "kalora", product: "600bx-woodstack" },
  { brand: "paul-agnew-designs", product: "victorian-arched-mocha-beige-1650" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1470" },
  { brand: "stovax", product: "studio-2-insert" },
  { brand: "stovax", product: "aeris-hanging-black-shell-s-s-pole" },
  { brand: "stovax", product: "cocoon-pedestal-standing-black-shell-s-s-stand" },
  { brand: "stovax", product: "vellum-wall-mounted-s-s" },
  { brand: "metters", product: "kosi-no-25" },
  { brand: "kalora", product: "zenith-electric-fire-60in" },
  { brand: "kalora", product: "zenith-electric-fire-72in" },
  { brand: "paul-agnew-designs", product: "windsor-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "hampshire-large-raw-1650" },
  { brand: "kalora", product: "zenith-electric-fire-88in" },
  { brand: "morso", product: "morso-culi-bbq-grill-fork" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-arched-polished" },
  { brand: "paul-agnew-designs", product: "700-decorative-square-fascia-polished" },
  { brand: "paul-agnew-designs", product: "850-victorian-arch-fascia-black" },
  { brand: "paul-agnew-designs", product: "camden-insert-black" },
  { brand: "morso", product: "grill-71" },
  { brand: "austroflamm", product: "dexter-door-hinge-right" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-black" },
  { brand: "metters", product: "kosi-no-35" },
  { brand: "paul-agnew-designs", product: "dublin-insert-black" },
  { brand: "eurostove", product: "churchill-5-convection-dual-control" },
  { brand: "living-fire", product: "black-brass-trim-4pc-set" },
  { brand: "paul-agnew-designs", product: "550-classic-fascia-black" },
  { brand: "paul-agnew-designs", product: "integra-anson" },
  { brand: "morso", product: "6143-freestanding" },
  { brand: "esse", product: "700-wood-heater" },
  { brand: "esse", product: "ironheart-outside-air-dry" },
  { brand: "kalora", product: "accent" },
  { brand: "eurostove", product: "churchill-5-dual-control" },
  { brand: "esse", product: "ironheart-dry" },
  { brand: "esse", product: "ironheart-wet" },
  { brand: "esse", product: "bakeheart-outside-air-dry" },
  { brand: "esse", product: "warmheart-s-outside-air-dry" },
  { brand: "esse", product: "ironheart-dry" },
  { brand: "esse", product: "ironheart-wet" },
  { brand: "adf", product: "linea-100-duo-freestanding" },
  { brand: "esse", product: "bakeheart-outside-air-dry" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "kalora", product: "chalet-6" },
  { brand: "esse", product: "bakeheart-outside-air-wet" },
  { brand: "esse", product: "warmheart-s-outside-air-wet" },
  { brand: "esse", product: "warmheart-s-outside-air-wet" },
  { brand: "kalora", product: "sorrento" },
  { brand: "eurostove", product: "churchill-5-convection-dual-control-logstore" },
  { brand: "living-fire", product: "2-tier-wood-rack-w/-firetools-large" },
  { brand: "living-fire", product: "fire-grate-745mm" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "living-fire", product: "black-pewter-handle-4pc-set" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "living-fire", product: "black-pewter-trim-4pc-set" },
  { brand: "kalora", product: "nexus-electric-fire-50in" },
  { brand: "living-fire", product: "black-3pc-set" },
  { brand: "living-fire", product: "fire-grate-915mm" },
  { brand: "kalora", product: "nexus-electric-fire-74in" },
  { brand: "paul-agnew-designs", product: "ilektro-2600-landscape" },
  { brand: "living-fire", product: "fire-grates-premium-range-600mm" },
  { brand: "esse", product: "1000-h" },
  { brand: "living-fire", product: "4-fold-fire-screen-black-w/-pewter-finish" },
  { brand: "living-fire", product: "fire-grates-premium-range-8-bar-750mm" },
  { brand: "paul-agnew-designs", product: "ilektro-950lt" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-72in-1828mm" },
  { brand: "living-fire", product: "black-4pc-set" },
  { brand: "paul-agnew-designs", product: "quadro-800-glass-fronted" },
  { brand: "living-fire", product: "fixed-wing-sloping--large-fire-screen" },
  { brand: "living-fire", product: "fixed-wing-sloping-fire-screen--small" },
  { brand: "paul-agnew-designs", product: "vue-1410-left-corner" },
  { brand: "living-fire", product: "black-with-scraper-4pc-set" },
  { brand: "living-fire", product: "flaming-magic-30g" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-tunnel" },
  { brand: "living-fire", product: "heavy-duty-classic--black-brass-4pc-set" },
  { brand: "living-fire", product: "tongio-forging--tongs" },
  { brand: "morso", product: "grill-71-table" },
  { brand: "esse", product: "700-wood-heater-outside-air" },
  { brand: "esse", product: "775-wood-heater-outside-air" },
  { brand: "living-fire", product: "tongio-forging-deluxe-3pc-set" },
  { brand: "morso", product: "ignis-outdoor-fire-pit" },
  { brand: "paul-agnew-designs", product: "siena-750gf2r" },
  { brand: "esse", product: "vector" },
  { brand: "living-fire", product: "3-fold-rounded-black-w/-nickel-plated-top-frame" },
  { brand: "living-fire", product: "tongio-forging-deluxe-poker-log-roller" },
  { brand: "living-fire", product: "tongio-forging-rake" },
  { brand: "paul-agnew-designs", product: "siena-750gf3" },
  { brand: "esse", product: "bakeheart-outside-air-wet" },
  { brand: "esse", product: "1000-w" },
  { brand: "esse", product: "1000-h" },
  { brand: "esse", product: "1000-w" },
  { brand: "living-fire", product: "tongio-forging-riviera-3pc-set" },
  { brand: "living-fire", product: "tongio-forging-deluxe-4pc-set" },
  { brand: "living-fire", product: "wood-storage-wood-ring-with-tray" },
  { brand: "hergom", product: "e-30-freestanding" },
  { brand: "hergom", product: "e-40-freestanding" },
  { brand: "living-fire", product: "gated-fire-screen" },
  { brand: "paul-agnew-designs", product: "ilektro-insert" },
  { brand: "hergom", product: "hergom-fire-pit-ignis" },
  { brand: "eurostove", product: "loxton-5-standard" },
  { brand: "paul-agnew-designs", product: "hestia-1000-bay-guillotine" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2r" },
  { brand: "regency", product: "windsor" },
  { brand: "paul-agnew-designs", product: "modica-600-freestanding" },
  { brand: "paul-agnew-designs", product: "i700-stove" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape-tunnel" },
  { brand: "paul-agnew-designs", product: "siena-750gf-freestanding" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-950-aspect" },
  { brand: "paul-agnew-designs", product: "ilektro-950-landscape" },
  { brand: "paul-agnew-designs", product: "vue-1250-right-corner" },
  { brand: "paul-agnew-designs", product: "vue-1410-tunnel" },
  { brand: "paul-agnew-designs", product: "ilektro-freestanding" },
  { brand: "morso", product: "morso-culi-bbq-grill-turner-spatula" },
  { brand: "morso", product: "morso-multi-cocotte-4.6l-w-griddle-lid" },
  { brand: "morso", product: "forno-door" },
  { brand: "heatmaster", product: "seamless-body" },
  { brand: "paul-agnew-designs", product: "vue-1410-peninsula" },
  { brand: "icon-fires", product: "double-sided-slimline-firebox-1350-brushed-s-s-fascia" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-50in-1270mm" },
  { brand: "heatmaster", product: "b750-body" },
  { brand: "esse", product: "ironheart-outside-air-dry" },
  { brand: "esse", product: "ironheart-outside-air-wet" },
  { brand: "heatmaster", product: "z1200-unit" },
  { brand: "esse", product: "warmheart-s-outside-air-dry" },
  { brand: "regency", product: "gf1500lst-lpg" },
  { brand: "regency", product: "gosford" },
  { brand: "gazco", product: "estudio-es165r" },
  { brand: "gazco", product: "estudio-es60r" },
  { brand: "gazco", product: "estudio-es105r" },
  { brand: "gazco", product: "estudio-es85r" },
  { brand: "regency", product: "gf1500l" },
  { brand: "regency", product: "narrabri" },
  { brand: "paul-agnew-designs", product: "850-classic-fascia-black" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "living-fire", product: "3-fold--squared-fire-screen" },
  { brand: "living-fire", product: "curved-stand-4pc-set" },
  { brand: "morso", product: "forno-outdoor-oven" },
  { brand: "living-fire", product: "tongio-forging-tongs-4pc-set" },
  { brand: "morso", product: "forno-terra-set" },
  { brand: "morso", product: "grill-forno-cover" },
  { brand: "paul-agnew-designs", product: "6000-pattern-square-fascia-black" },
  { brand: "paul-agnew-designs", product: "athena-black-granite-1500" },
  { brand: "paul-agnew-designs", product: "bouvet-italian-carrara-1310" },
  { brand: "paul-agnew-designs", product: "hampshire-standard-raw-1500" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-white-1470" },
  { brand: "paul-agnew-designs", product: "700-classic-fascia-black" },
  { brand: "regency", product: "hzo42-outdoor-lpg" },
  { brand: "regency", product: "pg36" },
  { brand: "regency", product: "chicago-corner-40-left" },
  { brand: "regency", product: "albany" },
  { brand: "regency", product: "hzo42-outdoor" },
  { brand: "regency", product: "chicago-corner-40-right" },
  { brand: "regency", product: "renmark" },
  { brand: "regency", product: "new-york-view-40" },
  { brand: "regency", product: "hume" },
  { brand: "regency", product: "new-york-view-60" },
  { brand: "regency", product: "dvi34l" },
  { brand: "regency", product: "gf950-lpg" },
  { brand: "regency", product: "gf950l" },
  { brand: "regency", product: "mansfield" },
  { brand: "regency", product: "montrose" },
  { brand: "regency", product: "bellerive" },
  { brand: "regency", product: "berwick" },
  { brand: "regency", product: "cardinia" },
  { brand: "regency", product: "alterra" },
  { brand: "regency", product: "san-san-francisco-bay-40" },
  { brand: "hergom", product: "glance-l-freestanding" },
  { brand: "hergom", product: "glance" },
  { brand: "morso", product: "ignis-grill-grate" },
  { brand: "morso", product: "morso-brush-and-scraper-set" },
  { brand: "morso", product: "grill-forno-ii-outdoor-oven" },
  { brand: "morso", product: "forno-s-s-fire-divide" },
  { brand: "morso", product: "forno-garden-set" },
  { brand: "morso", product: "morso-faro-lantern-80h" },
  { brand: "morso", product: "forno-terra-table" },
  { brand: "morso", product: "forno-outdoor-garden-table" },
  { brand: "morso", product: "forno-garden-table-cover" },
  { brand: "morso", product: "grill-forno-door" },
  { brand: "morso", product: "morso-faro-lantern-30h" },
  { brand: "morso", product: "morso-faro-lantern-55h" },
  { brand: "morso", product: "forno-cover" },
  { brand: "morso", product: "forno-flue-pipe" },
  { brand: "morso", product: "morso-fire-tongs" },
  { brand: "morso", product: "morso-garden-table-shelf" },
  { brand: "morso", product: "morso-kamino-cover" },
  { brand: "morso", product: "morso-outdoor-side-table" },
  { brand: "morso", product: "morso-pizza-&-herb-cutter" },
  { brand: "morso", product: "morso-pizza-peel" },
  { brand: "morso", product: "morso-smokeeper" },
  { brand: "morso", product: "morso-smoker-box" },
  { brand: "morso", product: "morso-steel-handle" },
  { brand: "morso", product: "morso-grill-17" },
  { brand: "morso", product: "morso-table-cover" },
  { brand: "morso", product: "morso-tuscan-grill" },
  { brand: "morso", product: "morso-tuscan-plancha" },
  { brand: "morso", product: "morso-vetro-pizza-&-frying-plate" },
  { brand: "morso", product: "morso-grill-cover" },
  { brand: "morso", product: "forno-brick-set" },
  { brand: "morso", product: "forno-terra-table-shelf" },
  { brand: "morso", product: "morso-ash-scraper" },
  { brand: "bosq", product: "aere-70s-freestanding-l-black-steel-base" },
  { brand: "adf", product: "linea-100-insert" },
  { brand: "adf", product: "linea-85-b-freestanding" },
  { brand: "adf", product: "linea-100-b-freestanding" },
  { brand: "austroflamm", product: "dexter-door-hinge-left" },
  { brand: "austroflamm", product: "clou-xtra" },
  { brand: "hergom", product: "hergom-fire-pit-zenith" },
  { brand: "morso", product: "morso-frying-dish-and-serving-plate" },
  { brand: "paul-agnew-designs", product: "riversdale-white-1500" },
  { brand: "paul-agnew-designs", product: "chilton-white-1370" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1500" },
  { brand: "paul-agnew-designs", product: "malvern-insert-black" },
  { brand: "paul-agnew-designs", product: "royal-arch-insert-black" }
];

    const productNames = products.map(p => p.product);
    let priority = "0.7"; // Default priority
    if (cleanedUrl === "/" || !cleanedUrl) {
      priority = "1.0"; // Highest priority for homepage
    } else if (cleanedUrl.includes("/home")) {
      priority = "1.0";
    } 
    else if (cleanedUrl.includes("/allProducts")) {
      priority = "0.8";
    } 
    else if (productNames?.some(product => cleanedUrl.includes(product))) {
      priority = "0.9";
    }
    let changefreq = "monthly"; // default

    if (priority === "1.0") {
      changefreq = "daily";
    } else if (priority === "0.9") {
      changefreq = "weekly";
    } else if (priority === "0.8") {
      changefreq = "weekly";
    } else if (priority === "0.7") {
      changefreq = "monthly";
    }
    // products?.map(product => {
    //   if (cleanedUrl.includes(product)) {
    //     priority = "0.9";
    //   }
    // })

    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}${cleanedUrl}</loc>\n`;
    xml += `    <lastmod>${lastModDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq?changefreq:'monthly'}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;

    // Add images for product pages
    if (
      cleanedUrl.includes("/paul-agnew-designs/") ||
      cleanedUrl.match(/\/[^/]+\/[^/]+/)
    ) {
      const [brand, product] = cleanedUrl.split("/").filter(Boolean);

      try {
        const { rows } = await pool.query(
          `SELECT hero_image FROM tbl_master 
           WHERE brand_slug = $1 AND product_slug = $2`,
          [brand, product]
        );

        if (rows[0]?.hero_image) {
          const images = Array.isArray(rows[0].hero_image)
            ? rows[0].hero_image
            : [rows[0].hero_image];

          images
            .filter((img) => img?.value)
            .forEach((img) => {
              xml += `    <image:image>\n`;
              xml += `      <image:loc>${img.value}</image:loc>\n`;
              xml += `      <image:title>${brand} ${product}</image:title>\n`;
              xml += `    </image:image>\n`;
            });
        }
      } catch (error) {
        console.error(`Error fetching images for ${cleanedUrl}:`, error);
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}

// async function verifyImageWithGooglebot(imageUrl) {
//   try {
//     const response = await fetch(imageUrl, {
//       headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' }
//     });

//     return {
//       url: imageUrl,
//       status: response.status,
//       accessible: response.ok,
//       contentType: response.headers.get('content-type')
//     };
//   } catch (error) {
//     return {
//       url: imageUrl,
//       error: error.message,
//       accessible: false
//     };
//   }
// }
