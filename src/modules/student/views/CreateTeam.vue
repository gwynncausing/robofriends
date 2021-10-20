<template>
  <div id="create-team">
    <v-form id="form" ref="form" lazy-validation>
      <div class="team-name">
        <div class="team-name-wrapper">
          <span class="team-name-label">Team Name</span>
          <TextField
            v-model="team.name"
            name="team-name"
            :rules="rules.name"
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
          <Combobox
            v-model="team.teacher[index]"
            name="teachers"
            :items="teachersList"
            :rules="rules.name"
          />
          <v-btn
            v-if="index !== 0"
            class="btn-remove-item"
            icon
            @click="removeItem(index, team.teacher)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <Button
          text
          :class="{ active: addTeacherActive }"
          class="add-teacher"
          @click="addItem(team.teacher, 'addTeacherActive')"
        >
          Add Teacher
        </Button>
      </div>

      <div :class="{ active: addTeacherActive }" class="member-list">
        <div
          v-for="(member, index) in team.member"
          :key="index"
          class="member-list-wrapper"
        >
          <span class="member-list-label">Member {{ index + 1 }}</span>
          <TextField
            v-model="team.member[index]"
            name="member"
            :rules="rules.name"
          />
          <v-btn
            v-if="index !== 0"
            class="btn-remove-item"
            icon
            @click="removeItem(index, team.member)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <Button
          text
          :class="{ active: addMemberActive }"
          class="add-member"
          @click="addItem(team.member, 'addMemberActive')"
        >
          Add Member
        </Button>
      </div>

      <div
        :class="{ active: addMemberActive || addTeacherActive }"
        class="tree-list"
      >
        <div class="tree-list-container">
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
                  @click="[toggle(), selectTree(tree.title)]"
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
        <span
          class="error--text plant-error"
          :class="{ 'plant-error-active': isTreeError }"
        >
          A plant is required
        </span>
      </div>
    </v-form>

    <div
      :class="{ active: addMemberActive || addTeacherActive }"
      class="submit-wrapper"
    >
      <Button class="ml-auto" @click="submit"> Submit</Button>
    </div>
  </div>
</template>

<script>
import Combobox from "@/components/global/Combobox.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS } from "../store/types/actions";
import { GETTERS } from "../store/types/getters";
import { UTILS } from "../constants/utils";
// import { USER } from "@/utils/constants/user";
// import { STATUS_CODES } from "@/utils/constants/http-status-codes";

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
        name: [(v) => !!v || "Team Name is required"],
      },
      addTeacherActive: false,
      addMemberActive: false,
      treeList: [],
      teachersList: ["Juan", "Thoo", "Thri"],
      team: {
        name: "",
        teacher: [""],
        member: [""],
        tree: "",
      },
      isTreeError: false,
    };
  },

  computed: {
    ...mapGetters({
      getTeam: `${UTILS.STORE_MODULE_PATH}${GETTERS.GET_TEAM}`,
      getSentMembersInvitations: `${UTILS.STORE_MODULE_PATH}${GETTERS.GET_SENT_MEMBERS_INVITATIONS}`,
      getSentTeachersInvitations: `${UTILS.STORE_MODULE_PATH}${GETTERS.GET_SENT_TEACHERS_INVITATIONS}`,
    }),
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
    ...mapActions({
      onCreateTeam: `${UTILS.STORE_MODULE_PATH}${ACTIONS.CREATE_TEAM}`,
      onSendMembersInvitations: `${UTILS.STORE_MODULE_PATH}${ACTIONS.SEND_MEMBERS_INVITATIONS}`,
      onSendTeachersInvitations: `${UTILS.STORE_MODULE_PATH}${ACTIONS.SEND_TEACHERS_INVITATIONS}`,
    }),
    removeItem(item = 0, user = []) {
      user.splice(item, 1);
    },
    importAllImages(directory) {
      return directory.keys().map(directory);
    },
    capitalize(item) {
      return item.charAt(0).toUpperCase() + item.slice(1);
    },
    addItem(user = [], userActive) {
      console.log(user, userActive);
      user.push("");
      if (userActive === "addMemberActive") {
        this.addMemberActive = !this.addMemberActive;
        setTimeout(() => {
          this.addMemberActive = !this.addMemberActive;
        }, 1000);
        return;
      }
      this.addTeacherActive = !this.addTeacherActive;
      setTimeout(() => {
        this.addTeacherActive = !this.addTeacherActive;
      }, 1000);
    },
    selectTree(treeTitle) {
      if (this.team.tree !== treeTitle) {
        this.team.tree = treeTitle;
        this.isTreeError = false;
        return;
      }
      this.team.tree = "";
    },
    async submit() {
      if (!this.team.tree) this.isTreeError = true;
      if (this.$refs.form.validate() && !this.isTreeError) {
        try {
          const createTeamPayload = {
            name: this.team.name,
            description: "random",
          };
          await this.onCreateTeam(createTeamPayload);
          const invitedMembersPayload = {
            id: this.getTeam.id,
            emails: {
              invitedEmails: this.team.member,
              baseRole: "member",
            },
          };
          await this.onSendMembersInvitations(invitedMembersPayload);
          const invitedTeachersPayload = {
            id: this.getTeam.id,
            emails: {
              invitedEmails: this.team.teacher,
              baseRole: "adviser",
            },
          };
          await this.onSendTeachersInvitations(invitedTeachersPayload);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#form {
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

    .btn-remove-item {
      margin-top: 2px;
      margin-left: 8px;
    }
  }

  .add-teacher,
  .add-member {
    align-self: end;
  }
}

.tree-list {
  height: 246px;
  position: relative;
  overflow: hidden;
}
.tree-list-container {
  height: 100%;
  overflow-y: hidden;
  position: relative;
  background: $white;

  .tree-list-label {
    padding-top: 8px;
    width: 120px;
  }

  .tree-list-wrapper {
    display: flex;
    padding: 12px;
    cursor: pointer;
    overflow-x: scroll;

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
        visibility: visible;
      }
    }
  }
}

.submit-wrapper {
  display: flex;
  margin-top: 24px;
}

.member-list-wrapper:not(:first-child),
.teacher-list-wrapper:not(:first-child) {
  animation: fade-in-opacity 1s ease-in-out;
}

.add-teacher.active,
.add-member.active,
.member-list.active,
.tree-list.active,
.submit-wrapper.active {
  animation: fade-in 1s ease-in-out;
}

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

.plant-error {
  font-size: 0.75rem;
  padding-left: 0.75rem;
  position: absolute;
  left: 0;
  bottom: 18px;
  transition: bottom 250ms linear;
  z-index: -1;
}

.plant-error-active {
  bottom: 0px;
  z-index: 0;
}
</style>
