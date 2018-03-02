let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nightlife");

mongoose.connection
  .once("open", () => {
    console.log("Yayyyy want to make this app now");
  })
  .on("error", () => {
    console.log("Ooops sth might have happened");
  });
