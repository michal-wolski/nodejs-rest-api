const { User, schemas } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { emileSend } = require("../../utils");

const register = async (req, res, next) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Incorrect format of entered data" });
    return;
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "User with this email already exists" });
    return;
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const hashEmail = await gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL: hashEmail,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Emaile Verify",
      text: "Verify you emile.",
      html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click to verify</a>`,
    };
    await emileSend(mail);
    res.status(201).json({
      user: {
        name: result.name,
        email: result.email,
        subscription: result.subscription,
        avatarURL: hashEmail,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = register;
