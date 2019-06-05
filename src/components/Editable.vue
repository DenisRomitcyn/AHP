<template>
  <div
    :contenteditable="disabled"
    @input="handleInput"
    @keyup="handleInput"
    @change="handleInput"
    type="number"
  ></div>
</template>

<script>
export default {
  name: "Editable",
  props: ["value", "disabled"],
  mounted: function() {
    this.$el.innerText = this.value;
  },
  watch: {
    value: function() {
      if (this.$el.innerText !== this.value) this.$el.innerText = this.value;
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", Number(e.target.innerText));
    }
  }
};
</script>

<style scoped></style>
