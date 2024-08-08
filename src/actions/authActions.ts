"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

const register = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (password !== confirmPassword) {
    throw new Error("Passwords have to match");
  }

  if (!username || !email || !password) {
    throw new Error("Please fill out all fields");
  }

  if (
    await prisma.user.findUnique({
      where: {
        username,
      },
    })
  ) {
    throw new Error("Username already exists");
  }

  if (
    await prisma.user.findUnique({
      where: {
        email,
      },
    })
  ) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  redirect("/login");
};

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const loginError = error as CredentialsSignin;
    return loginError.cause;
  }
  redirect("/");
};

const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export { register, login, logout };
