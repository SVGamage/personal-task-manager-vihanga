import prisma from "@/lib/prisma";

export const getUserByClerkId = async (clerkUserId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
