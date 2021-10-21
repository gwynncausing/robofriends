<template>
  <div id="research-details">
    <div class="research-title">
      <div class="research-title-wrapper">
        <span class="research-title-label font-semi-bold">Title</span>
        <TextField v-model="research.title" :readonly="readonly" />
      </div>
    </div>

    <div class="description">
      <div class="description-wrapper">
        <span class="description-label font-semi-bold">Brief Description</span>
        <v-textarea
          v-model="research.description"
          outlined
          rows="4"
          :readonly="readonly"
          auto-grow
          dense
        />
      </div>
    </div>

    <div class="objectives">
      <div class="objectives-wrapper">
        <span class="objectives-label font-semi-bold">Objectives</span>
        <div
          v-for="(objective, index) in research.objectives"
          :key="objective.id"
          class="objective-list-wrapper"
          :class="{ active: addObjectiveActive }"
        >
          <v-textarea
            v-model="research.objectives[index]"
            outlined
            rows="1"
            auto-grow
            :readonly="readonly"
            dense
          ></v-textarea>
          <v-btn
            v-if="index !== 0"
            class="btn-remove-item"
            icon
            @click="removeObjective(index)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>

      <Button
        :class="{ active: addObjectiveActive }"
        text
        class="add-objective align-self-end"
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

  .title .description,
  .objectives {
    display: flex;
    flex-direction: column;

    .research-title-wrapper,
    .description-wrapper,
    .objective-wrapper {
      display: flex;
      .research-title-label,
      .description-label,
      .objectives-label {
        padding-bottom: 100px;
      }
    }
    .objective-list-wrapper {
      display: flex;
    }

    .btn-remove-item {
      margin-top: 2px;
      margin-left: 8px;
    }
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
