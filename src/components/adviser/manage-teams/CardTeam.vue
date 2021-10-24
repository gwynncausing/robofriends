<template>
  <div v-ripple="{ center: true }" class="card-team">
    <div class="content-wrapper">
      <div class="team-name font-bold">{{ team.teamName }}</div>
      <div class="research-title">{{ team.researchTitle }}</div>
      <div class="members-wrapper">
        <v-avatar
          v-for="(member, index) in team.members"
          :key="index"
          color="primary"
          size="24"
        >
          <span class="avatar-content caption">{{ getInitials(member) }}</span>
        </v-avatar>
      </div>
      <div class="date-time">{{ team.dateTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardTeam",
  props: {
    team: {
      type: Object,
      default: () => {},
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
.card-team {
  user-select: none;
  width: 256px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  background-color: $neutral-50;
  &:hover {
    cursor: pointer;
  }

  .content-wrapper {
    padding: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    .research-title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .members-wrapper {
      display: flex;
      flex-direction: row;
      column-gap: 8px;

      .avatar-content {
        color: white;
      }
    }
  }
}
</style>
