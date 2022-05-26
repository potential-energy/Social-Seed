const router = require('express').Router()
const auth = require("../middleware/auth")
const eventCtrl = require("../controllers/eventCtrl")

router.post('/event', auth, eventCtrl.createEvent)


router.route('/event/:id')
    .patch(auth,  eventCtrl.updateEvent)
    .get(auth,    eventCtrl.getEvent)
    .delete(auth, eventCtrl.deleteEvent)

module.exports = router