<template>
  <div>
    <b-overlay :show="reviews.loading" rounded="lg" :opacity="1">
      <h1 v-if="reviews.data.length == 0" class="text-center my-2">
        No reviews yet
      </h1>
      <b-container v-else>
        <b-row>
          <b-col
            md="4"
            class="my-2"
            v-for="review in reviews.data"
            :key="review.id"
          >
            <ReviewCard :review="review" @delete-review="deleteReview" />
          </b-col>
        </b-row>
      </b-container>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ReviewCard from "@/components/review/ReviewCard";
export default {
  components: {
    ReviewCard,
  },
  computed: {
    ...mapState(["reviews"]),
  },
  methods: {
    ...mapActions(["getAllReviews", "deleteSingleReview"]),
    deleteReview(reviewId) {
      this.deleteSingleReview(reviewId).then(() => {
        this.getAllReviews();
      });
    },
  },
  mounted() {
    this.getAllReviews();
  },
};
</script>
