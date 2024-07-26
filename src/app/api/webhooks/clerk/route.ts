import { type WebhookEvent } from "@clerk/nextjs/server";
import { type Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { createOrUpdateUser, deleteUser } from "@/services/user/user.service";

export async function POST(req: Request) {
	try {
		const evt = (await req.json()) as WebhookEvent;

		const { id: clerkUserId } = evt.data;

		if (!clerkUserId) {
			return NextResponse.json({ error: "No Clerk user ID provided" }, { status: 400 });
		}

		let user: Prisma.UserCreateInput | null = null;

		switch (evt.type) {
			case "user.created":
				user = await createOrUpdateUser(clerkUserId);
				break;
			case "user.deleted":
				user = await deleteUser(clerkUserId);
				break;
			default:
				break;
		}

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
