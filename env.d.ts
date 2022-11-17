/// <reference types="vite/client" />

export interface signInData {
  email: string;
  password: string;
}

export interface signUpData extends signInData {
  name: string;
}

export interface facebookSignInData {
  email: string;
  name: string;
}

export interface facebookSignInResponse extends facebookSignInData {
  id: number;
}
