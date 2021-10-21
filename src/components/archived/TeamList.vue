<template>
  <div class="mb-12">
    <div class="d-flex">
      <span class="text start-project-text">Adviser:</span>
      <v-select
        v-model="advisers"
        multiple
        outlined
        dense
        hide-details
        chips
        :items="advisers"
        item-text="fullName"
        item-value="email"
      >
      </v-select>
    </div>
    <div
      v-for="(email, emailIndex) in project.invitedEmails"
      :key="emailIndex"
      class="d-flex"
    >
      <span class="text start-project-text">
        Member {{ emailIndex + 1 }}:
      </span>
      <v-text-field
        v-model="project.invitedEmails[emailIndex]"
        outlined
        dense
        hide-details
        readonly
        type="email"
        @change="isMemberEmpty(emailIndex)"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import GET_ADVISERS from "@/graphql/queries/get-advisers.gql";

import { mapGetters } from "vuex";

export default {
  name: "TeamList",
  data: function () {
    return {
      project: {
        advisers: [],
        invitedEmails: [
          "sdsdsds@cit.edu",
          "sdsdddsds@cit.edu",
          "sdsdsdddsds@cit.edu",
        ],
      },
      willInviteEmails: [],
    };
  },

  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },

  apollo: {
    advisers: {
      query: GET_ADVISERS,
      update: (data) => data.users.edges.map((edge) => edge.node),
    },
  },

  methods: {
    isMemberEmpty(index) {
      if (this.willInviteEmails[index] == "")
        this.willInviteEmails.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.d-flex {
  margin-top: 20px;
}
.text {
  margin-top: 8px;
  margin-right: 20px;
  min-width: 90px;
}
.start-project-text {
  min-width: 90px;
}
.v-text-field {
  background-color: white;
}
</style>
