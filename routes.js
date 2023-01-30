
const express = require('express');
const router = express.Router();
const TextController = require('./controllers/TextController')
const AccountController = require('./controllers/AccountController')

router.post('/check', TextController.checkLevelPost)
router.post('/check/share', TextController.checkLevelPostShare)

router.post('/count', TextController.getPageCount)
router.post('/browse', TextController.getTexts)
router.post('/getOne', TextController.getOne) 
router.post('/getNext', TextController.getNext)

router.post('/register', AccountController.postRegister)
router.post('/login', AccountController.postLogin)
router.post('/user/password', AccountController.postPassword)
router.post('/update', TextController.updateAll)

module.exports = router;