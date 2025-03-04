import express from "express";
import pool from "../database.js";
import upload from "../fileManager.js";

const userRouter = express.Router();

// Get user by username //
userRouter.get("/search", async (req, res) => {
    const { username } = req.query;
    try {
        const [row] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get all users //
userRouter.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get single user by ID //
userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [row] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Create a new user //
userRouter.post("/", async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const response = await pool.query(
            "INSERT INTO users (user_id, email, username, password_hash) VALUES (UUID(), ?, ?, ?)",
            [email, username, password]
        );
        res.status(201).json({ message: "User created successfully", userId: response.insertId });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// complete register //
userRouter.put("/register/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;
    const { display_name } = req.body;
    
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imagePath = `/uploads/${req.file.filename}`;
    try {
        const response = await pool.query("UPDATE users SET profile_picture = ?, display_name = ? WHERE user_id = ?", [imagePath, display_name, id]);
        res.status(200).json({ success: true, imageUrl: imagePath});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

export default userRouter;
