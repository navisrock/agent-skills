import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Font cục bộ trong public/fonts (từ Fontsource, giấy phép OFL) để render không cần mạng.
// Mỗi font gồm 2 phần: latin + vietnamese, phân tách theo unicode-range.
const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const VIETNAMESE =
  "U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB";

const subsets = [
  { name: "latin", range: LATIN },
  { name: "vietnamese", range: VIETNAMESE },
];

for (const { name, range } of subsets) {
  for (const weight of ["400", "600", "800"]) {
    loadFont({
      family: "Be Vietnam Pro",
      url: staticFile(`fonts/be-vietnam-pro-${name}-${weight}-normal.woff2`),
      weight,
      unicodeRange: range,
    });
  }
  loadFont({
    family: "Patrick Hand",
    url: staticFile(`fonts/patrick-hand-${name}-400-normal.woff2`),
    weight: "400",
    unicodeRange: range,
  });
}
