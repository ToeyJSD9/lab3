const express = require("express");
const router = express.Router();

let items = [];

// Create
router.post("/items", (req, res, next) => {
  try {
    const newItem = req.body;
    if (!newItem || !newItem.id) {
      const err = new Error("Invalid item data");
      err.status = 400;
      return next(err);
    }
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// Read
router.get("/items", (req, res, next) => {
  const category = req.query.category;
  try {
    if (category) {
      const filteredItems = items.filter((item) => item.category === category);
      res.send(filteredItems);
    } else {
      res.send(items);
    }
  } catch (err) {
    next(err);
  }
});

// Read one item
router.get("/items/:id", (req, res, next) => {
  try {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (item) {
      res.send(item);
    } else {
      // res.status(404).send("Item not found");
      const err = new Error("Item not found");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

// Update
router.put("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index !== -1) {
    items[index] = req.body;
    res.json(items[index]);
  } else {
    res.status(404).send("Item not found");
  }
});

// Delete
router.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send("Item not found");
  }
});

module.exports = router;