<template>
  <div class="row-ml-1">
    <div class="col-lg-8 offset-lg-2">
      <label>{{ labelText }}</label>
      <input
        v-model="Target"
        class="form-control"
        type="text"
        name="target"
        id="t1"
        placeholder="Цель"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Target",
  props: {
    labelText: String
  }
};
</script>

<style scoped></style>
