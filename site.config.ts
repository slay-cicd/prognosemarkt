const siteConfig = {
  name: "Prognosemarkt",
  tagline: "Alles über Prognosemärkte",
  description: "Alles über Prognosemärkte — Fundierte Analysen, Strategien und Tipps.",
  url: "https://prognosemarkt.org",
  basePath: "",
  accentColor: "#7c3aed",
  ctaText: "Zu Atlas Markets →",
  ctaUrl: "https://atlasmarkets.de",
  ctaSubtext: "Europas führende Prediction-Market-Plattform",
  ogImage: "/og-image.png",
  twitterHandle: "@atlasmarkets",
  locale: "de_DE",
  networkSites: [
    { name: "Atlas Markets", url: "https://atlasmarkets.de" },
    { name: "Bundesliga Prognose", url: "https://bundesliga-prediction.de" },
    { name: "Fußball Vorhersage", url: "https://fussball-prognose.de" },
    { name: "Prediction Market Guide", url: "https://prediction-market-guide.de" },
    { name: "Sportwetten Alternative", url: "https://sportwetten-alternative.de" }
  ],
  imprintUrl: "/impressum",
  privacyUrl: "/datenschutz",
  company: "SLAY GmbH",
  postsPerPage: 9,
  featuredTag: "featured",
};
export default siteConfig;
export type SiteConfig = typeof siteConfig;
