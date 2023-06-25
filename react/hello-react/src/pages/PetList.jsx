import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function PetList() {

    const [pets, setPets] = useState([])

    const getPets = () => {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                query Pets {
                    pets {
                    id
                    name
                    type
                    breed
                    }
                }
                `
            })
        })
            .then(response => response.json())
            .then(data => setPets(data?.data?.pets))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getPets()
    }, [])

    return (
        <>
            <h2>Pet List</h2>

            <Link to='/add'>
                <button>Add new pet</button>
            </Link>

            {pets?.map(pet => {
                return (
                    <div key={pet?.id}>
                        <p>
                            {pet?.name} - {pet?.type} - {pet?.breed}
                        </p>

                        <Link to={`/${pet?.id}`}>
                            <button>Pet detail</button>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default PetList