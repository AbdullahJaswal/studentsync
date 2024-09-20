import {DefaultSession} from "next-auth"
import {DefaultJWT} from "@auth/core/jwt";

declare module "next-auth" {
  // Extend session to hold the access_token
  interface Session {
    access: string & DefaultSession,
    access_expiration: number & DefaultSession,
    refresh: string & DefaultSession
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    access: string & DefaultJWT,
    access_expiration: number & DefaultJWT,
    refresh: string & DefaultJWT,
  }
}
