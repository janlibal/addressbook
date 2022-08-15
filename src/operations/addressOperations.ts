import { saveContact } from '../repositories/addressRepository'

export const createContact = async (contact: any, userEmail: string) => {
    const fullName = contact.lastName + ', ' + contact.firstName

    const data = await saveContact(contact, userEmail, fullName)

    return data
}
