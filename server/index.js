const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const handlebars = require("handlebars");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/eventPosterApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const designSchema = new mongoose.Schema({
  templateId: String,
  heading: String,
  subheading: String,
  date: String,
  place: String,
  additionalDetails: String,
  createdAt: { type: Date, default: Date.now },
});

const Design = mongoose.model("Design", designSchema);

// API to fetch templates
app.get("/templates", (req, res) => {
  const templates = ["template1", "template2"]; // Replace with actual template data
  res.json(templates);
});

// API to generate design
app.post("/generate", async (req, res) => {
  const { templateId, heading, subheading, date, place, details } = req.body;

  // Load template
  const templateFile = fs.readFileSync(
    `../templates/${templateId}.html`,
    "utf8"
  );
  const template = handlebars.compile(templateFile);

  // Replace placeholders with user data
  const html = template({ heading, subheading, date, place, details });

  // Save to database
  const design = new Design({
    templateId,
    heading,
    subheading,
    date,
    place,
    additionalDetails: details,
  });
  await design.save();

  res.json({ success: true, html });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
