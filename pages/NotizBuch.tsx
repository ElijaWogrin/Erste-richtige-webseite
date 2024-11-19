'use client'

import Container from 'components/Container';
// pages/index.tsx

import { useEffect, useState } from 'react';

interface Note {
    id: number;
    content: string;
}

const Notizbuch = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<string>('');

    // Lade Notizen vom Server
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data);
    };

    const addNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!note) return;

        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: note }),
        });

        const newNote = await res.json();
        setNotes((prevNotes) => [...prevNotes, newNote.note]);
        setNote('');
    };

    const deleteNote = async (id: number) => {
        await fetch('/api/notes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        setNotes((prevNotes) => prevNotes.filter(n => n.id !== id));
    };

    return (
        <Container>
        <div style={{ padding: '20px' }}>
            <h1>Notizen</h1>
            <form onSubmit={addNote}>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Schreibe deine Notiz hier..."
                />
                <button type="submit">Notiz hinzufügen</button>
            </form>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {note.content}
                        <button onClick={() => deleteNote(note.id)} className='px-4 py-2 ml-4 my-2 bg-gray-500'>Löschen</button>
                    </li>
                ))}
            </ul>
        </div>
        </Container>
    );
};


export default Notizbuch;