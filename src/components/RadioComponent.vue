<template>
  <div class="col-sm-12">
    <label for="exampleInputName">Select Gender</label>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        v-model="gender"
        id="flexRadioDefault1"
        value="Male"
        @change="onChange($event)"
      />
      <label class="form-check-label" for="flexRadioDefault1"> Male </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault2"
        v-model="gender"
        value="Female"
        @change="onChange($event)"
      />
      <label class="form-check-label" for="flexRadioDefault2"> Female </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    genders: String,
  },
  data() {
    return {
      gender: this.genders,
    };
  },
  methods: {
    onChange(event) {
      var data = event.target.value;
      this.$emit("radio-event", data);
    },
  },
};
</script>
