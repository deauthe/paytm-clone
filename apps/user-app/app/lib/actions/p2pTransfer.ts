"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { connect } from "http2";

export async function p2pTransfer(to: string, amount: number) {
	const session = await getServerSession(authOptions);
	const from = session?.user?.id;
	if (!from) {
		return {
			error: "current user not found ",
		};
	}
	const toUser = await prisma.user.findFirst({
		where: {
			number: to,
		},
	});

	if (!toUser) {
		return {
			error: "User not found",
		};
	}

	//the below has to be a transaction as tio respect atomicity
	const { error, message } = await prisma.$transaction(async (tx) => {
		// Send two requests in two tabs and see if you are able to receive negative balances?
		await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
		//becuase of the above line, it locks the current row being worked on, This ensures that the current transaction being
		//processed is the only one that can modify the row. This prevents race conditions where multiple transactions try to modify the same row simultaneously.
		//consider a scenario where two transactions are trying to update the same row at the same time. Without the FOR UPDATE clause, both transactions would read the same initial value of the row, and then both would update the row with the new value. This would result in one of the updates being overwritten by the other.
		//or conditions like when a user tries to run the same transaction twice without waiting, It checks concurrently that the user has enough balance for one transaction, but it happens twice resulting in a negative balance

		const fromBalance = await tx.balance.findUnique({
			where: { userId: Number(from) },
		});
		if (!fromBalance || fromBalance.amount < amount) {
			return { error: "insufficient funds" };
		}

		await tx.balance.update({
			where: { userId: Number(from) },
			data: { amount: { decrement: amount } },
		});

		await tx.balance.update({
			where: { userId: toUser.id },
			data: { amount: { increment: amount } },
		});

		await tx.p2pTransfer.create({
			data: {
				amount,
				timestamp: new Date(),
				fromUserId: Number(from),
				toUserId: toUser.id,
			},
		});
		return {
			message: `successfull transaction, added ${amount} to userId ${toUser.id} from ${from}`,
		};
	});
	return { error, message };
}
