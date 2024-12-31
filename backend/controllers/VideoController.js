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

/**
 * Retrieves two random videos from the database.
 * @returns {Array} - An array containing two randomly selected video objects.
 */
const getTwoRandom = async () => {
    const videos = await Video.findMany();
    const randomVideos = videos.sort(() => 0.5 - Math.random()).slice(0, 2);
    return randomVideos;
};

/**
 * Calculates the Elo rating of a video.
 * @param {number} rating - The current Elo rating of the video.
 * @param {number} opponentRating - The Elo rating of the video's opponent.
 * @param {number} k - The k-factor (a constant that determines how much ratings change after a game).
 * @param {number} result - 1 if the video won, 0 if it lost.
 * @returns {number} The new Elo rating of the video.
 */
const eloRating = (rating, opponentRating, k, result) => {
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - rating) / 400));
    return rating + k * (result - expectedScore);
}

/**
 * Increments the vote count of a video.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [video, error] - The video object with the updated vote count and an error object if any.
 */
const vote = async (req, res) => {
    const { winnerId, loserId } = req.body;

    // Select the two videos
    const winner = await Video.findUnique({ where: { id: winnerId } });
    const loser = await Video.findUnique({ where: { id: loserId } });

    // Ensure both videos exist
    let error = null;
    if (!winner || !loser) {
        error = { error: "Um ou ambos os vídeos não foram encontrados" };
        return [null, error];
    }

    // Calculate the new Elo ratings
    const k = 32; // Constant K
    const winnerNewRating = eloRating(winner.eloRating, loser.eloRating, k, 1); // Result 1 means winner
    const loserNewRating = eloRating(loser.eloRating, winner.eloRating, k, 0); // Result 0 means loser

    // Update the videos
    const updatedWinner = await Video.update({
        where: { id: winner.id },
        data: { eloRating: winnerNewRating, votes: winner.votes + 1 },
    });
    const updatedLoser = await Video.update({
        where: { id: loser.id },
        data: { eloRating: loserNewRating },
    });

    return [[updatedWinner, updatedLoser], null];
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
    getTwoRandom,
    vote,
};
