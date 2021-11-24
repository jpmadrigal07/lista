import { I_Record } from "./record";

export interface I_NavBar {
    currentPage: string
}

export interface I_TopAlert {
    showAlert: boolean,
    message: string,
    type: string
}

export interface I_RecordData {
    isLoading: boolean,
    isUpdateLoading: boolean,
    isAddLoading: boolean,
    isDeleteLoading: boolean,
    data: I_Record[]
}

export interface I_NavBarLink {
    linkTitle: string,
    linkName: string
}

export interface I_TopAlertProps {
    showAlert: boolean,
    message: string,
    type: string,
    triggerTopAlert: Function
}

export interface I_AppProps {
    gCurrentPage: string
}

export interface I_ReduxAction {
    type: string,
    payload: any
}

export interface I_Global {
    navBar: I_NavBar,
    topAlert: I_TopAlert,
    record: I_RecordData,
    navBarLink: I_NavBarLink
}
