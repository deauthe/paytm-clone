"use client ";
import { Button } from "@repo/ui/button";
import React, { useState } from "react";

function MockForm() {
	const [token, setToken] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [userIdentifier, setUserIdentifier] = useState<string>("");
	const [error, setError] = useState<string | null>("");
	const mockWebHook = async () => {
		try {
			setError(null);
			const mockBankServiceUrl = "http://localhost:3003/hdfcWebhook";
			const res = await fetch(mockBankServiceUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token,
					amount,
					user_identifier: userIdentifier,
				}),
			});
			const result = await res.json();
			if (Number(result.status) >= 400) {
				setError(result.message);
				return;
			}
			console.log(result);
			window.location.href = "/";
		} catch (error) {
			setError(String(error));
			console.log(error);
		}
	};
	return (
		<div className="flex flex-col gap-5 max-w-4xl p-2 mx-auto justify-center">
			<input
				type="text"
				className="p-4 place-content-center place-items-center rounded-md focus:ring-black focus:ring-2 focus:ring-opacity-25"
				onChange={(val) => {
					setToken(val.target.value);
				}}
				placeholder="token"
			/>
			<input
				type="number"
				className="p-4 place-content-center place-items-center rounded-md focus:ring-black focus:ring-2 focus:ring-opacity-25"
				placeholder="amount"
				onChange={(val) => setAmount(Number(val.target.value))}
			/>
			<input
				type="text"
				className="p-4 place-content-center place-items-center rounded-md focus:ring-black focus:ring-2 focus:ring-opacity-25"
				placeholder="user identifier"
				onChange={(val) => setUserIdentifier(val.target.value)}
			/>
			<Button
				className="bg-black text-white rounded-full p-2"
				onClick={mockWebHook}
			>
				mock webHook
			</Button>{" "}
			{error && <p className="text-red-500">{error}</p>}
			<p className="text-red-500 opacity-80">
				{" "}
				{`doing this means that you are authorising the payment on the bank's behalf and telling it to the merchant app that
				 the user has paid and you can allow access to the features you promised for for the respectiove payment !`}
			</p>
		</div>
	);
}

export default MockForm;
