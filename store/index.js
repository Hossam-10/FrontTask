import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      userData: {},
      employees: {
        data: [],
        // total: null,
        loading: false,
        // params: {
        //   page: 1,
        //   perPage: 6,
        // },
      },
      singleEmployee: {},
      reviews: {
        data: [],
        loading: null,
      },
      singleReview: {},
    },
    mutations: {
      setUserData(state, payload) {
        state.userData = payload;
      },
      deleteUserData(state) {
        state.userData = {};
      },
      setEmployeesData(state, payload) {
        state.employees.data = payload;
        //state.employees.total = payload.total;
      },
      updateEmployeesLoading(state, payload) {
        state.employees.loading = payload;
      },
      // updateEmployeesParams(state, params) {
      //   state.employees.params = {
      //     ...state.employees.params,
      //     ...params,
      //   };
      // },
      setSingleEmployee(state, payload) {
        state.singleEmployee = payload;
      },
      setReviews(state, payload) {
        state.reviews.data = payload;
      },
      updateReviewsLoading(state, payload) {
        state.reviews.loading = payload;
      },
      setSingleReview(state, payload) {
        state.singleReview = payload;
      },
    },
    actions: {
      handleLogin({ commit }, payload) {
        return this.$axios.$post("login", payload).then((res) => {
          let userData = res.data.user;
          this.$cookies.set("authenticationToken", `${userData.api_token}`);
          delete userData.api_token;
          commit("setUserData", userData);
        });
      },
      getEmployees({ commit }) {
        commit("updateEmployeesLoading", true);
        this.$axios
          .$get("users")
          .then((res) => {
            commit("setEmployeesData", res.data.users);
          })
          .finally(() => {
            commit("updateEmployeesLoading", false);
          });
      },
      // updateEmployeesParams({ commit, dispatch }, params) {
      //   commit("updateEmployeesParams", params);
      //   return dispatch("getEmployees");
      // },
      getSingleEmployee({ commit }, payload) {
        return this.$axios.$get(`users/${payload}`).then((res) => {
          commit("setSingleEmployee", res.data.user);
        });
      },
      addEmployee({}, payload) {
        return this.$axios.$post("users", payload);
      },
      updateEmployee({}, payload) {
        return this.$axios.$put(`users/${payload.id}`, payload);
      },
      deleteEmployee({}, payload) {
        return this.$axios.$delete(`users/${payload}`);
      },
      userLogout({ commit }) {
        return this.$axios.$post("logout").then(() => {
          this.$cookies.remove("authenticationToken");
          commit("deleteUserData");
        });
      },
      confirmReview({}, payload) {
        return this.$axios.$post("performance-reviews", payload);
      },
      getAllReviews({ commit }) {
        commit("updateReviewsLoading", true);
        return this.$axios
          .$get("performance-reviews")
          .then((res) => {
            commit("setReviews", res.data.reviews);
          })
          .finally(() => {
            commit("updateReviewsLoading", false);
          });
      },
      getSingleReview({ commit }, payload) {
        this.$axios.$get(`performance-reviews/${payload}`).then((res) => {
          commit("setSingleReview", res.data.review);
        });
      },
      deleteSingleReview({}, payload) {
        return this.$axios.$delete(`performance-reviews/${payload}`);
      },
    },
  });
};
export default createStore;
