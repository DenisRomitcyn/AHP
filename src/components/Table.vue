<template>
  <main class="container ">
    <div class="mt-5">
      <table class="table table-bordered">
        <tr>
          <th class="FirstCell"></th>
          <th v-for="(h, hIndex) in table.values" :key="hIndex">{{ h }}</th>
        </tr>
        <tr v-for="(row, rowIndex) in table.values" :key="rowIndex">
          <th>{{ row }}</th>
          <td v-for="(_, colIndex) in generateData()" :key="colIndex">
            <div v-if="rowIndex > colIndex">
              <Editable disabled="false" v-model="data[rowIndex][colIndex]" />
            </div>
            <div v-else-if="rowIndex === colIndex">
              <Editable disabled="false" v-model="data[rowIndex][colIndex]" />
            </div>
            <div v-else>
              <Editable
                label="Name"
                @input="onInput"
                disabled="true"
                v-model="data[rowIndex][colIndex]"
                onchange=""
              />
            </div>
          </td>
        </tr>
      </table>

      <p>Отношение согласованности: {{ countOS(data) }}</p>
    </div>
  </main>
</template>

<script>
import Editable from "./Editable";

export default {
  components: { Editable },
  props: {
    table: Object,
    target: String
  },
  data() {
    return {
      header: [],
      data: [],
      result: {}
    };
  },
  methods: {
    generateData: function() {
      if (this.data.length === 0) {
        for (let i = 0; i < this.table.count; i++) {
          this.$set(this.data, i, []);
          for (let j = 0; j < this.table.count; j++) {
            if (i === j) {
              this.$set(this.data[i], j, 1);
            } else this.$set(this.data[i], j, 0);
          }
        }
        return this.data;
      } else {
        return this.data;
      }
    },

    onInput() {
      let val;
      for (let i = 1; i < this.table.count; i++) {
        for (let j = 0; j < i; j++) {
          if (this.data[j][i].length === 1) {
            val = "1/" + this.data[j][i];
          } else if (
            this.data[j][i].length === 3 &&
            this.data[j][i].charAt(0) === "1" &&
            this.data[j][i].charAt(1) === "/"
          ) {
            val = this.data[j][i].charAt(2);
          } else {
            val = "error";
          }
          this.$set(this.data[i], j, val);
        }
      }
      if (!(this.result.length === 0)) this.$emit("input", this.result);
    },
    countOS: function(data) {
      let err = false;

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (data[i][j] === 0 || data[i][j] === "error") {
            err = true;
          }
        }
      }
      if (err === false) {
        let indexO = [1, 1, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
        let sumRow = [];
        let sumCol = [];
        let sumResult = 0;
        let localPriority = [];
        let mps = 0;
        let is = 0;
        let os = 0;
        for (let i = 0; i < data.length; i++) {
          let sum = 1;
          for (let j = 0; j < data[i].length; j++) {
            let elem = 0;
            if (data[i][j].length === 1) {
              elem = Number(data[i][j]);
            } else if (data[i][j].length === 3) {
              let n1 = data[i][j].charAt(0);
              let n2 = data[i][j].charAt(2);
              elem = Number(n1) / Number(n2);
            } else {
              elem = data[i][j];
            }
            sum = sum * elem;
          }
          sumRow[i] = Math.pow(sum, 1 / data.length);
        }
        for (let i = 0; i < sumRow.length; i++) {
          sumResult = sumResult + sumRow[i];
        }

        for (let i = 0; i < sumRow.length; i++) {
          localPriority[i] = sumRow[i] / sumResult;
        }

        for (let i = 0; i < data.length; i++) {
          let sum = 0;
          for (let j = 0; j < data[i].length; j++) {
            let elem = 0;
            if (data[j][i].length === 1) {
              elem = Number(data[j][i]);
            } else if (data[j][i].length === 3) {
              let n1 = data[j][i].charAt(0);
              let n2 = data[j][i].charAt(2);
              elem = Number(n1) / Number(n2);
            } else {
              elem = data[j][i];
            }
            sum = sum + elem;
          }
          sumCol[i] = sum;
        }

        for (let i = 0; i < sumCol.length; i++) {
          mps = mps + sumCol[i] * localPriority[i];
        }

        is = (mps - data.length) / (data.length - 1);
        os = is / indexO[data.length - 1];

        let result = {
          os: os,
          localPriority: localPriority,
        };
        this.$set(this.result, "os", result["os"]);
        this.$set(this.result, "localPriority", result["localPriority"]);
        this.$set(this.result, "gp", result["gp"]);
        return os.toFixed(4);
      } else {
        return "Проверьте заполнение таблицы!";
      }
    }
  },

};
</script>
