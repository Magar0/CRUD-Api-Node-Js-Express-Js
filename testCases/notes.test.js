const request = require('supertest');
const app = require('../server.js')


//for POST method.............
it('should create new note', async () => {
    const newNote = { title: "dummy-title", content: "dummy-data-here" };
    const response = await request(app).post('/api/notes').send(newNote);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('title', newNote.title);
    expect(response.body).toHaveProperty('content', newNote.content);
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
})



//for GET method...........
describe('should fetch notes on GET method', () => {

    it('should fetch all notes', async () => {
        const note1 = { title: "dummy-title", content: "dummy-data-here" };
        const note2 = { title: "dummy-title", content: "dummy-data-here" };

        await request(app).post('/api/notes').send(note1);
        await request(app).post('/api/notes').send(note2);

        const response = await request(app).get('/api/notes')

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // expect(response.body).toHaveLength(2);
    })


    it('should fetch single note by ID', async () => {
        const dataPosted = await request(app).post('/api/notes').send({
            title: "test", content: "testing"
        });
        const response = await request(app).get(`/api/notes/${dataPosted.body._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id", dataPosted.body._id)
        expect(response.body).toHaveProperty('title', 'test')
        expect(response.body).toHaveProperty('content', 'testing')
    })
})



//for PUT method.........
it('should update an existing note', async () => {
    const dataPosted = await request(app).post('/api/notes').send({
        title: "test", content: "testing"
    });

    const updatedNote = { title: "updated-title", content: "updated-content" }
    const res = await request(app).put(`/api/notes/${dataPosted.body._id}`).send(updatedNote)

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', dataPosted.body._id)
    expect(res.body).toHaveProperty('title', updatedNote.title)
    expect(res.body).toHaveProperty('content', updatedNote.content)
})


//for DELETE method
it('should delete a note', async () => {
    const note = await request(app).post('/api/notes').send({
        title: "test", content: "testing"
    });

    const response = await request(app).delete(`/api/notes/${note.body._id}`)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Note deleted");

    //trying to retreive the deleted note again
    const deletedNote = await request(app).get(`/api/notes/${note.body._id}`)
    expect(deletedNote.status).toBe(404);
    expect(deletedNote.body.message).toBe("Note not found");

})