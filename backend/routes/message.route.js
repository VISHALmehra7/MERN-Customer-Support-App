import express from 'express'
import { createMessage, getMessages } from '../controllers/messageController.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.post("/create-message",verifyUser,createMessage)
router.post("/get-messages",verifyUser,getMessages)

export default router