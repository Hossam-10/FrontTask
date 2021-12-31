<template>
  <div class="w-50 my-2 ml-2">
    <form @submit.prevent="handleEmployeeForm">
      <AppInput type="text" v-model="employeeDetails.name">Name</AppInput>
      <AppInput type="email" v-model="employeeDetails.email">Email</AppInput>
      <AppInput type="password" v-model="employeeDetails.password"
        >Password</AppInput
      >
      <AppInput type="password" v-model="employeeDetails.confirmPassword"
        >Confirm Password</AppInput
      >
      <div>
        <input type="checkbox" v-model="employeeDetails.isAdmin" />
        <label>Admin</label>
      </div>
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
      },
    };
  },
  methods: {
    ...mapActions(["addEmployee", "updateEmployee"]),
    checkEqualPasswords() {
      if (
        this.employeeDetails.password === this.employeeDetails.confirmPassword
      )
        return true;
      else {
        return false;
      }
    },
    handleEmployeeForm() {
      if (this.checkEqualPasswords()) {
        if (!this.employee) {
          this.addEmployee({
            name: this.employeeDetails.name,
            email: this.employeeDetails.email,
            password: this.employeeDetails.password,
            password_confirmation: this.employeeDetails.confirmPassword,
            is_admin: this.employeeDetails.isAdmin ? 1 : 0,
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
            name: this.employeeDetails.name,
            email: this.employeeDetails.email,
            password: this.employeeDetails.password,
            password_confirmation: this.employeeDetails.confirmPassword,
            is_admin: this.employeeDetails.isAdmin ? 1 : 0,
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
      } else {
        this.$bvToast.toast("Passwords are not equal", {
          title: "Password and Confirm password must be equal",
          variant: "primary",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      }
    },
  },
  watch: {
    employee(newVal) {
      this.employeeDetails.name = newVal.name;
      this.employeeDetails.email = newVal.email;
      this.employeeDetails.password = newVal.password;
      this.employeeDetails.confirmPassword = newVal.password_confirmation;
      this.employeeDetails.isAdmin = newVal.is_admin == 1 ? true : false;
      this.employeeDetails.id = newVal.id;
    },
  },
};
</script>
