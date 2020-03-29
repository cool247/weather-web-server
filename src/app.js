const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const getLocation = require("./utils/getlocation");

const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Details",
    name: "cindrella botwan"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "cindrella botwan"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Contact us",
    name: "cindrella botwan"
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "help article not found",
    name: "cindrella botwan"
  });
});

//handling api call from client side
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide the address"
    });
  }
  getLocation(req.query.address, (err, data) => {
    if (err) {
      return res.send({ error: err });
    } else {
      forecast(data, (err, data) => {
        if (err) {
          return res.send({
            error: err
          });
        }
        return res.send({
          forecast: data.currently.summary,
          address: req.query.address,
          location: data.timezone
        });
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "cindrella botwan",
    errorMessage: "page not found"
  });
});
app.listen(port, () => console.log(` app listening on ${port} port!`));
