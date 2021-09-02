const User = require("../users/users-model");

// const Post = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}]${req.method} to ${req.originalUrl}`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No such user" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "cannot find user",
    });
  }
  // const { id } = req.params;
  // User.getById(id).then((possibleUser) => {
  //   if (possibleUser) {
  //     req.user = possibleUser;
  //     next();
  //   } else {
  //     next({ message: "user not found", status: 404 });
  //   }
  // });
  // next();
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
