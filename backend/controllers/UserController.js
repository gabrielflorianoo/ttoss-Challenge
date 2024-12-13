// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const User = prisma.user;

const get = async (req, res) => await User.findMany();

const getById = async (req, res) => {
    const user = await User.findFirst({
        where: { id: Number(req.params.id) },
    });
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
    update,
    remove,
};
