import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Col, Row, FloatingLabel, Button, Breadcrumb } from "react-bootstrap";

const Register = () => {
    const [userName, setuserName] = useState("");
    const [noRekening, setNoRekening] = useState("");
    const [status, setStatus] = useState();
    const [saldo, setSaldo] = useState();            
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/register", {
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
    
    const statusHandler = (status) =>{
        if(status == "Bank"){
            return 1000000;
        } else{
            return 10000;
        }
    };
    
    return (
        <Container className='my-5 py-3 bg-white rounded'>
            <Form onSubmit={registerUser}>
            {/* BreadCrumb */}
            <div className="d-flex justify-content-between align-items-center">
                <h3>Register</h3>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Register</Breadcrumb.Item>
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
                        onChange={(e) => setuserName(e.target.value)}  
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
                        >
                            <option>Status</option>
                            <option value="Bank">Bank</option>
                            <option value="Costumer">Costumer</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingInputSaldo" label={statusHandler(status)}>
                    <Form.Control
                        type="text" 
                        placeholder="Saldo"
                        value={saldo}
                        onChange={(e) => setSaldo(e.target.value)}  
                        disabled
                    />
                    </FloatingLabel>
                </Col>
            </Row>

            <Button 
                variant="success" 
                type='submit'
                className="mb-3" 
            >
                Submit
            </Button>
        </Form>
        </Container>
    );
};

export default Register;
