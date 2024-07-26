import { prisma } from "@/lib/prismaClient";

export const createOrUpdateUser = async (id: string) => {
	const user = await prisma.user.upsert({
		where: { clerkUserId: id },
		update: { clerkUserId: id },
		create: { clerkUserId: id },
	});

	return user;
};

export const deleteUser = async (id: string) => {
	const user = await prisma.user.delete({
		where: { clerkUserId: id },
	});

	return user;
};
