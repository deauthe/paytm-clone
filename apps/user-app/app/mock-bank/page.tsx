"use client";

import Transactions from "./displayTransactions";
import MockForm from "./mockForm";

type Props = {};

const MockBankPage = (props: Props) => {
	return (
		<div className="flex flex-col gap-10">
			<Transactions />
		</div>
	);
};

export default MockBankPage;
