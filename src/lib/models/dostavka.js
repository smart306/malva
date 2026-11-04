import mongoose from "mongoose"

const DostavkaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Dostavka = mongoose.models.Dostavka || mongoose.model("Dostavka", DostavkaSchema)

export default Dostavka