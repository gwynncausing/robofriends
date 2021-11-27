<template>
  <Sidebar collapsible v-on="$listeners">
    <template v-slot:title>Comments</template>
    <template v-slot:content>
      <div class="comment-list-wrapper">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <p class="font-bold">
            {{ comment.first_name }} {{ comment.last_name }}
          </p>
          <p class="caption pb-2">{{ comment.datetime }}</p>
          <p>{{ comment.message }}</p>
        </div>
      </div>
      <div class="input-comment">
        <Textarea v-model="message" />
        <Button text @click="sendMessage(commend.id)">
          <v-icon>mdi-send</v-icon>
        </Button>
      </div>
    </template>
  </Sidebar>
</template>
<script>
import Sidebar from "@/components/global/Sidebar.vue";
import Textarea from "@/components/global/Textarea.vue";
import Button from "@/components/global/Button.vue";
export default {
  name: "SidebarComments",
  components: {
    Sidebar,
    Textarea,
    Button,
  },
  props: {
    comments: {
      required: false,
      type: Array,
      default: () => [],
    },
    blockId: {
      required: false,
      type: String,
      default: "",
    },
    user: {
      required: false,
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      message: "",
    };
  },

  methods: {
    sendMessage() {
      console.log({
        blockId: this.blockId,
        user: this.user,
        message: this.message,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.overline {
  line-height: 12px;
}
.comment-list-wrapper {
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
.input-comment {
  display: flex;
  align-items: top;
  padding: 0 16px;
}
</style>
