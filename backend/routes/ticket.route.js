import express from 'express'
import { createKnowledge, createTicket, getAllTickets, getUserTickets } from '../controllers/ticketController.js'
import { onlyUser } from '../middleware/onlyUser.js'
import {onlyAgent} from '../middleware/onlyAgent.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.post("/create-ticket",verifyUser,onlyUser,createTicket)
router.get("/get-user-ticket",verifyUser,onlyUser,getUserTickets)
router.get("/get-all-tickets",verifyUser,onlyAgent,getAllTickets)
router.post("/create-knowledge",verifyUser,onlyAgent,createKnowledge)


export default router