const cheerio = require("cheerio");
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
    .replace(/\n/gm, " ");
  console.log(panchanga);
  res.json({ date, tithi, event, panchanga });
});
