<template>
  <div class="edit">
    <NavCom />
    <main class="py-4">
      <div class="container-fluid">
        <div class="content">
          <div class="row justify-content-center show-task">
            <div class="col-lg-6 mx-4">
              <!-- edit list -->
              <div class="card mt-2">
                <h4 class="p-4 font-weight-bold" style="color: #5E52F6">Edit List</h4>
                <div class="card-body">
                  <!-- form  -->
                  <form @submit.prevent="updt">
                    <div class="form-group">
                      <label for="titel">Title..</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="title"
                        id="title"
                        placeholder="Title"
                        value="title"
                      />
                    </div>
                    <div class="form-group">
                      <label for="info">Info..</label>
                      <textarea
                        placeholder="List Info"
                        class="form-control"
                        v-model="info"
                        id="info"
                        rows="3"
                      >info</textarea>
                    </div>
                    <div class="change">
                      <form @click.prevent="completed? completed=false : completed=true">
                        <div
                          class="form-check2"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Completed?"
                        >
                          <input
                            type="checkbox"
                            v-model="completed"
                            id="check1"
                            onchange="this.form.submit()"
                          />
                          <label for="check1">
                            <i class="fa fa-check"></i>
                          </label>
                        </div>
                      </form>
                    </div>
                    <!-- error -->
                    <span class="invalid-feedback py-2" role="alert"></span>
                    <div class="form-group">
                      <button class="w-100 btn btn-primary position-static">Confirm</button>
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
  name: "edit",
  components: {
    NavCom,
    sideBarComp
  },
  data() {
    return {
      id: "",
      title: "",
      info: "",
      completed: "",
      errors: []
    };
  },
  created() {
    var id = window.location.href.split("/")[4];
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("lists")
      .doc(id)
      .get()
      .then(doc => {
        this.id = doc.id;
        this.title = doc.data().title;
        this.info = doc.data().info;
        this.completed = doc.data().completed;
      });
  },
  methods: {
    updt() {
      if (this.info == "" || this.title == "") {
        this.errors.push("Please fill the fields");
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("lists")
          .doc(this.id)
          .update({title: this.title, info: this.info, completed: this.completed})
          .then(list => {
            this.$router.push("/home");
          })
          .catch(error => {
            this.errors.push(error.message);
          });
      }
    }
  }
};
</script>
<style lang="scss">
</style>
