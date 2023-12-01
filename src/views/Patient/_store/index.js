import actions from "./actions";
import mutations from "./mutations";

const state = {
  patient: null,
  patients: [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
