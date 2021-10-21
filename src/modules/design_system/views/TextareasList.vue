<template>
  <div class="textareas-list">
    <span>Textareas</span>
    <div class="container">
      <div class="navigation d-none">
        <v-card class="mx-auto" max-width="300" tile>
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
        </v-card>
      </div>
      <div class="textareas">
        <p>{{ input }}</p>
        <Textarea v-model="input" name="" rows="3"></Textarea>
        <Textarea
          v-model="input"
          name=""
          placeholder="Placeholder"
          rows="3"
        ></Textarea>
        <Textarea v-model="input" name="" label="Label" rows="3"></Textarea>
        <Textarea
          v-model="input"
          name=""
          label="Custom Color"
          color="secondary"
          rows="3"
        ></Textarea>
        <Textarea
          v-model="input"
          name=""
          label="Clearable"
          rows="3"
          clearable
        ></Textarea>
        <Textarea
          v-model="input"
          name=""
          label="Custom Clearable Icon"
          rows="3"
          clear-icon
          clearable
        ></Textarea>
        <Textarea
          v-model="input"
          name=""
          placeholder="Prepend Icon"
          rows="3"
          prepend-icon="mdi-map"
        ></Textarea>
        <Textarea
          v-model="input"
          name=""
          rows="3"
          placeholder="Prepend Inner Icon"
          prepend-inner-icon="mdi-map"
        ></Textarea>
        <Textarea
          v-model="input"
          name=""
          rows="3"
          placeholder="Append Icon"
          append-icon="mdi-map"
        ></Textarea>
        <Textarea
          v-model="input"
          name=""
          rows="3"
          placeholder="Append Outer Icon"
          append-outer-icon="mdi-map"
        ></Textarea>

        <Textarea
          v-model="input"
          name=""
          rows="3"
          placeholder="Prefix"
          prefix=">"
        ></Textarea>
        <Textarea
          v-model="input"
          name=""
          rows="3"
          placeholder="Suffix"
          suffix="<"
        ></Textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Textarea from "@/components/global/Textarea.vue";

export default {
  name: "TextareaList",
  components: { Textarea },
  data() {
    return {
      input: "",
      show1: false,
      selectedItem: 0,
      items: [
        { text: "Regular Button", icon: "mdi-clock", goto: "regular-button" },
        { text: "Text", icon: "mdi-account", goto: "text-button" },
        { text: "Outlined", icon: "mdi-flag", goto: "outlined-button" },
        { text: "Loading", icon: "mdi-flag", goto: "loading-button" },
        { text: "Disabled", icon: "mdi-flag", goto: "disabled-button" },
      ],
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
.textareas {
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
