const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.get("/hello", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

// API Section
let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Sam Smith" },
];

app.get("/api/users", (req, res) => {
  res.set("Content-Type", "application/json");
  res.status(200).json(users);
});

app.get("/api/user/:id", (req, res) => {
  res.set("Content-Type", "application/json");

  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

app.post("/api/user/create", (req, res) => {
  res.set("Content-Type", "application/json");
  let { body } = req;
  if (!body) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  if (!body.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name: body.name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/user/update/:id", (req, res) => {
  res.set("Content-Type", "application/json");
  const userId = parseInt(req.params.id);
  let { body } = req;

  if (!body) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  // Validate user ID
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  // Validate request body
  if (!body.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  // Find user index
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user
  const updatedUser = {
    id: userId,
    name: body.name,
  };
  users[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
});

app.delete("/api/user/delete/:id", (req, res) => {
  res.set("Content-Type", "application/json");
  const userId = parseInt(req.params.id);

  // Validate user ID
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  // Find user index
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Delete user
  users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted successfully" });
});
