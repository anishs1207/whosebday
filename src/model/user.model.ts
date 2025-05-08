import mongoose, {Schema, Document} from "mongoose";
//mongoose has its own types so the use of npm i @types/mongoose is depricated and not required

// standard practise while creating a model schema
export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
}

//for more attributes refer to docs: https://mongoosejs.com/docs/schematypes.html
// https://chatgpt.com/c/67fbad8c-1f64-8000-add6-bc7592d8d15c
const userSchema: Schema<User> = new Schema ({
    username: {
        type: String,
        required: [true, "uSername is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim:  true,
        unique: true,
        match: [/.+\@.+\..+/, "please use a valid email address"]
        //regex from chatgpt or https://regexr.com/
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

// UserModel instead of User to diff from the other User objects which are present here
const UserModel = (mongoose.models.User as mongoose.Model<User>)  || (mongoose.model<User>("User", userSchema))
// (when the model is already made) || (when model is not made)

export default UserModel;

//refer to this:
// username: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//     lowercase: true,
//     minlength: 3,
//     maxlength: 30,
//     match: /^[a-zA-Z0-9_]+$/,
//     default: 'anonymous',
//     validate: {
//       validator: function(value) { return value.length > 3 },
//       message: "Username must be longer than 3 characters"
//     },
//     immutable: true,
//     select: true,
//   }