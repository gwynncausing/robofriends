<template>
  <CustomCard>
    <div class="card-team" @click="$emit('select', index)">
      <div class="team-name font-bold">{{ team.name || "" }}</div>
      <div class="members-wrapper">
        <v-avatar
          v-for="(member, memberIndex) in members"
          :key="memberIndex"
          color="primary"
          size="24"
        >
          <span class="avatar-content caption">
            {{ member.user.firstName[0] }}
            {{ member.user.lastName[0] }}
          </span>
        </v-avatar>
      </div>
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

  computed: {
    members() {
      let members = [];
      this.team.members.forEach((member) => {
        if (member.baseRole !== "adviser") members.push(member);
      });
      return members;
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
