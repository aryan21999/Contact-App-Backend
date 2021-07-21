const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { getContacts, addContact,updateContact,deleteContact } = require('../controllers/contacts');

router.route('/').get(auth, getContacts);

router.route('/').post(
  [
    auth,
    [
      check('name', 'name is required')
        .not()
        .isEmpty()
    ]
  ],
  addContact
);

router.route('/:id').put(auth,updateContact);

router.route('/:id').delete(auth,deleteContact);

module.exports = router;
