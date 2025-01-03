// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const User = prisma.user;

/**
 * Returns the list of users.
 * @returns The list of users.
 */
const get = async () => await User.findMany();

/**
 * Returns a user by id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [user, error] - The user object and an error object if any.
 */
const getById = async (req, res) => {
    const user = await User.findFirst({
        where: { id: Number(req.params.id) },
    });
    let error = null;
    if (!user) error = { error: "User not found" };
    return [user, error];
};

/**
 * Creates a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [user, error] - The newly created user object and an error object if any.
 */
const create = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
        };

        const createdUser = await User.create({
            data: user,
        });

        return [createdUser, null];
    } catch (error) {
        return [null, error];
    }
};

/**
 * Logs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [user, error] - The logged in user object and an error object if any.
 */
const login = async (req, res) => {

    const email = req.body.email;
    // Check if email is not trying to inject code
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return [null, { error: "Invalid email format" }];
    }

    const password = req.body.password;
    // Check if password is not trying to inject code with white spaces
    if (password.includes(" ")) {
        return [null, { error: "Invalid password" }];
    }

    const user = await User.findFirst({
        where: {
            email: email,
            password: password,
        },
    });
    let error = null;
    if (!user) error = { error: "User not found" };
    return [user, error];
};

/**
 * Updates an existing user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [user, error] - The newly updated user object and an error object if any.
 */
const update = async (req, res) => {
    const [oldUser, error] = await getById(req);

    let updatedUser = null;
    if (oldUser) {
        updatedUser = await User.update({
            where: {
                id: oldUser.id,
            },
            data: {
                name: req.body.name,
                email: req.body.email,
            },
        });
    }

    return [updatedUser, error];
};

/**
 * Removes a user from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} [user, error] - The deleted user object and an error object if any.
 */
const remove = async (req, res) => {
    const [user, error] = await getById(req);

    if (user) {
        await User.delete({
            where: {
                id: user.id,
            },
        });
    }

    return [user, error];
};

module.exports = {
    get,
    getById,
    create,
    login,
    update,
    remove,
};
