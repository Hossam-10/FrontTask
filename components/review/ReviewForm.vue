<template>
  <div class="my-2">
    <form class="w-50 ml-4" @submit.prevent="handleUpdateReview">
      <AppInput type="string" v-model="reviewData.performance"
        >Performance</AppInput
      >
      <AppInput type="string" v-model="reviewData.speed">Speed</AppInput>
      <AppInput type="string" v-model="reviewData.typing">Typing</AppInput>
      <button class="d-block ml-auto btn btn-info" type="submit">
        Confirm
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppInput from "@/components/UI/AppInput";
export default {
  components: {
    AppInput,
  },
  props: {
    review: {
      type: String,
    },
  },
  data() {
    return {
      reviewData: {
        performance: "",
        speed: "",
        typing: "",
      },
    };
  },
  methods: {
    ...mapActions(["updateReview"]),
    handleUpdateReview() {
      console.log(this.reviewData);
      this.updateReview({
        review: {
          review: this.reviewData,
        },
        id: this.$route.params.id,
      })
        .then(() => {
          this.$router.push("/reviews");
        })
        .catch(() => {
          this.$bvToast.toast("Please try again", {
            title: "Something went wrong",
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true,
          });
        });
    },
  },
  watch: {
    review(newVal) {
      let oldReviewData = JSON.parse(newVal);
      this.reviewData.performance = oldReviewData.performance;
      this.reviewData.speed = oldReviewData.speed;
      this.reviewData.typing = oldReviewData.typing;
    },
  },
};
</script>

<style scoped></style>
