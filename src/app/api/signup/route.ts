import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST (request: Request) {
    await dbConnect();

    try {
        const {username, email, password} = await request.json();

        //Steps for the flow;
        //checking if the user already exitss or not
        //if not send the verification code via resend service
        //check if user is verified & acc
        // if new user => create object in DB

        const existingUserVerifyByUserName = UserModel.findOne ([{username, isverified: true}]);

        if (existingUserVerifyByUserName) {
            return Response.json(
                {
                    success: false,
                    message: "Username is Already taken"

                }, { status: 400 }
            )
        }



    } catch () {

    }

}