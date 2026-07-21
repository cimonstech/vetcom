/**
 * Site imagery under /public/main.
 * Prefer these paths everywhere instead of hardcoding filenames.
 */
export const siteImages = {
  /** Full wordmark — black background (use on dark surfaces or with a light plate). */
  logo: "/main/vetcomlogo.png",
  /** Full wordmark — white background (header, login, light chrome). */
  logoOnLight: "/main/vetcomlogo.jpeg",
  favicon: "/main/favicon.ico",
  icon: "/main/vetcomicon.png",

  homeHero: "/main/vetcom-home-hero.jpg",

  aboutHero: "/main/lady-engineer.jpg",
  servicesHero: "/main/telecom-infrastructure.jpg",
  industriesHero: "/main/telecom.jpg",
  blogHero: "/main/computer-system.jpg",
  contactHero: "/main/vsat-near-building.jpg",

  aboutPreview: "/main/lady-engineer.jpg",
  whyChooseUs: "/main/telecomMast.jpg",
  contactTeaser: "/main/serverroom.jpg",
  coreValues: "/main/telecom.jpg",
  power: "/main/powersolutions.jpg",

  telecom: "/main/telecom-infra.jpg",
  telecomMast: "/main/tecom-mast.jpg",
  ict: "/main/network-servers-on-rack.jpg",
  dataCentre: "/main/serverroom.jpg",
  fieldWork: "/main/lady-engineer.jpg",
  workspace: "/main/pexels-treedeo-5385525.jpg",
  operations: "/main/pexels-divinetechygirl-1181332.jpg",
  vsat: "/main/vsat-near-building.jpg",
} as const;

/** Hero backgrounds for inner pages keyed by route segment. */
export const pageHeroImages = {
  about: siteImages.aboutHero,
  services: siteImages.servicesHero,
  industries: siteImages.industriesHero,
  blog: siteImages.blogHero,
  contact: siteImages.contactHero,
} as const;

/** Optional imagery for service category blocks. */
export const serviceImages: Record<string, string> = {
  "telecom-infrastructure": siteImages.telecom,
  "ict-solutions": siteImages.ict,
  "nca-regulatory": siteImages.workspace,
  "security-solutions": siteImages.dataCentre,
  "power-solutions": siteImages.power,
  "equipment-supply": siteImages.vsat,
  "managed-services": siteImages.operations,
  consultancy: siteImages.fieldWork,
};
