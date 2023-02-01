<template>
  <div class="col-sm-12">
    <label class="form-check-label" for="flexCheckDefault">Select Hobbies</label
    ><br />
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        value="Cricket"
        v-model="checkedHobbies"
        @change="check()"
      />
      <label class="form-check-label">Cricket</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        value="Reading Book"
        v-model="checkedHobbies"
        @change="check()"
      />
      <label class="form-check-label">Reading Book</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="inlineCheckbox3"
        v-model="checkedHobbies"
        @change="check()"
        value="Traveling"
      />
      <label class="form-check-label">Traveling</label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    checkedHobbie: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      checkedHobbies: this.checkedHobbie,
    };
  },
  methods: {
    check() {
      this.$nextTick(() => {
        this.$emit("checkbox-event", this.checkedHobbies);
      });
      //   this.checkedHobbies.push(event.target.value)
    },
  },
};
</script>
