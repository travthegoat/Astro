import express from "express";
import pool from "../database.js";
import { upload, deleteFile } from "../fileManager.js";

const userRouter = express.Router();

// Get user by username //
userRouter.get("/search", async (req, res) => {
    const { username } = req.query;
    try {
        const [row] = await pool.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
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

// get top users //
userRouter.get("/topUsers", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT users.user_id, users.display_name, users.username, users.profile_picture, COUNT(follows.following_id) AS followers_count FROM users JOIN follows ON users.user_id = follows.following_id GROUP BY users.user_id, users.username ORDER BY followers_count DESC LIMIT 5");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }    
})

userRouter.get('/isFollowing', async (req, res) => {
    const { followerId, followingId } = req.query;

    if (!followerId || !followingId) {
        return res.status(400).json({ error: "Missing followerId or followingId" });
    }

    try {
        const query = 'SELECT * FROM follows WHERE follower_id = ? AND following_id = ?';

        const [rows] = await pool.query(query, [followerId, followingId]);
        res.status(200).json({ isFollowing: rows.length > 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRouter.get('/followCounts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [followers] = await pool.query("SELECT COUNT(*) AS followers_count FROM follows WHERE following_id = ?", [id]);
        const [following] = await pool.query("SELECT COUNT(*) AS following_count FROM follows WHERE follower_id = ?", [id]);

        res.status(200).json({
            followers: followers[0].followers_count,
            following: following[0].following_count
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// Create a new user //
userRouter.post("/", async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const response = await pool.query(
            "INSERT INTO users (user_id, email, username, password_hash) VALUES (UUID(), ?, ?, ?)",
            [email, username, password]
        );
        res.status(201).json({
            message: "User created successfully",
            userId: response.insertId,
        });
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
        const response = await pool.query(
            "UPDATE users SET profile_picture = ?, display_name = ? WHERE user_id = ?",
            [imagePath, display_name, id]
        );
        res.status(200).json({ success: true, imageUrl: imagePath });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// update User //
userRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { display_name } = req.body;

    try {
        const response = await pool.query(
            "UPDATE users SET display_name = ? WHERE user_id = ?",
            [display_name, id]
        );
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// follow a user //
userRouter.post("/follow", async (req, res) => {
    const { followerId, followingId } = req.body;

    if (followerId === followingId) {
        res.status(500).json({ message: "You cannot follow yourself" });
    }

    try {
        const [row] = await pool.query("SELECT * FROM follows WHERE follower_id = ? AND following_id = ?", [followerId, followingId]);
        if (row.length > 0) {
            await pool.query("DELETE FROM follows WHERE follower_id = ? AND following_id = ?", [followerId, followingId]);
            res.status(200).json({ code: "red" });
        } else {
            await pool.query(
                "INSERT INTO follows (follow_id, follower_id, following_id) VALUES (UUID(), ?, ?)",
                [followerId, followingId]
            );
            res.status(200).json({ code: "green" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



// get followers //
userRouter.get("/followers/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            `SELECT * FROM follows JOIN users ON follows.follower_id = users.user_id WHERE follows.following_id = ?`,
            [id]
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// get following //
userRouter.get("/following/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [following] = await db.query(
            `SELECT * FROM follows JOIN users ON follows.following_id = users.user_id WHERE follows.follower_id = ?`,
            [id]
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get single user by ID //
userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [row] = await pool.query(
            "SELECT * FROM users WHERE user_id = ?",
            [id]
        );
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



export default userRouter;
