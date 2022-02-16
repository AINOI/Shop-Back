import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  register,
  login,
  logout,
  extend,
  getUserInfo,
  updataInfo
} from '../controllers/users.js'

const router = express.Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), login)
router.delete('/logout', auth, logout)
router.post('/logout', auth, extend)
router.get('/me', auth, getUserInfo)
router.patch('/reinfo', auth, content('multipart/form-data'), upload, updataInfo)

export default router
