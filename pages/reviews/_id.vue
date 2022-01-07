<template>
  <div>
    <b-overlay
      :show="reviewIsLoading"
      rounded="lg"
      :opacity="1"
      class="text-center my-2"
    >
      <div v-if="singleReview">
        <h4 v-if="singleReview.reviewer">
          Reviewer is: {{ singleReview.reviewer.name }}
        </h4>
        <h4 v-if="singleReview.reviewee">
          Reviewee is: {{ singleReview.reviewee.name }}
        </h4>
        <p v-if="!singleReview.review">No review data yet</p>
        <div v-else>
          <h5>Performance Review is:</h5>
          <p>Performance: {{ singleReview.review.performance }}</p>
          <p>Speed: {{ singleReview.review.speed }}</p>
          <p>Typing: {{ singleReview.review.typing }}</p>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      reviewIsLoading: true,
    };
  },
  computed: {
    ...mapState(["singleReview"]),
  },
  methods: {
    ...mapActions(["getSingleReview"]),
  },
  mounted() {
    this.getSingleReview(this.$route.params.id).finally(() => {
      debugger;
      this.reviewIsLoading = false;
    });
  },
};
</script>

<style scoped></style>
