<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="myDate"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
    class="archive-date"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="myDate"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        class="archive-text-field"
        v-on="on"
        @click:prepend-inner="menu = true"
      ></v-text-field>
    </template>
    <v-date-picker v-model="myDate" type="month" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(myDate)"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "ArchiveDate",
  props: {
    label: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      myDate: new Date().toISOString().substr(0, 7),
      menu: false,
    };
  },
  watch: {
    myDate(newDate) {
      this.$emit("update-date", newDate);
    },
  },
  mounted() {
    this.myDate = this.date;
  },
};
</script>

<style lang="scss">
.archive-text-field {
  input {
    font-size: 14px;
  }
}
</style>
