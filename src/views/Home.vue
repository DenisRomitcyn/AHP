<template>
  <div class="main">
    <main role="main" class="container mt-5" v-if="currentStep == 0">
      <div class="row">
        <div class="col-lg-12">
          <Target v-model="target" label-text="Введите цель:" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-6 ">
          <CriteriaInput
            label-text="Выбор количества критериев:"
            :max-count="8"
            v-model="value_crit"
            @oninput="onInput(this.value_crit)"
          />
        </div>
        <div class="col-lg-6">
          <AlternativeInput
            label-text="Выбор количества альтернатив:"
            :max-count="5"
            v-model="value_alt"
            @oninput="onInput(this.value_alt)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <button
            @click="addValues"
            v-on:click="add"
            type="button"
            class="btn btn-dark"
          >
            Далее
          </button>
        </div>
      </div>
    </main>
    <div v-if="currentStep == 1">
      <p class="mt-5" >Заполните матрицу парных сравнений критериев для цели <b>{{target}}</b></p>
      <Table :value="value_crit"></Table>
      <button v-on:click="back" type="button" class="btn btn-dark mr-5 mt-5">
        Назад
      </button>
      <button v-on:click="add" type="button" class="btn btn-dark mt-5">
        Далее
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CriteriaInput from "../components/Criteriainput";
import AlternativeInput from "../components/AlternativeInput";
import Target from "../components/TargetInput";
import Table from "../components/Table";

export default {
  name: "home",
  components: {
    Target,
    AlternativeInput,
    CriteriaInput,
    Table
  },
  data: function() {
    return {
      currentStep: 0,
      value_alt: [],
      value_crit: [],
      target: ""
    };
  },
  methods: {
    add: function() {
      this.currentStep++;
    },
    back: function() {
      this.currentStep--;
    },
    onInput: {
      onInput(a) {
        this.$emit("input", a);
      }
    }
  }
};
</script>
