<template>
  <v-card class="archive-card" :width="maxWidth + 'px'" height="324px">
    <div
      class="image-container"
      :style="{ backgroundImage: `url('${image}')` }"
    ></div>

    <header>{{ data.title }}</header>

    <section v-if="researchFinishYear" class="content">
      <v-chip label> {{ researchFinishYear }} </v-chip>
    </section>

    <footer>
      <v-avatar
        v-for="(researcher, index) in researchers"
        :key="index"
        size="30"
        color="secondary"
        :title="`${researcher.firstName} ${researcher.lastName}`"
      >
        <span class="white--text"
          >{{ researcher.firstName[0] }}{{ researcher.lastName[0] }}</span
        >
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
      if (this.data?.imgSrc) return this.data.imgSrc;
      return "https://cdn.vuetifyjs.com/images/cards/cooking.png";
    },
    researchFinishYear() {
      return new Date(this.data?.dateFinished).getFullYear() || "";
    },
    researchers() {
      return this.data?.members || [];
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
