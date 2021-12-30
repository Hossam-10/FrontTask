<template>
  <div>
    <nav class="default-nav">
      <div
        class="w-75 m-auto d-flex justify-content-between align-items-center text-white nav-content"
      >
        <div>Welcome: {{ userData.name }}</div>
        <div>
          <button class="btn btn-light" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="mt-2">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  middleware: "require-auth",
  computed: {
    ...mapState(["userData"]),
  },
  methods: {
    ...mapActions(["userLogout"]),
    logout() {
      this.userLogout().then(() => this.$router.push("/"));
    },
  },
};
</script>

<style scoped>
.default-nav {
  background-color: black;
}
.nav-content {
  height: 50px;
}
</style>
