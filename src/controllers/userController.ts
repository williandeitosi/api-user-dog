import { Request, Response } from "express";
import { prisma } from '../../prisma/client';
import { emailExists } from "../utils/helpers";



export const createUser = async (req: Request, res: Response) => {
    const data = req.body
    const {email} = data



    if(await emailExists(email)) {
        return res.status(500).json({message: 'Email already exists'})
    }


    const newUser = await prisma.user.create({data})

    if(data) {
        return res.status(201).json({message: 'user created successfully', user: newUser})
    }
}

export const getUser = async (req: Request, res: Response) => {

    const id = Number(req.params.id)
    
    const user = await prisma.user.findUnique({where: {id}})

    if(user){
        return res.status(200).json(user)
    } else {res.status(404).send('User not found')}
}