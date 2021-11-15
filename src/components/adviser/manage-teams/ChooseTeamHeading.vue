<template>
  <div class="choose-team">
    <div class="team-details-wrapper">
      <TextField v-model="teamName" class="team-name" readonly />
      <div v-show="$vuetify.breakpoint.smAndUp" class="members-wrapper">
        <v-avatar
          v-for="index in displayMembers"
          :key="index"
          color="primary"
          size="32"
        >
          <span v-if="members.length > 0" class="avatar-content caption">
            {{ members[index - 1].user.firstName[0] }}
            {{ members[index - 1].user.lastName[0] }}
          </span>
        </v-avatar>
        <v-avatar v-show="members.length > 4" color="neutral-300" size="32">
          <span class="avatar-content caption">+{{ moreMembers }}</span>
        </v-avatar>
      </div>
    </div>
    <Button outlined class="choose-team-btn"> Choose Team</Button>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";

export default {
  name: "ChooseTeamHeading",
  components: {
    TextField,
    Button,
  },
  props: {
    team: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      members: [],
      teamName: "",
    };
  },

  computed: {
    displayMembers() {
      if (!this.members) return 0;
      if (this.members.length > 5) {
        return 3;
      } else {
        return this.members?.length;
      }
    },
    moreMembers() {
      return this.members.length - 3;
    },
  },

  watch: {
    team(newValue) {
      this.members.length = 0;
      newValue.members.forEach((member) => {
        if (member.baseRole !== "adviser") this.members.push(member);
      });
      this.teamName = newValue.name;
    },
  },

  methods: {
    getInitials(member) {
      return member
        .match(/(^\S\S?|\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("")
        .toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.choose-team {
  display: flex;
  flex-direction: row;
  column-gap: 64px;
  user-select: none;

  .team-details-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    column-gap: 16px;
    flex-grow: 2;

    .team-name {
      flex-grow: 2;
      min-width: 200px;
    }

    .members-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 4px;
      height: 40px;

      .avatar-content {
        color: white;
      }
    }
  }
}
</style>
