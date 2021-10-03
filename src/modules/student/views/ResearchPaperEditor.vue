<template>
  <div id="editor">
    <div class="editor-heading">
      <Button text class="neutral-800--text">Version History</Button>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <Button outlined v-bind="attrs" v-on="on">
            Export
            <v-icon>mdi-chevron-down</v-icon>
          </Button>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in exportItems" :key="index" link>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="editor-list">
      <div class="editor-row">
        <div class="editor-profile-list">
          <div v-for="item in 3" :key="item" class="profile">
            <v-avatar size="38">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </div>
        </div>

        <div class="editor-content">editor content</div>

        <div class="editor-controls-list">
          <div
            v-for="item in editorButtonItems"
            :key="item"
            class="editor-control-button-wrapper"
          >
            <Button icon class="editor-control-button">
              <v-icon class="editor-control-icon">{{ item.icon }}</v-icon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

export default {
  name: "ResearchPaperEditor",
  components: {
    Button,
  },
  data() {
    return {
      exportItems: [{ title: "ACM" }, { title: "APA" }, { title: "MLA" }],
      editorButtonItems: [
        { icon: "mdi-plus-circle" },
        { icon: "mdi-image" },
        { icon: "mdi-comment-text" },
        { icon: "mdi-delete" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#editor {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .editor-heading {
    display: flex;
    justify-content: space-between;
  }

  .editor-row {
    display: flex;
    gap: 16px;

    .editor-profile-list {
      display: flex;
      gap: 10px;
      flex-direction: column;

      .profile {
        width: 42px;
        height: 42px;
        background: $primary;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    }

    .editor-content {
      width: 100%;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.5rem;
      min-height: 18rem; // 304px
    }

    .editor-controls-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid $neutral-400;
      border-radius: 4px;
      padding: 0.5rem;

      .editor-control-button-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        &:last-child {
          margin-top: auto;
        }

        .editor-control-button {
          width: 40px;

          .editor-control-icon {
            color: $neutral-700;
          }
        }

        &:last-child .editor-control-button .editor-control-icon {
          color: $red;
        }
      }
    }
  }
}
</style>
