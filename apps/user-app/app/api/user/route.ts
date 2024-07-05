import { NextResponse } from "next/server";
import db from "@repo/db/client";

export const GET = async () => {
	await db.user.create({
		data: {
			email: "who",
			number: "23",
			password: "123",
		},
	});
	return NextResponse.json({
		message: "hi there",
	});
};
