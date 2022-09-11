const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConnection = require("../db/db.js");

const userMiddleware = require("../middleware/users.js");
const { isLoggedIn } = require("../middleware/isLoggedIn.js");
const { body, validationResult } = require("express-validator");
const { signJwtToken } = require("../utils/tokenUtils.js");

authRouter.get("/register", (req, res) => {
  res.send("register");
});

authRouter.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 5 }),
  body("password_repeat").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const users = dbConnection.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${dbConnection.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: "This email is already in use!",
          });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(400).send({
              msg: err,
            });
          }

          dbConnection.query(
            `INSERT INTO users (id, email, password, created_date) VALUES (NULL, ${dbConnection.escape(
              req.body.email
            )}, ${dbConnection.escape(hash)}, now())`,
            (err, result) => {
              if (err) {
                throw err;
                return res.status(400).send({
                  msg: err,
                });
              }
              return res.status(201).send({
                msg: "Registered!",
              });
            }
          );
        });
      }
    );
  }
);

authRouter.post("/login", (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM users WHERE email = ${dbConnection.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }

          if (bResult) {
            // const token = jwt.sign(
            //   {
            //     email: result[0].email,
            //   },
            //   process.env.AUTH_SECRET_KEY,
            //   {
            //     expiresIn: "30d",
            //   }
            // );

            const token = signJwtToken(result[0].email);

            return res.status(200).send({
              msg: "Logged in!",
              token,
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

module.exports = authRouter;
