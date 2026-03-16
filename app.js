const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,result.error);
    }else{
        next();
    }
};

//Index Route
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs",{allListing});
 }));

  //New Route
 app.get("/listings/new",(req,res)=>{
    res.render("listing/new.ejs");
 });



 //Show Route
 app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let hotel = await Listing.findById(id);
    // console.log(hotel);
    res.render("listing/show.ejs",{hotel});
 }));

 //Create route
 app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
    let {title,description,image,price,location,country}=req.body;
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
    
   
 }));

 //Edit route
 app.get("/listing/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let hotel = await Listing.findById(id);
    res.render("listing/edit.ejs",{hotel});
 }));

 app.delete("/listing/:id",wrapAsync(async (req, res) => {
   let { id } = req.params;
   let deleted = await Listing.findByIdAndDelete(id);
   console.log(deleted);
   res.redirect("/listings");
 }));

 //Update route
 app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
    let { id } = req.params;
    let { title, description, image, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id,{...req.body});
    res.redirect(`/listings/${id}`);
    
 }));

 

app.get("/",(req,res)=>{
    res.send("Hello am root");
});


app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
//   res.status(status).send(message);
res.render("error.ejs",{err});
});
app.listen(8080,()=>{
    console.log("App is listening");
});