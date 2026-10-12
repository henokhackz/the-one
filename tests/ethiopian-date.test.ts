import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getEthiopianDate,
  getEthiopianTime,
  toGeezNumeral,
} from "../src/lib/ethiopian-date.ts";

describe("Ge'ez Numeral Converter", () => {
  it("converts single digits correctly", () => {
    assert.equal(toGeezNumeral(1), "፩");
    assert.equal(toGeezNumeral(5), "፭");
    assert.equal(toGeezNumeral(9), "፱");
  });

  it("converts tens correctly", () => {
    assert.equal(toGeezNumeral(10), "፲");
    assert.equal(toGeezNumeral(20), "፳");
    assert.equal(toGeezNumeral(30), "፴");
    assert.equal(toGeezNumeral(25), "፳፭");
  });

  it("converts hundreds and thousands correctly", () => {
    assert.equal(toGeezNumeral(100), "፻");
    assert.equal(toGeezNumeral(2017), "፳፻፲፯");
  });
});

describe("Ethiopian Date Converter", () => {
  it("converts Ethiopian New Year (Enkutatash)", () => {
    // September 11, 2024 is Meskerem 1, 2017 E.C.
    const date = new Date(2024, 8, 11); // Month 8 is September (0-indexed)
    const eth = getEthiopianDate(date);

    assert.equal(eth.year, 2017);
    assert.equal(eth.month, 1);
    assert.equal(eth.day, 1);
    assert.equal(eth.monthNameEnglish, "Meskerem");
    assert.equal(eth.monthNameAmharic, "መስከረም");
  });

  it("converts October date correctly", () => {
    // October 11, 2024 is Tikimt 1, 2017 E.C.
    const date = new Date(2024, 9, 11);
    const eth = getEthiopianDate(date);

    assert.equal(eth.year, 2017);
    assert.equal(eth.month, 2);
    assert.equal(eth.day, 1);
    assert.equal(eth.monthNameEnglish, "Tikimt");
    assert.equal(eth.monthNameAmharic, "ጥቅምት");
  });
});

describe("Ethiopian Time Converter", () => {
  it("converts 06:00 Gregorian to Ethiopian 12:00 morning", () => {
    const d = new Date(2026, 0, 1, 6, 0, 0);
    const ethTime = getEthiopianTime(d);
    assert.equal(ethTime.hour, 12);
    assert.equal(ethTime.periodAmharic, "ጠዋት");
  });

  it("converts 07:30 Gregorian to Ethiopian 01:30 morning", () => {
    const d = new Date(2026, 0, 1, 7, 30, 0);
    const ethTime = getEthiopianTime(d);
    assert.equal(ethTime.hour, 1);
    assert.equal(ethTime.minute, 30);
    assert.equal(ethTime.periodAmharic, "ጠዋት");
  });

  it("converts 12:00 (Noon) Gregorian to Ethiopian 06:00 afternoon", () => {
    const d = new Date(2026, 0, 1, 12, 0, 0);
    const ethTime = getEthiopianTime(d);
    assert.equal(ethTime.hour, 6);
    assert.equal(ethTime.periodAmharic, "ከሰዓት");
  });

  it("converts 19:45 (7:45 PM) Gregorian to Ethiopian 01:45 evening", () => {
    const d = new Date(2026, 0, 1, 19, 45, 0);
    const ethTime = getEthiopianTime(d);
    assert.equal(ethTime.hour, 1);
    assert.equal(ethTime.minute, 45);
    assert.equal(ethTime.periodAmharic, "ምሽት");
  });

  it("converts 02:15 (2:15 AM) Gregorian to Ethiopian 08:15 night", () => {
    const d = new Date(2026, 0, 1, 2, 15, 0);
    const ethTime = getEthiopianTime(d);
    assert.equal(ethTime.hour, 8);
    assert.equal(ethTime.minute, 15);
    assert.equal(ethTime.periodAmharic, "ሌሊት");
  });
});
