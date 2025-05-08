import mongoose, {Schema, Document} from "mongoose";

//how to create links btw the tables (referencing one table in another)
export interface Bday extends Document {
    pname: string,
    dob: Date,
    age?: number,
    message?: string,
    relation: string,
    user: mongoose.Types.ObjectId,
}

const bdaySchema: Schema<Bday> = new Schema ({
    pname: {
        type: String,
        required: [true, "Name of Person is required"],
        unique: false,
        trim: true,
        lowercase: true,
    },
    dob: {
        type: Date,
        require: [true, "DOB is required"],
        unique: false,
    },
    age: {
        type: Number,
    },
    message: {
        type: String,
        trim: true,
    },
    relation: {
        type: String,
        required: [true, "Relation is required"],
        trim: true,
        lowercase: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Associated user is required"],
    }
})

const BdayModel = (mongoose.models.Bday as mongoose.Model<Bday>)  || (mongoose.model<Bday>("Bday", bdaySchema))

export default BdayModel;
