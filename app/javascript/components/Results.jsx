import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const Results = () => {

    const [votes, setVotes] = useState([])

    useEffect(() => {
        const getVotes = async () => {
            try {
                const response = await window.fetch("/summary")
                if (!response.ok) throw Error(response.statusText)
                   
                let data = await response.json()
                 if(!Array.isArray(data)) {
                        data = [data]
                    }
                setVotes(data)
            } catch (error) {
                console.error(error.message)
            }
        }
        getVotes()
    }, [])
   
    return (
        <div>
            <h1>Results</h1>
            <Table bordered>
                <tbody>
                    {votes.map(vote => (
                        <tr>
                            <td>{vote.name}</td>
                            <td>{vote.total}</td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        </div>
    )
}

export default Results;