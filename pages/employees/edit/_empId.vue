<template>
  <div>
    <b-overlay :show="isLoading" size="sm" :opacity="1">
      <EmployeeForm :employee="singleEmployee" />
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EmployeeForm from "@/components/employee/EmployeeForm";
export default {
  components: {
    EmployeeForm,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["singleEmployee"]),
  },
  methods: {
    ...mapActions(["getSingleEmployee"]),
  },
  mounted() {
    this.isLoading = true;
    this.getSingleEmployee(this.$route.params.empId).finally(() => {
      this.isLoading = false;
    });
  },
};
</script>
