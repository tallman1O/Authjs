"use server";

import { connectDB } from "@/lib/db";
import { user } from "@/models/user.model";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

const login = async (formdata: FormData) => {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  try {
    if (!email || !password) {
      throw new Error("Please fill all fields");
    }

    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (formdata: FormData) => {
  const firstName = formdata.get("firstname") as string;
  const lastName = formdata.get("lastname") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all fields");
  }

  await connectDB();

  //existing user
  const existingUser = await user.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 12);

  await user.create({ firstName, lastName, email, password: hashedPassword });
  console.log("User created successfully");
  redirect("/login");
};

export { register, login };
