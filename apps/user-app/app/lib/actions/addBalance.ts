"use server";
import db from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export async function addBalance({ amount }: { amount: number }) {
	const session = await getServerSession(authOptions);
	if (!session) throw new Error("Not authenticated");
	const userId = Number(session.user.id);
	console.log("userId: ", userId);

	amount = Math.floor(Math.abs(amount)) * 100; // Ensure the amount is positive
	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			Balance: true,
		},
	});

	if (!user) throw new Error("User not found");

	const newBalance = await db.balance.update({
		where: {
			userId,
		},
		data: {
			amount: {
				increment: amount,
			},
		},
	});

	console.log("new balance :", newBalance);

	return newBalance;
}
