/// <reference types="vite/client" />

export interface signInData {
  email: string;
  password: string;
}

export interface signUpData extends signInData {
  name: string;
}
