<template>
  <div>
    <b-overlay :show="loading" rounded="lg" :opacity="1">
      <h1 class="my-2 text-center">Choose Reviewers</h1>
      <form @submit.prevent="makePerformanceReview" class="my-2 w-50">
        <label>Reviewers</label>
        <v-select
          :options="employees.data"
          label="name"
          v-model="reviewerId"
          :reduce="(reviewer) => reviewer.id"
          :loading="employees.loading"
        >
          <template #spinner="{ loading }">
            <div
              v-if="loading"
              style="border-left-color: rgba(88, 151, 251, 0.71)"
              class="vs__spinner"
            ></div>
          </template>
        </v-select>

        <div>
          <label>Reviewee</label>
          <v-select
            :options="employees.data"
            label="name"
            :value="singleEmployee"
            :reduce="(reviewee) => reviewee.id"
            :loading="employees.loading"
            :disabled="true"
          >
            <template #spinner="{ loading }">
              <div
                v-if="loading"
                style="border-left-color: rgba(88, 151, 251, 0.71)"
                class="vs__spinner"
              ></div>
            </template>
          </v-select>
        </div>

        <button type="submit" class="d-block ml-auto btn btn-info mt-2">
          Confirm
        </button>
      </form>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    revieweeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      reviewerId: "",
      loading: true,
    };
  },
  computed: {
    ...mapState(["employees", "singleEmployee"]),
  },
  methods: {
    ...mapActions(["getEmployees", "confirmReview", "getSingleEmployee"]),
    makePerformanceReview() {
      if (!this.reviewerId) {
        this.$bvToast.toast("Please choose reviewer", {
          title: "Something wrong",
          variant: "primary",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      } else {
        this.confirmReview({
          reviewer_id: this.reviewerId,
          reviewee_id: this.singleEmployee.id,
        })
          .then(() => {
            this.$router.push("/reviews");
          })
          .catch(() => {
            this.$bvToast.toast("Please try again", {
              title: "Something went wrong",
              variant: "danger",
              toaster: "b-toaster-top-center",
              solid: true,
            });
          });
      }
    },
  },
  mounted() {
    this.getEmployees();
    this.getSingleEmployee(this.revieweeId).finally(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped></style>
