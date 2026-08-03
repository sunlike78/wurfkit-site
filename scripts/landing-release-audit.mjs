import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const index = readFileSync(resolve("index.html"), "utf8");
const demo = readFileSync(resolve("demo.html"), "utf8");

const required = [
  [index, "Produktvision – nicht Beta-Umfang", "product-vision framing"],
  [index, "Echte Beta-Daten bleiben privat", "private beta-data framing"],
  [index, "keinen Checkout, kein Founder-Angebot zum Kauf", "no-purchase framing"],
  [index, "nicht Teil der aktuellen geschlossenen Beta", "planned-feature disclosure"],
  [demo, "Funktionen für echte Konten werden erst nach sicherer Invite-Freigabe aktiviert", "demo invite disclosure"],
  [demo, "nicht einreichbar, unterschriftsreif oder rechtlich geprüft", "demo legal disclosure"],
];

const forbidden = [
  [index, "Live-Demo verfügbar · Jetzt ausprobieren", "old live-demo claim"],
  [index, "Persönlicher Bereich · DSGVO-konform", "unverified GDPR claim"],
  [index, "geplant ab 9,99 €/Monat", "pricing claim"],
  [index, "Founder-Angebot von <b>99 €", "founder-price claim"],
  [index, "persönliche Welpen-Seite", "unreleased public puppy-page claim"],
  [demo, "sind im Live-Produkt mit Ihrem Konto verfügbar", "unreleased demo feature claim"],
  [demo, "Im Live-Produkt wird der Kaufvertrag durch einen Rechtsanwalt", "unverified legal-review claim"],
  [demo, "COI-Rechner — alles in 30 Sekunden", "unreleased demo metadata claim"],
];

const failures = [
  ...required.filter(([source, text]) => !source.includes(text)).map(([, , name]) => `missing: ${name}`),
  ...forbidden.filter(([source, text]) => source.includes(text)).map(([, , name]) => `forbidden: ${name}`),
];

if (failures.length) {
  console.error("Landing release audit failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Landing release audit passed: public claims match the current closed-beta scope.");
