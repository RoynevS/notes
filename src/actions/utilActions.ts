"use server";

import { redirect } from "next/navigation";

const redirectPath = async (path: string) => {
  redirect(path);
};

export { redirectPath };
