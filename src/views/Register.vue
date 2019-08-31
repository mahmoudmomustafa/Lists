<template>
  <div class="container slide-in-fwd-center mb-3">
    <!-- header -->
    <headerComp></headerComp>
    <!-- login form -->
    <form class="log-in shadow-lg m-auto rounded" @submit.prevent="register">
      <div class="p-5">
        <h3 class="font-weight-bold text-primary mb-5 p-2">
          Create your account now..
        </h3>
        <div class="form-group mb-4 row">
          <div class="col">
            <div class="input-group">
              <!-- icon div -->
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <!-- user input -->
              <input
                type="text"
                class="form-control"
                id="userName"
                v-model="userName"
                placeholder="User Name"
              />
            </div>
          </div>
        </div>
        <!-- User Mail -->
        <div class="form-group mb-4 row">
          <div class="col">
            <div class="input-group">
              <!-- icon div -->
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fas fa-at"></i>
                </div>
              </div>
              <!-- mail input -->
              <input
                type="text"
                class="form-control"
                id="email"
                v-model="email"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <!-- User Pass -->
        <div class="form-group mb-4 row">
          <div class="col">
            <div class="input-group">
              <!-- icon div -->
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fas fa-unlock-alt"></i>
                </div>
              </div>
              <!-- password input -->
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                placeholder="Password"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
        <span
          class="text-danger"
          v-for="err in errors"
          :key="err"
          v-text="err"
        ></span>
        <!-- submit btn -->
        <div id="subHold" class="mb-2">
          <button class="btn btn-primary m-auto w-100">
            Register
            <i class="pl-2 fas fa-sign-in-alt"></i>
          </button>
        </div>
        <router-link to="/login">Already have an account</router-link>
      </div>
    </form>
  </div>
</template>

<style lang="stylus" scoped></style>

<script>
import headerComp from "@/components/headerComp.vue";
import firebase from "firebase/app";
export default {
  components: {
    headerComp
  },
  name: "register",
  data: function() {
    return {
      userName: "",
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    register: function() {
      if (this.userName == "" || this.email == "") {
        this.errors = [];
        this.errors.push("Please fill the fields");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            return firebase
              .firestore()
              .collection("users")
              .doc(user.user.uid)
              .set({ name: this.userName, email: this.email });
          })
          .then(user => {
            this.$router.replace("home");
          })
          .catch(error => {
            this.errors = [];
            this.errors.push(error.message);
          });
      }
    }
  }
};
</script>
