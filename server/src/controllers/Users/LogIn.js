const { Usuario } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ where: { email: email } });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);
    console.log(passwordCorrect);

    if (!user || !passwordCorrect) {
      return res.status(401).json({ error: "contraseña o usuario inválido" });
    }

    const payload = {
      id: user.id,
      username: user.email,
      admin: user.admin,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    res.json({
      email: user.email,
      admin: user.admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login };
