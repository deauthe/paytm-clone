"use client";
import { p2pTransfer } from "@/app/lib/actions/p2pTransfer";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textInput";

import { useState } from "react";

export function SendCard() {
	const [id, setId] = useState("");
	const [amount, setAmount] = useState("");
	const [message, setError] = useState("");

	const transferFunds = async (to: string, amount: number) => {
		let { error, message } = await p2pTransfer(to, amount * 100);
		if (error) setError(error);
		if (message) setError(message);
	};

	return (
		<div className="items-center">
			<Center>
				<Card title="Send">
					<div className="min-w-72 pt-2">
						<TextInput
							placeholder={"To: 'User id'"}
							label="User id"
							onChange={(value) => {
								setId(value);
							}}
						/>
						<TextInput
							placeholder={"Amount"}
							label="Amount"
							onChange={(value) => {
								setAmount(value);
							}}
						/>
						<div className="pt-4 flex justify-center">
							<Button
								className="bg-black text-white p-2 rounded-md"
								onClick={() => {
									setError("");

									transferFunds(id, Number(amount));
								}}
							>
								Send
							</Button>
						</div>
						{message && (
							<div className="pt-4 flex justify-center italic text-sm">
								{message}
							</div>
						)}
					</div>
				</Card>
			</Center>
		</div>
	);
}
