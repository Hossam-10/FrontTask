<template>
  <div>
    <h1 class="text-center">Login</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm,
  },
  layout: "login",
};
</script>
