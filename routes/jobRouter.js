const router = require('express').Router()
const auth = require("../middleware/auth")
const jobCtrl = require("../controllers/jobCtrl")

router.post('/job', auth, jobCtrl.createJob)


router.route('/job/:id')
    .patch(auth,  jobCtrl.updateJob)
    .get(auth,    jobCtrl.getJob)
    .delete(auth, jobCtrl.deleteJob)

module.exports = router