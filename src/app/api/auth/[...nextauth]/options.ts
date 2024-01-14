import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import bcrypt from "bcryptjs";
import User from "@/models/user";
import { html, text } from "@/lib/utils";
import clientPromise from "@/lib/mongodbConnection";
import { Adapter } from "next-auth/adapters";
import dbConnect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      // add a role in profile
      profile(profile) {
        // console.log("Github profile", profile);

        let userRole = "Github User";
        if (profile?.email === "ed828a@gmail.com") {
          userRole = "admin";
        }
        const image = profile?.avatar_url;
        return {
          ...profile,
          role: userRole,
          image: image,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // add a role
      profile(profile) {
        // console.log("Google profile", profile);

        let userRole = "Google User";
        if (profile?.email === "ed828a@gmail.com") {
          userRole = "admin";
        }

        const emailVerified = profile.email_verified;

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
          emailVerified: emailVerified,
          image: profile.picture,
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          type: "OAuth2",
          user: process.env.GOOGLE_USER_EMAIL,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
          accessToken: process.env.GOOGLE_ACCESS_TOKEN,
          expires: new Date().getTime(), // this will request a new token each time so that it never expires. google allows up to 10,000 requests per day for free.
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60,
      async sendVerificationRequest({
        //THIS IS FOR EMAIL CUSTOMIZATION
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Login to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email }),
        });
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "UserEmail", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // This is authentication place
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          await dbConnect();
          const foundUser = await User.findOne({ email: credentials?.email })
            // .lean()
            .exec();
          console.log("foundUser", foundUser);

          if (foundUser) {
            if (!foundUser.password) {
              // this call auto generates a salt
              const hashPassword = await bcrypt.hash(
                credentials?.password!,
                10
              );
              const updatedUser = await User.findOneAndUpdate(
                { email: credentials?.email },
                { password: hashPassword },
                { new: true }
              );
              delete updatedUser.password;
              return updatedUser;
            }

            const isMatched = await bcrypt.compare(
              credentials?.password as string,
              foundUser.password
            );

            if (isMatched) {
              delete foundUser.password;
              let jsonObj = JSON.parse(JSON.stringify(foundUser));

              console.log("jsonObj.emailVerified =", jsonObj.emailVerified);
              console.log("jsonObj", jsonObj);
              console.log(
                "Type of jsonObj.emailVerified:",
                typeof jsonObj.emailVerified
              );

              if (
                (jsonObj.emailVerified || foundUser.email_verified) &&
                !foundUser.role
              ) {
                foundUser["role"] = "Email User";
              } else {
                foundUser["role"] = "Unverified Email";
              }

              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }

        // If you return null then a generic error will be displayed advising the user to check their details
        return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // the Error will be catched by default error page(/api/auth/error) or error route you set on in pages section
        // throw new Error("Something went wrong!");
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("signIn callback: ", {
      //   user,
      //   account,
      //   profile,
      //   email,
      //   credentials,
      // });
      return true;
    },
    async redirect({ url, baseUrl }) {
      // the returned url is the url that after the user successfully logs in, the app redirects users to.
      return baseUrl;
    },

    async jwt({ token, user, trigger, session }) {
      // console.log("authOptions callback jwt: ", {
      //   token,
      //   user,
      //   trigger,
      //   session,
      // });

      // this is the case of signin
      if (user && (trigger === "signIn" || trigger === "signUp")) {
        // console.log("user.image", user.image);
        if (user.image) {
          token.image = user.image;
        }
        // pass the role from user to token
        return {
          ...token,
          role: user.role,
        };
      }

      // case of update session
      if (trigger === "update" && session?.image) {
        token.image = session.image;
        token.picture = session.image;
      }

      return token;
    },

    async session({ session, token, user }) {
      // console.log("authOptions callback session: ", { session, token, user });
      // for client to use role
      if (session?.user)
        return {
          ...session,
          user: {
            ...session.user,
            role: token.role,
            image: token.image,
          },
        };

      return session;
    },
  },

  events: {},
  debug: true,
};
