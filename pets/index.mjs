import { addPet, editPet, deletePet } from './mutations/pet.mutation.mjs'
import { listPets, getPet } from './queries/pet.query.mjs'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.
export const typeDefs = `#graphql
  # OBJECT TYPES
  # This "Pet" type defines the queryable fields for every pet in our data source.
  type Pet {
    id: ID!
    name: String!
    type: String!
    age: Int!
    breed: String!
  }

  # INPUT TYPES
  # Define the input objects for addPet and editPet mutations
  input PetToEdit {
    id: ID!
    name: String!
    type: String!
    age: Int!
    breed: String!
  }

  input PetToAdd {
    name: String!
    type: String!
    age: Int!
    breed: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "pets" query returns an array of zero or more pets.
  # QUERY TYPES
  type Query {
    pets: [Pet],
    pet(id: ID!): Pet
  }

  # MUTATION TYPES
  type Mutation {
    addPet(petToAdd: PetToAdd!): Pet,
    editPet(petToEdit: PetToEdit!): Pet,
    deletePet(id: ID!): [Pet],
  }
`

export const resolvers = {
    // Resolvers for Queries
    Query: {
        pets: () => listPets(),
        pet: (_, { id }) => getPet(id)
    },

    // Resolvers for Mutations
    Mutation: {
        addPet: (_, { petToAdd }) => addPet(petToAdd),
        editPet: (_, { petToEdit }) => editPet(petToEdit),
        deletePet: (_, { id }) => deletePet(id)
    }
}