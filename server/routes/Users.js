const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware');
const bcrypt = require("bcrypt");

const { sign } = require('jsonwebtoken');

router.post("/", async (request, response) => {
  const { username, password } = request.body;
  bcrypt.hash(password, 12).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    response.json("Success");
  });
});
router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) response.json({ error: "usuário não cadastrado!" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) response.json({ error: "wrong password" });
    const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
    response.json(accessToken);
  });
});
router.get("/auth", validateToken, (rwquest, response) => {

})
module.exports = router;
