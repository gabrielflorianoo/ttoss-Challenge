// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const User = prisma.user;

const getUserById = async (id) => {
    try {
        const user = await User.findFirst({
            where: { id: id }, // Certifique-se de que `id` é um número
        });

        return user;
    } catch (error) {
        return null;
    }
};

const get = async (req, res) => await User.findMany();

const getById = async (req, res) => {
    const user = await getUserById(req.params.id);
    let error = null;
    if (!user) error = { error: "User not found" };
    return [user, error];
};

const create = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
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

const update = async (req, res) => {
    const oldUser = await getUserById(req.params.id);
    let error = null;
    if (!oldUser) {
        error = { error: "User not found" };
        return [null, error];
    }

    const updatedUser =await User.update({
        where: {
            id: oldUser.id,
        },
        data: {
            name: req.body.name,
            email: req.body.email,
        },
    });

    return [updatedUser, error];
};

const remove = async (req, res) => {
    const user = await getUserById(req.params.id);
    let error = null;
    if (!user) {
        error = { error: "User not found" };
        return [null, error];
    }

    await User.delete({
        where: {
            id: user.id,
        },
    });

    return [user, error];
};

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
};
