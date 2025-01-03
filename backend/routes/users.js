const express = require("express");
const router = express.Router();

const {
    create,
    login,
    get,
    getById,
    remove,
    update,
} = require("../controllers/UserController");

router.get("/", async (req, res) => {
    const users = await get(req, res);
    res.status(200).json(users);
});

router.post("/", async (req, res) => {
    const [user, error] = await create(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(user);
});

router.post("/login", async (req, res) => {
    const [user, error] = await login(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(user);
});

router.get("/:id", async (req, res) => {
    const [user, error] = await getById(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(user);
});

router.put("/:id", async (req, res) => {
    const [user, error] = await update(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(user);
});

router.delete("/:id", async (req, res) => {
    const [user, error] = await remove(req, res);
    if (error) return res.status(404).json(error);
    res.status(200).json(user);
});

module.exports = router;
