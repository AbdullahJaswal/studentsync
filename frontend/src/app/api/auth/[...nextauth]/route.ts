/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth, {NextAuthOptions, Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {jwtDecode} from "jwt-decode";
import {OAuthConfig} from "next-auth/providers/oauth";

type AuthenticateBodyType = {
  access_token: string,
  id_token: string,
}


async function authenticate(provider: string, body: AuthenticateBodyType) {
  return await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/${provider}/`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {"Content-Type": "application/json"},
  });
}

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/token/refresh/`, {
      method: "POST",
      body: JSON.stringify({refresh: token.refresh}),
      headers: {"Content-Type": "application/json"},
    });

    const refreshedToken = await res.json();

    if (res.status !== 200) throw refreshedToken;

    const decoded: any = jwtDecode(refreshedToken.access);

    return {
      ...token,
      access: refreshedToken.access,
      access_expiration: decoded.exp * 1000,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      idToken: true,
    }) as OAuthConfig<any>,  // Ensure that the type aligns with OAuthConfig
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: "Email", type: "email", placeholder: "email"},
        password: {label: "Password", type: "password", placeholder: "password"}
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/login/`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {"Content-Type": "application/json"},
          });
          const token = await res.json();

          if (res.ok && token) {
            const decoded: any = jwtDecode(token.access);
            token.access_expiration = decoded.exp * 1000;
            return token;
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }) as any,
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}: any) {
      try {
        let res: any;

        if (account.provider === "google") {
          res = await authenticate(account.provider, {
            access_token: account.access_token,
            id_token: account.id_token,
          });
        } else if (account.provider === "credentials") {
          return true;
        } else {
          return false;
        }

        const token = await res.json();

        if (res.status !== 200) throw token;

        if (res.ok && token) {
          const decoded: any = jwtDecode(token.access);
          token.access_expiration = decoded.exp * 1000;

          user.access = token.access;
          user.access_expiration = token.access_expiration;
          user.refresh = token.refresh;
          user.user = token.user;

          return true;
        }

        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({token, user, account, profile, isNewUser, trigger, session}: any) {
      if (trigger === "update" && session.first_name && session.last_name) {
        token.user.first_name = session.first_name;
        token.user.last_name = session.last_name;
      }

      if (token && token.user) {
        token.role = token.user.user_type;
      }

      if (user) {
        return user;
      }

      if (Date.now() < token.access_expiration) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({session, user, token}: { session: Session; user: any; token: any }) {
      session.user = token.user;
      session.access = token.access;
      session.access_expiration = token.access_expiration;
      session.refresh = token.refresh;

      return session;
    },
    async redirect({url, baseUrl}: any) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt" as const,  // Ensure correct typing for strategy
    maxAge: 60 * 60 * 12, // 12 hours
  },
  events: {
    async signOut({token}: any) {
      try {
        const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/auth/logout/`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
        });

        if (res.status !== 200) throw new Error("Failed to log out on the backend");
      } catch (error) {
        console.error("Backend logout error:", error);
      }
    },
  },
  pages: {
    signIn: "/",
    error: "/error",
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
