<template>
  <div class="text-center my-2">
    <b-overlay :show="reviewDataIsLoading" rounded="lg" :opacity="1">
      <h1>Feedback</h1>
      <p v-if="singleReview.reviewer">
        Reviewer: {{ singleReview.reviewer.name }}
      </p>
      <p v-if="singleReview.reviewee">
        Reviewee: {{ singleReview.reviewee.name }}
      </p>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FeedbackCard",
  props: {
    feedback: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reviewDataIsLoading: true,
    };
  },
  computed: {
    ...mapState(["singleReview"]),
  },
  methods: {
    ...mapActions(["getSingleReview"]),
  },
  mounted() {
    this.getSingleReview(this.feedback.performance_review_id).finally(() => {
      this.reviewDataIsLoading = false;
    });
  },
};
</script>
