const productTargets = ['ladies', 'men', 'kids', 'home'] as const;

type ProductTarget = (typeof productTargets)[number];

export { productTargets };
export type { ProductTarget };
