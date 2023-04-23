/// <reference types="vite/client" />

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData extends SignInData {
  name: string;
}

export interface FacebookSignInData {
  facebookId: string;
}

export interface FacebookResponse {
  id: string;
  email: string;
  name: string;
}

export interface GoogleSignInData {
  access_token: string;
}

export interface OAuthSignUpData {
  email: string;
  name: string;
  facebookId: string | null;
  googleId: string | null;
}

export interface OAuthUserData extends OAuthSignUpData {
  id: number;
  isPwdSet: boolean;
}

export interface UpdatedProfile {
  name?: string;
  email?: string;
  facebookId?: string | null;
  access_token?: string | null;
}

export interface UpdatedPassword {
  currentPwd: string;
  newPwd: string;
  confirmPwd: string;
}

export interface NewRestaurant {
  name: string;
  address: string;
  phone: string;
}

export interface RestaurantRecord extends NewRestaurant {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
