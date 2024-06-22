import { Schema, model, Document } from "mongoose";


interface UserInterface extends Document {
    name: string;
    email: string;
    password: string;
    role: 'client' | 'freelancer'
}

const userSchema = new Schema<UserInterface>({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['client', 'freelancer']
    }
})


const User = model<UserInterface>('User', userSchema)

export default User