import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Col, Row, FloatingLabel, Button, Breadcrumb } from "react-bootstrap";

const Transfer = () => {
    const [noRekPengirim, setNoRekPengirim] = useState("");
    const [noRekPenerima, setNoRekPenerima] = useState("");
    const [jumlahTransfer, setJumlahTransfer] = useState("");
    const [tanggalTransfer, setTanggalTransfer] = useState(""); 
    const navigate = useNavigate();

    const transfer = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`http://localhost:5000/transaction`, {
            noRekPengirim,
            noRekPenerima,
            jumlahTransfer,
            tanggalTransfer
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <Container className='my-5 py-3 bg-white rounded'>
            {/* BreadCrumb */}
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="py-3">Transfer</h3>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Transfer</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {/* End BreadCrumb */}
            {/* Name Group */}
        
            <Form onSubmit={transfer}>
                <Row className='g-4 mb-3'>
                    <Col md>
                        <FloatingLabel controlId="floatingInputNoRekPengirim" label="No Rek Pengirim">
                        <Form.Control
                            type="number" 
                            placeholder="No Rekening Pengirim"
                            value={noRekPengirim}
                            onChange={(e) => setNoRekPengirim(e.target.value)}
                        />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputNoRekPenerima" label="No Rekening Penerima">
                        <Form.Control
                            type="number" 
                            placeholder="No Rekening Penerima"
                            value={noRekPenerima}
                            onChange={(e) => setNoRekPenerima(e.target.value)}  
                        />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="g-4 mb-3">
                    <Col md>
                        <FloatingLabel controlId="floatingInputJumlahTransfer" label="Jumlah Transfer">
                        <Form.Control
                            type="number" 
                            placeholder="Jumlah Transfer"
                            value={jumlahTransfer}
                            onChange={(e) => setJumlahTransfer(e.target.value)}  
                        />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputTanggalTransfer" label="Tanggal Transfer">
                        <Form.Control
                            type="datetime-local" 
                            placeholder="Tanggal Transfer"
                            value={tanggalTransfer}
                            onChange={(e) => setTanggalTransfer(e.target.value)}  
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

export default Transfer;
