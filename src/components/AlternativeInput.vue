<template>
  <div class="criteria-group">
    <div class="col-lg-12 ">
      <div id="criter">
        <!--        <div class="row">-->
        <div class="col-sm-7">
          <label>{{ labelText }}</label>
        </div>
        <div class="col-sm-3">
          <select @change="selectChange" class="form-control" v-model="inpval.count">
            <option v-for="n in countSelectItems" v-text="n" :key="n"></option>
          </select>
        </div>
      </div>
      <span v-for="(n, index) in Number(inpval.count)" :key="n">
        <input
          v-model="inpval.values[index]"
          class="form-control mt-3"
          type="text"
          placeholder="Введите альтернативу"
          @input="onInput"
        />
      </span>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>
export default {
  name: "AlternativeInput",
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
      inpval: {
        count: 2,
        values: []
      }
    };
  },
  computed: {
    countSelectItems: function() {
      return Array.from(
        Array(this.maxCount - this.minCount + 1),
        (x, i) => i + this.minCount
      );
    }
  },
  mounted() {
    if (localStorage.getItem("values")) {
      try {
        this.inpval.values = JSON.parse(localStorage.getItem("values"));
      } catch (e) {
        localStorage.removeItem("values");
      }
    }
  },
  methods: {
    // addValues() {
    //   if (!this.newValues) {
    //     return;
    //   }
    //   this.inpval.values.push(this.newValues);
    //   this.newValues = "";
    //   this.saveValues();
    // },
    // saveValues() {
    //   const parsed = JSON.stringify(this.inpval.values);
    //   localStorage.setItem("values", parsed);
    // },
    onInput() {
      this.$emit("input", this.inpval);
    },
    selectChange (){
      this.inpval.values = this.inpval.values.slice(0,this.inpval.count)
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
