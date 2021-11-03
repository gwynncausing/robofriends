<template>
  <CustomCard>
    <div class="card-proposal" @click="$emit('select', index)">
      <div class="research-title">{{ proposal.researchTitle }}</div>
      <div class="status-wrapper">
        <Chip dark :color="statusColors[proposal.status]">
          {{ proposal.status }}
        </Chip>
      </div>
      <div class="date-time">{{ proposal.dateTime }}</div>
    </div>
  </CustomCard>
</template>

<script>
import CustomCard from "@/components/global/CustomCard";
import Chip from "@/components/global/Chip.vue";

export default {
  name: "CardTeam",
  components: { CustomCard, Chip },
  props: {
    proposal: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      statusColors: {
        Pending: "blue",
        "Needs Revision": "yellow",
        Rejected: "red",
        Approved: "primary",
      },
    };
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
.card-proposal {
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
    column-gap: 8px;

    .avatar-content {
      color: white;
    }
  }
}
</style>
