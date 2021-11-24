import { Container, Row, Col, Button } from "react-bootstrap";
import MoneyForm from "../../components/Form/MoneyForm"
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { I_Global } from "../../interfaces/global";
import { I_InOutProps } from "../../interfaces/money";
import { addRecord } from '../../actions/recordActions';

const InOut = (props: I_InOutProps) => {
    const history = useHistory();
    const { addRecord, isIn } = props;

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
                    <h3>Money {isIn ? "In" : "Out"}</h3>
                    <MoneyForm 
                        actionType={isIn ? "moneyIn" : "moneyOut"}
                        buttonText="Add"
                        submitForm={addRecord}
                    />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (gState: I_Global) => ({});
  
export default connect(mapStateToProps, { addRecord })(InOut);
