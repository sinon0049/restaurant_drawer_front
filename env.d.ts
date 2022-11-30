/// <reference types="vite/client" />

export interface signInData {
  email: string;
  password: string;
}

export interface signUpData extends signInData {
  name: string;
}

export interface facebookSignInData {
  facebookId: string;
}

export interface facebookResponse {
  id: string;
  email: string;
  name: string;
}

export interface googleSignInData {
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

export interface updatedProfile {
  name?: string;
  email?: string;
  facebookId?: string | null;
  access_token?: string | null;
}

export interface updatedPassword {
  currentPwd: string;
  newPwd: string;
  confirmPwd: string;
}
