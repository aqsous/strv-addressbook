import * as firebaseAdmin from 'firebase-admin';
import { IContact } from '../../models/contact.model';

// const serviceAccount = require('../../../../../strv-addressbook-qsous-adham-firebase-adminsdk-1ganv-1939c63e9b.json');

firebaseAdmin.initializeApp({
  // credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://strv-addressbook-qsous-adham.firebaseio.com',
});

const CONTACTS_COLLECTION_NAME = 'Contact';

const db = firebaseAdmin.firestore();

const contactCollection = db.collection(CONTACTS_COLLECTION_NAME);

export const create = async (contactData: IContact) => {
  const contact = await contactCollection.add(contactData);
  return contact.id;
};

export const update = async () => {
};
