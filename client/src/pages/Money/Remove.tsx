import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { I_Global } from "../../interfaces/global";
import { I_DeleteProps } from "../../interfaces/money";
import { deleteRecord } from '../../actions/recordActions';
import { getRecord } from '../../actions/recordActions';
import { useEffect, useState } from "react";
import { I_Record } from "../../interfaces/record";
import moment from 'moment';

const Delete = (props: I_DeleteProps) => {
    const history = useHistory();
    const { deleteRecord, recordData, getRecord } = props;
    
    const [recordId, setRecordId] = useState("");
    const [isCredit, setIsCredit] = useState<Boolean | undefined>(false);
    const [cost, setCost] = useState<Number | undefined>(0);
    const [name, setName] = useState<String | undefined>("");
    const [remarks, setRemarks] = useState<String | undefined>("");
    const [createdAt, setCreatedAt] = useState<string | undefined>("");

    useEffect(() => {
        if(recordData.length === 0) {
            getRecord();
        }
    }, [recordData]);

    useEffect(() => {
        if(recordData.length > 0) {
            const href = window.location.href;
            const origin = window.location.origin;
            const getURLRecordId = href.replace(
              `${origin}/money/delete?recordId=`,
              ""
            );
            setRecordId(getURLRecordId);
            const selectedRecord = recordData.find((res: I_Record) => res._id === getURLRecordId);
            setIsCredit(selectedRecord?.isCredit);
            setCost(selectedRecord?.cost);
            setName(selectedRecord?.name);
            setRemarks(selectedRecord?.remarks);
            setCreatedAt(selectedRecord?.createdAt);
        }
    }, [recordData]);

    const handleDelete = () => {
        deleteRecord(recordId);
        history.goBack()
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Button variant="secondary" onClick={() => history.goBack()}>Back</Button>{' '}
                </Col>
            </Row>
            <hr/>
            <h3>Delete</h3>
            <h5 className="mb-3 text-danger">Are you sure you want to delete this record?</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cost</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Remarks</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{cost}</td>
                        <td>{isCredit ? "Money In" : "Money Out"}</td>
                        <td>{name}</td>
                        <td>{remarks}</td>
                        <td>{moment(createdAt).format("MMM D, YYYY hh:mm A")}</td>
                        <td>
                            <span className="BasicLink" onClick={() => handleDelete()}>Yes, please delete</span>{' '}| 
                            {' '}<span className="BasicLink" onClick={() => history.goBack()}>No, cancel this</span>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

const mapStateToProps = (gState: I_Global) => ({
    recordData: gState.record.data,
});
  
export default connect(mapStateToProps, {
    deleteRecord,
    getRecord,
})(Delete);

