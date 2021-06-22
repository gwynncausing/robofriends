<template>
  <div class="design-system">
    <div class="sidemenu">
      <v-card class="mx-auto" width="256" tile>
        <v-navigation-drawer permanent>
          <v-system-bar></v-system-bar>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  John Leider
                </v-list-item-title>
                <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list nav dense>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "DesignSystem",
  data() {
    return {
      selectedItem: null,
      items: [],
    };
  },
  mounted() {
    this.$router.getRoutes().forEach((element) => {
      if (element.path.includes("design-system") && element.name !== "") {
        this.items.push({
          text: element.name,
          icon: "mdi-folder",
          route: { path: element.path },
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.design-system {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.router-view {
  margin-left: 256px;
  width: 100%;
}
.sidemenu {
  position: fixed;
}
</style>
