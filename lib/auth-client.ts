import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient()

export const signUp = authClient.signUp
export const signIn = authClient.signIn
export const signOut = authClient.signOut
export const useSession = authClient.useSession