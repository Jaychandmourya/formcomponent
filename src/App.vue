<template>
  <div id="app">
    <nav>
      <button class="btn btn-info" @click="showModal">Add Data</button>
      <form-model
        v-if="displayModal"
        :visible="true"
        variant="success"
        @close-modal-event="hideModal"
        @data-event="insertdata($event)"
      ></form-model>
      <edit-model
        v-if="displayeditModal"
        :visible="true"
        variant="success"
        @close-modal-event="hideModal"
        :editlistdata="editdata"
      ></edit-model>
    </nav>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Hobbies</th>
          <th scope="col">City</th>
          <th scope="col">Address</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alldata in userlist" :key="alldata.id">
          <th scope="row">{{ alldata.id }}</th>
          <td>{{ alldata.name }}</td>
          <td>{{ alldata.gender }}</td>
          <td>
            <p v-for="hobbies in alldata.hobbies" :key="hobbies">
              {{ hobbies }},
            </p>
          </td>
          <td>{{ alldata.city }}</td>
          <td>{{ alldata.address }}</td>
          <td>
            <button class="btn btn-warning" @click="editmodel(alldata)">
              Edit
            </button>
            &nbsp;
            <button class="btn btn-danger" @click="deletedata(alldata.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import FormModel from "./components/FormModel.vue";
import EditModel from "./components/EditModel.vue";
import { EventBus } from "./event-bus.js";
export default {
  data() {
    // All data return
    return {
      editdata: [],
      alldata: [],
      displayModal: false,
      displayeditModal: false,
      userlist: [],
    };
  },
  // import formmodel and use component formmodel
  components: {
    FormModel,
    EditModel,
  },
  methods: {
    // insert/add time emit event push value in userlist/datatable
    insertdata(value) {
      this.userlist.push(value);
    },
    // this function is open model
    showModal() {
      this.displayModal = true;
    },
    // EditToModel Component in Hidden Model
    hideModal() {
      this.displayModal = false;
      this.displayeditModal = false;
    },
    // Edit time open model and pass data
    editmodel(alldata) {
      this.editdata = alldata;
      this.displayeditModal = true;
    },
    // Delete the data with json api
    deletedata(id) {
      axios.delete(`http://localhost:3000/userdata/${id}`);
      this.userlist = this.userlist.filter((alldata) => alldata.id !== id);
    },
    // All Data View json api
    async dataupdate() {
      try {
        const res = await axios.get(`http://localhost:3000/userdata`);
        this.userlist = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  // first Load this function
  created() {
    this.dataupdate();
    // try {
    //   const res = await axios.get(`http://localhost:3000/userdata`);
    //   this.userlist = res.data;
    // } catch (error) {
    //   console.log(error);
    // }
  },
  // this function in use Event Bus
  mounted() {
    EventBus.$on("updatedata-event", () => {
      this.dataupdate();
    });
  },
  // destroyed the Event Bus
  destroyed() {
    EventBus.$off("updatedata-event");
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
