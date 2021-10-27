<template>
  <div id="account-settings">
    <header>
      <h5 class="tertiary--text">Account Settings</h5>
    </header>
    <div class="account-settings-content">
      <v-row>
        <v-col cols="12" md="5">
          <div>
            <TextField placeholder="First Name" name="first-name" />
            <TextField placeholder="Last Name" name="last-name" />
            <TextField placeholder="Email" name="email" disabled />

            <Button text> Update Password </Button>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <div>
            <Select
              label="School"
              name="school"
              item-text="name"
              item-value="id"
              disabled
            />

            <Select
              label="College"
              name="college"
              item-text="name"
              item-value="id"
              outlined
              dense
            />
            <!--
              v-model="user.collegeId"
              :items="colleges"
              :rules="rules.collegeId"
              
              -->
            <Select
              label="Program"
              name="program"
              outlined
              dense
              class="program"
            />
            <!--
              v-show="user.type === 'Student'"

              v-model="user.program"
              :items="programs" 
            :rules="
                user.type === 'Student'
                  ? [(v) => !!v || 'Program is required']
                  : []
              "-->
            <TextField
              v-model="user.idNumber"
              label="ID Number"
              name="id-number"
              disabled
            />
          </div>
          <div class="col-2-buttons">
            <Button class="update-account"> Update Account </Button>

            <Button text class="delete-account error--text">
              Delete Account
            </Button>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/global/TextField.vue";
import Button from "@/components/global/Button.vue";
import Select from "@/components/global/Select.vue";

export default {
  name: "AccountSettings",
  components: {
    TextField,
    Button,
    Select,
  },
  data() {
    return {
      user: {},
    };
  },
};
</script>

<style lang="scss" scoped>
#account-settings {
  header {
    margin-bottom: 2rem;
  }
}
.row {
  gap: 24px;
}
.col-2-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .delete-account,
  .update-account {
    width: fit-content;
    margin: 4rem 0;
  }
}
</style>
