import axiosInstance from "@/axios";
import * as mutation from "./mutation-types";
import { PRIVATE_API } from "@/config";

export default {
  patientCreate: async ({ commit }, payload) => {
    try {
      console.log("BEFORE", payload);

      const { data } = await axiosInstance.post(
        `${PRIVATE_API}/patient/create`,
        payload
      );

      commit(mutation.PATIENT_DATA, data);

      console.log("AFTER", data);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  patientList: async ({ commit }) => {
    try {
      const { data } = await axiosInstance.get(`${PRIVATE_API}/patient/list`);

      commit(mutation.PATIENT_LIST, data);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  patientData: async ({ state, commit }, payload) => {
    try {
      const patient = state?.patient;

      if (patient?.id === +payload) {
        return {
          success: true,
        };
      }

      const patientData = await axiosInstance.get(
        `${PRIVATE_API}/patient/list/${payload}`
      );
      commit(mutation.PATIENT_DATA, patientData.data);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  patientDelete: async ({ commit }, payload) => {
    try {
      await axiosInstance.delete(`${PRIVATE_API}/patient/delete/${payload}`);

      commit(mutation.PATIENT_DATA, null);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  patientUpdate: async ({ state, commit }, payload) => {
    try {
      const patientId = state?.patient.id;

      const { data } = await axiosInstance.put(
        `${PRIVATE_API}/patient/update/${patientId}`,
        payload
      );

      commit(mutation.PATIENT_DATA, data);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};
