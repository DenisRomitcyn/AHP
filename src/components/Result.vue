<template>
  <main class="container ">
    <div class="mt-5">
      <table class="table table-bordered">
        <tr>
          <th class="FirstCell"></th>
          <th v-for="(h, hIndex) in value.values" :key="hIndex">
            {{ h }}
          </th>
        </tr>
        <tr v-for="(row, rowIndex) in value2.values" :key="rowIndex">
          <th>{{ row }}</th>
          <td
            v-for="(n, nIndex) in loc[rowIndex + 1].localPriority"
            :key="nIndex"
          >
            {{ n.toFixed(4) }}
          </td>
        </tr>
      </table>

      <table class="table table-bordered">
        <tr>
          <th class="FirstCell"></th>
          <th>Глобальный приоритет</th>
        </tr>
        <tr v-for="(w, wIndex) in value.values" :key="wIndex">
          <th>{{ w }}</th>

          <td>
            {{ globalPriority()[wIndex] }}
          </td>
        </tr>
      </table>

      <div class="container">
        <result-chart
          :labels="value.values"
          :data="globalPriority()"
          :styles="myStyles"
        ></result-chart>
      </div>
    </div>
  </main>
</template>

<script>
import ResultChart from "./ResultChart";
export default {
  components: {
    ResultChart
  },
  props: {
    globalP: [],
    value: Object,
    value2: Object,
    loc: Array
  },
  methods: {
    globalPriority() {
      let box = [];
      for (let i = 0; i < this.loc[0].localPriority.length; i++) {
        let sum = 0;
        console.log(i);
        for (let j = 1; j < this.loc.length; j++) {
          sum =
            sum +
            this.loc[0].localPriority[j - 1] * this.loc[j].localPriority[i];
          console.log(j);
        }

        box[i] = sum;
      }

      return box;
    }
  },
  computed: {
    myStyles() {
      return {
        width: `50%`,
        position: "relative"
      };
    }
  }
};
</script>
