const express = require("express");
const router = express.Router();
const { Show } = require("../models");
const { where } = require("sequelize");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const allShows = await Show.findAll();
  res.json(allShows);
});

// GET one show
router.get("/:id", async (req, res) => {
  const foundShow = await Show.findByPk(req.params.id);
  res.json(foundShow);
});

// GET shows of a particular genre (genre in req.params).
// For example GET /genre/comedy returns all shows with a genre of "comedy".

router.get("/genre/:genre", async (req, res) => {
  const foundShow = await Show.findAll({
    where: {
      genre: req.params.genre,
    },
  });
  res.json(foundShow);
});

// PUT update rating of a show

router.put("/:id", async (req, res) => {
  const newRating = req.body.rating;
  const foundShow = await Show.findByPk(req.params.id);
  await foundShow.update({ rating: newRating }, { where: { id: req.params.id } });
});

// PUT update the status of a show stored with a key of available on the Show model
router.put("/:id", async (req, res) => {
  const newStatus = req.body.available;
  const foundShow = await Show.findByPk(req.params.id);
  await foundShow.update({ available: newStatus }, { where: { id: req.params.id } });
});

// DELETE a show
router.delete("/:id", async (req, res) => {
  const foundShow = await Show.findByPk(req.params.id);
  await foundShow.destroy();
});
module.exports = router;
