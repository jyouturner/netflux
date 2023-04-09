import { getPersonalizedSuggestions } from "../grpc";

async function getSuggestions(req, res) {
  const userId = req.user.id;

  try {
    const suggestions = await getPersonalizedSuggestions(userId);
    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ message: "An error occurred while fetching suggestions" });
  }
}

export default {
  getSuggestions,
};
