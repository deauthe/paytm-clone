import { SendCard } from "@/components/SendCard";
import Link from "next/link";
import React from "react";

type Props = {};

const P2PPage = (props: Props) => {
	return (
		<div className="w-full flex flex-col gap-10 items-center justify-center">
			<SendCard />
			<div className=" opacity max-w-5xl mx-auto flex flex-col gap-3">
				<div className="text-yellow-500 italic">
					this only works if you have enough money in your wallet, add test
					money here{" "}
				</div>

				<Link
					href={"/dashboard"}
					className=" text-black hover:text-lg transition-all duration-150 mx-auto bg-white p-4 rounded-2xl hover:bg-black/20"
				>
					Add money in wallet
				</Link>
			</div>
		</div>
	);
};

export default P2PPage;
