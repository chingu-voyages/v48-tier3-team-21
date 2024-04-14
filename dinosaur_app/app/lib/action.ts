"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignUpDataType } from "./definitions";
import { createNewUserAccount, db, isUserRegistered } from "./database";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import { unstable_noStore } from "next/cache";

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
        const requestSuccess = await requestEmailConfirmation(
          String(formData.get("email"))
        );

        if (requestSuccess) {
          redirect(`/login/confirmation?email=${formData.get("email")}`);
        } else {
          return "Sign Up Failed try again Later.";
        }
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

export async function requestEmailConfirmation(unverifiedEmail: string) {
  unstable_noStore();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Digging-into-Dinosaurs Authentication" <no-reply.digging-into-dinosaurs@gmail.com>`, // sender address
      replyTo: "",
      sender: "no-reply.digging-into-dinosaurs@gmail.com>",
      to: `${unverifiedEmail}`,
      subject: `Verify Your Email Address | Digging Into Dinosaurs`, // Subject line
      html: `
      <html lang="en">
      <body style=" margin-top: 50px; background-color: darkgray; color: black; padding: 0 auto; max-width: 700px; display: flex; flex-direction: column; align-items: center;
 gap: 4;" >
          <img src="https://digging-into-dinosaurs.vercel.app/dino_icon.svg" alt="" style="width: 150px; height: 150px; border-radius: 20%;">
      
          <h1>Digging Into Dinosaurs</h1>
      
          <br />
      
          <p>You are seeing this email because you are required to confirm your account creation by verifing your email address. To proceed click the link below: </p>
          <br />
          <a href="${process.env.NEXTAUTH_URL}/login/confirmation/verify?email=${unverifiedEmail}" target="_blank" style="background-color: rgb(247, 184, 113); padding: 12px; border-radius: 20px; color: white; font-size: small; font-weight: bold;">Verify Email</a>

          <br />
          <p>Or verify by clicking the link: <a href="${process.env.NEXTAUTH_URL}/login/confirmation/verify?email=${unverifiedEmail}" target="_blank">https://digging-into-dinosaurs.vercel.app/login/confirmation/verify?email=${unverifiedEmail}<a/><p/>
          <br />
      
          <h2>About Digging Into Dinosaurs App</h2>
          <p>Dinosaurs first appeared between 247 and 240 million years ago. They ruled the Earth for about 175 million years until an extinction event 65.5 million years ago wiped out all of them, except for the avian dinosaurs. Scientists don't agree entierly on what happened, but the extinction likely was a double or triple whammy involving an asteroid impact, chocking chemicals from erupting volcanoes, climate change and possibly other factors. Utilizing data from public sources like Kaggle & Tableau, we've created an interactive website for all the fun facts we found in the data about dinosaurs! See where and when they lived, what they ate, and individual dinosaur facts! When you're done, be sure and visit the American Museum of Natural History for more fun dinosaur facts.</p>
      
          <br />
          <hr style="background-color: white; width: 100%;" />
          <div style=" width: 100%; margin-top: 10px; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
              <span style="font-weight: bold;">Digging Into Dinosaurs</span>
              <a href="${process.env.NEXTAUTH_URL}/extras/privacy-policy" target="_blank">Privacy Policy</a>
              <a href="${process.env.NEXTAUTH_URL}/extras/terms-of-use" target="_blank">Terms of Use</a>
              <p style="display: flex; flex-direction: row; align-items: center;">
                  &copy;
                  <span id="current-year"></span>
              </p>
          </div>
      </body>
      <script>
       const currentYear = new Date().getFullYear();
       document.getElementById("current-year").innerText = currentYear;
      </script>
      </html>`,
    });

    if (info.accepted) {
      return true;
    } else if (info.rejected) {
      return false;
    }
  } catch (error) {
    console.log("sendEmail function failed: ", error);
    return false;
  }
}

export async function verifyAccount(unverifiedEmail: string) {
  try {
    const result = await db.user.findUnique({
      where: {
        email: unverifiedEmail,
      },
    });

    if (result) {
      const confirmation = await db.user.update({
        where: {
          email: unverifiedEmail,
        },
        data: {
          emailVerified: true,
        },
      });

      if (confirmation) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("Failed to verify Account: ", error);
    return false;
  }
}
