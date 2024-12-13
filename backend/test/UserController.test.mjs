import {
    get,
    getById,
    create,
    update,
    remove,
} from "../controllers/UserController.js";
import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";

describe("UserController", () => {
    // Simulando a "base de dados" em memória
    let req;

    beforeEach(() => {
        req = { params: {}, body: {} };
    });

    it("should return all users", async () => {

        // Adiciona usuários e verifica novamente
        req.body = { name: "John Doe", email: "john@example.com" };
        await create(req);
        req.body = { name: "Jane Doe", email: "jane@example.com" };
        await create(req);

        const updatedUsers = await get();
        expect(updatedUsers).to.be.an("array").that.has.not.lengthOf(0);
    });

    it("should return a user by id", async () => {
        // Adiciona um usuário
        let email = `john${Math.random() % 999}@example.com`;
        req.body = { name: "John Doe", email: email };
        const [user, _] = await create(req);

        // Simula a busca do usuário pelo ID
        req.params.id = user.id;
        const [foundUser, error] = await getById(req);

        expect(foundUser).to.be.an("object");
        expect(foundUser).to.have.property("id", user.id);
        expect(foundUser).to.have.property("name", "John Doe");
        expect(foundUser).to.have.property("email", email);
        expect(error).to.be.null;
    });

    it("should return an error when user is not found by id", async () => {
        req.params.id = 9999; // ID inexistente
        const [user, error] = await getById(req);

        expect(user).to.be.null;
        expect(error)
            .to.be.an("object")
            .that.has.property("error", "User not found");
    });

    it("should create a new user", async () => {
        let email = `john${Math.random() % 999}@example.com`;
        req.body = { name: "John Doe", email: email };
        const [user, err] = await create(req);

        expect(user).to.be.an("object");
        expect(user).to.have.property("id");
        expect(user).to.have.property("name", "John Doe");
        expect(user).to.have.property("email", email);
    });

    it("should update an existing user", async () => {
        // Cria um usuário
        let email = `john${Math.random() % 999}@example.com`;
        req.body = { name: "John Doe", email: email };
        const [user, _] = await create(req);

        // Atualiza o usuário
        let emailUpdated = `jane${Math.random() % 999}@example.com`;
        req.params.id = user.id;
        req.body = { name: "Jane Doe", email: emailUpdated };
        const [updatedUser, error] = await update(req);

        expect(updatedUser).to.be.an("object");
        expect(updatedUser).to.have.property("id", user.id);
        expect(updatedUser).to.have.property("name", "Jane Doe");
        expect(updatedUser).to.have.property("email", emailUpdated);
        expect(error).to.be.null;
    });

    it("should return an error when updating a non-existent user", async () => {
        req.params.id = 9999; // ID inexistente
        req.body = { name: "Jane Doe", email: "jane@example.com" };
        const [user, error] = await update(req);

        expect(user).to.be.null;
        expect(error)
            .to.be.an("object")
            .that.has.property("error", "User not found");
    });

    it("should delete a user", async () => {
        // Cria um usuário
        let email = `john${Math.random() % 999}@example.com`;
        req.body = { name: "John Doe", email: email };
        const [user, _] = await create(req);

        // Remove o usuário
        req.params.id = user.id;
        const [deletedUser, error] = await remove(req);

        expect(deletedUser).to.be.an("object"); // Já foi removido da lista
        expect(error).to.be.null;

        // Verifica se o usuário foi realmente removido
        const users = await get();
        expect(users).to.be.an("array").that.is.not.has.members([deletedUser]);
    });

    it("should return an error when deleting a non-existent user", async () => {
        req.params.id = 9999; // ID inexistente
        const [user, error] = await remove(req);

        expect(user).to.be.null;
        expect(error)
            .to.be.an("object")
            .that.has.property("error", "User not found");
    });
});
