const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const connectDB = require("./config/database");
const Listing = require("./models/listing.models");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.get("/privacy", (req, res) => {
    res.render("legal/privacy.ejs", { title: "Privacy" });
});

app.get("/terms", (req, res) => {
    res.render("legal/terms.ejs", { title: "Terms" });
});

app.get("/signup", (req, res) => {
    res.render("auth/signup.ejs", { title: "Sign Up" });
});

app.get("/login", (req, res) => {
    res.render("auth/login.ejs", { title: "Login" });
});

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// INDEX ROUTE
app.get(
    "/listings",
    wrapAsync(async (req, res) => {
        const allListing = await Listing.find({}).sort({ createdAt: -1 });
        res.render("listings/index.ejs", {
            allListing,
            title: "All Listings",
            fluidLayout: true,
            navActive: "explore",
        });
    })
);

app.get("/listings/new", wrapAsync(async (req, res) => {
    res.render("listings/new.ejs", { title: "Add New Listing" });
}));

// SHOW ROUTE
app.get(
    "/listings/:id",
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            throw new ExpressError(404, "Listing not found");
        }
        res.render("listings/show.ejs", { listing, title: listing.title });
    })
);

app.post(
    "/listings",
    validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
);

app.get(
    "/listings/:id/edit",
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            throw new ExpressError(404, "Listing not found");
        }
        res.render("listings/edit.ejs", { listing, title: "Edit listing" });
    })
);

app.put(
    "/listings/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
    })
);

app.delete(
    "/listings/:id",
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect("/listings");
    })
);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});

const port = process.env.PORT || 9090;

connectDB()
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Could not start the app — database connection failed:", err.message);
        process.exit(1);
    });
