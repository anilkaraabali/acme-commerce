type ProductReview = {
  content: string;
  createdAt: string;
  id: string;
  rating: number;
  userId: string;
};

type ProductReviewsMap = Record<string, ProductReview[]>;

export type { ProductReview, ProductReviewsMap };
