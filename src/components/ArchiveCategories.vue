<template>
  <v-list shaped>
    <v-list-item-group v-model="selectedCategory" mandatory>
      <template v-for="(item, i) in categories">
        <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

        <v-list-item v-else :key="`item-${i}`" :value="item">
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "ArchiveCategories",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedCategory: ["All Categories"],
    };
  },

  watch: {
    selectedCategory() {
      this.$emit("getSelectedCategory", this.selectedCategory);
    },
  },

  mounted() {
    //
  },
};
</script>

<style></style>
