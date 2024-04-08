"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignUpDataType } from "./definitions";
import { createNewUserAccount, isUserRegistered } from "./database";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    if (formData.get("email")) {
      await signIn("credentials", formData);
    } else {
      await signIn("google");
    }
  } catch (error) {
    if (error instanceof AuthError && error.type == "CredentialsSignin") {
      return "Invalid credentials.";
    } else if (error instanceof AuthError) {
      return "Something went wrong.";
    }
    throw error;
  }
}

export async function new_signup(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    if (formData.get("email")) {
      const signUpData: SignUpDataType = {
        email: String(formData.get("email")),
        firstname: String(formData.get("firstname")),
        lastname: String(formData.get("lastname")),
        password: String(formData.get("password")),
      };

      const userExists = await isUserRegistered(signUpData.email);

      if (userExists) {
        return "Email already taken.";
      }

      const confirmation = await createNewUserAccount(signUpData);

      if (confirmation) {
        const decodedUrl = new URL(
          decodeURIComponent(String(formData.get("callbackUrl")))
        );
        const callbackUrl = decodedUrl.searchParams.get("callbackUrl");

        redirect(String(callbackUrl));
      } else {
        return "Sign Up Failed try again Later.";
      }
    } else {
      await signIn("google");
    }
  } catch (error) {
    if (error instanceof AuthError && error.type == "CredentialsSignin") {
      return "Invalid credentials.";
    } else if (error instanceof AuthError) {
      return "Something went wrong.";
    }
    throw error;
  }
}
