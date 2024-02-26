const { Usuario } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    const user = await Usuario.findOne({ where: { email: email } });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!user || !passwordCorrect) {
      return res.status(400).send("contraseña o usuario inválido");
    }

    const payload = {
      id: user.id,
      username: user.email,
      admin: user.admin,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    res.json({
      ...user.dataValues,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = { login };
