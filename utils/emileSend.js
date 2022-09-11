const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const emileSend = async (data) => {
  try {
    const email = { ...data, from: "ironmanmw130@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = emileSend;
