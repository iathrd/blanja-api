// common/types/auth.type.ts
export type SafeUser = {
  id: string;
  email: string;
  name: string;
  phone_number: string;
  profile_picture: string | null;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
};
