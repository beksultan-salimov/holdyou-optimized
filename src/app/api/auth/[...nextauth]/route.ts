import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ account }) {
            if (account?.provider === 'google' && account.id_token) {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/google/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_token: account.id_token }),
                });
            }
            return true;
        },
        async jwt({ token, account }) {
            if (account?.id_token) {
                token.id_token = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id_token) {
                session.id_token = token.id_token;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
