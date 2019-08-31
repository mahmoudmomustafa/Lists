<template>
  <div class="home">
    <NavCom />
    <main class="py-4">
      <div class="container-fluid">
        <div class="content">
          <div class="row justify-content-center show-task">
            <div class="col-lg-6 mx-4">
              <div class="mt-2">
                <h2 class="shows p-4 font-weight-bold" style="color: #5b6f82">
                  Welcome Back
                  <span v-text="userName"></span>..
                </h2>
                <div class="card-body home">
                  <h3
                    class="p-4 font-weight-bold float-left"
                    style="color: #5E52F6"
                  >Make Your Own Lists</h3>
                  <router-link to="/add">
                    <button class="btn btn-success">Add New List <i class="fas fa-plus pl-2"></i></button>
                  </router-link>
                  <img class="float-right" src="../assets/clip-list-is-empty.svg" height="325" style="width:90%"/>
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
import NavCom from "@/components/NavCom.vue";
import sideBarComp from "@/components/sideBarComp.vue";
import firebase from "firebase/app";
export default {
  name: "home",
  components: {
    NavCom,
    sideBarComp
  },
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
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Acme&display=swap");
.btn {
  background: linear-gradient(65deg, #5e52f6 0, #8b82f9 100%);
  border: none;
  box-shadow: 0 0 15px rgba(93, 82, 246, 0.548);
  color: white;
}

.btn:hover,
.btn:focus {
  box-shadow: 0 0 5px #5e52f6;
  border: none;
}

.card {
  padding: 5px;
  box-shadow: 0 0 10px gray;
  border: 0;
  min-height: 150px;
}

.log-card,
.reg-card {
  padding: 50px;
  box-shadow: inset 0 0 8px 0px #aeaeae7a;
  height: 100%;
}

.card h4 span {
  font-size: 15px;
}

/* show style */
.card-body .task {
  background: #f7f7f7;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 15px;
  margin: 5px;
}

.card-body .task p {
  margin-left: 70px;
}

.card-body .change {
  display: flex;
  justify-content: flex-end;
}

.card-body .change div {
  margin: 15px;
}

.card-body .change div button {
  width: 100%;
}

input,
textarea {
  border: 0 !important;
  box-shadow: 0 0 4px #848484 !important;
  background: #6357f73b !important;
  transition: 500ms ease;
}
input:hover,
textarea:hover {
  transform: scale(1.01);
}

.form-check2 {
  border-radius: 8px;
  box-shadow: 0px 2px 6px #93939363;
  background-color: #d7d7d78f;
}

.form-check2 input {
  display: none;
}

.form-check2 label {
  margin-bottom: 0;
  padding: 4px;
  cursor: pointer;
  border-radius: 5px;
}

.form-check2 label i {
  color: #6a6a6a;
  padding: 8px;
  transition: 500ms linear;
}

.form-check2 input:checked + label {
  background: linear-gradient(
    65deg,
    rgb(82, 246, 166) 0,
    rgb(153, 249, 130) 100%
  ) !important;
}

.form-check2 input:checked + label i,
.form-check2 input:checked + label span {
  color: #fff;
}

@keyframes clip {
  0% {
    clip-path: circle(11.74% at 28% 50%);
  }

  100% {
    clip-path: circle(90.74% at 28% 50%);
    background: #31d84d;
  }
}

.btn-danger {
  background: linear-gradient(65deg, #ff4d79 0, #ff809f 100%);
  box-shadow: 0 8px 16px rgba(255, 77, 121, 0.25);
  color: #fff !important;
  border: 0;
}

.btn-success {
  background: linear-gradient(
    65deg,
    rgb(77, 255, 157) 0,
    rgb(139, 255, 128) 100%
  );
  box-shadow: 0 8px 16px rgba(77, 255, 101, 0.25);
  color: #fff !important;
  border: 0;
}

.shows {
  font-family: "Acme", sans-serif;
  text-shadow: 0 0 10px gray;
}

.home {
  overflow: auto;
  position: relative;
  min-height: 355px;
}

.home h3 {
  position: absolute;
  top: -30px;
  left: 0;
  word-spacing: 20px;
  width: 48%;
  font-size: 50px;
  text-indent: 35px;
  color: rgb(108, 99, 255);
  text-shadow: 5px 7px 10px #5b6f82;
}

.home .btn {
  // width: 40%;
  position: absolute;
  height: 45px;
  left: 50px;
  top: 80%;
}

.home .btn:hover {
  box-shadow: 0px 1px 9px 0px #88ff81d9;
}

.log-img {
  position: relative;
  height: 91.1vh;
}

.log-img img {
  width: 100%;
  height: 100%;
}

.heading {
  color: white;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #000000, transparent);
  display: flex;
  flex-direction: row;
}

.heading h2 {
  text-shadow: 0 0 10px #5b6f82;
  line-height: 75px;
  word-spacing: 145px;
  font-size: 55px;
  width: min-content;
  animation: tracking-in-contract 1.5s ease-in-out forwards;
}

@keyframes tracking-in-contract {
  0% {
    letter-spacing: 1em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    letter-spacing: normal;
    opacity: 1;
  }
}

input[type="checkbox"],
input[type="radio"] {
  box-shadow: none !important;
}
</style>