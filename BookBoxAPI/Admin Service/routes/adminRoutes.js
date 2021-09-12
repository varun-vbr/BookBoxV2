const express = require('express');
const adminController = require('./../controllers/adminController');

const router = express.Router();

router.use(adminController.protect);
router.post('/', adminController.createAdmin);
router.post('/adminType', adminController.createAdminType);
router.get('/user/:userId', adminController.hasUserAdminPrevilege, adminController.findUserById);
router.post('/issueType', adminController.hasUserSupportAdminPrevilege, adminController.createIssueType);
router.post('/ticket', adminController.createUserTicket);
router.patch('/ticket', adminController.hasUserSupportAdminPrevilege, adminController.updateUserTicket);
router.get('/ticket/:ticketRefNo', adminController.hasUserSupportAdminPrevilege, adminController.getUserTicket);
router.get('/tickets/:userId', adminController.hasUserSupportAdminPrevilege, adminController.getTicketsForUser);
router.get('/tickets', adminController.hasUserSupportAdminPrevilege, adminController.getAllUserTickets);
module.exports = router;