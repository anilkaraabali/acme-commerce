import { NestedKeyOf, useTranslations } from 'next-intl';

type DynamicTranslationKey = NestedKeyOf<
  Parameters<ReturnType<typeof useTranslations>>[0]
>;

export type { DynamicTranslationKey };
