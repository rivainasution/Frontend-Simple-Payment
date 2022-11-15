import {useState, useEffect} from 'react';
import axios from 'axios';
import {Breadcrumb, Tab, Container, Tabs, Table} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Home = () => {
    const [user, setUser] = useState([]);
    const [transaction, setTransaction] = useState([])
    const x = 0 ;

    useEffect(() =>{
        getUser();
    }, []);

    const getUser = async () => {
        const res = await axios.get("http://localhost:5000/register")
        setUser(res.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/register/${id}`);
            getUser();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        getTransaction();
    }, []);

    const getTransaction = async () => {
        const res = await axios.get("http://localhost:5000/transaction")
        setTransaction(res.data);
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/transaction/${id}`);
            getTransaction();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Container className="my-5 py-3 bg-white rounded">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='my-3'>Simple Payment</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item active>Home</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
        
                <Tabs
                    justify
                    defaultActiveKey="user"
                    id="userTabs"
                    className="my-3"
                    fill
                    >
                    <Tab eventKey="user" title="User List" className='mb-5'>
                        <Container>
                            <Link to={`register`} className='btn btn-primary my-3' >Register</Link>
                            <Table responsive hover className='text-center'>
                                <thead>
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>No Rekening</th>
                                    <th>Status</th>
                                    <th>Saldo</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    {user.map((u, x)=>(
                                        <tr key={u.id}>
                                            <td>{x+1}</td>
                                            <td>{u.userName}</td>
                                            <td>{u.noRekening}</td>
                                            <td>{u.status}</td>
                                            <td>{u.saldo}</td>
                                            <td>
                                                <Link to={`topup/${u.id}`} type='submit' className='btn btn-info'>Top Up</Link>
                                                <button onClick={() => deleteUser(u.id)} type='submit' className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                    </Tab>


                    
                    <Tab eventKey="transfer" title="Transaction History" className='mb-5'>
                        <Container>
                            <Link to={`transfer`} className='btn btn-primary my-3' >Transfer</Link>
                            <Table responsive hover>
                                <thead>
                                    <th>No</th>
                                    <th>No Rekening Pengirim</th>
                                    <th>No Rekening Penerima</th>
                                    <th>Nominal Transfer</th>
                                    <th>Tanggal Transfer</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    {transaction.map((tf, x)=>(
                                        <tr key={tf.id}>
                                            <td>{x+1}</td>
                                            <td>{tf.noRekPengirim}</td>
                                            <td>{tf.noRekPenerima}</td>
                                            <td>{tf.jumlahTransfer}</td>
                                            <td>{tf.tanggalTransfer}</td>
                                            <td>
                                                <button onClick={() => deleteTransaction(tf.id)} type='submit' className='btn btn-danger'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    );
}

export default Home;