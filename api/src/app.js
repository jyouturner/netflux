import express, { json } from "express";
import { authenticateToken } from "./middlewares/authentication";
import { getSuggestions } from "./controllers/suggestionsController";
import { getUserById } from "./repositories/UserRepository";

const app = express();
app.use(json());

app.post("/login", async (req, res) => {
  // Implement user authentication here
  const { userId } = req.body;

  try {
    const user = await getUserById(userId);

    if (user) {
      // ... (generate and return JWT token)
    } else {
      res.status(401).json({ message: "Invalid user ID" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "An error occurred during authentication" });
  }
});

app.get("/suggestions", authenticateToken, getSuggestions);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
