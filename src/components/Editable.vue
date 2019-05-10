<template>
  <div
    contenteditable="true"
    @input="handleInput"
    @keyup="handleInput"
    @change="handleInput"
  ></div>
</template>

<script>
export default {
  name: "Editable",
  props: ["value"],
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
      this.$emit("input", e.target.innerText);
    }
  }
};
</script>

<style scoped></style>
