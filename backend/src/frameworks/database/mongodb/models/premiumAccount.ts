import mongoose, { Schema, model } from "mongoose";

const documentSchema = new Schema({
  type: { type: String, required: true },
  image: { type: String, required: true },
});

const premiumAccountSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPremium: { type: Boolean, default: false },
    premiumExpiresAt: { type: Date },
    premiumRequest: {
      isRequested: { type: Boolean, default: false },
      isAdminApproved: { type: Boolean, default: false },
      documents: [documentSchema],
    },
  },
  {
    timestamps: true,
  }
);

const PremiumAccount = model("PremiumAccount", premiumAccountSchema);

export default PremiumAccount;
