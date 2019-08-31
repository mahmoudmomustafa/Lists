<template>
  <div class="show">
    <NavCom />
    <main class="py-4">
      <div class="container-fluid">
        <div class="content">
          <div class="row justify-content-center show-task">
            <div class="col-lg-6 mx-4">
              <!-- {{-- show task --}} -->
              <div class="card mt-2">
                <h4 class="p-4 font-weight-bold" style="color: #5E52F6">Title..</h4>
                <p class="px-5" v-text="title"></p>
                <div class="card-body">
                  <h5 class="p-2 font-weight-bold" style="color: #5E52F6">Info..</h5>
                  <p class="p-4" v-text="info"></p>
                  <div class="change">
                    <div class="edit">
                      <router-link :to="{ name: 'edit', params: { edit: this.id }}">
                        <a>
                          <button class="btn btn-success">edit</button>
                        </a>
                      </router-link>
                    </div>
                    <div class="delete">
                      <form action="taskID" @click.prevent="del">
                        <button class="btn btn-danger">Delete</button>
                      </form>
                    </div>
                  </div>
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
  name: "show",
  components: {
    NavCom,
    sideBarComp
  },
  data() {
    return {
      id: "",
      title: "",
      info: ""
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.id = this.$route.params.list;
      this.title = "";
      this.info = "";
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("lists")
          .doc(this.$route.params.list)
          .onSnapshot(doc => {
            this.title = doc.data().title;
            this.info = doc.data().info;
          });
    },
    del() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("lists")
        .doc(this.id)
        .delete()
        .then(list => {
          this.$router.push("/home");
        })
        .catch(error => {
          this.errors.push(error.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn:hover {
  box-shadow: 0 0 5px #5e52f6;
}
</style>
