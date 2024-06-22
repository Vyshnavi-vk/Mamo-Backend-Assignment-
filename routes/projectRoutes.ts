import express from 'express'
import { addProject, deleteProject, getAllProjects, projectByTag, updateProject } from "../controllers/projectController"
import { protect } from "../middlewares/authMiddleware"


const router = express.Router()

router.post('/create', protect('client'), addProject)
router.put('/update/:id', protect('client'), updateProject)
router.delete('/delete/:id', protect('client'), deleteProject)
router.get('/all-projects', protect('all'), getAllProjects)
router.get('/search', protect('all'), projectByTag)


export default router