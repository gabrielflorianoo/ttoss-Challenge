// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Video = prisma.video;

/**
 * Returns the list of videos.
 * @returns The list of videos.
 */
const get = async () => await Video.findMany();

/**
 * Returns a video by id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [video, error] - The video object and an error object if any.
 */
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

/**
 * Creates a new video.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [video, error] - The newly created video object and an error object if any.
 */
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

/**
 * Updates an existing video.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [video, error] - The newly updated video object and an error object if any.
 */
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

/**
 * Deletes a video from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [video, error] - The deleted video object and an error object if any.
 */
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
