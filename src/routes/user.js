const router = require('express').Router();
const { verifyUser } = require('../middleware/auth');
const userController = require('../controllers/user');

// user login and signup
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// form create and get
router.route('/form')
  .get(verifyUser, userController.getForms)
  .post(verifyUser, userController.createForm);

//   update and delete created form
router.route('/form/:id')
  .patch(verifyUser, userController.updateForm)
  .delete(verifyUser, userController.deleteForm);

//   get applicants
router.route('/applicants')
  .get(verifyUser, userController.getApplicants)
  .post(userController.submitApplication);

//   get single applicant also update applicant status
router.route('/applicants/:id')
  .get(verifyUser, userController.getApplicant)
  .patch(verifyUser, userController.updateApplicant);

module.exports = router;
