<template>
  <div>
    <b-overlay :show="employeeIsLoaded" rounded="" :opacity="1">
      <div class="text-center my-2">
        <img class="rounded-circle" :src="singleEmployee.avatar" />
        <p class="mt-2">
          {{ singleEmployee.first_name + " " + singleEmployee.last_name }}
        </p>
        <p>{{ singleEmployee.email }}</p>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["singleEmployee"]),
  },
  data() {
    return {
      employeeIsLoaded: false,
    };
  },
  methods: {
    ...mapActions(["getSingleEmployee"]),
  },
  mounted() {
    this.employeeIsLoaded = true;
    this.getSingleEmployee(this.$route.params.id).finally(() => {
      this.employeeIsLoaded = false;
    });
  },
};
</script>

<style scoped></style>
