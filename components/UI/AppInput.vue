<template>
  <div class="input-control">
    <label><slot /></label>
    <input
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "AppInputControl",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  inheritAttrs: false,
};
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}

.input-control input:focus {
  background-color: #eee;
  outline: none;
}
</style>
