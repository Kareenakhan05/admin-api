const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        plan: String,
        amount: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
