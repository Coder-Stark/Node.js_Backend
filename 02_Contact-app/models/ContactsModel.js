import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const ContactSchema = mongoose.Schema({
    firstName:{type: String},
    lastName: {type: String},
    email: {type: String},
    phone: {type: String},
    address: {type: String}
})

ContactSchema.plugin(mongoosePaginate);

const contact = mongoose.model("Contact", ContactSchema);       //(schema name, which schema enters)
export default contact;