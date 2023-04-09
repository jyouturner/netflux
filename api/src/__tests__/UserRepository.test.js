// src/__tests__/UserRepository.test.js

import getUserById from "../repositories/UserRepository";
const { getUserById } = getUserById;

describe("UserRepository", () => {
  test("should return user data for valid user ID", async () => {
    // Replace the validUserId with a real user ID present in your database
    const validUserId = "some-valid-user-id";
    const user = await getUserById(validUserId);

    expect(user).not.toBeNull();
    expect(user.id).toBe(validUserId);
  });

  test("should return null for invalid user ID", async () => {
    const invalidUserId = "some-invalid-user-id";
    const user = await getUserById(invalidUserId);

    expect(user).toBeNull();
  });
});
