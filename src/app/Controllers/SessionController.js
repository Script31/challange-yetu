const User = require("../models/User");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "user does not exist" });
    }

    if (!(await userExist.comparePasswordHash(password))) {
      return res.status(200).json({ error: "password does not match" });
    }

    return res.json({ userExist, token: User.generateToken(userExist) });
  }
}

module.exports = new SessionController();
