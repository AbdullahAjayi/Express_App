const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const { members } = require("../../Members");

// Get all members
router.get("/", (req, res) => res.json(members));

// Get a single member
router.get("/:id", (req, res) => {
  const member = members.filter(
    (member) => member.id === parseInt(req.params.id)
  );
  if (member.length > 0) res.json(member);
  else res.status(400).json({ msg: "such member do not exitst" });
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.json({ msg: "Pls include name and an email" });
  }

  members.push(newMember);

  res.json(members);
});

// Update member
router.put("/:id", (req, res) => {
  const member = members.filter(
    (members) => members.id === parseInt(req.params.id)
  );
  if (member.length > 0) {
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;
        res.json({
          msg: "Updated member",
          member,
        });
      }
    });
  } else {
    res.status(400),
      res.json({
        msg: `No such member with an id of ${req.params.id}`,
      });
  }
});

// Delete a member
router.delete("/:id", (req, res) => {
  const updatedMembers = members.filter(
    (member) => member.id !== parseInt(req.params.id)
  );
  let deletedMembers = [];
  const deletedMember = members.filter(
    (member) => member.id === parseInt(req.params.id)
  );
  deletedMembers.push(deletedMember[0]);
  if (updatedMembers.length < members.length)
    res.json({ deletedMembers, updatedMembers });
  else res.json({ msg: `No member with an id of ${req.params.id}` });
});

module.exports = router;
