import React, { useState } from 'react';
import api from '../api/api';
import {
    Form, FormGroup, Label, Input, Button, Row, Col, Container, Card, CardBody
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';


function AddStudent() {
    const navigate = useNavigate()
    const [student, setStudent] = useState({
        name: '',
        email: '',
        age: ''
    });

    const [subjects, setSubjects] = useState([
        { subjectName: '', marks: '' }
    ]);

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
        setSubjects([...subjects, { subjectName: '', marks: '' }]);
    };

    const showCreationSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Student created successfully!',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const showCreationError = (text) => {
        Swal.fire({
            icon: 'error',
            title: 'Failed to create student',
            text,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const marks = subjects.map((subj) => ({
            subject: subj.subjectName,
            score: parseInt(subj.marks)
        }));

        const finalData = {
            ...student,
            age: parseInt(student.age),
            marks
        };

        try {
            const response = await api.post('/students', finalData);

            if (response.status === 201) {
                showCreationSuccess(); 
                setTimeout(() => {
                    navigate('/');
                }, 1800);
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || error.message || 'Unknown error';
            showCreationError(errMsg); 
        }
    };





    return (
        <Container className="mt-4">
            <Card className="shadow p-4">
                <CardBody>
                    <h3 className="text-center mb-4">Add Student</h3>
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
                                            name="subjectName"
                                            value={subject.subjectName}
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
                                            name="marks"
                                            value={subject.marks}
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

                        {/* Submit and Cancel buttons in one line */}
                        <div className="d-flex justify-content-between">
                            <Button type="button" color="secondary" onClick={() => navigate("/")}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>

                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}

export default AddStudent;
