import { getItem, listItems } from '../models/pet.model.mjs'

export const getPet = id => {
    try {
        const resp = getItem(id)
        return resp
    } catch (err) {
        return err
    }
}

export const listPets = () => {
    try {
        const resp = listItems()
        return resp
    } catch (err) {
        return err
    }
}