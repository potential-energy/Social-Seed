const router = require('express').Router()
const auth = require("../middleware/auth")
const organizationCtrl = require("../controllers/organizationCtrl")

router.post('/organization', auth, organizationCtrl.createOrganization)


router.route('/organization/:id')
    .patch(auth,  organizationCtrl.updateOrganization)
    .get(auth,    organizationCtrl.getOrganization)
    .delete(auth, organizationCtrl.deleteOrganization)

module.exports = router