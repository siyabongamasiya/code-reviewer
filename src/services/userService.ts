import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel";

export const findUserByEmail = async (email: string) => {
  const { rows } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
  return rows[0];
};

export const createUser = async (user: User): Promise<User> => {
  const { name, email, password, role, profile_picture } = user;

  const salts = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salts);
  const { rows } = await query(
    `INSERT INTO users (name,email,password_hash,role,profile_picture) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, password_hash, role, profile_picture]
  );
  return rows[0];
};
