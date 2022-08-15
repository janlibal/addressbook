import admin from 'firebase-admin'
import credentials from '../firestore/key.json'

admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
})

const _db = admin.firestore()

export const saveContact = async (
    contact: any,
    userEmail: string,
    fullName: string
) => {
    return await _db.collection(userEmail).doc(fullName).set(contact)
}
