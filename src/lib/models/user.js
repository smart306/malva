import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    role: {
      type: String,
      enum: ["admin-main", "admin", "user"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
    },
    pastreviews: [
      {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            }, 
            review: {
              type: String,
              required: true, 
            },
            star: {
              type: Number, 
              required: true, 
              default: 0, 
            }
          },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    pastorders: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User