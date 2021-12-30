<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: "visitors-only",
};
</script>
