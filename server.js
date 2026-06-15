const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const file = "./contacts.json";

// GET all contacts
app.get("/contacts", (req, res) => {
    let data = JSON.parse(fs.readFileSync(file));
    res.json(data);
});

// ADD new contact
app.post("/contacts", (req, res) => {
    let data = JSON.parse(fs.readFileSync(file));

    let newContact = {
        id: Date.now(),
        name: req.body.name,
        phone: req.body.phone,
        category: req.body.category
    };

    data.push(newContact);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    res.json(newContact);
});

// DELETE contact
app.delete("/contacts/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(file));

    let updated = data.filter(c => c.id != req.params.id);

    fs.writeFileSync(file, JSON.stringify(updated, null, 2));

    res.json(updated);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});