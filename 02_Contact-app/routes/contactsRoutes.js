import express from "express";
import { addContact, addContactPage, deleteContact, getContacts, showContact, updateContact, updateContactPage } from "../controller/ContactController.js";
const router = express.Router();

//Routes ********************************************
//GET REQUESTS
router.get('/', getContacts);

router.get('/show-contact/:id', showContact);

router.get('/add-contact', addContactPage);

router.get('/update-contact/:id', updateContactPage);

//POST requests
router.post('/add-contact', addContact);

router.post('/update-contact/:id', updateContact);

router.get('/delete-contact/:id', deleteContact);

/******************************************************************* */

export default router; 