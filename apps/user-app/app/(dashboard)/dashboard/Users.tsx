"use server";
import db from "@repo/db/client";

export async function Users() {
	const users = await db.user.findMany({
		include: {
			Balance: true,
		},
	});
    
	users.map((user) => {
		user.Balance.map((balance) => {
			balance.amount = balance.amount;
		});
	});
}
