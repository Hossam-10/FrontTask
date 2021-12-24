<template>
  <div class="w-50 my-2 ml-2">
    <form @submit.prevent="handleEmployeeForm">
      <AppInput type="text" v-model="employeeDetails.firstName"
        >First Name</AppInput
      >
      <AppInput type="text" v-model="employeeDetails.lastName"
        >Last Name</AppInput
      >
      <AppInput type="email" v-model="employeeDetails.email">Email</AppInput>
      <button class="d-block btn btn-info ml-auto" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import AppInput from "@/components/UI/AppInput";
import { mapState, mapActions } from "vuex";
export default {
  name: "EmployeeForm",
  components: {
    AppInput,
  },
  props: {
    employee: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      employeeDetails: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions(["addEmployee", "updateEmployee"]),
    handleEmployeeForm() {
      if (this.employee) {
        this.addEmployee({
          first_name: this.employeeDetails.firstName,
          last_name: this.employeeDetails.lastName,
          email: this.employeeDetails.email,
        })
          .then(() => {
            this.$router.push("/employees");
          })
          .catch(() => {
            this.$bvToast.toast("Please try again", {
              title: "Something went wrong",
              variant: "primary",
              toaster: "b-toaster-top-center",
              solid: true,
            });
          });
      } else {
        this.updateEmployee({
          first_name: this.employeeDetails.firstName,
          last_name: this.employeeDetails.lastName,
          email: this.employeeDetails.email,
          id: this.employeeDetails.id,
        })
          .then(() => {
            this.$router.push("/employees");
          })
          .catch(() => {
            this.$bvToast.toast("Please try again", {
              title: "Something went wrong!",
              variant: "primary",
              toaster: "b-toaster-top-center",
              solid: true,
            });
          });
      }
    },
  },
  watch: {
    employee(newVal) {
      this.employeeDetails.firstName = newVal.first_name;
      this.employeeDetails.lastName = newVal.last_name;
      this.employeeDetails.email = newVal.email;
    },
  },
};
</script>
