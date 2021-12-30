<template>
  <div>
    <div class="border m-auto p-3 employee-card text-center">
      <div class="mt-2">
        <p>name: {{ employee.name }}</p>
        <p>email: {{ employee.email }}</p>
      </div>
      <div class="d-flex justify-content-around" v-if="employee.is_admin">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeCard",
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.employee-card {
  width: 80%;
}
</style>
