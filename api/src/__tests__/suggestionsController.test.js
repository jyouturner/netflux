// src/__tests__/suggestionsController.test.js

import request from "supertest";
import getSuggestions from "../controllers/suggestionsController";
const { getSuggestions } = getSuggestions;
import app from "../app";

// Mock the gRPC clients
jest.mock("../grpc", () => ({
  getPersonalizedSuggestions: jest.fn(() => [
    { category: "Recently Watched", shows: [] },
    { category: "Recommended", shows: [] },
    { category: "Promoted Categories", shows: [] },
  ]),
}));

import { getPersonalizedSuggestions } from "../grpc";

describe("suggestionsController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return suggestions for a valid user", async () => {
    const userId = "some-valid-user-id";
    // Mock the `req.user` object to simulate an authenticated request
    const req = { user: { id: userId } };
    const res = {
      json: jest.fn(),
    };

    await getSuggestions(req, res);

    expect(getPersonalizedSuggestions).toHaveBeenCalledWith(userId);
    expect(res.json).toHaveBeenCalledWith([
      { category: "Recently Watched", shows: [] },
      { category: "Recommended", shows: [] },
      { category: "Promoted Categories", shows: [] },
    ]);
  });
});
