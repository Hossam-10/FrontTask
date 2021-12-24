<template>
  <div class="w-50 ml-2 mt-2">
    <form @submit.prevent="handleFormLogin">
      <AppInput type="email" v-model="loginInformation.email"> Email </AppInput>
      <AppInput type="password" v-model="loginInformation.password"
        >Password</AppInput
      >
      <div>
        <input type="checkbox" v-model="loginInformation.isAdmin" />
        <label>Admin</label>
      </div>
      <button class="d-block btn btn-info ml-auto">Submit</button>
    </form>
  </div>
</template>

<script>
import AppInput from "@/components/UI/AppInput";
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  components: {
    AppInput,
  },
  data() {
    return {
      loginInformation: {
        email: "",
        password: "",
        isAdmin: false,
      },
    };
  },
  methods: {
    ...mapActions(["handleLogin"]),
    handleFormLogin() {
      this.handleLogin(this.loginInformation)
        .then(() => this.$router.push("/employees"))
        .catch(() => {
          this.$bvToast.toast("Wrong Email or Password", {
            title: "Login information is not correct",
            variant: "primary",
            toaster: "b-toaster-top-center",
            solid: true,
          });
        });
    },
  },
};
</script>

<style scoped></style>
