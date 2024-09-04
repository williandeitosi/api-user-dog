import { Request, Response } from "express";
import {prisma} from '../prisma/client'

export const getUser = async (req: Request, res: Response) => {
    
    const user = await prisma.user.findUnique({where: {id: Number(req.params.id)}})

    if(user){
        res.json(user)
    } else {res.status(404).send('User not found')}
}