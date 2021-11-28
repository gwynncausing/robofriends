<template>
  <v-card
    class="archive-card"
    v-bind="$attrs"
    :width="maxWidth + 'px'"
    height="324px"
    v-on="$listeners"
  >
    <div
      :class="image.isDefault ? 'default-container' : 'image-container'"
      :style="{ backgroundImage: `url('${image.src}')` }"
    ></div>

    <header>{{ data.title }}</header>

    <section v-if="researchFinishYear" class="content">
      <v-chip label class="secondary"> {{ researchFinishYear }} </v-chip>
    </section>

    <footer>
      <v-avatar
        v-for="(researcher, index) in researchers"
        :key="index"
        size="30"
        color="secondary"
        :title="`${researcher.user.firstName} ${researcher.user.lastName}`"
      >
        <span class="white--text">
          {{ researcher.user.firstName[0] }}{{ researcher.user.lastName[0] }}
        </span>
      </v-avatar>
    </footer>
  </v-card>
</template>

<script>
export default {
  name: "ArchiveCard",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selection: 1,
      maxWidth: 0,
    };
  },

  computed: {
    image() {
      let image = {
        isDefault: false,
        src: "",
      };
      // if (this.data?.imgSrc || this.data?.imgSrc !== "")
      //   image.src = this.data?.imgSrc;
      // else {
      image.isDefault = true;
      image.src = require("@/assets/bud-flower-fade.svg");
      // }
      return image;
    },
    researchFinishYear() {
      return new Date(this.data?.paper.completedAt).getFullYear() || "";
    },
    researchers() {
      const members = this.data.paper.team.members.filter((member) => {
        if (member.baseRole !== "adviser") return member;
      });
      return members || [];
    },
  },

  watch: {
    "$vuetify.breakpoint.name": {
      immediate: true,
      handler(newVal) {
        if (newVal === "xs") {
          this.maxWidth = window.innerWidth / 2 - 25;
        } else {
          this.maxWidth = 239.75;
        }
      },
    },
  },

  methods: {
    //
  },
};
</script>

<style lang="scss" scoped>
.archive-card {
  display: flex;
  flex-direction: column;

  .image-container {
    height: 156px;
    background-size: cover;
  }
  .default-container {
    height: 156px;
    background: var(--v-neutral-300);
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
  }
  header {
    font-size: 1rem;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
  }
  header,
  section.content {
    padding: 0.5rem 1rem 0 1rem;
  }
  footer {
    padding: 1rem;
    margin-top: auto;

    .v-avatar {
      cursor: default;

      &:not(:first-child) {
        margin-left: -0.4rem;
        outline: 2px solid #fff;
      }
    }
  }
}
</style>
