const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const nodemailer = require("nodemailer");
const axios = require("axios");
require("dotenv").config();

class Controller {
  static async register(req, res, next) {
    let { email, username, password } = req.body;
    try {
      let newUser = await User.create({ email, username, password });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.email_address,
          pass: process.env.email_password,
        },
      });

      const mailOptions = {
        from: "jormundgandr4728@gmail.com",
        to: email,
        subject: "Thank You for Registering to Oslo ",
        text: `Hello ${username}, thank you for registering to our website.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(201).json({
        message: `User with email ${email} has been created`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllHeroes(req, res, next) {
    console.log(process.env.email_address, process.env.email_password);
    try {
      let { data } = await axios({
        url: "https://api.opendota.com/api/heroStats ",
        method: "get",
      });
      // console.log(data);
      let toShow = data.map((ele) => {
        ele.img = "https://cdn.cloudflare.steamstatic.com" + ele.img;
        ele.icon = "https://cdn.cloudflare.steamstatic.com" + ele.icon;
        return ele;
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getHeroById(req, res, next) {
    let { heroname } = req.params;
    console.log(heroname);
    try {
      let { data } = await axios({
        url: "https://api.opendota.com/api/heroStats",
        method: "get",
      });
      let filtered = data.find((ele) => ele.localized_name === heroname);
      console.log(filtered);
      filtered.img = "https://cdn.cloudflare.steamstatic.com" + filtered.img;
      filtered.icon = "https://cdn.cloudflare.steamstatic.com" + filtered.icon;
      res.status(200).json(filtered);
    } catch (error) {
      next(error);
    }
  }
  static async getMemes(req, res, next) {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const memes = response.data.data.memes;
      const randomIndex = Math.floor(Math.random() * memes.length);
      const meme = memes[randomIndex];
      res.status(200).json({
        url: meme.url,
        title: meme.name,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getFreebies(req, res, next) {
    try {
      let { data } = await axios({
        url: "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15",
        method: "get",
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Controller };
