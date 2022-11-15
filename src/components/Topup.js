import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Col, Row, FloatingLabel, Button, Breadcrumb } from "react-bootstrap";

const Topup = () => {
    const [userName, setUsername] = useState("");
    const [noRekening, setNoRekening] = useState("");
    const [status, setStatus] = useState("");
    const [saldo, setSaldo] = useState("");           
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const topUp = async (e) => {
        e.preventDefault();
        try {
          await axios.patch(`http://localhost:5000/register/${id}`, {
            userName,
            noRekening,
            status,
            saldo
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };

      const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/register/${id}`);
        setUsername(response.data.userName);
        setNoRekening(response.data.noRekening);
        setStatus(response.data.status);
        setSaldo(response.data.saldo);
      }

    return (
        <Container className='my-5 py-3 bg-white rounded'>
            <Form onSubmit={topUp}>
            {/* BreadCrumb */}
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="py-3">Top Up</h3>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Top up</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {/* End BreadCrumb */}
            {/* Name Group */}


            <Row className='g-4 mb-3'>
                <Col md>
                    <FloatingLabel controlId="floatingInputUsername" label="Username">
                    <Form.Control
                        type="text" 
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}  
                        disabled
                    />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingInputNoRekening" label="No Rekening">
                    <Form.Control
                        type="number" 
                        placeholder="No Rekening"
                        value={noRekening}
                        onChange={(e) => setNoRekening(e.target.value)}  
                        disabled
                    />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-4 mb-3">
                <Col md>
                    <FloatingLabel
                        controlId="floatingSelectStatus"
                        label="Status"
                        
                    >
                        <Form.Select 
                            onChange={(e) => setStatus(e.target.value)}
                            disabled
                        >
                            <option value="Bank">{status}</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingInputSaldo" label="Top up">
                    <Form.Control
                        type="number" 
                        placeholder="Saldo"
                        value={saldo}
                        onChange={(e) => setSaldo(e.target.value)}  
                    />
                    </FloatingLabel>
                </Col>
            </Row>

            <Button 
                variant="success" 
                type='submit'
                className="mb-3" 
            >
                Top up
            </Button>
        </Form>
        </Container>
    );
};

export default Topup;
