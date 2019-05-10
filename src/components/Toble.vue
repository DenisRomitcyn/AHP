<template>
  <main class="container">
    <div class="mt-5">
      <table class="table table-bordered">
        <tr>
          <th class="FirstCell"></th>
          <th v-for="(h, hIndex) in header" :key="hIndex">{{ h }}</th>
        </tr>
        <tr v-for="(row, rowIndex) in content" :key="rowIndex">
          <th>{{ row.title }}</th>
          <td v-for="(_, colIndex) in row.data" :key="colIndex">
            <Editable v-model="content[rowIndex].data[colIndex]" />
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
  data() {
    return {
      header: ["Название", "Критерий 1", "Критерий 2", "Вес критерия"],
      content: [
        for (i=1; i < this.AlternativeInput.value; i++){

      }
      ],
      text: "   "
    };
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    }
  }
};
</script>

<style scoped></style>
