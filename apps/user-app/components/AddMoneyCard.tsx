"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { createOnRampTransaction } from "@/app/lib/actions/createOnrampTransaction";
import { useRouter } from "next/navigation";

const SUPPORTED_BANKS = [
	{
		name: "HDFC Bank",
		redirectUrl: "https://netbanking.hdfcbank.com",
	},
	{
		name: "Axis Bank",
		redirectUrl: "https://www.axisbank.com/",
	},
];

export const AddMoney = () => {
	const [redirectUrl, setRedirectUrl] = useState(
		SUPPORTED_BANKS[0]?.redirectUrl
	);
	const router = useRouter();
	const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
	const [value, setValue] = useState(0);

	return (
		<Card title="Add Money">
			<div className="w-full">
				<TextInput
					label={"Amount"}
					placeholder={"Amount"}
					onChange={(value) => {
						setValue(Number(value));
					}}
				/>
				<div className="py-4 text-left">Bank</div>
				<Select
					onSelect={(value) => {
						setRedirectUrl(
							SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
						);
						setProvider(
							SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
						);
					}}
					options={SUPPORTED_BANKS.map((x) => ({
						key: x.name,
						value: x.name,
					}))}
				/>
				<div className="flex flex-col gap-3 pt-4">
					<Button
						className="bg-black text-white rounded-full p-2"
						onClick={async () => {
							await createOnRampTransaction(provider, value);
							router.push("/mock-bank");
						}}
					>
						Add Money Mock
					</Button>
					<Button
						className="bg-black text-white rounded-full p-2"
						onClick={async () => {
							await createOnRampTransaction(provider, value);
							window.location.href = redirectUrl || "";
						}}
					>
						Add Money Real
					</Button>
				</div>
			</div>
		</Card>
	);
};
