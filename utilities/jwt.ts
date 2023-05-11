import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string) => {
    return jwt.sign({ id, email }, `${process.env.SECRET}`, { expiresIn: "1h" });
  };