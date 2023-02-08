const express = require("express");
const router = express.Router();
const { members } = require("../../Members");

// Get all members
router.get("/", (req, res) => res.json(members));

// Get a single member
router.get("/:id", (req, res) => {
  const member = members.filter(
    (member) => member.id === parseInt(req.params.id)
  );
  if (member.length > 0) res.json(member);
  else
    res
      .status(400)
      .send(
        `<p style='font-family: sans-serif;'>Sorry, such a member does not exist 😒</p>`
      );
});

module.exports = router;
