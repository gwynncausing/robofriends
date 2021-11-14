<template>
  <!-- // TODO: Filter Categories not yet implemented -->
  <div id="archive" class="container">
    <header>
      <div class="archive-header-wrapper">
        <div class="space d-none d-sm-block"></div>
        <TextField
          v-model="searchContent"
          placeholder="Seach research paper here"
          append-icon="mdi-magnify"
        />
        <Button text class="black--text d-sm-none" @click="filterDialog = true">
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
          :allowed-dates="allowedStartDate"
          @update-date="startDate = $event"
        />
        <ArchiveDate
          label="End Date"
          :date="endDate"
          :allowed-dates="allowedEndDate"
          @update-date="endDate = $event"
        />
      </aside>
      <section class="research-archive-wrapper">
        <div v-for="(archive, index) in filteredArchives" :key="index">
          <ArchiveCard :data="archive" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";

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
        // TODO: make the home dynamic?, when click home, it should return to user type dashboard
        routes: [
          {
            name: "Home",
            path: { name: "Student Dashboard" },
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
      archives: [
        {
          title: "Capstone Management System with Prescriptive Analytics",
          imgSrc:
            "https://th.bing.com/th/id/OIP.RDBwKq9LkMgzZJ3NKwglSgHaFL?pid=ImgDet&rs=1",
          members: [
            {
              firstName: "Juan",
              lastName: "Cruz",
            },
            {
              firstName: "Bin",
              lastName: "Ladin",
            },
            {
              firstName: "Oh",
              lastName: "Ahhhhh",
            },
          ],
          dateFinished: "December 15, 2020",
        },
        {
          title: "Random Ramdom",
          imgSrc: "https://en.freejpg.com.ar/asset/900/f5/f5c2/F100011137.jpg",
          members: [
            {
              firstName: "Hey",
              lastName: "Joe",
            },
            {
              firstName: "Bin",
              lastName: "Ladin",
            },
            {
              firstName: "Oh",
              lastName: "ahhhhh",
            },
          ],
          dateFinished: "December 15, 2019",
        },
        {
          title: "Mondar Mondar Mondar Mondar",
          imgSrc: "https://en.freejpg.com.ar/asset/900/f5/f5c2/F100011137.jpg",
          members: [
            {
              firstName: "Hey",
              lastName: "Joe",
            },
            {
              firstName: "Bin",
              lastName: "Ladin",
            },
            {
              firstName: "Oh",
              lastName: "ahhhhh",
            },
          ],
          dateFinished: "",
        },
      ],
      searchContent: "",
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
    filteredArchives() {
      const filteredFromSearch = this.archives.filter((archive) =>
        archive.title.toLowerCase().includes(this.searchContent.toLowerCase())
      );

      const filteredFromStartDate = filteredFromSearch.filter((archive) => {
        return new Date(archive.dateFinished) > new Date(this.startDate);
      });

      const filteredFromEndDate = filteredFromStartDate.filter((archive) => {
        return new Date(archive.dateFinished) < new Date(this.endDate);
      });

      return filteredFromEndDate;
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
    this.setDefaultStartDate();
    this.endDate = new Date().toISOString().substr(0, 7);
  },

  mounted() {
    this.categories.push("Artificial Intelligence");
    this.categories.push("Data Analytics");
    this.categories.push("Web Application");
  },

  methods: {
    allowedStartDate(val) {
      return Date.parse(val) < new Date(this.endDate);
    },
    allowedEndDate(val) {
      return Date.parse(val) >= new Date(this.startDate);
    },
    setDefaultStartDate() {
      const yearToDeduct = 3;
      this.startDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - yearToDeduct)
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
  .space {
    width: 13rem;
    margin-right: 0.2rem;
  }
}
.archive-wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem;
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
