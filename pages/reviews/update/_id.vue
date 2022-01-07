<template>
  <div>
    <b-overlay :show="reviewIsLoading" rounded="lg" :opacity="1">
      <ReviewForm :review="singleReview.review" />
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ReviewForm from "@/components/review/ReviewForm";
export default {
  components: {
    ReviewForm,
  },
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
      this.reviewIsLoading = false;
    });
  },
};
</script>
