/**
 * Ethiopian Calendar (ዓመተ ምሕረት) & 12-Hour Ethiopian Time Engine
 *
 * The Ethiopian calendar has 13 months:
 * - Months 1 to 12 (Meskerem to Nehase) have exactly 30 days each.
 * - Month 13 (Pagume / ጳጉሜ) has 5 days (6 days in an Ethiopian leap year).
 *
 * Ethiopian Time System:
 * - A 12-hour cycle starting at dawn (06:00 AM Gregorian = 12:00 ጠዋት Ethiopian).
 * - 07:00 AM Gregorian = 01:00 ጠዋት (Morning).
 * - 12:00 PM Gregorian = 06:00 ቀትር (Noon).
 * - 18:00 (6:00 PM) Gregorian = 12:00 ምሽት (Dusk).
 * - 19:00 (7:00 PM) Gregorian = 01:00 ምሽት (Evening).
 */

export interface EthiopianDate {
  year: number;
  month: number; // 1 - 13
  day: number;   // 1 - 30 (or 1 - 6 for Pagume)
  monthNameAmharic: string;
  monthNameEnglish: string;
  weekdayAmharic: string;
  weekdayEnglish: string;
  formattedAmharic: string;
  formattedEnglish: string;
  geezYear: string;
  geezDay: string;
}

export interface EthiopianTime {
  hour: number; // 1 - 12
  minute: number;
  second: number;
  periodAmharic: string;
  periodEnglish: string;
  formatted12: string;
  formattedFullAmharic: string;
  geezHour: string;
}

export const ETHIOPIAN_MONTHS_AMHARIC = [
  "መስከረም", // Meskerem (1)
  "ጥቅምት",   // Tikimt (2)
  "ኅዳር",     // Hidar (3)
  "ታኅሣሥ",   // Tahsas (4)
  "ጥር",      // Tir (5)
  "የካቲት",   // Yakatit (6)
  "መጋቢት",   // Magabit (7)
  "ሚያዝያ",   // Miyazya (8)
  "ግንቦት",   // Ginbot (9)
  "ሰኔ",      // Sene (10)
  "ሐምሌ",     // Hamle (11)
  "ነሐሴ",     // Nehase (12)
  "ጳጉሜ",    // Pagume (13)
];

export const ETHIOPIAN_MONTHS_ENGLISH = [
  "Meskerem",
  "Tikimt",
  "Hidar",
  "Tahsas",
  "Tir",
  "Yakatit",
  "Megabit",
  "Miyazya",
  "Ginbot",
  "Sene",
  "Hamle",
  "Nehase",
  "Pagume",
];

export const WEEKDAYS_AMHARIC = [
  "እሑድ",   // Sunday (0)
  "ሰኞ",     // Monday (1)
  "ማክሰኞ",  // Tuesday (2)
  "ረቡዕ",    // Wednesday (3)
  "ሐሙስ",   // Thursday (4)
  "ዓርብ",    // Friday (5)
  "ቅዳሜ",   // Saturday (6)
];

export const WEEKDAYS_ENGLISH = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Converts integer numbers to Ge'ez numerals (፩ to ፼)
 */
export function toGeezNumeral(num: number): string {
  if (num <= 0) return num.toString();

  const ones = ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
  const tens = ["", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];

  if (num < 10) return ones[num];
  if (num < 100) {
    const t = Math.floor(num / 10);
    const o = num % 10;
    return tens[t] + ones[o];
  }

  if (num < 10000) {
    const hundreds = Math.floor(num / 100);
    const rem = num % 100;
    let prefix = "";
    if (hundreds > 1) {
      prefix = toGeezNumeral(hundreds);
    }
    const remStr = rem > 0 ? toGeezNumeral(rem) : "";
    return `${prefix}፻${remStr}`;
  }

  // Fallback for large numbers
  return num.toString();
}

/**
 * Convert Gregorian Julian Day Number to Ethiopian date
 */
function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

function jdnToEthiopian(jdn: number): { year: number; month: number; day: number } {
  // Ethiopian calendar epoch in Julian Day Number: 1723856 (Aug 29, 8 CE Julian / Meskerem 1, 1 EE)
  const r = (jdn - 1723856) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);
  const year = 4 * Math.floor((jdn - 1723856) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;

  return { year, month, day };
}

/**
 * Converts a Gregorian Date to an EthiopianDate object.
 */
export function getEthiopianDate(gregorianDate: Date = new Date()): EthiopianDate {
  const gYear = gregorianDate.getFullYear();
  const gMonth = gregorianDate.getMonth() + 1; // 1-12
  const gDay = gregorianDate.getDate();
  const weekdayIndex = gregorianDate.getDay(); // 0-6

  const jdn = gregorianToJdn(gYear, gMonth, gDay);
  const { year, month, day } = jdnToEthiopian(jdn);

  const monthIdx = Math.min(Math.max(month - 1, 0), 12);
  const monthNameAmharic = ETHIOPIAN_MONTHS_AMHARIC[monthIdx];
  const monthNameEnglish = ETHIOPIAN_MONTHS_ENGLISH[monthIdx];
  const weekdayAmharic = WEEKDAYS_AMHARIC[weekdayIndex];
  const weekdayEnglish = WEEKDAYS_ENGLISH[weekdayIndex];

  return {
    year,
    month,
    day,
    monthNameAmharic,
    monthNameEnglish,
    weekdayAmharic,
    weekdayEnglish,
    formattedAmharic: `${weekdayAmharic}፣ ${monthNameAmharic} ${day} ቀን ${year} ዓ.ም.`,
    formattedEnglish: `${weekdayEnglish}, ${monthNameEnglish} ${day}, ${year} E.C.`,
    geezYear: toGeezNumeral(year),
    geezDay: toGeezNumeral(day),
  };
}

/**
 * Converts standard Gregorian local time to Ethiopian 12-hour time.
 * In Ethiopia, a 24-hour day begins at 06:00:00 (dawn).
 */
export function getEthiopianTime(date: Date = new Date()): EthiopianTime {
  const gHour = date.getHours(); // 0 - 23
  const minute = date.getMinutes();
  const second = date.getSeconds();

  // Offset by 6 hours
  let hour = (gHour + 6) % 12;
  if (hour === 0) hour = 12;

  let periodAmharic = "ጠዋት";
  let periodEnglish = "Morning";

  if (gHour >= 6 && gHour < 12) {
    periodAmharic = "ጠዋት";
    periodEnglish = "Morning";
  } else if (gHour >= 12 && gHour < 18) {
    periodAmharic = "ከሰዓት";
    periodEnglish = "Afternoon";
  } else if (gHour >= 18 && gHour < 24) {
    periodAmharic = "ምሽት";
    periodEnglish = "Evening";
  } else {
    periodAmharic = "ሌሊት";
    periodEnglish = "Night";
  }

  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatted12 = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
  const formattedFullAmharic = `${periodAmharic} ${hour}:${pad(minute)}`;

  return {
    hour,
    minute,
    second,
    periodAmharic,
    periodEnglish,
    formatted12,
    formattedFullAmharic,
    geezHour: toGeezNumeral(hour),
  };
}
