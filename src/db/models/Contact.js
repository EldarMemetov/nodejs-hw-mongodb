import { Schema, model } from 'mongoose';
import { contactList } from '../../constants/contact.js';
import { handleSaveError, setupUpdateOptions } from './hooks.js';
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactList,
      default: 'personal',
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactsSchema.post('save', handleSaveError);

contactsSchema.pre('findOneAndUpdate', setupUpdateOptions);

contactsSchema.post('findOneAndUpdate', handleSaveError);

const ContactCollection = model('contacts', contactsSchema);
export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];
export default ContactCollection;
