<template>
  <div class="col-sm-12">
    <label class="form-check-label" for="flexCheckDefault">Select City</label>
    <select
      v-model="selectcity"
      class="form-select"
      aria-label="Default select example"
      @change="selectchange"
    >
      <option selected>Select City</option>
      <option v-for="selectdata in selectalldata" :key="selectdata">
        {{ selectdata }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    selectalldata: Array,
    selectcitys: String,
  },
  data() {
    return {
      selectcity: this.selectcitys,
    };
  },
  methods: {
    selectchange() {
      this.$emit("select-event", this.selectcity);
    },
  },
};
</script>
