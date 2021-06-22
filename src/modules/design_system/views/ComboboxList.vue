<template>
  <div class="combobox-list">
    <span>Textfields</span>
    <div class="container">
      <div class="navigation d-none">
        <!-- <v-card class="mx-auto" max-width="300" tile>
          <v-list dense>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="goto(item.goto)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card> -->
      </div>
      <div class="items">
        <Combobox
          v-model="selectIndividual"
          :items="items"
          label="Default"
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          placeholder="Placeholder"
          label="Placeholder"
          multiple
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Label"
          multiple
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Clearable"
          multiple
          clearable
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Custom Clearable Icon"
          multiple
          clearable
          clear-icon
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Disabled"
          multiple
          disabled
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Readonly"
          multiple
          readonly
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Prepend Icon"
          multiple
          prepend-icon="mdi-map"
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Prepend Inner Icon"
          multiple
          prepend-inner-icon="mdi-map"
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Append Icon"
          multiple
          append-icon="mdi-map"
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Append Outer Icon"
          multiple
          append-outer-icon="mdi-map"
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Prefix"
          multiple
          prefix=">"
        ></Combobox>
        <Combobox
          v-model="select"
          :items="items"
          label="Prefix"
          multiple
          suffix="<"
        ></Combobox>
      </div>
    </div>
  </div>
</template>

<script>
import Combobox from "@/components/global/Combobox.vue";

export default {
  name: "ComboboxList",
  components: { Combobox },
  data() {
    return {
      selectIndividual: [],
      select: ["Vuetify", "Programming"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
    };
  },
  computed: {
    progress() {
      return Math.min(100, (this.input ? this.input.length : 0) * 10);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    },
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo({ left: 0, top: top, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
i.v-icon.icon-right {
  margin-left: 8px;
}
i.v-icon.icon-left {
  margin-left: 8px;
}
.container {
  width: 100%;
  .navigation {
    right: 0;
    position: fixed;
  }
}
.items {
  display: grid;
  grid-template-rows: auto;
  gap: 10px;
  width: 80%;
  .button-groups {
    display: grid;
    grid-template-rows: auto;
    gap: 10px;
    div {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 250px));
      gap: 10px;
      justify-items: center;
    }
  }
}
</style>
