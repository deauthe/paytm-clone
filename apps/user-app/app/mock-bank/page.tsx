"use client";

import Transactions from "./displayTransactions";
import MockForm from "./mockForm";

type Props = {};

const MockBankPage = (props: Props) => {
	return (
		<div className="flex flex-col lg:grid grid-cols-2 gap-10 xl:mx-20 md:mx-10 mt-5">
			<Transactions />
			{/* //TODO: Add a form to submit transactions, check this folder only, figure out client and server components */}
			<MockForm />
		</div>
	);
};

export default MockBankPage;
