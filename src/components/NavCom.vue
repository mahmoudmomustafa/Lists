<template>
  <nav id="navbar" class="navbar navbar-expand-md navbar-dark bg-dark shadow">
    <div class="container">
      <router-link to="/home">
        <a class="navbar-brand" style="color:white"
          >ToDist<i
            class="fas fa-feather-alt fa-sm pl-2"
            style="color:white"
          ></i
        ></a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-stream"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav mr-auto"></ul>
        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/home">
              <a class="nav-link">Home</a>
            </router-link>
          </li>
          <li class="nav-item">
            <span class="nav-link" v-text="userName"></span>
          </li>
          <li class="nav-item">
            <a
              class="nav-link pl-0"
              @click="logout"
              data-toggle="tooltip"
              data-placement="bottom"
              title="SignOut"
            >
              <i class="ml-1 fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "NavCom",
  props: {},
  data() {
    return {
      userName: ""
    };
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        this.userName = doc.data().name;
      });
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.navbar {
  background: linear-gradient(
    49deg,
    rgba(89, 89, 89, 0.19) 0%,
    rgb(78, 87, 104) 100%
  );
  width: 100%;
}

.navbar-brand {
  font-weight: 700;
  padding-bottom: 5px;
  transition: 500ms ease-in-out;
}

.navbar-brand:hover {
  transform: translate(10px);
  color: #1d68ac !important;
}

i.ml-1.fas.fa-sign-out-alt {
  transition: 500ms ease;
}

i.ml-1.fas.fa-sign-out-alt:hover {
  color: #c65858;
}

a:hover {
  cursor: pointer;
}

.navbar-dark .navbar-toggler {
  transition: 500ms ease-in-out;
  border: none;
  outline: none;
}

#navbarDropdown::after {
  content: none;
}

.more-icon {
  font-size: 15px;
  transform: rotate(90deg);
  line-height: 2;
}

a:hover {
  text-decoration: none;
}
</style>
