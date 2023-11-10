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

router.get("/:id", async (req, res) => {
  const foundShow = await Show.findByPk(req.params.id);
  res.json(foundShow);
});


router.get("/genre/:genre", async (req, res) => {
  const foundShow = await Show.findAll({
    where: {
      genre: req.params.genre,
    },
  });
  res.json(foundShow);
});


router.put("/:id", async (req, res) => {
  const newRating = req.body.rating;
  const foundShow = await Show.findByPk(req.params.id);
  await foundShow.update({ rating: newRating }, { where: { id: req.params.id } });
});

router.put("/:id", async (req, res) => {
  const newStatus = req.body.available;
  const foundShow = await Show.findByPk(req.params.id);
  await foundShow.update({ available: newStatus }, { where: { id: req.params.id } });
});

router.delete("/:id", async (req, res) => {
  const foundShow = await Show.findByPk(req.params.id);
  await foundShow.destroy();
});
module.exports = router;
