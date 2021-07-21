const http = require('http');
const express = require('express')
const Contact = require('../models/contact')
const auth = require('../middleware/auth')
const router = new express.Router()

// router.get('/', function (req, res, next) {
// 	res.render('contact', { title: ' What we have to do?' });
// });

// create new contact
router.post('/contact', auth, async (req, res,) => {
  const contact = new Contact ({
    name: req.body.name,
    phone: parseInt(req.body.phone),
    email: req.body.email,
    owner: req.user.email
  })
  try {
     await contact.save()
      res.status(201).send(contact)
  } catch (e) {
      res.status(400).send(e)
    }
})

// find all the contacts
router.get('/contact', auth, async (req, res,) => {
  try {
    const contact = await Contact.find({ owner: req.user.email })
    res.send(contact)
  } catch (e) {
    res.status(500).send(e)
  }
})

// find one contact
router.get('/contact/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const contact = await Contact.findOne({ _id, owner: req.user.email })

    if (!contact) {
      return res.status(404).send()
    }
    res.send(contact)
  } catch (e) {
    res.status(500).send()
  }
})

// edit contact
router.patch('/contact/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'phone', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

  try{
    const contact = await Contact.findById(req.params.id)
    if(contact.owner == req.user.email){
    updates.forEach((update) => contact[update] = req.body[update])
    await contact.save()
    }
    else if(contact.owner != req.user.email){
      return res.status(400).send(e)
    }
    if (!contact) {
      return res.status(404).send()
    }
    res.send(contact)
  } catch (e) {
    res.status(400).send(e)
  }
})

// delete contact
router.delete('/contact/:id/delete', auth, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user.email })
    
    if (!contact) {
      return res.status(404).send()
    }
    res.send(contact)
  } catch (e) {
    res.status(500).send()
  }
})
      
module.exports = router