import { Container, Row, Col, Button } from "react-bootstrap";
import MoneyForm from "../../components/Form/MoneyForm";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { I_Global } from "../../interfaces/global";
import { I_EditProps } from "../../interfaces/money";
import { updateRecord } from '../../actions/recordActions';
import { getRecord } from '../../actions/recordActions';
import { useEffect, useState } from "react";
import { I_Record } from "../../interfaces/record";

const Edit = (props: I_EditProps) => {
    const history = useHistory();
    const { updateRecord, recordData, getRecord } = props;

    const [recordId, setRecordId] = useState("");
    const [isCredit, setIsCredit] = useState<Boolean | undefined>(false);
    const [cost, setCost] = useState<Number | undefined>(0);
    const [name, setName] = useState<String | undefined>("");
    const [remarks, setRemarks] = useState<String | undefined>("");

    useEffect(() => {
        if(recordData.length === 0) {
            getRecord();
        }
    }, []);

    useEffect(() => {
        if(recordData.length > 0) {
            const href = window.location.href;
            const origin = window.location.origin;
            const getURLRecordId = href.replace(
              `${origin}/money/edit?recordId=`,
              ""
            );
            setRecordId(getURLRecordId);
            const selectedRecord = recordData.find((res: I_Record) => res._id === getURLRecordId);
            setIsCredit(selectedRecord?.isCredit);
            setCost(selectedRecord?.cost);
            setName(selectedRecord?.name);
            setRemarks(selectedRecord?.remarks);
        }
    }, [recordData]);

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Button variant="secondary" onClick={() => history.goBack()}>Back</Button>{' '}
                </Col>
            </Row>
            <hr/>
            <Row className="mb-3">
                <Col>
                    <h3>Edit</h3>
                    <MoneyForm 
                        actionType="moneyEdit"
                        buttonText="Update"
                        name={name}
                        cost={cost}
                        remarks={remarks}
                        isCredit={isCredit}
                        recordId={recordId}
                        submitForm={updateRecord}
                    />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (gState: I_Global) => ({
    recordData: gState.record.data,
});
  
export default connect(mapStateToProps, {
    updateRecord,
    getRecord,
})(Edit);
