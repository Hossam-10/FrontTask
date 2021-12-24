<template>
  <div>
    <div class="border m-auto p-3 employee-card">
      <div class="text-center">
        <img class="rounded-circle w-50" :src="employee.avatar" />
      </div>
      <div class="mt-2">
        <p>name: {{ employee.first_name + " " + employee.last_name }}</p>
        <p>email: {{ employee.email }}</p>
      </div>
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
  height: 350px;
  width: 80%;
}
</style>
