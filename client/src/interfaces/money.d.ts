import { I_Record } from "./record";

export interface I_MoneyForm extends I_Record {
    actionType: string,
    buttonText: string, 
    submitForm: Function,
    [key: string]: any,
}

export interface I_InOutProps {
    addRecord: Function,
    isIn: boolean,
}

export interface I_EditProps {
    updateRecord: Function,
    recordData: I_Record[],
    getRecord: Function,
}

export interface I_DeleteProps {
    deleteRecord: Function,
    recordData: I_Record[],
    getRecord: Function,
}