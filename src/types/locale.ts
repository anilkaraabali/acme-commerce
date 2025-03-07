const localeTypes = ['en'] as const;

type LocaleType = (typeof localeTypes)[number];

export type { LocaleType };
export { localeTypes };
