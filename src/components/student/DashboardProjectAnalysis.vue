<template>
  <div class="analysis">
    <div class="analysis-wrapper">
      <div class="analysis-heading">
        <div class="title">Project Analysis</div>
        <div class="analysis-button-wrapper">
          <SelectField
            class="analysis-button-small"
            :items="days"
            :item-selected="daysSelected"
            placeholder="Days"
            hidedetails
            @output="
              ($event) => {
                daysSelected = $event;
              }
            "
          />
        </div>
      </div>
      <div class="analysis-content">Graph here</div>
    </div>
  </div>
</template>

<script>
import SelectField from "@/components/SelectField.vue";

export default {
  name: "Analysis",
  components: { SelectField },
  data: function () {
    return {
      days: ["7 days", "14 days", "30 days"],
      daysSelected: "7 days",
    };
  },
  watch: {
    daysSelected: {
      handler() {
        console.log(this.daysSelected);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.analysis-heading {
  display: flex;
  justify-content: space-between;
}
.title {
  margin-top: 4px;
}
.analysis-button-small {
  width: 125px;
}
</style>
