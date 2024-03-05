import mongoose, { PassportLocalSchema, ObjectId, Types, Document, PassportLocalDocument } from 'mongoose';
const Schema = mongoose.Schema; // alias
import passportLocalMongoose from 'passport-local-mongoose';

interface IUser extends PassportLocalDocument
{
    username: string,
    emailAddress: string,
    displayName: string,
    created: Date,
    updated: Date
}

const UserSchema = new Schema<IUser>
({
    displayName: String,
    username: String,
    emailAddress: String,
    created:
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "users"
});

UserSchema.plugin(passportLocalMongoose);
const Model = mongoose.model<IUser>("User", UserSchema);


declare global
{
    export type UserDocument = mongoose.Document &
    {
        username: String,
        emailAddress: String,
        displayName: String
    }
}

export default Model;