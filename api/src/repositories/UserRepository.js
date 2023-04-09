// src/repositories/UserRepository.js

import { db } from "../config";

async function getUserById(userId) {
  const query = "SELECT * FROM users WHERE id = $1";
  const values = [userId];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}

export default {
  getUserById,
};
