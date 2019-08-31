<template>
  <div class="col-lg-3 mx-4">
    <!-- incomplete -->
    <div class="card mt-2">
      <h4 class="p-4 font-weight-bold" style="color: #5E52F6">
        <i class="fas fa-list-ul fa-xs pr-2"></i>Lists..
      </h4>
      <div class="card-body pt-1">
        <div class="tasks row flex-column justify-content-center">
          <!-- no list -->
          <div class="row" v-if="lists == ''">
            <div class="col">
              <p class="font-weight-bold text-center" style="color: #5b6f82;">
                No
                Lists
                yet
              </p>
            </div>
          </div>
          <!-- lists -->
          <div v-else>
            <div v-for="list in lists" :key="list.id">
              <div
                class="row addTask mb-2"
                :class="[list.data().completed? 'completed':'incompleted']"
              >
                <div class="col">
                  <router-link :to="{ name: 'show', params: { list: list.id }}">
                    <a class="float-left font-weight-bold" :data-id="list.id">
                      <p v-text="list.data().title"></p>
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "sideBarComp",
  data() {
    return {
      lists: []
    };
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("lists")
      .onSnapshot(querySnapshot => {
        this.lists = [];
        querySnapshot.forEach(doc => {
          this.lists.push(doc);
        });
      });
  }
};
</script>

<style scoped lang="scss">
.addTask {
  border-radius: 4px;
  box-shadow: 0 0 5px #a3a3a394;
  margin: 5px 10px;
  padding: 10px;
  transition: all 500ms ease-in-out;
  min-height: fit-content;
  width: auto;
}

.addTask i {
  cursor: pointer;
}

.addTask:hover {
  box-shadow: 0 0 8px #757474c2;
}
.incompleted {
  background: linear-gradient(
    65deg,
    rgb(246, 82, 82) 0,
    rgb(249, 130, 130) 100%
  ) !important;
}

.completed {
  background: linear-gradient(
    65deg,
    rgb(82, 246, 166) 0,
    rgb(153, 249, 130) 100%
  ) !important;
}

.incompleted i:hover,
.completed i:hover {
  color: rgb(255, 255, 255);
}

.addTask:hover a {
  color: rgba(0, 0, 0, 0.5) !important;
}

.addTask a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
}

.addTask a p {
  margin: 0;
}

.addTask .add {
  position: relative;
  top: 50px;
}
</style>