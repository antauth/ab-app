import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CandidateForm({ candidate, handleSubmit, onEntry }) {
    return (
        <Col>
            <Row>
                <h2>Or, add a new candidate</h2>
            </Row>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control
                            type="text"
                            placeholder="Enter candidate name"
                            onChange={onEntry}
                            value={candidate}
                            aria-label="Candidate name"
                            required
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="dark"
                    >
                        Vote
                    </Button>
                </Form>
            </Row>
        </Col>
    );
}
function VoteForm({ candidates, handleSubmit, handleSelect }) {
    return (
        <Col>
            <Row>
                <Form id="vote-form" onSubmit={handleSubmit}>
                    {candidates.map((candidate) => (
                        <Form.Check
                            type="radio"
                            key={candidate.id}
                            id={candidate.id}
                            label={candidate.name}
                            value={candidate.id}
                            onChange={handleSelect}
                        />
                    ))}
                    <Button
                        type="submit"
                        variant="dark"
                    >
                        Vote
                    </Button>
                </Form>
            </Row>
        </Col>
    );
}

const Vote = ({ voter }) => {
    if (!voter) {
        return <div>
            <p>You must be <a href="/login">logged in</a> to vote.</p>
        </div>
    }

    const [me, setMe] = useState([])
    const [candidate, setCandidate] = useState("")
    const [candidateId, setCandidateId] = useState("")
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const response = await window.fetch('/candidates')
                if (!response.ok) throw Error(response.statusText)
                const data = await response.json()
                setCandidates(data)
            } catch (error) {
                console.error(error.message)
            }
        }
        getCandidates()
    }, [])

    const voteForCandidate = (event) => {
        if(event) {
            event.preventDefault()
        }
        
        const formData = {
           candidateId: candidateId
        }
        fetch("/votes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText)
                return response.json()
            })
            .then((data) => {
                if (data.message) {
                    alert(data.message)
                } else {
                    alert(`Successfully voted for ${data.name}`)
                }
                
            })
            .catch((error) => alert(`Unable to collect vote. Perhaps you already voted? ---- DEBUG: ${error}`))

    }
    const addCandidate = (event) => {
        event.preventDefault()
        const formData = {
            candidate: candidate
        }
        fetch("/candidates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText)
                return response.json()
            })
            .then((data) => {
                if (data.message) {
                    alert(data.message)
                } else {
                    const newCandidates = [...candidates, data]
                    setCandidates(newCandidates)
                    alert(`Successfully added candidate ${data.name}`)
                    voteForCandidate(candidate)
                }
            })
            .catch((error) => alert(error))
    }
    const handleOptionChange = (event) => {
        setCandidateId(event.target.value)
        document.querySelectorAll('input[type=radio]').forEach(input => {
            input.checked = false
        })
        event.target.checked = true
    }
    const isSelected = (event) => {
        return event.target.id === candidateId
    }

    return (
        <div>
            <Col>
                <Row>
                    <h1>Cast your vote today!</h1>
                    {candidates.length > 0 ? <VoteForm
                        candidates={candidates}
                        handleSubmit={voteForCandidate}
                        handleSelect={handleOptionChange}
                        //checkedCandidateId={isSelected}
                    /> : <span></span>}
                </Row>
                <Row>
                    <div className="mb-3">
                        <hr />
                    </div>

                </Row>
                <Row>
                    <CandidateForm
                        candidate={candidate}
                        handleSubmit={addCandidate}
                        onEntry={(event) => setCandidate(event.target.value)}
                    />
                </Row>
            </Col>


        </div>
    )
}

export default Vote;