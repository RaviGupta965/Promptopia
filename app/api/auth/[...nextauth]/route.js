import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connecttoDB } from "@utils/database.js";
import User from '@models/user.model.js'
import bcrypt from "bcryptjs"; 

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization: { params: { state: true } },
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            });
            session.user.id = sessionUser._id.toString();
            return session; // Ensure this line is present
        },
        async signIn({ profile }) {
            try {
                await connecttoDB();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                    });
                }
                console.log("SUCCESS")
                return true;
            } catch (error) {
                console.log("ERROR WHILE SIGNING IN:", error.message);
                return false;
            }
        },
    }
})
export {handler as GET, handler as POST };