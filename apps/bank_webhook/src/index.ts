import express from "express";
import db from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
	//Add zod validation
	//HDFC bank should ideally send us a secret so we know this is sent by them
	const paymentInformation: {
		token: string;
		userId: string;
		amount: string;
	} = {
		token: req.body.token,
		userId: req.body.user_identifier,
		amount: req.body.amount,
	};

	try {
		await db.$transaction([
			db.balance.updateMany({
				where: {
					userId: Number(paymentInformation.userId),
				},
				data: {
					amount: {
						// You can also get this from your DB
						increment: Number(paymentInformation.amount),
						//make sure to use the increment function otherise, concurrent transactions may
						//may display unwanted results
					},
				},
			}),
			db.onRampTransaction.updateMany({
				where: {
					token: paymentInformation.token,
				},
				data: {
					status: "Success",
				},
			}),
		]);

		res.status(200).json({
			message: "Captured",
		});
		//what you send back is really important here as this route would be used by
		//bank agents to tell you that the payment has been successfull. And this route is basically
		//letting the user who has paid use you services.
		//now if any of the transactions fail, you need to tell the bank that it happened
		//so that they can refund the user.
		//we tell the bank so by sending a 411 status code as below
	} catch (e) {
		console.error(e);
		res.status(411).json({
			message: "Error while processing webhook",
		});
	}
});

app.listen(3003);
