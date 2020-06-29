const express = require('express')
const router = express.Router()

// Logged in checker middleware
const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')

// Role checker middleware
const checkRole = rolesToCheck => (req, res, next) => req.isAuthenticated() && rolesToCheck.includes(req.user.role) ? next() : res.redirect('/login')

// Alternativa para enviar a la vista en el renderizado
const checkAdmin = () => req.user.role.includes('ADMIN')          // Alternativa
const checkUser = () => req.user.role.includes('USER')            // Alternativa
const checkGuest = () => req.user.role.includes('GUEST')          // Alternativa







// Endpoints
router.get('/', (req, res) => {
    console.log('¿Está el usuario logeado?', req.isAuthenticated())
    res.render('index')
})


// Check logged in session 
router.get('/profile', checkAuthenticated, (req, res) => res.render('profile', { user: req.user }))


// Check logged in session & roles
router.get('/rooms', checkRole(['GUEST', 'EDITOR', 'ADMIN']), (req, res) => res.send('AQUÍ VAN LAS HABITACIONES PARA GUEST'))
router.get('/edit-rooms', checkRole(['GUEST', 'EDITOR']), (req, res) => res.send('AQUÍ VAN TUS HABITACIONES PARA EDITOR'))
router.get('/all-rooms', checkRole(['ADMIN']), (req, res) => res.send('AQUÍ VAN TODAS LAS HABITACIONES PARA ADMIN'))



module.exports = router