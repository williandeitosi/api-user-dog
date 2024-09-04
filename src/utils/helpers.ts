import { prisma } from "../../prisma/client";

export const emailExists = async (email: string ): Promise<boolean> => {
  const user = await prisma.user.findUnique({where: {email}})
  return user !== null;
}