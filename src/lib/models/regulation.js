import mongoose from "mongoose"

const RegulationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    markdownContent: {
      type: String,
      required: true,
    },
    slug: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

const Regulation = mongoose.models.Regulation || mongoose.model("Regulation", RegulationSchema)

export default Regulation