<template>
  <div>
    <div class="home-heading d-flex justify-end">
      <a href="/">
        View Team
        <v-icon small>mdi-arrow-top-right</v-icon>
      </a>
    </div>
    <div class="d-flex">
      <span class="text">Title</span>
      <v-text-field
        v-model="projectProp.title"
        outlined
        dense
        :readonly="readonly"
      ></v-text-field>
    </div>
    <div>
      <div class="text mb-2">Brief Description</div>
      <v-textarea
        v-model="projectProp.description"
        outlined
        rows="4"
        :readonly="readonly"
      >
      </v-textarea>
    </div>
    <div class="mb-8">
      <span class="text mb-2">Objectives</span>
      <v-row
        v-for="objective in projectProp.objectives"
        :key="objective.id"
        class="mt-3"
      >
        <v-col cols="9" class="pr-0 pt-0">
          <v-text-field
            v-model="objective.text"
            outlined
            dense
            hide-details
            :readonly="readonly"
          ></v-text-field>
        </v-col>
        <v-col cols="3" class="pt-0">
          <v-btn depressed block dark :class="statusColor(objective.status)">
            {{ objective.status }}
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div>
      <span class="text mb-2">Category</span>
      <v-combobox
        v-model="projectProp.categories"
        outlined
        :items="category"
        multiple
        dense
        chips
        deletable-chips
        class="mt-3"
        :readonly="readonly"
      ></v-combobox>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectDetails",
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    projectProp: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      category: [
        "Artificial Intelligence",
        "Cary lang Sakalam",
        "Data Analytics",
        "Automation",
        "Internet of Things",
      ],
      status: [
        {
          name: "Not Started",
          color: "midgrey",
        },
        {
          name: "Pending",
          color: "blue",
        },
        {
          name: "Ongoing",
          color: "yellow",
        },
        {
          name: "For Revision",
          color: "red",
        },
        {
          name: "Finished",
          color: "green",
        },
      ],
    };
  },

  methods: {
    statusColor(text) {
      if (this.text === null) return "midgrey";
      let i = this.status.findIndex((x) => x.name === text);
      return this.status[i].color;
    },
  },
};
</script>

<style lang="scss" scoped>
.home-heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.title {
  margin-top: 4px;
}
.text {
  margin-top: 8px;
  margin-right: 10px;
  min-width: 40px;
}
a {
  text-decoration: none;
  color: var(--v-darkgrey);
  &:hover {
    color: var(--v-primary);
  }
}
</style>
