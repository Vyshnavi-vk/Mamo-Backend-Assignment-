import { Request, Response } from 'express'
import Project from '../models/projectModel'

export const addProject = async (req: Request, res: Response) => {
    try {
        const { name, description, tags } = req.body
        const clientId = (req as any).user._id
        const project = await Project.create({ name, description, tags, clientId })
        res.status(200).json({ msg: "Project created successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { name, description, tags } = req.body

        const project = await Project.findByIdAndUpdate(
            { _id: req.params.id, clientId: (req as any).user._id },
            { name, description, tags },
            { new: true }
        )

        if (!project) {
            return res.json({ msg: "Project not found" })
        }

        res.status(200).json({ msg: "Project updated successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const project = await Project.findByIdAndDelete({ _id: id, clientId: (req as any).user._id })

        if (!project) {
            return res.json({ msg: "project not found" })
        }

        if (project) res.send('project deleted successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}


export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}


export const projectByTag = async (req: Request, res: Response) => {
    try {
        const { tag } = req.query;
        const tagsArray = (tag as string).split(',');

        const projects = await Project.find({ tags: { $in: tagsArray } });
        res.status(200).json(projects);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}