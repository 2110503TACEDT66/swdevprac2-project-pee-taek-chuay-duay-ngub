import { type NextAuthOptions, getServerSession } from "next-auth";
import { encode, decode } from "next-auth/jwt";
import { type GetServerSidePropsContext } from "next/types";
import { env } from "@/env";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import { callInternAPI, InternApiRoutes } from "@/utils/routing";
// mongo adapter
type Roles = 'user' | 'admin' | 'company';
type ReturnedUserData = {
    _id: string;
    name: string;
    telephoneNumber: string;
    email: string;
    role: string;
}

interface Response {
    success: boolean;
    user: ReturnedUserData;
}

const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                console.log(credentials);
                const result: Response = await callInternAPI(
                    InternApiRoutes.PostLoginUser,
                    'POST',
                    {
                        email: credentials.email,
                        password: credentials.password,
                    }
                )
                if (!result.success || !result.user) {
                    return null;
                }
                console.log('Sucessful login:', result);
                return {
                    id: result.user._id,
                    name: result.user.name,
                    email: result.user.email,
                    telephoneNumber: result.user.telephoneNumber,
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
        signIn: "/auth/signin",
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
