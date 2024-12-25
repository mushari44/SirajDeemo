// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const cors = require("cors");
// const app = express();
// const PORT = 3000;
// // Middleware
// app.use(cors());

// app.use(bodyParser.json());
// app.use(express.static("public")); // Serve frontend files

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to My Chatbot</h1>");
// });

// // Chatbot Endpoint
// app.post("/chatbot", async (req, res) => {
//   const userQuery = req.body.query;

//   try {
//     // Forward the query to the Python API
//     const response = await axios.post("http://127.0.0.1:8000/chatbot", {
//       query: userQuery,
//     });
//     res.json({ response: response.data.response });
//   } catch (error) {
//     console.error("Error communicating with Python API:", error.message);
//     res.status(500).json({ error: "Failed to communicate with chatbot." });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
