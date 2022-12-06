import jwt from "jsonwebtoken";

export const createToken = (id: string) => {
    return jwt.sign({ id }, `${process.env.SECRET}`, { expiresIn: "1d" });
  };