import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import bcrypt from 'bcrypt';
import * as mongoose from "mongoose";
import { User } from "@/app/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({ email });

                console.log(user);
                const passwordOk = user && bcrypt.compareSync(password, user.password);

                if (passwordOk) {
                    return user;
                }

                return null
            },
        }),
        GoogleProvider({
            name: 'Google',
            id: 'google',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid email profile',
                },
            },
            httpOptions: {
                timeout: 15000,
            },
        }),
    ],
    callbacks: {

    },

    // callbacks: {
    //     async signIn({ account, profile }) {
    //         if (account.provider === "google") {
    //             return true
    //         }
    //     }
    // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }