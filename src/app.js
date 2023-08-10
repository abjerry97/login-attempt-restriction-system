const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Redis = require("redis");
const bcrypt = require("bcrypt");
const axios = require("axios");
const User = require("../models/user");
const DEFAULT_EXPIRATION = 24 * 60 * 60;
app.use(cors());
app.use(bodyParser.json({ limit: "100mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const maxNumberOfFailedLogins = 3;
const timeWindowForFailedLogins = 60 * 60 * 1;
const redisClient = Redis.createClient({
  host: "rediss://red-cjab542683bs73b72t2g:Asbs5PIjiQsi5FssT0ZreOomXKqUpZlt@oregon-redis.render.com",
  port: "6379",
});
redisClient.connect();
app.get("/", (req, res) => {
  console.log(12121212);
  res.send("welcome");
});
// app.get("/photos", async (req, res) => {
//   const albumId = req.query.albumId;
//   //   console.log(redisClient)
//   const cachedPhotos = await redisClient.get(`photos?albumId=${albumId}`);

//   if (cachedPhotos != null) {
//     console.log("CACHE HIT");
//     return res.json(JSON.parse(cachedPhotos));
//   } else {
//     console.log("CACHE MISS");
//     const { data } = await axios.get(
//       "https://jsonplaceholder.typicode.com/photos",
//       { params: { albumId } }
//     );
//     redisClient.setEx(`photos?albumId=${albumId}`, DEFAULT_EXPIRATION, JSON.stringify(data));
//     res.json(data);
//   }
// });
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  //   console.log(redisClient)
  const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } }
    );
    return data;
  });

  res.json(photos);
});
app.get("/photos/:id", async (req, res) => {
  const albumId = req.query.albumId;
  //   console.log(redisClient)
  const photo = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    return data;
  });

  res.json(photo);
});
app.post("/register", async (req, res) => {
  const saltRounds = 13;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  let { ...new_ } = req.body;
  new_ = { ...new_, passwordHash };
  console.log(new_);
  const newUser = await User.create(new_);
  res.send(newUser);
});

app.post("/login", async (req, res) => {
  let user = null;
  user = await User.findByEmailWithPassword(req.body.email, null);
  let userAttempts = await redisClient.get(JSON.stringify(user));
  console.log("userAttempts", userAttempts);
  const comparePassword = await user.comparePassword(req.body.password);
  if (!comparePassword) {
    if (userAttempts >= maxNumberOfFailedLogins)
      return res.json(`maxuimum number of login attempt exceeded`);
    await redisClient.set(
      JSON.stringify(user),
      ++userAttempts,
      "ex",
      timeWindowForFailedLogins
    );
    return res.json("wrong password");
  }
  await redisClient.del(JSON.stringify(user));
  res.send(user);
});

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient
      .get(key)
      .then(async (data) => {
        if (data !== null) {
          return resolve(JSON.parse(data));
        }
        const freshData = await cb();
        redisClient.set(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
        resolve(freshData); // Resolve with the fresh data
      })
      .catch((error) => {
        reject(error);
      });
  });
  // function getOrSetLoginAttemptCache(key) {
  //   return new Promise((resolve, reject) => {
  //     redisClient
  //       .get(key)
  //       .then(async (data) => {
  //         if (data !== null) {
  //           return resolve(JSON.parse(data));
  //         }
  //         redisClient.setex(     key,
  //         ++userAttempts,
  //         "ex",
  //         timeWindowForFailedLogins);
  //         resolve(freshData); // Resolve with the fresh data
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }
}

module.exports = app;
