let mongoose = require("mongoose");

mongoose.connect(process.env.Db_CONNECT);

mongoose.connection
  .once("open", () => {
    console.log("Yayyyy want to make this app now");
  })
  .on("error", () => {
    console.log("Ooops sth might have happened");
  });
