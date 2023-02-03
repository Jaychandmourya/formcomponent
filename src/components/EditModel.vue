<template>
  <div class="container">
    <!-- <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="openmodel"
    >
      Launch demo modal
    </button> -->

    <!-- Modal -->
    <div
      v-if="OpenClose"
      class="modal fade show"
      style="display: block"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Data</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="CloseFun"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="col-md-12">
              <div class="row">
                <form>
                  <div class="col-sm-12">
                    <text-component
                      @text-event="textfieldvalue($event)"
                      :names="editlistdata.name"
                    ></text-component>
                    <radio-component
                      @radio-event="radiovalue($event)"
                      :genders="editlistdata.gender"
                    ></radio-component
                    ><br />
                    <checkbox-component
                      @checkbox-event="checkboxvalue($event)"
                      :checkedHobbie="editlistdata.hobbies"
                    ></checkbox-component
                    ><br />
                    <select-component
                      v-bind:selectalldata="selectdata"
                      @select-event="selectvalue($event)"
                      :selectcitys="editlistdata.city"
                    ></select-component
                    ><br />
                    <textarea-component
                      @textarea-event="textareavalu($event)"
                      :addres="editlistdata.address"
                    ></textarea-component>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              data-bs-dismiss="modal"
              @click="CloseFun"
              :class="'btn btn-' + variant"
            >
              Close
            </button>
            <button
              type="button"
              @click="EditOpenCloseFun(updatedata)"
              class="btn btn-primary"
            >
              Edit changes
            </button>
          </div>
          <!-- <li v-for="hh in editlistdata">{{ hh }}</li> -->
          <!-- {{ fname }} -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextComponent from "./TextComponent.vue";
import RadioComponent from "./RadioComponent.vue";
import CheckboxComponent from "./CheckboxComponent.vue";
import SelectComponent from "./SelectComponent.vue";
import TextareaComponent from "./TextareaComponent.vue";
import { EventBus } from "../event-bus.js";
import axios from "axios";
export default {
  name: "EditToDoModel",
  props: {
    visible: Boolean,
    variant: String,
    editlistdata: Object,
    addtitlemodel: String,
  },
  data() {
    return {
      OpenClose: this.visible,
      // editdata: this.editlistdata,
      fname: "",
      fgender: "",
      fhobbies: [],
      selectdata: ["Surat", "Navasari", "Udhana", "Pandesara"],
      fcity: "",
      faddress: "",
      updatedata: this.editlistdata,
    };
  },
  components: {
    TextComponent,
    RadioComponent,
    CheckboxComponent,
    SelectComponent,
    TextareaComponent,
  },
  methods: {
    // emit event to pass data
    openmodel() {
      this.OpenClose = !this.OpenClose;
    },
    // emit event to pass data from  TextComponent.vue
    textfieldvalue(value) {
      this.fname = value;
    },
    // emit event to pass  data from  RadioComponent.vue
    radiovalue(value) {
      this.fgender = value;
    },
    // emit event to pass data from CheckboxComponent.vue
    checkboxvalue(value) {
      this.fhobbies = value;
    },
    // emit event to pass data from SelectComponent.vue
    selectvalue(value) {
      this.fcity = value;
    },
    // emit event to pass data from TextareaComponent.vue
    textareavalu(value) {
      this.faddress = value;
    },
    // Update Records
    async EditOpenCloseFun(updatedata) {
      try {
        const user = await axios.put(
          "http://localhost:3000/userdata/" + updatedata.id,
          {
            name: this.fname == "" ? updatedata.name : this.fname,
            gender: this.fgender == "" ? updatedata.gender : this.fgender,
            hobbies: this.fhobbies == "" ? updatedata.hobbies : this.fhobbies,
            city: this.fcity == "" ? updatedata.city : this.fcity,
            address: this.faddress == "" ? updatedata.address : this.faddress,
          }
        );

        console.log(user.data);
        EventBus.$emit("updatedata-event");
        this.OpenClose = !this.OpenClose;
        this.$emit("close-modal-event");
        // this.$router.push("/");
        // alert("User updated!");
      } catch (e) {
        console.log(e);
      }
      this.OpenClose = !this.OpenClose;
      this.$emit("close-modal-event");
    },
    // Close Model
    CloseFun() {
      this.OpenClose = !this.OpenClose;
      this.$emit("close-modal-event");
    },
  },
  watch: {
    visible: function (newVal) {
      this.OpenClose = newVal;
      //   this.OpenClose = oldVal;
    },
  },
};
</script>
