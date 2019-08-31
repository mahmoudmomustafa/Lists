<template>
  <div class="add">
    <NavCom />
    <main class="py-4">
      <div class="container-fluid">
        <div class="content">
          <div class="row justify-content-center show-task">
            <div class="col-lg-6 mx-4">
              <div class="card mt-2">
                <h4 class="p-4 font-weight-bold" style="color: #5E52F6"><i class="fas fa-plus fa-xs pr-2"></i>Add List..</h4>
                <!-- {{-- card body --}} -->
                <div class="card-body">
                  <!-- {{-- form --}} -->
                  <form @submit.prevent="addList">
                    <div class="form-group">
                      <label for="title" class="font-weight-bold" style="color: #5b6f82;">Title..</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="title"
                        id="title"
                        placeholder="List Title"
                      />
                    </div>
                    <div class="form-group">
                      <label class="font-weight-bold" style="color: #5b6f82;" for="info">Info..</label>
                      <textarea
                        placeholder="List Info"
                        class="form-control"
                        v-model="info"
                        id="info"
                        rows="3"
                      ></textarea>
                    </div>
                    <!-- error -->
                    <div v-if="errors !== ''">
                      <span class="text-danger" v-for="err in errors" :key="err" v-text="err"></span>
                    </div>
                    <div class="form-group">
                      <button class="w-100 btn btn-primary position-static">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <!-- sidebar -->
            <sideBarComp></sideBarComp>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import NavCom from "@/components/NavCom.vue";
import sideBarComp from "@/components/sideBarComp.vue";
import firebase from "firebase/app";
export default {
  name: "add",
  components: {
    NavCom,
    sideBarComp
  },
  data() {
    return {
      info: "",
      title: "",
      errors: []
    };
  },
  methods: {
    addList() {
      if (this.info == "" || this.title == "") {
        this.errors=[]
        this.errors.push("Please fill the fields");
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("lists")
          .add({ title: this.title, info: this.info, completed: false })
          .then(() => {
            this.info = "";
            this.title = "";
            this.errors=[]
          })
          .catch(error => {
            this.errors.push(error.message);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.btn:hover {
  box-shadow: 0 0 5px #5e52f6;
}
</style>
