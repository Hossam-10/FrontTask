import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      employees: {
        data: [],
        total: null,
        loading: false,
        params: {
          page: 1,
          perPage: 6,
        },
      },
      singleEmployee: {},
    },
    mutations: {
      setEmployeesData(state, payload) {
        state.employees.data = payload.data;
        state.employees.total = payload.total;
      },
      updateEmployeesLoading(state, payload) {
        state.employees.loading = payload;
      },
      updateEmployeesParams(state, params) {
        state.employees.params = {
          ...state.employees.params,
          ...params,
        };
      },
      setSingleEmployee(state, payload) {
        state.singleEmployee = payload;
      },
    },
    actions: {
      handleLogin({}, payload) {
        return this.$axios.$post("api/login", payload);
      },
      getEmployees({ state, commit }) {
        commit("updateEmployeesLoading", true);
        this.$axios
          .$get(`api/users?page=${state.employees.params.page}`)
          .then((res) => {
            commit("setEmployeesData", {
              data: res.data,
              total: res.total,
            });
          })
          .finally(() => {
            commit("updateEmployeesLoading", false);
          });
      },
      updateEmployeesParams({ commit, dispatch }, params) {
        commit("updateEmployeesParams", params);
        return dispatch("getEmployees");
      },
      getSingleEmployee({ commit }, payload) {
        return this.$axios.$get(`api/users/${payload}`).then((res) => {
          commit("setSingleEmployee", res.data);
        });
      },
      addEmployee({}, payload) {
        return this.$axios.$post("api/users", payload);
      },
      updateEmployee({}, payload) {
        return this.$axios.$put(`api/users/${payload.id}`, payload);
      },
      deleteEmployee({}, payload) {
        return this.$axios.$delete(`api/users/${payload}`);
      },
    },
  });
};
export default createStore;
