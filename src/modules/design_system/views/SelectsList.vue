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
        <Select
          v-model="selectIndividual"
          :items="items"
          label="Default"
        ></Select>
        <Select
          v-model="select"
          :items="items"
          label="Multiple"
          multiple
        ></Select>
        <Select
          v-model="select"
          :items="items"
          label="Multiple"
          multiple
          append-icon="mdi-map"
        ></Select>
        <Select
          v-model="select"
          :items="items"
          label="Multiple"
          multiple
          append-outer-icon="mdi-map"
        ></Select>
        <Select
          v-model="select"
          :items="items"
          label="Multiple"
          multiple
          prepend-icon="mdi-map"
        ></Select>
        asdasdasdasd
        <div>
          <v-select
            v-model="selected_tags"
            :items="tags"
            label="Tags"
            flat
            outlined
            hide-details
            filled
            dense
            clearable
            chips
            multiple
            closeable
          >
            <template v-slot:selection="{ item }">
              <v-chip :color="item.color" dense small closeable>
                {{ item.text }}
              </v-chip>
            </template>
          </v-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "@/components/global/Select.vue";
// import Chip from "@/components/global/Chip.vue";

export default {
  name: "SelectList",
  components: {
    Select,
    // Chip
  },
  data() {
    return {
      selectIndividual: "Programming",
      select: ["Programming", "Vuetify"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      items2: ["foo", "bar", "fizz", "buzz", "fizzbuzz", "foobar"],
      value2: ["foo", "bar", "fizz"],
      selected_tags: [],
      tags: [
        {
          value: 1000,
          text: "free",
          descr: "Free",
          color: "#00000",
          virtual: true,
          hidden: false,
          locked: false,
        },
        {
          value: 3,
          text: "imslab",
          descr: "IMS/NGINX Lab",
          color: "#25422b",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 2,
          text: "imsprod",
          descr: "IMS/NGINX Production",
          color: "#184f24",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 1001,
          text: "ipv4",
          descr: "IPv4",
          color: "#808080",
          virtual: true,
          hidden: false,
          locked: false,
        },
        {
          value: 1002,
          text: "ipv6",
          descr: "IPv6",
          color: "#808080",
          virtual: true,
          hidden: false,
          locked: false,
        },
        {
          value: 1004,
          text: "link",
          descr: "Link Network",
          color: "#808080",
          virtual: true,
          hidden: false,
          locked: false,
        },
        {
          value: 1003,
          text: "loop",
          descr: "Loopback",
          color: "#808080",
          virtual: true,
          hidden: false,
          locked: false,
        },
        {
          value: 9,
          text: "nat",
          descr: "NAT",
          color: "#99cc00",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 8,
          text: "nbm",
          descr: "NBM",
          color: "#cc9900",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 1,
          text: "office",
          descr: "OfficeNet",
          color: "#0000ff",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 7,
          text: "old",
          descr: "Obsolete",
          color: "#ff0000",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 6,
          text: "ro",
          descr: "Regional Office",
          color: "#cc33ff",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 5,
          text: "shop",
          descr: "Shop",
          color: "#a04106",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 4,
          text: "v2db",
          descr: "V2 DB",
          color: "#990099",
          virtual: false,
          hidden: false,
          locked: false,
        },
        {
          value: 11,
          text: "vscan",
          descr: "Vulnerability Scan",
          color: "#249685",
          virtual: false,
          hidden: false,
          locked: false,
        },
      ],
    };
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
