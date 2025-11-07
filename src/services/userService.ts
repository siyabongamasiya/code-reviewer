import { query } from "../config/database";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel";

export const findUserByEmail = async (email: string) => {
  const { rows } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
  return rows[0];
};

export const createUser = async (user: User): Promise<User> => {
  const { name, email, password, profile_picture } = user;

  const salts = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salts);
  const { rows } = await query(
    `INSERT INTO users (name,email,password_hash,profile_picture) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, email, password_hash, profile_picture]
  );
  return rows[0];
};

export const getAllUsers = async () : Promise<User[]> => {
  const { rows } = await query(`SELECT * FROM users`);
  return rows as User[];
};

export const getUserById = async (id:number) : Promise<User> => {
  const { rows } = await query(`SELECT * FROM users WHERE id = $1`,[id]);
  return rows[0];
};


