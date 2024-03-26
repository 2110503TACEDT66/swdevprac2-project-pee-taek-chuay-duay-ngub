import { type NextAuthOptions, getServerSession } from "next-auth";
import { encode, decode } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse, type GetServerSidePropsContext } from "next/types";
import { env } from "@/env";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import { callInternAPI, InternApiRoutes } from "@/utils/routing";
// mongo adapter
type Roles = 'user' | 'admin' | 'company';
type ReturnedUserData = {
    id: string;
    name: string;
    telephoneNumber: string;
    email: string;
    role: Roles;
    company?: string;
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
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    telephoneNumber: result.user.telephoneNumber,
                    role: result.user.role,
                    company: result.user.company,
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
    callbacks: {
        async jwt({ token, user }) {
            console.log('---- jwt ------');
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.telephoneNumber = user.telephoneNumber;
                token.role = user.role;
                token.company = user.company;
            }
            console.log('token:', token);
            console.log('user:', user);
            return token;
        },
        async session({ session, token }) {
            console.log('---- session ------');
            console.log('session old:', session);
            console.log('token:', token);
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.telephoneNumber = token.telephoneNumber as string;
                session.user.role = token.role as string;
                session.user.company = token.company as string | undefined;
            }
            console.log('session new:', session);
            return session;
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
// Use it in server contexts
export function getServerAuthSession(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
  }

export default authOptions;
