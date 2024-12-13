const users = [];

const getUserById = (id) => users.find(user => user.id === id);

const get = (req, res) => users;

const getById = (req, res) => {
    const user = getUserById(req.params.id);
    let error = null;
    if (!user) error = { error: 'User not found' };
    return [user, error];
};

const create = (req, res) => {
    const user = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(user);
    return user;
};

const update = (req, res) => {
    const user = getUserById(req.params.id);
    let error = null;
    if (!user) {
        error = { error: 'User not found' };
        return [null, error];
    };
    user.name = req.body.name;
    user.email = req.body.email;
    return [user, error];
};

const remove = (req, res) => {
    const index = users.findIndex(user => user.id === Number(req.params.id));
    let error = null;
    if (index === -1) {
        error = { error: 'User not found' }
        return [null, error];
    };
    const deletedUser = users[index];
    users.splice(index, 1);
    return [deletedUser, error];
};

module.exports = {
    get,
    getById,
    create,
    update,
    remove
};
