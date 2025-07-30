import contact from "../models/ContactsModel.js";
import Contact from "../models/ContactsModel.js";
import mongoose from "mongoose";

//GET PAGES
export const getContacts = async(req, res)=>{
    try{
        /*  //simple fetching all data at once
        
        const contacts = await Contact.find();
        res.render('home', {contacts: contacts});
        */

        //pagination
        const {page = 1, limit = 3} = req.query;
        const options = {
            page: parseInt(page),                  //by default its string (converting to integer)
            limit: parseInt(limit),

        }
        const result = await Contact.paginate({}, options);
        // res.send(result);
        res.render('home', {
            totalDocs : result.totalDocs,
            limit : result.limit,
            totalPages : result.totalPages,

            currPage : result.page,
            counter : result.pagingCounter,
            
            hasPrevPage : result.hasPrevPage,
            hasNextPage : result.hasNextPage,
            prevPage : result.prevPage,
            nextPage : result.nextPage,

            contacts: result.docs
        })
    }catch(err){
        res.render('500', {message: err});
    }
}

export const showContact =async(req, res)=>{
    let paramId = mongoose.Types.ObjectId.isValid(req.params.id);            //for checking 24 digit id or not
    if(!paramId){
        return res.render('404', {message : "Invalid Id"});
    }

    try{
        const contact = await Contact.findById(req.params.id);           //same as above (mongosse method)
        if(!contact) return res.render('404', {message: "Contact Not Found"});
        res.render('show-contact', {contact});       //if name same single enough
    }catch(err){
        res.render('500', {message: err});
    }
}

export const addContactPage = (req, res)=>{
    res.render('add-contact');
}

export const updateContactPage = async(req, res)=>{
    let paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId){
        return res.render('404', {message : "Invalid Id"});
    }
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.render('404', {message: "Contact Not Found"});
        res.render('update-contact', {contact});
    }catch(err){
        res.render('500', {message: err});
    }
}

//POST (CREATE OF UPDATE)
export const addContact = async(req, res)=>{
    try{
        await Contact.create(req.body);    //no require contact (no use there)
        res.redirect('/');
    }catch(err){
        res.render('500', {message: err});
    }
}

export const updateContact = async(req, res)=>{
    let paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId){
        return res.render('404', {message : "Invalid Id"});
    }
    try{
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);       //use req.body if mongoDB collection name same and form field name same
        if(!contact) return res.render('404', {message: "Contact Not Found"});
        res.redirect('/');
    }catch(err){
        res.render('500', {message: err});
    }
}

export const deleteContact =async(req, res)=>{
    let paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId){
        return res.render('404', {message : "Invalid Id"});
    }
    try{
        const contact  = await Contact.findByIdAndDelete(req.params.id);               //use no required to pass req.body (only id is enough to delete)
        if(!contact) return res.render('404', {message: "Contact Not Found"});
        res.redirect('/');
    }catch(err){
        res.render('500', {message: err});
    }
}