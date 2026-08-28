import User from "../models/User.js";

export const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};
