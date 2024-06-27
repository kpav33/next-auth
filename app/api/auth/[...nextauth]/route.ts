// Dynamic route, catch all route for next-auth

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// https://next-auth.js.org/providers/ => See all available providers
// Check next-fireship on how to use Prisma adapter with Neon database

const handler = NextAuth({
  // Provider is a specific way of authentication
  providers: [
    // Basic with username and password provider
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      //   async authorize(credentials, req) {
      //     // Add logic here to look up the user from the credentials supplied
      //     const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

      //     if (user) {
      //       // Any object returned will be saved in `user` property of the JWT
      //       return user;
      //     } else {
      //       // If you return null then an error will be displayed advising the user to check their details.
      //       return null;

      //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      //     }
      //   },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  // session: {
  //   strategy: "jwt"
  // }
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       return { ...token, ...user };
  //     },

  //     // inside session we can keep the authenticated user object
  //     async session({ session, token }) {
  //       session.user = token as any;
  //       return session;
  //     },
  //   },
});

// With this we can have next-auth api handler inside the app directory, so every GET and POST request to this api route will be handled by next-auth
export { handler as GET, handler as POST };
