<template>
  <div class="textfields-list">
    <span>Textfields</span>
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
      <div class="textfields">
        <p>{{ input }}</p>
        <TextField v-model="input" name=""></TextField>
        <TextField
          v-model="input"
          name=""
          placeholder="Placeholder"
        ></TextField>
        <TextField v-model="input" name="" label="Label"></TextField>
        <TextField
          v-model="input"
          name=""
          label="Custom Color"
          color="secondary"
        ></TextField>
        <TextField
          v-model="input"
          name=""
          label="Clearable"
          clearable
        ></TextField>
        <TextField
          v-model="input"
          name=""
          label="Custom Clearable Icon"
          clear-icon
          clearable
        ></TextField>
        <TextField
          v-model="input"
          name=""
          placeholder="Prepend Icon"
          prepend-icon="mdi-map"
        ></TextField>
        <TextField
          v-model="input"
          name=""
          placeholder="Prepend Inner Icon"
          prepend-inner-icon="mdi-map"
        ></TextField>
        <TextField
          v-model="input"
          name=""
          placeholder="Append Icon"
          append-icon="mdi-map"
        ></TextField>
        <TextField
          v-model="input"
          name=""
          placeholder="Append Outer Icon"
          append-outer-icon="mdi-map"
        ></TextField>
        <TextField
          v-model="input"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name=""
          placeholder="Password"
          loading
          @click:append="show1 = !show1"
        >
          <template v-slot:progress>
            <v-progress-linear
              :value="progress"
              :color="color"
              absolute
              height="7"
            ></v-progress-linear>
          </template>
        </TextField>
        <v-tooltip right transition="scroll-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <TextField
              v-model="input"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name=""
              placeholder="Password with Tooltip"
              loading
              v-bind="attrs"
              @click:append="show1 = !show1"
              v-on="on"
            >
              <template v-slot:progress>
                <v-progress-linear
                  :value="progress"
                  :color="color"
                  absolute
                  height="7"
                ></v-progress-linear>
              </template>
            </TextField>
          </template>
          <div>
            <ul>
              <li>asdasd</li>
              <li>asdasd</li>
              <li>asdasd</li>
            </ul>
          </div>
        </v-tooltip>
        <TextField
          v-model="input"
          name=""
          placeholder="Prefix"
          prefix=">"
        ></TextField>
        <TextField
          v-model="input"
          name=""
          placeholder="Suffix"
          suffix="<"
        ></TextField>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";

export default {
  name: "TextFieldList",
  components: { TextField },
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
.textfields {
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
