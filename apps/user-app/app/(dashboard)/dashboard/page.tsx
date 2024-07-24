"use client";
import { addBalance } from "@/app/lib/actions/addBalance";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { useSession } from "next-auth/react";

export default function () {
	const session = useSession();

	const addTestMoney = async () => {
		if (!session?.data?.user) {
			console.log("please log in");
			return;
		}
		try {
			//@ts-ignore
			await addBalance({ amount: 2000 });
		} catch (error) {
			alert("Something went wrong: " + error);
		}
	};

	return (
		<div>
			<Center>
				<div className="flex flex-col gap-5 justify-center items-center ">
					<Button className="bg-black text-white" onClick={addTestMoney}>
						Add Test Money
					</Button>
				</div>
			</Center>
		</div>
	);
}
