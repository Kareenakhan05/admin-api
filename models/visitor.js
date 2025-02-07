const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema(
    {
        platform: { type: String, required: true }, // First Platform, Second Platform, Aggregate Store
        count: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Visitor", VisitorSchema);
