// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Video = prisma.video;

const get = async () => await Video.findMany();

const getById = async (req, res) => {
    const video = await Video.findUnique({
        where: {
            id: req.params.id,
        },
    });
    let error = null;
    if (!video) error = { error: "Video not found" };
    return [video, error];
};

const create = async (req, res) => {
    try {
        const video = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            thumbnail: req.body.thumbnail,
            views: Number(req.body.views),
        };

        const createdVideo = await Video.create({
            data: video,
        });

        return [createdVideo, null];
    } catch (error) {
        return [null, error];
    }
};

const update = async (req, res) => {
    const oldVideo = await Video.findUnique({
        where: {
            id: req.params.id,
        },
    });
    let error = null;
    if (!oldVideo) {
        error = { error: "Video not found" };
        return [null, error];
    }

    const updatedVideo = await Video.update({
        where: {
            id: oldVideo.id,
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            thumbnail: req.body.thumbnail,
            views: Number(req.body.views),
        },
    });

    return [updatedVideo, error];
};

const remove = async (req, res) => {
    const video = await Video.findUnique({
        where: {
            id: req.params.id,
        },
    });
    let error = null;
    if (!video) {
        error = { error: "Video not found" };
        return [null, error];
    }

    await Video.delete({
        where: {
            id: video.id,
        },
    });

    return [video, error];
};

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
};