import actions from "./actions";
import mutations from "./mutations";

const state = {
  user: null,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
