import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

// signup
const signup = catchError(async (req, res, next) => {
  let user = new User(req.body);
  await user.save();

  let token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY
  );
  res.status(201).json({ message: "success", token });
});

//signin
const signin = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("incorrect Email or Password", 401));

  jwt.sign(
    { userId: user._id, name: user.name, role: user.role },
    process.env.JWT_KEY,
    (err, token) => {
      if (err) return next(new AppError("Token creation failed", 500));
      res.status(200).json({ message: "success..", token });
    }
  );
});

// change password
const changeUserPassword = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword, passwordChangedAt: Date.now() }
    );
    let token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_KEY
    );

    res.status(200).json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
});

// middleware to check user
const protectedRoutes = catchError(async (req, res, next) => {
  // 1- check token ? exist or not
  let { token } = req.headers;
  let userPayload = null;

  if (!token) return next(new AppError("token not provided", 401));
  // 2- verify token
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });

  // 3- check userId
  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("user not found", 404));

  // 3l4an ndamr el token el2adeem lma y3'yar password
  // lma el user change pass ngeeb el current time
  // w n7wloh ll seconds
  // el if dyat lw el user 3aml change password
  // lw ma 3mal4 f5las ykaml 3ade
  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);

    if (time > userPayload.iat)
      return next(new AppError("invalid token... login again", 401));
  }

  req.user = user;
  next();
});

// authorization
// meen elle y8der y3mel el7aga dyat fel el endpoint
const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }

    return next(
      new AppError("you are not authorized to access this endpoint", 401)
    );
  });
};

export { signup, signin, changeUserPassword, protectedRoutes, allowedTo };
