import { Form, Col, Button, Row, Spinner } from "react-bootstrap";
import { I_MoneyForm } from '../../interfaces/money';
import { connect } from "react-redux";
import { I_Global } from "../../interfaces/global";
import { useEffect, useState } from 'react';
import Required from "../Required/Required";
import { useHistory } from "react-router-dom";

const MoneyForm = (props: I_MoneyForm) => {
    const history = useHistory();
    const {
        recordId,
        actionType,
        isCredit, 
        cost, 
        name, 
        remarks, 
        buttonText, 
        submitForm, 
        isUpdateLoading, 
        isAddLoading, 
        isDeleteLoading,
    } = props;

    const [isLoading, setIsLoading] = useState(false);

    const [updatedIsCredit, setUpdatedIsCredit] = useState<boolean | undefined>();
    const [updatedCost, setUpdatedCost] = useState<number | undefined>();
    const [updatedName, setUpdatedName] = useState<string | undefined>("");
    const [updatedRemarks, setUpdatedRemarks] = useState<string | undefined>("");
    
    useEffect(() => {
        if(actionType === "moneyIn") {
            setIsLoading(isAddLoading);
        } else if(actionType === "moneyOut") {
            setIsLoading(isAddLoading);
        } else if(actionType === "moneyEdit") {
            setIsLoading(isUpdateLoading);
        } else if(actionType === "moneyDelete") {
            setIsLoading(isDeleteLoading);
        }
    }, [
        isUpdateLoading,
        isAddLoading,
        isDeleteLoading,
    ])

    useEffect(() => {
        if(actionType === "moneyIn") {
            setUpdatedIsCredit(true);
        } else if(actionType === "moneyOut") {
            setUpdatedIsCredit(false);
        }
    }, [])

    useEffect(() => {
        if(actionType === "moneyEdit") {
            setUpdatedIsCredit(isCredit);
        }

        setUpdatedCost(cost);
        setUpdatedName(name);
        setUpdatedRemarks(remarks);
    }, [isCredit, cost, name, remarks])

    const changeIsCredit = (value: string) => {
        if(value === "moneyIn") {
            setUpdatedIsCredit(true);
        } else if(value === "moneyOut") {
            setUpdatedIsCredit(false);
        }
    }

    const submit = () => {
        if(actionType === "moneyIn" || actionType === "moneyOut") {
            submitForm(updatedCost, updatedIsCredit, updatedName, updatedRemarks);
            history.goBack();
        } else if(actionType === "moneyEdit") {
            submitForm(recordId, updatedCost, updatedIsCredit, updatedName, updatedRemarks);
            history.goBack();
        }
    }
    
    return (
        <div>
            <Form>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Type<Required/>
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Credit"
                                name="formHorizontalRadios"
                                id="moneyIn"
                                checked={updatedIsCredit}
                                disabled={isLoading}
                                onClick={(e: any) => changeIsCredit(e.target.id)}
                            />
                            <Form.Check
                                type="radio"
                                label="Debit"
                                name="formHorizontalRadios"
                                id="moneyOut"
                                disabled={isLoading}
                                checked={!updatedIsCredit}
                                onClick={(e: any) => changeIsCredit(e.target.id)}
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCost">
                    <Form.Label column sm={2}>
                        Cost<Required/>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="number" placeholder="" value={updatedCost} disabled={isLoading} onChange={(e: any) => setUpdatedCost(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Name<Required/>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="" value={updatedName} disabled={isLoading} onChange={(e: any) => setUpdatedName(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalRemarks">
                    <Form.Label column sm={2}>
                        Remarks<Required/>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="" value={updatedRemarks} disabled={isLoading} onChange={(e: any) => setUpdatedRemarks(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="button" onClick={() => submit()}>{isLoading ? <Spinner animation="grow" variant="dark" size="sm" /> : buttonText}</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

const mapStateToProps = (gState: I_Global) => ({
    isUpdateLoading: gState.record.isUpdateLoading,
    isAddLoading: gState.record.isAddLoading,
    isDeleteLoading: gState.record.isDeleteLoading,
});
  
export default connect(mapStateToProps)(MoneyForm);