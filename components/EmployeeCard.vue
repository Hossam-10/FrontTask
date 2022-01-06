<template>
  <div>
    <div class="border m-auto p-3 employee-card text-center">
      <div class="mt-2">
        <p>name: {{ employee.name }}</p>
        <p>email: {{ employee.email }}</p>
      </div>
      <div v-if="userData.is_admin">
        <div class="d-flex justify-content-around">
          <nuxt-link :to="`/employees/${employee.id}`">
            <button class="btn btn-outline-success">View</button>
          </nuxt-link>
          <nuxt-link :to="`employees/edit/${employee.id}`">
            <button class="btn btn-outline-info">Update</button>
          </nuxt-link>
          <button
            @click="$emit('delete-employee')"
            class="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>

        <div class="w-75 m-auto" v-if="userData.id != employee.id">
          <nuxt-link
            class="btn btn-outline-primary w-100 mt-2"
            :to="`review/${employee.id}`"
          >
            Performance Review
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EmployeeCard",
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["userData"]),
  },
};
</script>

<style scoped>
.employee-card {
  width: 80%;
}
</style>
