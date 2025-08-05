import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(5); 
    const [total, setTotal] = useState(0);


    const navigate = useNavigate();

    const fetchStudents = () => {
        api.get(`/students?page=${page}&limit=${limit}`)
            .then((response) => {
                setStudents(response.data.data);
                setTotal(response.data.total);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
            });
    };


    useEffect(() => {
        fetchStudents();
    }, [page]);


    const handleSearch = async () => {
        if (searchId.trim() === '') return;

        try {
            const response = await api.get(`/students/${searchId}`);
            setStudents([response.data]); 
            setIsFiltered(true);
        } catch (error) {
            Swal.fire('Not Found', `No student found with ID ${searchId}`, 'warning');
        }
    };

    const handleReset = () => {
        setSearchId('');
        fetchStudents();
        setIsFiltered(false);
    };



    const handleView = (id) => {
        navigate(`/view-student/${id}`);
    };

    const confirmDelete = async () => {
        return await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this student?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
    };

    const handleDelete = async (id) => {
        const result = await confirmDelete();

        if (result.isConfirmed) {
            try {
                await api.delete(`/students/${id}`);
                Swal.fire('Deleted!', 'Student has been deleted.', 'success');
                fetchStudents(); 
            } catch (error) {
                const errMsg = error.response?.data?.error || error.message || 'An error occurred.';
                Swal.fire('Error', errMsg, 'error');
            }
        }
    };



    return (
        <Container>
            <h2 className="text-center mt-4 mb-4">All Students</h2>

            <Row className="mb-3 align-items-center">
                <Col md="6">
                    <div style={{ maxWidth: '280px', display: 'flex', gap: '5px' }}>
                        <Input
                            type="text"
                            placeholder="Enter student ID..."
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button color="secondary" onClick={handleSearch}>Search</Button>
                        {isFiltered && (
                            <Button color="warning" onClick={handleReset}>Reset</Button>
                        )}
                    </div>
                </Col>
                <Col md="6" className="text-end">
                    <Button color="primary" onClick={() => navigate("/addstudent")}>Add Student</Button>
                </Col>
            </Row>


           
            <Table bordered className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Student Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.id}>
                                <th scope="row">{student.id}</th>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => handleDelete(student.id)}
                                        className="me-2"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="info"
                                        onClick={() => handleView(student.id)}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-3">
                <Button
                    color="secondary"
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                    className="me-2"
                >
                    Previous
                </Button>

                {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                    <Button
                        key={index + 1}
                        color={page === index + 1 ? 'primary' : 'light'}
                        onClick={() => setPage(index + 1)}
                        className="me-1"
                    >
                        {index + 1}
                    </Button>
                ))}

                <Button
                    color="secondary"
                    disabled={page === Math.ceil(total / limit)}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Next
                </Button>
            </div>

        </Container>
    );
};

export default StudentList;
