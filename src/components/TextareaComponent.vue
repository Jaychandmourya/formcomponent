<template>
  <div class="col-sm-12">
    <label for="form18">Address</label>
    <div class="md-form mb-4 black-textarea active-black-textarea">
      <textarea
        id="form18"
        class="md-textarea form-control"
        rows="3"
        @input="textarea"
        v-model="address"
      ></textarea>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    addres: String,
  },
  data() {
    return {
      address: this.addres,
    };
  },
  methods: {
    textarea() {
      this.$emit("textarea-event", this.address);
    },
  },
};
</script>
