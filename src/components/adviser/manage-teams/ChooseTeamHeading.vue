<template>
  <div class="choose-team">
    <div class="team-details-wrapper">
      <TextField v-model="team.teamName" readonly class="team-name" />
      <div class="members-wrapper">
        <v-avatar
          v-for="index in displayMembers"
          :key="index"
          color="primary"
          size="32"
        >
          <span class="avatar-content caption">{{
            getInitials(team.members[index - 1])
          }}</span>
        </v-avatar>
        <v-avatar
          v-show="team.members.length > 4"
          color="neutral-300"
          size="32"
        >
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
  name: "CardTeam",
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
  computed: {
    displayMembers() {
      return this.team.members.length > 5 ? 3 : 5;
    },
    moreMembers() {
      return this.team.members.length - 3;
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
