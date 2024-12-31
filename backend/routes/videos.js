const express = require("express");
const router = express.Router();
const {
    create,
    get,
    getById,
    remove,
    update,
    getTwoRandom,
    vote,
} = require("../controllers/VideoController");

router.get("/", async (req, res) => {
    const users = await get(req, res);
    res.status(200).json(users);
});

router.get("/random", async (req, res) => {
    const videos = await getTwoRandom(req, res);
    res.status(200).json(videos);
});

router.post("/", async (req, res) => {
    const [video, error] = await create(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(video);
});

router.get("/:id", async (req, res) => {
    const [video, error] = await getById(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(video);
});

router.put("/:id", async (req, res) => {
    const [video, error] = await update(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(video);
});

router.post("/vote", async (req, res) => {
    const [updatedVideos, error] = await vote(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(updatedVideos);
});

router.delete("/:id", async (req, res) => {
    const [video, error] = await remove(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(video);
});

module.exports = router;
