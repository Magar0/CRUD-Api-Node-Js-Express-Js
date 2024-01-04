const fetch = require('node-fetch');

//for POST method.............
it('should create new note', async () => {
    const newNote = { title: "dummy-title", content: "dummy-data-here" };
    const res = await fetch('/api/notes', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
    })
    const data = await res.json();

    expect(res.status).toBe('201');
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title', newNote.title);
    expect(data).toHaveProperty('content', newNote.content);
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('updatedAt');
})



//for GET method...........
describe('should fetch notes on GET method', () => {

    it('should fetch all notes', async () => {
        const note1 = { title: "dummy-title", content: "dummy-data-here" };
        const note2 = { title: "dummy-title", content: "dummy-data-here" };

        await fetch('/api/notes', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note1)
        })
        await fetch('/api/notes', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note2)
        })

        const res = await fetch('/api/notes')
        const data = await res.json()

        expect(res.status).toBe(200);
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(2);
    })


    it('should fetch single note by ID', async () => {
        const jsonData = await fetch('/api/notes', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: { "title": "test-PUT", "content": "testing" }
        })
        const data = await jsonData.json();

        const res = await fetch(`/api/notes/${data._id}`);
        const resData = await res.json();

        expect(res.status).toBe(200);
        expect(resData).toHaveProperty("_id", data._id)
        expect(resData).toHaveProperty('title', 'test-PUT')
        expect(resData).toHaveProperty('content', 'testing')
    })
})



//for PUT method.........
it('should update an existing note', async () => {
    const jsonData = await fetch('/api/notes', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: { "title": "test-PUT", "content": "testing" }
    })
    const originalData = await jsonData.json();

    const updatedNote = { title: "updated-title", content: "updated-content" }
    const res = await fetch(`/api/notes/${originalData._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote)
    })
    const resData = await res.json();

    expect(res.status).toBe(200);
    expect(resData).toHaveProperty('_id', originalData._id)
    expect(resData).toHaveProperty('title', updatedNote.title)
    expect(resData).toHaveProperty('content', updatedNote.content)
})


//for DELETE method
it('should delete a note', async () => {
    const jsonData = await fetch('/api/notes', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: { "title": "test", "content": "testing" }
    })
    const note = await jsonData.json();

    const res = await fetch(`/api/notes/${note._id}`, { method: 'DELETE' });

    expect(res.status).toBe(200);
    expect(res.message).toBe("Note deleted");

    //trying to retreive the deleted note again
    const deletedNote = await fetch(`/api/notes/${note._id}`)
    expect(deletedNote.status).toBe(404);
    expect(deletedNote.message).toBe("Note not found");

})