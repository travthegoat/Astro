import express from "express";
import pool from "../database.js";
import { upload } from "../fileManager.js";

const postRouter = express.Router();

// get all posts //
postRouter.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// get posts by user id //
postRouter.get("/getByUid/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            "SELECT * FROM posts WHERE user_id = ?",
            [id]
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// get single post //
postRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [row] = await pool.query(
            "SELECT * FROM posts WHERE post_id = ?",
            [id]
        );
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// create post //
postRouter.post("/", upload.single("image"), async (req, res) => {
    const { user_id, caption } = req.body;

    const [uuidRow] = await pool.query("SELECT UUID() as uuid");
    const post_id = uuidRow[0].uuid;

    if (!req.file) {
        try {
            await pool.query(
                "INSERT INTO posts (post_id, user_id, caption, image) VALUES (?, ?, ?, ?)",
                [post_id, user_id, caption, ""]
            );

            const [row] = await pool.query(
                "SELECT * FROM posts WHERE post_id = ?",
                post_id
            );
            res.status(200).json({
                message: "Successfully Created!",
                postId: row[0].post_id,
            });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    } else {
        const imagePath = `/uploads/${req.file.filename}`;
        try {
            await pool.query(
                "INSERT INTO posts (post_id, user_id, caption, image) VALUES (?, ?, ?, ?)",
                [post_id, user_id, caption, imagePath]
            );
    
            const [row] = await pool.query(
                "SELECT * FROM posts WHERE post_id = ?",
                post_id
            );
            res.status(200).json({
                message: "Successfully Created!",
                postId: row[0].post_id,
            });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

});

postRouter.post("/like", async (req, res) => {
    const { user_id, post_id } = req.body;

    try {
        const [existingLike] = await pool.query(
            "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
            [user_id, post_id]
        );

        if (existingLike.length > 0) {
            await pool.query(
                "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
                [user_id, post_id]
            );
            await pool.query(
                "UPDATE posts SET likes_count = likes_count - 1 WHERE post_id = ?",
                [post_id]
            );

            res.status(200).json({ code: "red" });
        } else {
            await pool.query(
                "INSERT INTO likes (like_id, user_id, post_id) VALUES (UUID(), ?, ?)",
                [user_id, post_id]
            );
            await pool.query(
                "UPDATE posts SET likes_count = likes_count + 1 WHERE post_id = ?",
                [post_id]
            );

            res.status(200).json({ code: "green" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

postRouter.get("/comment/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM comments WHERE post_id = ?",
            [postId]
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

postRouter.post("/comment", async (req, res) => {
    const { user_id, post_id, content } = req.body;

    try {
        await pool.query(
            "INSERT INTO comments (comment_id, user_id, post_id, content) VALUES (UUID(), ?, ?, ?)",
            [user_id, post_id, content]
        );
        await pool.query(
            "UPDATE posts SET comments_count = comments_count + 1 WHERE post_id = ?",
            [post_id]
        );

        res.status(200).json({ code: "green" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

postRouter.delete("/comment/:id", async (req, res) => {
    const { id } = req.params;
    const { post_id } = req.body;

    try {
        await pool.query("DELETE FROM comments WHERE comment_id = ?", [id]);
        await pool.query(
            "UPDATE posts SET comments_count = comments_count - 1 WHERE post_id = ?",
            [post_id]
        );

        res.status(200).json({ code: "green" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

postRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { caption } = req.body;

    try {
        await pool.query("UPDATE posts SET caption = ? WHERE post_id = ?", [caption, id]);
        res.status(200).json({ code: "green" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

postRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM posts WHERE post_id = ?", [id]);
        res.status(200).json({ code: "green" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

export default postRouter;
