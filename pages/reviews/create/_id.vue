<template>
  <div>
    <ChooseRevForm :revieweeId="$route.params.id" />
  </div>
</template>

<script>
import ChooseRevForm from "@/components/review/ChooseRevForm";
export default {
  components: {
    ChooseRevForm,
  },
};
</script>
