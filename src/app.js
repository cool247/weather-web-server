const path = require("path");
const express = require("express");
const hbs = require("hbs");
const userRoute = require("../routes/users");

const forecast = require("./utils/forecast");
const getLocation = require("./utils/getlocation");

const app = express();
const port = process.env.PORT || 3000;

//db connection
require("./db/mongoose.js");

//setup path provider
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//static web page
app.use(express.static(publicDirectoryPath));

//setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//route middleware
app.use(express.json());
app.use("/", userRoute);

// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "Weather Details",
//     name: "cindrella botwan",
//   });
// });

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About me",
//     name: "cindrella botwan",
//   });
// });

// app.get("/help", (req, res) => {
//   res.render("help", {
//     title: "Contact us",
//     name: "cindrella botwan",
//   });
// });
// app.get("/help/*", (req, res) => {
//   res.render("404", {
//     title: 404,
//     errorMessage: "help article not found",
//     name: "cindrella botwan",
//   });
// });

// //handling api call from client side
// app.get("/weather", (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: "you must provide the address",
//     });
//   }
//   getLocation(req.query.address, (err, data) => {
//     if (err) {
//       return res.send({ error: err });
//     } else {
//       forecast(data, (err, data) => {
//         if (err) {
//           return res.send({
//             error: err,
//           });
//         }
//         res.send({
//           forecast: `It is currently ${data.currently.temperature} degree C out.This high today is ${data.daily.data[0].temperatureHigh} degree C with lowest ${data.daily.data[0].temperatureLow} degree C.There is a ${data.currently.precipProbability}% chance of rain.`,
//           address: req.query.address,
//           location: data.timezone,
//         });
//       });
//     }
//   });
// });

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "cindrella botwan",
    errorMessage: "page not found!!",
  });
});

app.listen(port, () => console.log(` app listening on ${port} port!`));
