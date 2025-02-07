const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        industry: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
