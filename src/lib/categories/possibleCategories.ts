export const POSSIBLE_CATEGORY_KEYS = [
  "news",
  "fashion",
  "fitness",
  "diy",
  "infographics",
  "listicles",
  "case_study",
  "interviews",
  "business",
  "romance",
  "other",
] as const;

export type PossibleCategoryKey = (typeof POSSIBLE_CATEGORY_KEYS)[number];
