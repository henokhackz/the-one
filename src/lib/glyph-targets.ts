/**
 * Generates 3D spatial target coordinates for Ge'ez and Latin letterforms
 * Enables instanced glyph particles to assemble into "ላንቱሞ" or "LANTUMO"
 */

export function generateNameTargetPoints(
  text: string,
  targetCount: number,
  isMobile: boolean
): [number, number, number][] {
  if (typeof window === "undefined") {
    return Array.from({ length: targetCount }, () => [0, 0, 0]);
  }

  const canvas = document.createElement("canvas");
  const width = isMobile ? 600 : 1000;
  const height = isMobile ? 300 : 400;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return Array.from({ length: targetCount }, () => [0, 0, 0]);
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const fontSize = isMobile ? (text.length > 5 ? 70 : 100) : (text.length > 5 ? 110 : 140);
  ctx.font = `900 ${fontSize}px 'Noto Sans Ethiopic', 'Syne', sans-serif`;
  ctx.fillText(text, width / 2, height / 2);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const filledPixels: [number, number][] = [];

  // Step sampling
  const step = isMobile ? 6 : 4;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 140) {
        filledPixels.push([x, y]);
      }
    }
  }

  if (filledPixels.length === 0) {
    return Array.from({ length: targetCount }, () => [0, 0, 0]);
  }

  // Shuffle filled pixels for organic dispersion
  for (let i = filledPixels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filledPixels[i], filledPixels[j]] = [filledPixels[j], filledPixels[i]];
  }

  const aspect = width / height;
  const spreadX = isMobile ? 6.5 : 12.0;
  const spreadY = spreadX / aspect;

  const result: [number, number, number][] = [];

  for (let i = 0; i < targetCount; i++) {
    const pixel = filledPixels[i % filledPixels.length];
    // Map from canvas [0..width, 0..height] to world space centered at origin
    const nx = (pixel[0] / width - 0.5) * spreadX;
    // Invert Y for WebGL
    const ny = -(pixel[1] / height - 0.5) * spreadY + (isMobile ? 0.4 : 0.8);
    // Subtle Z depth layering
    const nz = ((i % 5) - 2) * 0.15;

    result.push([nx, ny, nz]);
  }

  return result;
}
