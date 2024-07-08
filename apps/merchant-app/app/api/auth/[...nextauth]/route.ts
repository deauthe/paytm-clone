import { authOptions } from "../../../lib/auth";
import NextAuth from "next-auth";

//TODO:fix type inference later from nextauth
//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
