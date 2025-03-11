import { Review } from '@/components/reviews/types';

interface IUser {
  email: string;
  id: string;
  image: null | string;
  name: string;
  password: string;
  provider: null | string;
  providerId: null | string;
  reviews: Review[];
}

export type { IUser };
