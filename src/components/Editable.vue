<template>
  <div
    :contenteditable="disabled"
    @input="handleInput"
    @keypress="noNumber"
    @change="handleInput"
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
      this.$emit("input", e.target.innerText);
    },
    noNumber: function(e) {
      var regex = new RegExp("^[1-9//]?$");
      var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    }
  }
};
</script>

<style scoped></style>
