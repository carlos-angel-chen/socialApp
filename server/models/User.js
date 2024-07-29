// Aca es donde creo todo el objeto de User del diseño de la base de datos
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: {
            type: String,
        },
        occupation: {
            type: String,
        },
        viewedProfile: {
            type: Number,
        },
        impressions: {
            type: Number,
        },
    },
    { timestamps: true } // esto me da fechas automaticas de cuando se creo, actualizo, etc.
);

const User = mongoose.model("User", UserSchema);

export default User;