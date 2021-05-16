const mongoose = require("mongoose");

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@node-crud-project.4t0sv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

/**
 * USE THIS TO CONNECT TO LOCAL MONGODB
 */
// module.exports = function () {
//   mongoose
//     .connect("mongodb://localhost/SIS", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     })
//     .then(console.log("connected to db"));
//   mongoose.set("useCreateIndex", true);
// };

/**
 * USE THIS TO CONNECT TO MONGODB CLOUD
 */
module.exports = function () {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Connected succesfully");
    })
    .catch((error) => console.log(error));
};
