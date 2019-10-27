const cheerio = require("cheerio");
var adbs = require("ad-bs-converter");
const express = require("express");
const axios = require("axios");
var port = process.env.PORT || 8000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("json spaces", 2);

app.listen(port, () => {
  console.log("Started");
});

app.get("/api/v1/today", async (req, res) => {
  var response = await axios.get("https://nepalipatro.com.np/");
  const $ = cheerio.load(response.data);
  var date = $(".today-date").text();
  var tithi = $(".today-tithi").text();
  var event = $(".today-event").text();
  var panchanga = $(".panchangaFront")
    .text()
    .toString()
    .replace(/\n/gm, " ")
    .replace(' आजको पञ्चाङ्ग ', '');
  console.log(panchanga);
  res.json({ status: "success", date, tithi, event, panchanga });
});

app.get("/api/v1/convert/:lang/:date", async (req, res) => {
  var language = req.params.lang;
  var date = req.params.date.replace(/-/g, "/");

  if (language == "en") {
    res.json(adbs.ad2bs(date));
  } else if (language == "np") {
    res.json(adbs.bs2ad(date));
  } else {
    res.redirect("/");
  }
});

app.get("*", (req, res) => {
  res.json({ status: "error", message: "Invalid API Endpoint." });
});
