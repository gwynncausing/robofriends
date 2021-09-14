<template>
  <div id="create-team">
    <div class="team-name">
      <div class="team-name-wrapper">
        <span class="team-name-label">Team Name</span>
        <TextField
          v-model="team.teamName"
          name="team-name"
          :rules="rules.teamName"
        />
      </div>
    </div>
    <div class="teacher-list">
      <div
        v-for="(teacher, index) in team.teacher"
        :key="index"
        class="teacher-list-wrapper"
      >
        <span class="teacher-list-label">Teacher {{ index + 1 }}</span>
        <Combobox v-model="team.teacher[index]" name="teachers" />
        <span>{{ team.teacher[index] }}</span>
      </div>
      <Button
        text
        :class="{ active: addTeacherActive }"
        class="add-teacher"
        @click="addTeacher"
      >
        Add Teacher
      </Button>
    </div>

    <div class="member-list">
      <div
        v-for="(member, index) in team.member"
        :key="index"
        class="member-list-wrapper"
      >
        <span class="member-list-label">Member {{ index + 1 }}</span>
        <TextField v-model="team.member[index]" name="member" />
      </div>
      <Button
        text
        :class="{ active: addMemberActive }"
        class="add-member"
        @click="addMember"
      >
        Add Member
      </Button>
    </div>

    <div :class="{ active: addMemberActive }" class="tree-list">
      <span class="tree-list-label">Choose a tree you want to plant</span>
      <v-item-group active-class="neutral-50">
        <div v-dragscroll.x class="tree-list-wrapper">
          <v-item
            v-for="(tree, index) in treeList"
            :key="index"
            v-slot="{ toggle }"
          >
            <div
              v-ripple="{ center: true }"
              class="tree-list-tree"
              @click="[toggle, (team.tree = tree.title)]"
            >
              <v-img
                :src="require('@/assets/' + tree.src)"
                :alt="tree.title"
                height="120"
                contain
              />
              <span>{{ capitalize(tree.title) }}</span>
            </div>
          </v-item>
        </div>
      </v-item-group>
    </div>

    <div class="submit-wrapper d-flex">
      <Button class="ml-auto" @click="submit"> Submit</Button>
    </div>
  </div>
</template>

<script>
import Combobox from "@/components/global/Combobox.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
// import { mapGetters } from "vuex";

export default {
  name: "CreateTeam",
  components: {
    Combobox,
    TextField,
    Button,
  },
  data() {
    return {
      rules: {
        teamName: [(v) => !!v || "Team Name is required"],
      },
      addTeacherActive: false,
      addMemberActive: false,
      treeList: [],
      team: {
        teamName: "",
        teacher: [""],
        member: [""],
        tree: "",
      },
    };
  },

  computed: {
    // ...mapGetters({
    //   getUser: "user/getUser",
    // }),
  },

  watch: {
    //
  },

  created() {
    const images = this.importAllImages(
      require.context("@/assets/", true, /\.svg$/)
    );
    const imagesArray = Object.values(images);
    imagesArray.forEach((element) => {
      if (element.includes("tree")) {
        let newElement = element.replaceAll("/img/", "").split(".");
        this.treeList.push({
          src: `${newElement[0]}.${newElement[2]}`,
          title: newElement[0].split("-")[1],
        });
      }
    });
  },

  methods: {
    importAllImages(directory) {
      return directory.keys().map(directory);
    },
    capitalize(item) {
      return item.charAt(0).toUpperCase() + item.slice(1);
    },
    addTeacher() {
      this.team.teacher.push("");
      this.addTeacherActive = !this.addTeacherActive;
      setTimeout(() => {
        this.addTeacherActive = !this.addTeacherActive;
      }, 1000);
    },
    addMember() {
      this.team.member.push("");
      this.addMemberActive = !this.addMemberActive;
      setTimeout(() => {
        this.addMemberActive = !this.addMemberActive;
      }, 1000);
    },
    submit() {
      console.log("team", this.team);
    },
  },
};
</script>

<style lang="scss" scoped>
#create-team {
  max-width: 1252px;
  padding: 40px clamp(20px, 5.5vw, 80px);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(3, auto);
  gap: 8px;
}
.team-name,
.teacher-list,
.member-list {
  display: flex;
  flex-direction: column;

  .team-name-wrapper,
  .teacher-list-wrapper,
  .member-list-wrapper {
    display: flex;

    .team-name-label,
    .teacher-list-label,
    .member-list-label {
      padding-top: 8px;
      width: 120px;
    }
  }

  .add-teacher,
  .add-member {
    align-self: end;
  }
}

.tree-list {
  height: 100%;
  overflow: auto;
  visibility: hidden;

  .tree-list-label {
    padding-top: 8px;
    width: 120px;
    visibility: visible;
  }

  .tree-list-wrapper {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 12px;

    .tree-list-tree {
      width: 200px;
      visibility: visible;
      cursor: pointer;
      margin: 4px 16px;
      text-align: -webkit-center;
      padding: 8px;
      background-color: white;
      box-shadow: 4px 4px 8px #bfbfbf;
      border-radius: 4px;

      &:hover {
        background-color: $neutral-50;
      }
    }
  }

  &:hover {
    visibility: visible;
  }
}

.member-list-wrapper:not(:first-child) {
  animation: fade-in-opacity 1s ease-in-out;
}

.add-teacher.active,
.add-member.active,
.tree-list.active {
  animation: fade-in 1s ease-in-out;
}

// .submit-wrapper {
//   button.active {
//     animation: fade-in 1s ease-in-out;
//   }
// }

@keyframes fade-in-opacity {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    transform: translateY(-20px);
  }
}

@media only screen and (max-width: $screen-size-sm-max) {
  .tree-list {
    visibility: visible;
  }
}
</style>
