import { Request, Response } from "express";
import { prisma } from '../../prisma/client';
import { emailExists } from "../utils/helpers";



export const createUser = async (req: Request, res: Response) => {
    const data = req.body
    const { email, name, dogNames} = data


    if (await emailExists(email)) {
        return res.status(500).json({ message: 'Email already exists' })
    }


    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            dog: {
                /* como sao varios nomes , isso e para iterara o nome de todos os cachorros */
                create: dogNames.map((dogName: any) => ({name: dogName}))
            }
        }
    })

    if (data) {
        return res.status(201).json({ message: 'user created successfully', user: newUser })
    }
}

export const getUser = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    if (!id) {
        return res.status(404).json({ message: 'ID not found' })
    }

    const user = await prisma.user.findUnique({ where: { id }, include: {
        dog: true
    } })

    if (user) {
        return res.status(200).json(user)
    } else { res.status(404).send('User not found') }
}

export const getAllUsers = async (req: Request, res: Response) => {
    const allUsers = await prisma.user.findMany()

    if (allUsers) {
        return res.status(200).json(allUsers)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const data = req.body
    const {name, email, dogNames} = data
    const id = Number(req.params.id)

    if (!id) {
        return res.status(404).json({ message: 'ID not found' })
    }

    const attUser = await prisma.user.update({
        where: { id },
        data: {
            email,
            name,
            dog: {
                create: dogNames.map((dogName: string[]) => ({name: dogName}))
            }
        }

    })

    if (attUser) {
        const { id, ...userWithoutId } = attUser
        return res.status(200).json({ message: "Updated successfully", userWithoutId })
    } else {
        return res.status(500).json({ message: 'Unable to update this user' })
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
        return res.status(404).json({ message: "ID not found" })
    }

    const removeUser = await prisma.user.delete({ where: { id } })

    if (removeUser) {
        return res.status(200).json({ message: "Deleted successfully" })
    } else {
        return res.status(500).json({ message: "Error to deleted this user" })
    }
}