import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Form, FormGroup, Label, Input, Button, Row, Col, Container, Card, CardBody
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api/api';

function ViewStudent() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState({
        name: '',
        email: '',
        age: ''
    });

    const [subjects, setSubjects] = useState([
        { subject: '', score: '' }
    ]);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/students/${id}`);
                const data = response.data;

                setStudent({
                    name: data.name,
                    email: data.email,
                    age: data.age
                });
                setSubjects(data.marks || []);
            } catch (error) {
                alert('Failed to fetch student');
            }
        };

        fetchStudent();
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSubjects = [...subjects];
        updatedSubjects[index][name] = value;
        setSubjects(updatedSubjects);
    };

    const addSubjectField = () => {
        setSubjects([...subjects, { subject: '', score: '' }]);
    };

    const showUpdateSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Student updated successfully!',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const showUpdateError = (text) => {
        Swal.fire({
            icon: 'error',
            title: 'Failed to update student',
            text,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...student,
            age: parseInt(student.age),
            marks: subjects.map(subj => ({
                subject: subj.subject,
                score: parseInt(subj.score)
            }))
        };

        try {
            const response = await api.put(`/students/${id}`, updatedData);

            if (response.status === 200) {
                showUpdateSuccess();
                setTimeout(() => {
                    navigate('/');
                }, 1800);
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || error.message || 'Unknown error';
            showUpdateError(errMsg);
        }
    };


    return (
        <Container className="mt-4">
            <Card className="shadow p-4">
                <CardBody>
                    <h3 className="text-center mb-4">Update Student</h3>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={student.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={student.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="age">Age</Label>
                                    <Input
                                        type="number"
                                        name="age"
                                        id="age"
                                        value={student.age}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <h5 className="mt-4">Subjects</h5>
                        {subjects.map((subject, index) => (
                            <Row key={index}>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Subject Name</Label>
                                        <Input
                                            type="text"
                                            name="subject"
                                            value={subject.subject}
                                            onChange={(e) => handleSubjectChange(index, e)}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Marks</Label>
                                        <Input
                                            type="number"
                                            name="score"
                                            value={subject.score}
                                            onChange={(e) => handleSubjectChange(index, e)}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        ))}

                        <div className="mb-3">
                            <Button type="button" color="info" onClick={addSubjectField}>
                                + Add Subject
                            </Button>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button type="button" color="secondary" onClick={() => navigate("/")}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Update
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}

export default ViewStudent;
