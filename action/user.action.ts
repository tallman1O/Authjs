"use server";

import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";

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
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
    redirect("/login");
  }

  const hashedPassword = await hash(password, 12);

  await User.create({ firstName, lastName, email, password: hashedPassword });
  console.log("User created successfully");
  redirect("/login");
};

export { register };
