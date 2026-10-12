import * as THREE from "three";

/**
 * Curated authentic Ge'ez Fidel syllabary & Ethiopic numerals
 * Spans prime consonants and orders: Ge'ez, Ka'eb, Sales, Rabe'e, Hames, Sades, Sabe'e
 */
export const GEEZ_CHARACTERS = [
  // First orders & foundational glyphs
  "ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ",
  "ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ",
  "ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ",
  "መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ",
  "ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ",
  "ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ",
  "ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ",
  "በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ",
  "ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ",
  "ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ",
  "አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ",
  "ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ",
  "ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ",
  "ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ",
  "የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ",
  "ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ",
  "ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ",
  "ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ",
  "ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ",
  "ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ",
  "ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ",
  // Ethiopic Numerals
  "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲",
  // Latin architectural characters for English mode
  "L", "A", "N", "T", "U", "M", "O", "B", "I", "R", "H"
];

export interface GlyphAtlasData {
  texture: THREE.CanvasTexture;
  gridCols: number;
  gridRows: number;
  totalGlyphs: number;
  charToIndex: Map<string, number>;
}

let cachedAtlas: GlyphAtlasData | null = null;

/**
 * Generates an optimized, anti-aliased font atlas texture for Ge'ez & Latin glyphs.
 * Uses Noto Sans Ethiopic with fallbacks, rendering at high resolution (1024x1024)
 * with MIP-mapping and LinearFilter for crisp signed-distance-style rendering.
 */
export function createGeezGlyphAtlas(): GlyphAtlasData {
  if (cachedAtlas) return cachedAtlas;

  const canvas = document.createElement("canvas");
  const size = 1024;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: false });

  if (!ctx) {
    throw new Error("Unable to create 2D canvas context for Ge'ez atlas");
  }

  const chars = GEEZ_CHARACTERS;
  const totalGlyphs = chars.length;
  // 10x10 or 12x12 grid
  const gridCols = 12;
  const gridRows = Math.ceil(totalGlyphs / gridCols);
  const cellSize = size / gridCols;

  ctx.clearRect(0, 0, size, size);

  // Background is transparent
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, size, size);

  // Render glyphs in pure white with high alpha so shaders can tint
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${Math.round(cellSize * 0.68)}px 'Noto Sans Ethiopic', 'Abyssinica SIL', Nyala, sans-serif`;

  const charToIndex = new Map<string, number>();

  for (let i = 0; i < totalGlyphs; i++) {
    const char = chars[i];
    charToIndex.set(char, i);

    const col = i % gridCols;
    const row = Math.floor(i / gridCols);

    const x = col * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;

    ctx.fillText(char, x, y);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.format = THREE.RGBAFormat;
  texture.needsUpdate = true;

  cachedAtlas = {
    texture,
    gridCols,
    gridRows,
    totalGlyphs,
    charToIndex,
  };

  return cachedAtlas;
}
