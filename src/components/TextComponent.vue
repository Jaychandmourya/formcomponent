<template>
  <div class="row">
    <div class="col-md-12">
      <label for="exampleInputName">Enter Name</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputName"
        placeholder="Enter Name"
        @input="textfield"
        v-model="name"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    names: {
      type: [String, Array, Object],
    },
  },
  data() {
    return {
      name: this.names,
    };
  },
  methods: {
    textfield() {
      this.$emit("text-event", this.name);
    },
  },
};
</script>
