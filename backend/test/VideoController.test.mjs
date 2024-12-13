import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import {
    get,
    getById,
    create,
    update,
    remove,
} from "../controllers/VideoController.js";

describe("VideoController", () => {
    let req;

    beforeEach(() => {
        req = { params: {}, body: {} };
    });

    it("should return all videos", async () => {
        const videos = await get();
        expect(videos).to.be.an("array");
    });

    it("should return a video by id", async () => {
        req.body = {
            title: "Test Video",
            description: "This is a test video",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
            views: 0,
        };

        const [video, err] = await create(req);
        console.log(err);

        req.params.id = video.id;
        const [foundVideo, error] = await getById(req);

        expect(foundVideo).to.be.an("object");
        expect(foundVideo).to.have.property("id", video.id);
        expect(foundVideo).to.have.property("title", "Test Video");
        expect(foundVideo).to.have.property("description", "This is a test video");
        expect(foundVideo).to.have.property("url", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        expect(foundVideo).to.have.property("thumbnail", "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
        expect(foundVideo).to.have.property("views", 0);
        expect(error).to.be.null;
    });

    it("should create a new video", async () => {
        req.body = {
            title: "Test Video 2",
            description: "This is another test video",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
            views: 0,
        };

        const [createdVideo, _] = await create(req);

        expect(createdVideo).to.be.an("object");
        expect(createdVideo).to.have.property("id");
        expect(createdVideo).to.have.property("title", "Test Video 2");
        expect(createdVideo).to.have.property("description", "This is another test video");
        expect(createdVideo).to.have.property("url", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        expect(createdVideo).to.have.property("thumbnail", "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
        expect(createdVideo).to.have.property("views", 0);
    });

    it("should update a video", async () => {
        req.body = {
            title: "Test Video 3",
            description: "This is another test video",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
            views: 0,
        };

        const [video, _] = await create(req);

        req.params.id = video.id;
        req.body = {
            title: "Test Video 3 Updated",
            description: "This is another test video updated",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
            views: 0,
        };

        const [updatedVideo, __] = await update(req);

        expect(updatedVideo).to.be.an("object");
        expect(updatedVideo).to.have.property("id", video.id);
        expect(updatedVideo).to.have.property("title", "Test Video 3 Updated");
        expect(updatedVideo).to.have.property("description", "This is another test video updated");
        expect(updatedVideo).to.have.property("url", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        expect(updatedVideo).to.have.property("thumbnail", "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
        expect(updatedVideo).to.have.property("views", 0);
    });

    it("should delete a video", async () => {
        req.body = {
            title: "Test Video 4",
            description: "This is another test video",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
            views: 0,
        };

        const [video , _] = await create(req);

        req.params.id = video.id;

        await remove(req);

        const [deletedVideo, __] = await remove(req);

        expect(deletedVideo).to.be.null;
    });
});
