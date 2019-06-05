<template>
  <div class="row-ml-1">
    <div class="col-lg-8 offset-lg-2">
      <label>{{ labelText }}</label>
      <input
        @input="onInput"
        v-model="target"
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
  },
  data() {
    return {
      target: ""
    };
  },
  methods: {
    onInput() {
      this.$emit("input", this.target);
    }
  }
};
</script>

<style scoped></style>
