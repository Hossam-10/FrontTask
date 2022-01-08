<template>
  <div class="border p-4">
    <div class="text-center">
      <h3 class="font-weight-bold">Reviewer</h3>
      <p v-if="review.reviewer">{{ review.reviewer.name }}</p>
      <h3 class="font-weight-bold">Reviewee</h3>
      <p v-if="review.reviewee">{{ review.reviewee.name }}</p>
    </div>
    <div class="d-flex justify-content-around" v-if="userData.is_admin">
      <nuxt-link :to="`/reviews/${review.id}`" class="btn btn-outline-info">
        View
      </nuxt-link>
      <nuxt-link
        class="btn btn-outline-primary"
        :to="`/reviews/update/${review.id}`"
      >
        Update
      </nuxt-link>
      <button
        class="btn btn-outline-danger"
        @click="$emit('delete-review', review.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ReviewCard",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["userData"]),
  },
};
</script>
