import {Request, Response} from 'express';

const express = require('express');
const router = express.Router();

interface Member {
    id: string;
    password: string;
    name: string;
}

const membersMemory = new Map<string, Member>();

router.get('/:page', (req: Request, res: Response) => {

    const page: number = Number.parseInt(req.params.page);
    if(isNaN(page)) {
        res.status(400).json({message: 'Invalid page number'});
        return;
    }
    res.status(200).json({members: Array.from(membersMemory.values())});
});

router.post('/', (req: Request, res: Response) => {

    const newMember: Member = req.body;
    membersMemory.set(newMember.id, newMember);
    res.status(200).send({message: 'Member is created'});
});

router.put('/', (req: Request, res: Response) => {

    const updatedMember: Member = req.body;
    membersMemory.set(updatedMember.id, updatedMember);
    res.status(200).send({message: 'Member is updated'});
});

router.delete('/:id', (req: Request, res: Response) => {

    const deletedId = req.params.id;
    membersMemory.delete(deletedId);
    res.status(200).send({message: 'Member is deleted'});
});

export default router;
