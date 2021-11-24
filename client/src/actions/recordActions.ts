import axios from "axios";
import {
  GET_RECORD,
  RECORD_LOADER,
  TOP_ALERT,
  ADD_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
} from "./types";

export const getRecord = (variables?: string) => (dispatch: Function) => {
  dispatch(setRecordLoader("list", true));
  axios
    .get(`/api/record${variables ? variables : ''}`)
    .then((res) => {
      dispatch({
        type: GET_RECORD,
        payload: res.data !== "" ? res.data : {},
      });
    })
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const addRecord = (
  cost: string,
  isCredit: boolean,
  name: string,
  remarks: string,
) => (dispatch: Function) => {
  dispatch(setRecordLoader("add", true));
  axios
    .post(`/api/record`, { cost, isCredit, name, remarks })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: ADD_RECORD,
          payload: res.data.dbRes,
        });
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully added",
            type: "success",
          },
        });
      } else {
        dispatch(setRecordLoader("add", false));
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setRecordLoader("add", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const updateRecord = (
  recordId: string,
  cost: number,
  isCredit: boolean,
  name: string,
  remarks: string,
) => (
  dispatch: Function
) => {
  dispatch(setRecordLoader("update", true));
  axios
    .patch(`/api/record/${recordId}`, { cost, isCredit, name, remarks })
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: UPDATE_RECORD,
          payload: res.data.dbRes,
        });
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully updated",
            type: "success",
          },
        });
      } else {
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
        dispatch(setRecordLoader("update", false));
      }
    })
    .catch((err) => {
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const deleteRecord = (id: string) => (dispatch: Function) => {
  dispatch(setRecordLoader("delete", true));
  axios
    .delete(`/api/record/${id}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: DELETE_RECORD,
          payload: res.data.dbRes,
        });
        dispatch({
          type: TOP_ALERT,
          payload: {
            showAlert: true,
            message: "Successfully deleted",
            type: "success",
          },
        });
      } else {
        dispatch(setRecordLoader("delete", false));
        dispatch({
          type: TOP_ALERT,
          payload: { showAlert: true, message: res.data.dbRes, type: "danger" },
        });
      }
    })
    .catch((err) => {
      dispatch(setRecordLoader("delete", false));
      dispatch({
        type: TOP_ALERT,
        payload: { showAlert: true, message: err.message, type: "danger" },
      });
    });
};

export const setRecordLoader = (type: string, isLoading: boolean) => {
  return {
    type: RECORD_LOADER,
    payload: { type, isLoading },
  };
};
