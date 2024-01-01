import { Schema, models, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate: (value: string) => {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 5,
      validate: (value: string) => {
        // console.log("type of value", typeof value);

        if (value.includes("password")) {
          throw new Error("Your password can not contain 'password'!");
        }
      },
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this; // this is the reason this function must not be an arrow function

  console.log('user.isModified("password")', user.isModified("password"));

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password!, 10);
  }
  next();
});

userSchema.post("save", async function (user) {
  console.log("userSchema post saved user", user);
});

const User = models.User || model("User", userSchema);

export default User;
