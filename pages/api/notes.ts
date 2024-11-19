// pages/api/notes.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface Note {
    id: number;
    content: string;
}

let notes: Note[] = [];
let idCounter = 1;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Alle Notizen zurückgeben
        res.status(200).json(notes);
    } else if (req.method === 'POST') {
        // Neue Notiz hinzufügen
        const { content }: { content: string } = req.body;
        const newNote: Note = { id: idCounter++, content };
        notes.push(newNote);
        res.status(201).json({ message: 'Note added', note: newNote });
    } else if (req.method === 'DELETE') {
        // Notiz entfernen
        const { id }: { id: number } = req.body;
        notes = notes.filter(note => note.id !== id);
        res.status(200).json({ message: 'Note deleted' });
    } else {
        // Methode nicht erlaubt
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}