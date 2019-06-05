<template>
  <main class="container ">
    <div class="mt-5">
      <table @change="updateData" class="table table-bordered">
        <tr>
          <th class="FirstCell"></th>
          <th v-for="(h, hIndex) in value.values" :key="hIndex">{{ h }}</th>
        </tr>
        <tr v-for="(row, rowIndex) in value.values" :key="rowIndex">
          <th>{{ row }}</th>
          <td v-for="(_, colIndex) in generateData(data)" :key="colIndex">
            <div v-if="rowIndex > colIndex">
              <Editable disabled="false" v-model="data[rowIndex][colIndex]" />
            </div>
            <div v-else-if="rowIndex === colIndex">
              <Editable disabled="false" v-model="data[rowIndex][colIndex]" />
            </div>
            <div v-else>
              <Editable
                @input="onInput"
                disabled="true"
                v-model="data[rowIndex][colIndex]"
                onchange=""
              />
            </div>
          </td>
        </tr>
      </table>

      <Editable v-model="text" />
    </div>
  </main>
</template>

<script>
import Editable from "./Editable";
export default {
  components: { Editable },
  props: {
    value: Object,
    target: String
  },
  data() {
    return {
      header: [],
      data: [],
      text: "ОС =0,181"
    };
  },
  methods: {
    generateData: function(data) {
      for (let i = 0; i < this.value.count; i++) {
        data[i] = [];
        for (let j = 0; j < this.value.count; j++) {
          if (i === j) {
            data[i][j] = 1;
          } else data[i][j] = 0;
        }
      }
      return data;
    },
    updateData() {
      console.log("Update started");
      for (let i = 2; i < this.value.count; i++) {
        for (let j = 1; j < i; j++) {
          this.data[i][j] = this.data[j][i];
        }
      }
    },
    onInput() {
      for (let i = 1; i < this.value.count; i++) {
        for (let j = 0; j < i; j++) {
          //this.$set(this.data,[i][j],0);
          this.data[i][j] = this.data[j][i];

        }
      }
    }
  }
};
</script>
