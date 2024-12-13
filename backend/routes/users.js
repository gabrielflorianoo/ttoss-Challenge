const express = require("express");
const router = express.Router();

const { create, get, getById, remove, update } = require('../controllers/UserController')

router.get("/", (req, res) => {
    get(req, res);
});

router.post("/", (req, res) => {
    create(req, res);
});

router.get("/:id", (req, res) => {
    getById(req, res);
});

router.put("/:id", (req, res) => {
    update(req, res);
});

router.delete("/:id", (req, res) => {
    remove(req, res);
});

module.exports = router;
