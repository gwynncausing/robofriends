<template>
  <div id="research-details">
    <div>
      <div class="font-weight-bold">Title</div>
      <TextField
        v-model="research.title"
        outlined
        dense
        :readonly="readonly"
      ></TextField>
    </div>
    <div>
      <div class="font-weight-bold text mb-2">Brief Description</div>
      <v-textarea
        v-model="research.description"
        outlined
        rows="4"
        :readonly="readonly"
        auto-grow
        dense
      ></v-textarea>
    </div>
    <div class="mb-8 d-flex flex-column">
      <div class="font-weight-bold text mb-2">Objectives</div>
      <div
        v-for="(objective, index) in research.objectives"
        :key="objective.id"
        class="objective-list-wrapper mt-3 d-flex"
        :class="{ active: addObjectiveActive }"
      >
        <v-textarea
          v-model="objective.text"
          outlined
          rows="1"
          auto-grow
          :readonly="readonly"
          dense
        ></v-textarea>
        <Button icon text @click="removeObjective(index)">
          <v-icon color="neutral-300">mdi-close</v-icon>
        </Button>
      </div>
      <Button
        :class="{ active: addObjectiveActive }"
        text
        class="add-objective align-self-end mt-15"
        @click="addItem"
      >
        Add Objective
      </Button>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ResearchDetails",
  components: {
    TextField,
    Button,
  },
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    research: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      addObjectiveActive: false,
    };
  },

  methods: {
    addItem() {
      this.$emit("addObjective");
      this.addObjectiveActive = !this.addObjectiveActive;
      setTimeout(() => {
        this.addObjectiveActive = !this.addObjectiveActive;
      }, 1000);
    },
    removeObjective(index) {
      this.$emit("removeObjective", index);
    },
  },
};
</script>

<style lang="scss" scoped>
#research-details {
  .objective-list-wrapper:not(:first-child) {
    animation: fade-in-opacity 1s ease-in-out;
  }

  .objective.active,
  .add-objective.active {
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
}
</style>
