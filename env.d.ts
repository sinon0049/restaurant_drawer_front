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
