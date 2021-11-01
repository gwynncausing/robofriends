<template>
  <CustomCard>
    <div class="card-team" @click="$emit('select', index)">
      <div class="team-name font-bold">{{ team.teamName }}</div>
      <!-- <div class="research-title">{{ team.researchTitle }}</div> -->
      <div class="members-wrapper">
        <v-avatar
          v-for="(member, memberIndex) in team.members"
          :key="memberIndex"
          color="primary"
          size="24"
        >
          <span class="avatar-content caption">{{ getInitials(member) }}</span>
        </v-avatar>
      </div>
      <div class="date-time">{{ team.dateTime }}</div>
    </div>
  </CustomCard>
</template>

<script>
import CustomCard from "@/components/global/CustomCard";
export default {
  name: "CardTeam",
  components: { CustomCard },
  props: {
    team: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
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
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  .research-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .members-wrapper {
    display: flex;
    flex-direction: row;
    column-gap: 4px;

    .avatar-content {
      color: white;
    }
  }
}
</style>
