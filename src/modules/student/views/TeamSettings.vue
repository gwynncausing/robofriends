<template>
  <div>
    Team Settings

    <div class="mb-12">
      <div class="d-flex">
        <!-- <span class="text start-project-text">Adviser:</span> -->
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

      <div class="d-flex">
        <v-dialog v-model="addMemberDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text outlined color="primary" v-bind="attrs" v-on="on">
              Add Member
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Add Member
            </v-card-title>

            <v-card-text>
              <div class="mt-8">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  placeholder="Enter Email"
                  type="email"
                ></v-text-field>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text depressed @click="addMemberDialog = false">
                Cancel
              </v-btn>
              <v-btn color="primary" depressed @click="addMemberDialog = false">
                Invite
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "TeamSettings",
  data: function () {
    return {
      addMemberDialog: false,
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
    // ...mapGetters({
    //   getUser: "user/getUser",
    // }),
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
