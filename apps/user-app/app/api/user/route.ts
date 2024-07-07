import { NextResponse } from "next/server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async () => {
	const session = await getServerSession(authOptions);
	//TODO: find out why does this prop need authOptions
	if (session.user) {
		return NextResponse.json({
			user: session.user,
		});
	}
	return NextResponse.json(
		{
			message: "You are not logged in",
		},
		{
			status: 403,
		}
	);
};
