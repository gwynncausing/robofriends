<template>
  <v-card class="mx-auto" elevation="1">
    <v-card-text class="d-flex">
      <v-avatar size="36px">
        <img alt="Avatar" :src="user.image" />
      </v-avatar>
      <div class="ml-2">
        <div class="button-font font-bold text-left">
          {{ completeName }}
        </div>
        <div class="caption text-left">{{ user.lastActive }}</div>
      </div>
    </v-card-text>
    <v-card-text class="d-flex justify-space-between py-1">
      <v-progress-linear :value="progress" height="12" rounded>
        <div class="white--text caption d-flex align-center">
          {{ progress }}%
        </div>
      </v-progress-linear>
    </v-card-text>
    <v-card-text class="d-flex justify-space-between">
      <div class="px-2">
        <h5>{{ completedTasksCount }}</h5>
        <div class="button-font font-semi-bold">Completed Tasks</div>
      </div>
      <div class="px-2">
        <h5>{{ totalTasksCount }}</h5>
        <div class="button-font font-semi-bold">Total No. of Tasks</div>
      </div>
      <div class="px-2">
        <h5>{{ budCoinsEarned }}</h5>
        <div class="button-font font-semi-bold">Bud Coins Earned</div>
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text class="d-flex justify-space-between pt-0">
      <v-list width="100%">
        <v-list-group
          v-for="task in tasks"
          :key="task.title"
          v-model="task.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <span class="neutral-600--text d-flex justify-start button-font">
                {{ task.title }} ({{ task.count }})
              </span>
            </v-list-item-content>
          </template>
          <v-list-item v-for="child in task.tasks" :key="child.title">
            <v-list-item-content>
              <span class="neutral-600--text d-flex justify-start button-font">
                {{ child.name }}
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardInsight",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    budCoinsEarned: {
      type: Number,
      default: 0,
    },
    newTasks: {
      type: Array,
      default: () => [],
    },
    ongoingTasks: {
      type: Array,
      default: () => [],
    },
    completedTasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    completeName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    newTasksCount() {
      return this.newTasks.length;
    },
    ongoingTasksCount() {
      return this.ongoingTasks.length;
    },
    completedTasksCount() {
      return this.completedTasks.length;
    },
    totalTasksCount() {
      return (
        this.newTasksCount + this.ongoingTasksCount + this.completedTasksCount
      );
    },
    progress() {
      return (
        (this.completedTasks.length / this.totalTasksCount) *
        100
      ).toFixed(2);
    },
    tasks() {
      return [
        {
          title: "New",
          count: this.newTasksCount,
          tasks: this.newTasks,
        },
        {
          title: "Ongoing",
          count: this.ongoingTasksCount,
          tasks: this.ongoingTasks,
        },
        {
          title: "Completed",
          count: this.completedTasksCount,
          tasks: this.completedTasks,
        },
      ];
    },
  },
};
</script>

<style style="scoped"></style>
