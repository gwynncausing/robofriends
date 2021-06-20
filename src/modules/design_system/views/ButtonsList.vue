<template>
  <div class="buttons-list">
    <span>Buttons</span>
    <div class="container">
      <div class="navigation">
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
      <div class="buttons">
        <div class="primary-buttons button-groups" ref="regular-button">
          <div>
            <Button small> Small Button </Button>
            <Button small>
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button> Normal Button </Button>
            <Button>
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large> Large Button </Button>
            <Button large>
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large> Extra Large Button </Button>
            <Button x-large>
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="secondary-buttons button-groups">
          <div>
            <Button small color="secondary"> Small Button </Button>
            <Button small color="secondary">
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button color="secondary"> Normal Button </Button>
            <Button color="secondary">
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large color="secondary"> Large Button </Button>
            <Button large color="secondary">
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large color="secondary"> Extra Large Button </Button>
            <Button x-large color="secondary">
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="tertiary-buttons button-groups">
          <div>
            <Button small dark color="tertiary"> Small Button </Button>
            <Button small dark color="tertiary">
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button dark color="tertiary"> Normal Button </Button>
            <Button dark color="tertiary">
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon dark color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large dark color="tertiary"> Large Button </Button>
            <Button large dark color="tertiary">
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon dark color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large dark color="tertiary"> Extra Large Button </Button>
            <Button x-large dark color="tertiary">
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon dark color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="primary-text-buttons button-groups" ref="text-button">
          <div>
            <Button small text> Small Button </Button>
            <Button small text>
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small text>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button text> Normal Button </Button>
            <Button text>
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon text>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large text> Large Button </Button>
            <Button large text>
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon text>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large text> Extra Large Button </Button>
            <Button x-large text>
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon text>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="secondary-text-buttons button-groups">
          <div>
            <Button small text color="secondary"> Small Button </Button>
            <Button small text color="secondary">
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small text color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button text color="secondary"> Normal Button </Button>
            <Button text color="secondary">
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon text color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large text color="secondary"> Large Button </Button>
            <Button large text color="secondary">
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon text color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large text color="secondary"> Extra Large Button </Button>
            <Button x-large text color="secondary">
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon text color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="tertiary-text-buttons button-groups">
          <div>
            <Button small text color="tertiary"> Small Button </Button>
            <Button small text color="tertiary">
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small text color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button text color="tertiary"> Normal Button </Button>
            <Button text color="tertiary">
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon text color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large text color="tertiary"> Large Button </Button>
            <Button large text color="tertiary">
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon text color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large text color="tertiary"> Extra Large Button </Button>
            <Button x-large text color="tertiary">
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon text color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div
          class="primary-outlined-buttons button-groups"
          ref="outlined-button"
        >
          <div>
            <Button small outlined> Small Button </Button>
            <Button small outlined>
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small outlined>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button outlined> Normal Button </Button>
            <Button outlined>
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon outlined>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large outlined> Large Button </Button>
            <Button large outlined>
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon outlined>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large outlined> Extra Large Button </Button>
            <Button x-large outlined>
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon outlined>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="secondary-outlined-buttons button-groups">
          <div>
            <Button small outlined color="secondary"> Small Button </Button>
            <Button small outlined color="secondary">
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small outlined color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button outlined color="secondary"> Normal Button </Button>
            <Button outlined color="secondary">
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon outlined color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large outlined color="secondary"> Large Button </Button>
            <Button large outlined color="secondary">
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon outlined color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large outlined color="secondary">
              Extra Large Button
            </Button>
            <Button x-large outlined color="secondary">
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon outlined color="secondary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="tertiary-outlined-buttons button-groups">
          <div>
            <Button small outlined color="tertiary"> Small Button </Button>
            <Button small outlined color="tertiary">
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small outlined color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button outlined color="tertiary"> Normal Button </Button>
            <Button outlined color="tertiary">
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon outlined color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large outlined color="tertiary"> Large Button </Button>
            <Button large outlined color="tertiary">
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon outlined color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large outlined color="tertiary">
              Extra Large Button
            </Button>
            <Button x-large outlined color="tertiary">
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon outlined color="tertiary">
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>

        <div class="primary-buttons button-groups" ref="loading-button">
          <div>
            <Button small loading> Small Button </Button>
            <Button small loading>
              Small Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon small loading>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button loading> Normal Button </Button>
            <Button loading>
              Normal Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button icon loading>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button large loading> Large Button </Button>
            <Button large loading>
              Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button large icon loading>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>

          <div>
            <Button x-large loading> Extra Large Button </Button>
            <Button x-large loading>
              Extra Large Button
              <v-icon class="icon-right">mdi-plus-circle</v-icon>
            </Button>
            <Button x-large icon loading>
              <v-icon>mdi-plus-circle</v-icon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/global/Button.vue";

export default {
  name: "ButtonsList",
  components: { Button },
  data() {
    return {
      selectedItem: 0,
      items: [
        { text: "Regular Button", icon: "mdi-clock", goto: "regular-button" },
        { text: "Text", icon: "mdi-account", goto: "text-button" },
        { text: "Outlined", icon: "mdi-flag", goto: "outlined-button" },
        { text: "Loading", icon: "mdi-flag", goto: "loading-button" },
      ],
    };
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
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
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  .navigation {
    position: fixed;
  }
}
.buttons {
  display: grid;
  grid-template-rows: auto;
  gap: 10px;
  width: 100%;
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
