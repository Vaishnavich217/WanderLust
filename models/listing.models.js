const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        image: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1732460486027-4a576738063b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => {
                if (typeof v === "object" && v && v.url) {
                    return v.url;
                }
                return v === ""
                    ? "https://images.unsplash.com/photo-1732460486027-4a576738063b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : v;
            },
        },
        price: Number,
        location: String,
        country: String,
    },
    { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
