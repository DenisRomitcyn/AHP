import { Bar, mixins } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ["labels", "title", "data"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: "Приоритет",
          backgroundColor: "#f87979",
          data: this.data,
          position: "relative"
        }
      ]
    });
  }
};
