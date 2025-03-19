import { auth } from "@clerk/nextjs/server";
import UserService from "./user-service";

export const authenticateAndGetUser = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in");
  }

  const user = await UserService.getUserByClerkId(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
