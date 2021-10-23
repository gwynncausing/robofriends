<template>
  <div id="research">
    <div class="research-title">
      <div class="research-title-wrapper">
        <div class="research-title-label-wrapper">
          <span class="research-title-label font-semi-bold">Title</span>
          <Chip
            v-show="showStatus"
            v-model="research.status"
            small
            dark
            :color="statusColors[research.status]"
          >
            {{ research.status }}
          </Chip>
        </div>
        <TextField v-model="research.title" :readonly="detailsReadonly" />
      </div>
    </div>

    <div class="description">
      <div class="description-wrapper">
        <div class="description-label font-semi-bold">Brief Description</div>
        <Textarea
          v-model="research.description"
          rows="4"
          :readonly="detailsReadonly"
        />
      </div>
    </div>

    <div class="objectives">
      <div class="objectives-wrapper">
        <div class="objectives-label font-semi-bold">Objectives</div>
        <div
          v-for="(objective, index) in research.objectives"
          :key="objective.id"
          class="objective-list-wrapper"
          :class="{ active: addObjectiveActive }"
        >
          <Textarea
            v-model="research.objectives[index]"
            :readonly="detailsReadonly"
          />
          <v-btn
            v-if="index !== 0"
            v-show="!detailsReadonly"
            class="btn-remove-item"
            icon
            @click="removeObjective(index)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>

      <Button
        v-show="!detailsReadonly"
        :class="{ active: addObjectiveActive }"
        text
        class="add-objective align-self-end"
        @click="addItem"
      >
        Add Objective
      </Button>
    </div>

    <div v-show="showFeedback" class="feedback">
      <div class="feedback-wrapper">
        <div class="feedback-label font-semi-bold">Feedback</div>
        <Textarea
          v-model="research.feedback.text"
          :readonly="feedbackReadonly"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Textarea from "@/components/global/Textarea.vue";
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import Chip from "@/components/global/Chip.vue";

export default {
  name: "ResearchDetails",
  components: {
    Textarea,
    TextField,
    Button,
    Chip,
  },
  props: {
    detailsReadonly: {
      type: Boolean,
      default: false,
    },
    feedbackReadonly: {
      type: Boolean,
      default: false,
    },
    showFeedback: {
      type: Boolean,
      default: false,
    },
    showStatus: {
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
      statusColors: {
        Pending: "yellow",
        Returned: "red",
        Approved: "primary",
      },
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
#research {
  .objective-list-wrapper:not(:first-child) {
    animation: fade-in-opacity 1s ease-in-out;
  }

  .research-title,
  .description,
  .objectives,
  .feedback {
    display: flex;
    flex-direction: column;

    .research-title-label-wrapper {
      display: flex;
      column-gap: 8px;
      flex-direction: row;
      align-items: center;
      .research-title-label {
        padding: 8px;
      }
    }

    .description-label,
    .objectives-label,
    .feedback-label {
      padding: 8px;
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
