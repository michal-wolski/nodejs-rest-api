const { User, schemas } = require("../../models/user");
const { emileSend } = require("../../utils");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = schemas.email.validate({ email });
  const { verificationToken } = req.params;

  if (error) {
    res.status(400).json({ message: "Missing required field email" });
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }
  const mail = {
    to: email,
    subject: "Emaile Verify",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click to verify</a>`,
  };
  await emileSend(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
