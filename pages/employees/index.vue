<template>
  <div>
    <b-container>
      <div class="w-50 ml-4">
        <nuxt-link :to="'/employees/create'">
          <button class="btn btn-secondary btn-large">
            Create an Employee
          </button>
        </nuxt-link>
      </div>
      <b-overlay :show="employees.loading" rounded="lg" :opacity="1">
        <p v-if="!employees.loading && !employees.data">No Employees yet</p>
        <div v-else>
          <b-row>
            <b-col
              md="4"
              sm="12"
              cols="12"
              class="my-2"
              v-for="employee in employees.data"
              :key="employee.id"
            >
              <EmployeeCard
                @delete-employee="deleteSingleEmp(employee.id)"
                :employee="employee"
              />
            </b-col>
          </b-row>
          <div class="mt-3">
            <b-pagination
              :value="employees.params.page"
              :total-rows="employees.total"
              :per-page="employees.params.perPage"
              @change="updateEmployeesPagination"
              pills
              size="md"
              align="center"
            ></b-pagination>
          </div>
        </div>
      </b-overlay>
    </b-container>
  </div>
</template>

<script>
import EmployeeCard from "@/components/EmployeeCard";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    EmployeeCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["employees"]),
  },
  methods: {
    ...mapActions(["getEmployees", "updateEmployeesParams", "deleteEmployee"]),
    updateEmployeesPagination(page) {
      this.updateEmployeesParams({ page });
    },
    deleteSingleEmp(id) {
      this.deleteEmployee(id).then(() => {
        this.updateEmployeesParams({ page: 1 });
      });
    },
  },
  mounted() {
    this.getEmployees();
  },
};
</script>
