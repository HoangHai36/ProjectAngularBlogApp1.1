import { Profile } from './profile.interface';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}