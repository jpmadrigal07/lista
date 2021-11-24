import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { I_Global } from "../../interfaces/global";
import { I_DashboardProps } from "../../interfaces/dashboard";
import { getRecord } from '../../actions/recordActions';
import { useEffect } from "react";
import { I_Record } from "../../interfaces/record";
import "./Dashboard.scss";
import moment from 'moment';

const Dashboard = (props: I_DashboardProps) => {
    const history = useHistory();
    const { getRecord, recordData } = props;

    useEffect(() => {
        if(recordData.length === 0) {
            getRecord();
        }
    }, [recordData])

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Button variant="primary" onClick={() => history.push("/money/in")}>Money In</Button>{' '}
                    <Button variant="danger" onClick={() => history.push("/money/out")}>Money Out</Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cost</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Remarks</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recordData.map((res: I_Record, index: number) => {
                                const { _id, cost, name, remarks, createdAt, isCredit } = res;
                                return (
                                    <tr key={_id}>
                                        <td>{index+1}</td>
                                        <td>{cost}</td>
                                        <td>{isCredit ? "Money In" : "Money Out"}</td>
                                        <td>{name}</td>
                                        <td>{remarks}</td>
                                        <td>{moment(createdAt).format("MMM D, YYYY hh:mm A")}</td>
                                        <td>
                                            <span className="BasicLink" onClick={() => history.push(`/money/edit?recordId=${_id}`)}>Edit</span>{' '}| 
                                            {' '}<span className="BasicLink" onClick={() => history.push(`/money/delete?recordId=${_id}`)}>Delete</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (gState: I_Global) => ({
    recordData: gState.record.data,
});
  
export default connect(mapStateToProps, {
    getRecord
})(Dashboard);