import express from 'express'
import { chatSummary, ragModel } from '../controllers/aiChatController.js'
import {verifyUser} from '../middleware/verifyUser.js'
import {onlyAgent} from '../middleware/onlyAgent.js'
import { onlyUser } from '../middleware/onlyUser.js'
const router = express.Router()

router.post("/chat-summary",verifyUser,onlyAgent,chatSummary)
router.post("/rag-question",verifyUser,onlyUser,ragModel)

export default router