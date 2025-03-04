import express from 'express';
import pool from '../database.js';
import upload from '../fileManager.js';

const postRouter = express.Router();

// get all posts //
postRouter.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}) 

// get posts by user id //
postRouter.get('/getByUid/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM posts WHERE user_id = ?", [id]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// get single post //
postRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [row] = await pool.query("SELECT * FROM posts WHERE post_id = ?", [id]);
        res.status(200).json(row);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// create post //
postRouter.post('/', upload.single("image"), async (req, res) => {
    const { user_id, caption } = req.body;

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imagePath = `/uploads/${req.file.filename}`;
    try {
        const result = await pool.query("INSERT INTO posts (post_id, user_id, caption, image) VALUES (UUID(), ?, ?, ?)", [user_id, caption, imagePath]);
        res.status(200).json({ message: "Successfully Created!"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export default postRouter;