import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "./user-service";

export const authenticateAndGetUser = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }

  const user = await getUserByClerkId(userId);
  return user;
};
