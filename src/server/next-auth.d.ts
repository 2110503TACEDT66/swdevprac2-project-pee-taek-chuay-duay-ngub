import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      id: string
      name: string
      email: string
      telephoneNumber: string
      role: string
    }
  }

  // returned user after login
  interface User {
    id: string
    name: string
    email: string
    telephoneNumber: string
    role: string
  }

  interface token {
    id: string
    name: string
    email: string
    telephoneNumber: string
    role: string
  }
}