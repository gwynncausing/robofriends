<template>
  <div class="chip-list">
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
        <div>
          Small
          <Chip small>Default</Chip>
          <Chip small label multiple>Label</Chip>
          <Chip small close>Close</Chip>
          <Chip small close close-icon>Custom Clearable Icon</Chip>
          <Chip small disabled>Disabled</Chip>
          <Chip small prepend-icon="mdi-map"> Prepend Icon </Chip>
          <Chip small pill>
            <v-avatar left>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            Pill Avatar
          </Chip>
          <Chip small>
            <v-avatar left>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            Non-Pill Avatar
          </Chip>
          <Chip small>
            <v-icon left>mdi-map</v-icon>
            Icon
          </Chip>
          <Chip small color="secondary" close close-icon>
            <v-icon left> mdi-account-circle-outline </v-icon>
            Icon on left with custom close icon
          </Chip>
          <div class="menu-test">
            <v-menu
              v-model="menu"
              bottom
              right
              transition="scale-transition"
              origin="top left"
            >
              <template v-slot:activator="{ on }">
                <Chip small pill v-on="on">
                  <v-avatar left>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/john.png"
                    ></v-img>
                  </v-avatar>
                  John Leider
                </Chip>
              </template>
              <v-card width="300">
                <v-list dark>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/john.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>John Leider</v-list-item-title>
                      <v-list-item-subtitle
                        >john@vuetifyjs.com</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon @click="menu = false">
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
                <v-list>
                  <v-list-item @click="() => {}">
                    <v-list-item-action>
                      <v-icon>mdi-briefcase</v-icon>
                    </v-list-item-action>
                    <v-list-item-subtitle>john@gmail.com</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div>
          Default
          <Chip>Default</Chip>
          <Chip label multiple>Label</Chip>
          <Chip close>Close</Chip>
          <Chip close close-icon>Custom Clearable Icon</Chip>
          <Chip disabled>Disabled</Chip>
          <Chip prepend-icon="mdi-map"> Prepend Icon </Chip>
          <Chip pill>
            <v-avatar left>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            Pill Avatar
          </Chip>
          <Chip>
            <v-avatar left>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            Non-Pill Avatar
          </Chip>
          <Chip>
            <v-icon left>mdi-map</v-icon>
            Icon
          </Chip>
          <Chip color="secondary" close close-icon>
            <v-icon left> mdi-account-circle-outline </v-icon>
            Icon on left with custom close icon
          </Chip>
          <v-menu
            v-model="menu"
            bottom
            right
            transition="scale-transition"
            origin="top left"
          >
            <template v-slot:activator="{ on }">
              <Chip pill v-on="on">
                <v-avatar left>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-avatar>
                John Leider
              </Chip>
            </template>
            <v-card width="300">
              <v-list dark>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/john.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle
                      >john@vuetifyjs.com</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="menu = false">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item @click="() => {}">
                  <v-list-item-action>
                    <v-icon>mdi-briefcase</v-icon>
                  </v-list-item-action>
                  <v-list-item-subtitle>john@gmail.com</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chip from "@/components/global/Chip.vue";

export default {
  name: "ChipList",
  components: { Chip },
  data() {
    return {
      menu: false,
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
  grid-template-columns: 50% 50%;
  gap: 10px;
  width: 80%;
  div {
    display: grid;
    grid-template-rows: auto;
    gap: 10px;
    span {
      width: fit-content;
    }
  }
}
</style>
