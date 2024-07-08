import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../lib/auth";

type Props = {};

const Transactions = async (props: Props) => {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		return redirect("/api/auth/signin");
	}
	const transactions = await prisma.onRampTransaction.findMany({
		where: {
			userId: Number(session.user.id),
		},
		orderBy: {
			startTime: "asc",
		},
	});
	return (
		<div className="max-w-5xl mx-auto flex flex-col gap-3 p-4 rounded-3xl bg-black text-white">
			<div className="font-bold mx-auto w-fit">Transactions</div>
			<hr />
			<div className="flex flex-col gap-2">
				{transactions &&
					transactions.map((item, index) => {
						return (
							<div className="w-full flex flex-col gap-1">
								<div className="w-max grid grid-cols-3 " key={index}>
									<div className="mx-auto">{item.token}</div>
									<div className="mx-auto">{item.amount}</div>
									<div className="mx-auto">{item.userId}</div>
									<div className="mx-auto">
										{item.startTime.toLocaleTimeString()}
									</div>
									<div
										className={`mx-auto font-bold uppercase ${item.status === "Success" && "text-green-500"}
                                    ${item.status === "Failure" && "text-red-500"}
                                    ${item.status === "Processing" && "text-yellow-500"}`}
									>
										{item.status}
									</div>
								</div>
								<hr />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Transactions;
