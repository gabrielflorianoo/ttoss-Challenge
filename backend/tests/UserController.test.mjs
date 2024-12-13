import { get, getById, create, update, remove } from '../controllers/UserController.js';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';

describe('UserController', () => {
    // Simulando a "base de dados" em memória
    let req;

    beforeEach(() => {
        req = { params: {}, body: {} };
    });

    it('should return all users', () => {
        // Inicialmente, a lista de usuários está vazia
        const users = get();
        expect(users).to.be.an('array').that.is.empty;

        // Adiciona usuários e verifica novamente
        req.body = { name: 'John Doe', email: 'john@example.com' };
        create(req);
        req.body = { name: 'Jane Doe', email: 'jane@example.com' };
        create(req);

        const updatedUsers = get();
        expect(updatedUsers).to.be.an('array').that.has.lengthOf(2);
    });

    it('should return a user by id', () => {
        // Adiciona um usuário
        req.body = { name: 'John Doe', email: 'john@example.com' };
        const user = create(req);

        // Simula a busca do usuário pelo ID
        req.params.id = user.id;
        const [foundUser, error] = getById(req);

        expect(foundUser).to.be.an('object');
        expect(foundUser).to.have.property('id', user.id);
        expect(foundUser).to.have.property('name', 'John Doe');
        expect(foundUser).to.have.property('email', 'john@example.com');
        expect(error).to.be.null;
    });

    it('should return an error when user is not found by id', () => {
        req.params.id = 9999; // ID inexistente
        const [user, error] = getById(req);

        expect(user).to.be.undefined;
        expect(error).to.be.an('object').that.has.property('error', 'User not found');
    });

    it('should create a new user', () => {
        req.body = { name: 'John Doe', email: 'john@example.com' };
        const user = create(req);

        expect(user).to.be.an('object');
        expect(user).to.have.property('id');
        expect(user).to.have.property('name', 'John Doe');
        expect(user).to.have.property('email', 'john@example.com');
    });

    it('should update an existing user', () => {
        // Cria um usuário
        req.body = { name: 'John Doe', email: 'john@example.com' };
        const user = create(req);

        // Atualiza o usuário
        req.params.id = user.id;
        req.body = { name: 'Jane Doe', email: 'jane@example.com' };
        const [updatedUser, error] = update(req);

        expect(updatedUser).to.be.an('object');
        expect(updatedUser).to.have.property('id', user.id);
        expect(updatedUser).to.have.property('name', 'Jane Doe');
        expect(updatedUser).to.have.property('email', 'jane@example.com');
        expect(error).to.be.null;
    });

    it('should return an error when updating a non-existent user', () => {
        req.params.id = 9999; // ID inexistente
        req.body = { name: 'Jane Doe', email: 'jane@example.com' };
        const [user, error] = update(req);

        expect(user).to.be.null;
        expect(error).to.be.an('object').that.has.property('error', 'User not found');
    });

    it('should delete a user', () => {
        // Cria um usuário
        req.body = { name: 'John Doe', email: 'john@example.com' };
        const user = create(req);

        // Remove o usuário
        req.params.id = user.id;
        const [deletedUser, error] = remove(req);

        expect(deletedUser).to.be.an('object'); // Já foi removido da lista
        expect(error).to.be.null;

        // Verifica se o usuário foi realmente removido
        const users = get();
        expect(users).to.be.an('array').that.is.not.has.members([deletedUser]);
    });

    it('should return an error when deleting a non-existent user', () => {
        req.params.id = 9999; // ID inexistente
        const [user, error] = remove(req);

        expect(user).to.be.null;
        expect(error).to.be.an('object').that.has.property('error', 'User not found');
    });
});