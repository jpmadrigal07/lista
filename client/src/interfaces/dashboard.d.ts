import { I_Record } from "./record";

export interface I_DashboardProps {
    getRecord: Function,
    recordData: I_Record[],
}