<template>
  <!-- main body -->
  <div class="container slide-in-fwd-center mb-3">
    <!-- header -->
    <headerComp></headerComp>
    <!-- login form -->
    <form class="log-in shadow-lg m-auto rounded" @submit.prevent="login">
      <div class="p-5">
        <h3 class="font-weight-bold text-primary mb-5 p-2">
          Login in to Your Account Now..
        </h3>
        <!-- Mail -->
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
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <!-- Pass -->
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
        <!-- Remember me -->
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="rememberUser" />
          <label class="form-check-label" for="rememberUser">Remember Me</label>
        </div>
        <!-- submit btn -->
        <div id="subHold" class="mb-2">
          <button class="btn btn-primary m-auto w-100">
            Log In
            <i class="pl-2 fas fa-sign-in-alt"></i>
          </button>
        </div>
        <router-link to="/register">Or Create a new account</router-link>
      </div>
    </form>
  </div>
</template>

<style>
.slide-in-fwd-center {
  -webkit-animation: slide-in-fwd-center 0.4s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-fwd-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}

.log-in {
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
  max-width: 500px;
}

.input-group {
  background: #e9ecef;
}
.btn i {
  transition: 500ms ease;
}
.btn:hover i {
  transform: translate(10px);
}
</style>

<script>
import headerComp from "@/components/headerComp.vue";
import firebase from "firebase/app";

export default {
  components: {
    headerComp
  },
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    login() {
      if (this.password == "" || this.email == "") {
        this.errors = [];
        this.errors.push("Please fill the fields");
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$store.commit("setCurrentUser", user.user);
            this.$store.dispatch("fetchUserProfile");
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
