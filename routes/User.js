const express = require("express");
const router = express.Router();
const { User, Show } = require("../models");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

router.get("/:id", async (req, res) => {
  const foundUser = await User.findByPk(req.params.id);
  res.json(foundUser);
});

router.get("/:id/shows", async (req, res) => {
  const foundShows = await User.findByPk(req.params.id, {
    include: [{ model: Show, through: "watched" }],
  });
  res.json(foundShows);
});

// PUT update and add a show if a user has watched it

router.put("/:id/shows", async (req, res) => {
  const foundUser = await User.findByPk(req.params.id, {
    include: [{ model: Show, through: "watched" }],
  });
  const foundShow = await Show.findByPk(req.body.id);

  await foundUser.addShow(foundShow);
  res.json(foundUser);
});
module.exports = router;
