import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
	try {
		const session = await getServerSession(authOptions);
		if (!session) return { error: "user not authenticated" };

		const balance = await prisma.balance.findFirst({
			where: {
				userId: Number(session?.user?.id),
			},
		});
		console.log("balance is: ", balance);

		return {
			balance: {
				amount: balance?.amount || 0,
				locked: balance?.locked || 0,
			},
		};
	} catch (error) {
		console.log("couldnt get user balance");

		return {
			error: "couldn't get user balance",
		};
	}
}

async function getOnRampTransactions() {
	try {
		const session = await getServerSession(authOptions);
		if (!session) return { error: "user not authenticated" };
		const txns = await prisma.onRampTransaction.findMany({
			where: {
				userId: Number(session?.user?.id),
			},
		});

		if (!txns) return { error: "could not get transactions" };

		return {
			transactions: txns.map((t) => ({
				time: t.startTime,
				amount: t.amount,
				status: t.status,
				provider: t.provider,
			})),
		};
	} catch (error) {
		console.error("Error fetching on ramp transactions:", error);
		return {
			error: "Could not get on ramp transactions. Please try again later.",
		};
	}
}

export default async function () {
	const { balance, error: balanceError } = await getBalance();
	const { transactions, error: transactionError } =
		await getOnRampTransactions();

	return (
		<div className="w-screen">
			<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
				Transfer
			</div>
			{balanceError ||
				(transactionError && (
					<div className="text-8xl">
						<div className="text-red-500 opacity-80 italic text-left text-sm">
							{transactionError}
						</div>
						<div className="text-red-500 opacity-80 italic text-left text-sm">
							{balanceError}
						</div>
					</div>
				))}
			{balance && transactions && (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
					<div>
						<AddMoney />
					</div>
					<div>
						<BalanceCard amount={balance.amount} locked={balance.locked} />
						<div className="pt-4">
							<OnRampTransactions transactions={transactions} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
