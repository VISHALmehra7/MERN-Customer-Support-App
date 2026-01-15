import jwt from "jsonwebtoken";

export const generateJwt = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log("Error generating token : ", error);
  }
};
