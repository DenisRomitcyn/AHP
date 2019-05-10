<template>
  <div class="criteria-group">
    <div class="col">
      <div id="criter">
        <!--        <div class="row">-->
        <div class="col-sm-7">
          <label>{{ labelText }}</label>
        </div>
        <div class="col-sm-3">
          <select class="form-control" v-model="count">
            <option v-for="n in countSelectItems" v-text="n" :key="n"></option>
          </select>
        </div>
      </div>
      <span v-for="n in Number(count)">
        <input
          v-model="values[n]"
          class="form-control mt-3"
          type="text"
          placeholder="Введите критерий"
      /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CriteriaInput",
  props: {
    minCount: {
      type: Number,
      default: 2
    },
    maxCount: {
      type: Number,
      default: 7
    },
    labelText: String
  },
  data: function() {
    return {
      count: 2,
      values: []
    };
  },
  computed: {
    countSelectItems: function() {
      return Array.from(
        Array(this.maxCount - this.minCount + 1),
        (x, i) => i + this.minCount
      );
    }
  }
};
</script>

<style scoped>
/* Styles goes here */
input {
  display: block;
  margin: 1em;
}
</style>
