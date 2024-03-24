import { type NextAuthOptions, getServerSession } from "next-auth";
import { encode, decode } from "next-auth/jwt";
import { type GetServerSidePropsContext } from "next/types";
import { env } from "@/env";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./db/mongo_db";
import Credentials from "next-auth/providers/credentials";
import { callInternAPI, InternApiRoutes } from "@/utils/routing";
// mongo adapter
type Roles = 'user' | 'admin' | 'company';
type ReturnedUserData = {
    _id: string;
    name: string;
    telephoneNumber: string;
    email: string;
    role: Roles;
}

interface Response {
    success: boolean;
    user: ReturnedUserData;
}

const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: env.MONGODB_URI,
    }),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const result: Response = await callInternAPI(
                    InternApiRoutes.PostLoginUser,
                    'POST',
                    {
                        email: credentials.username,
                        password: credentials.password,
                    }
                )
                if (!result.success || !result.user) {
                    return null;
                }
                return {
                    id: result.user._id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role,
                }
            }
        }),

    ],
    session: {
        strategy: "jwt",
    },
    secret: env.NEXTAUTH_SECRET,
    jwt: {
        encode: async ({ secret, token, maxAge }) => {
            return encode({ secret, token, maxAge });
        },
        decode: async ({ secret, token }) => {
            return decode({ secret, token });
        }
    },
    pages: {
        error: "/",
        // signIn: "/auth/login",
        newUser: "/auth/signup",
    },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};

export default authOptions;