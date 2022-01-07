<template>
  <div>
    <b-overlay :show="requestsIsLoading" rounded="lg" :opacity="1">
      <p v-if="feedbacks.length == 0">No feedbacks yet</p>
      <b-container v-else>
        <b-row>
          <b-col
            md="4"
            v-for="feedback in feedbacks"
            :key="feedback.performance_review_id"
          >
            <FeedbackCard :feedback="feedback" />
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FeedbackCard from "@/components/feedbackRequests/FeedbackCard";
export default {
  components: {
    FeedbackCard,
  },
  data() {
    return {
      requestsIsLoading: true,
    };
  },
  computed: {
    ...mapState(["feedbacks"]),
  },
  methods: {
    ...mapActions(["getFeedbackRequests"]),
  },
  mounted() {
    this.getFeedbackRequests().finally(() => {
      this.requestsIsLoading = false;
    });
  },
};
</script>
