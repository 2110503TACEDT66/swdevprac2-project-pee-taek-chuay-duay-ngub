import { type NextAuthOptions, getServerSession } from "next-auth";
import { encode, decode } from "next-auth/jwt";
import { type GetServerSidePropsContext } from "next/types";
import { env } from "@/env";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./db/mongo_db";
import Credentials from "next-auth/providers/credentials";
// mongo adapter

type ReturnedUserData = {
    id: string;
    username: string;
    email: string;
    verified: boolean;
};

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
                if (credentials.username === "admin@mail.com" && credentials.password === "admin") {
                    return {
                        id: "admin",
                        email: "admin@mail.com",
                        name: "Admin",
                    };
                }
                const client = await clientPromise;
                const user = await client.db().collection("users").findOne({
                    email: credentials.username,
                    password: credentials.password
                });
                if (user && (user.password as string) === credentials.password) {
                    return {
                        id: (user._id as unknown as string),
                        username: user.username as string,
                        email: user.email as string,
                    };
                }
                else {
                    return null;
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