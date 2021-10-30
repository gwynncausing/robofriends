<template>
  <div>
    <AppBar
      :routes="appBar.routes"
      :notification="appBar.notification"
      :user="userInformation"
      @logout="logout"
    />
    <div id="archive" class="container">
      <header>
        <div class="archive-header-wrapper">
          <TextField
            placeholder="Seach research paper here"
            append-icon="mdi-magnify"
          />
          <Button
            text
            class="black--text d-sm-none"
            @click="filterDialog = true"
          >
            <v-icon>mdi-filter</v-icon>
          </Button>
          <Modal
            :dialog="filterDialog"
            class="black--text d-sm-none"
            @closed="filterDialog = false"
          >
            <template v-slot:title>
              <v-icon class="mr-2">mdi-filter</v-icon>
              Filter
            </template>
            <template v-slot:content>
              <ArchiveCategories
                :categories="categories"
                @getSelectedCategory="selectedCategory = $event"
              />
            </template>
            <template v-slot:footer> footer </template>
          </Modal>
        </div>
      </header>
      <div class="archive-wrapper">
        <aside class="d-none d-sm-block">
          <v-icon class="mr-2">mdi-filter</v-icon>
          Filter
          <ArchiveCategories
            :categories="categories"
            @getSelectedCategory="selectedCategory = $event"
          />
          <ArchiveDate
            label="Start Date"
            :date="startDate"
            @update-date="startDate = $event"
          />
          <ArchiveDate
            label="End Date"
            :date="endDate"
            :allowed-dates="allowedDates"
            @update-date="endDate = $event"
          />
        </aside>
        <section class="research-archive-wrapper">
          <ArchiveCard />
          <ArchiveCard />
          <ArchiveCard />
          <ArchiveCard />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

import AppBar from "@/components/AppBar.vue";
import Modal from "@/components/Modal.vue";
import ArchiveCategories from "@/components/archive/ArchiveCategories.vue";
import ArchiveDate from "@/components/archive/ArchiveDate.vue";
import ArchiveCard from "@/components/archive/ArchiveCard.vue";

import { mapActions, mapGetters } from "vuex";
import { ROOT_ACTIONS, ROOT_GETTERS } from "@/store/types";
import { capitalizeFirstLetter } from "@/utils/helpers";

export default {
  name: "Archive",
  components: {
    TextField,
    Button,
    AppBar,
    Modal,
    ArchiveCategories,
    ArchiveDate,
    ArchiveCard,
  },
  data() {
    return {
      appBar: {
        user: {
          name: "Unknown",
          profile: "",
          image:
            "https://pbs.twimg.com/profile_images/516676441291759617/aLOOeXSl_400x400.jpeg",
        },
        routes: [
          {
            name: "Home",
            path: { name: "Dashboard" },
          },
          {
            name: "Archive",
            path: { name: "Archive" },
          },
        ],
        notification: {
          path: { name: "" },
        },
      },
      filterDialog: false,
      categories: ["All Categories"],
      selectedCategory: [],
      startDate: "",
      endDate: "",
    };
  },

  computed: {
    ...mapGetters({
      getSchools: ROOT_GETTERS.GET_SCHOOLS,
      getUser: ROOT_GETTERS.GET_USER,
      getUserType: ROOT_GETTERS.GET_USER_TYPE,
    }),
    userInformation() {
      return {
        ...this.appBar.user,
        name: capitalizeFirstLetter(this.getUser.lastName || "User"),
      };
    },
  },

  watch: {
    "$vuetify.breakpoint.name": function (newVal) {
      if (newVal !== "xs") {
        this.filterDialog = false;
      }
    },
  },

  created() {
    this.setStartDateOneYearAgo();
    this.endDate = new Date().toISOString().substr(0, 7);
  },

  mounted() {
    this.categories.push("Artificial Intelligence");
    this.categories.push("Data Analytics");
    this.categories.push("Web Application");
  },

  methods: {
    allowedDates(val) {
      return Date.parse(val) > Date.now();
    },
    setStartDateOneYearAgo() {
      this.startDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      )
        .toISOString()
        .substr(0, 7);
    },
    ...mapActions({
      onLogoutUser: ROOT_ACTIONS.LOGOUT_USER,
    }),
    async logout() {
      try {
        await this.onLogoutUser();
        this.$router.replace({ name: "SignIn" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.archive-header-wrapper {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
.archive-wrapper {
  display: flex;
  flex-direction: row;
  aside {
    width: 13rem;
  }
  section.research-archive-wrapper {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    gap: 1rem;
  }
}
</style>
