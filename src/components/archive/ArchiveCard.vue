<template>
  <v-card class="archive-card" :max-width="maxWidth + 'px'">
    <!-- max-width="235.75px" -->
    <v-img
      height="156"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <header>Capstone Management System with Prescriptive Analyticss</header>

    <section class="content">
      <v-chip label> asd </v-chip>
    </section>

    <footer>
      <v-avatar size="30" color="red">
        <span class="white--text">CJ</span>
      </v-avatar>
      <v-avatar size="30" color="red">
        <span class="white--text">CJ</span>
      </v-avatar>
      <v-avatar size="30" color="red">
        <span class="white--text">CJ</span>
      </v-avatar>
    </footer>
  </v-card>
</template>

<script>
export default {
  name: "ArchiveCard",
  data() {
    return {
      selection: 1,
      maxWidth: 0,
    };
  },

  watch: {
    "$vuetify.breakpoint.name": {
      immediate: true,
      handler(newVal) {
        if (newVal === "xs") {
          this.maxWidth = screen.width / 2 - 20;
        } else {
          this.maxWidth = 235.75;
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
    padding: 1rem 1rem 0 1rem;
  }
  footer {
    padding: 1rem;

    .v-avatar:not(:first-child) {
      margin-left: -0.5rem;
      outline: 2px solid #fff;
    }
  }
}
</style>
