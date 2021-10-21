<template>
  <div>
    <v-card class="user-card">
      <div>
        <div class="user-card-avatar">
          <v-avatar>
            <img
              src="https://media-exp1.licdn.com/dms/image/C5603AQHahp2qg4auIg/profile-displayphoto-shrink_800_800/0/1611734910024?e=1626307200&v=beta&t=drBbiNfm5QjvW-SBRACzRMU6tWi0MqCmuKSFHRCJ_p8"
              alt="John"
            />
          </v-avatar>
          <span class="title">Cary Legaspi</span>
        </div>

        <v-card-text>
          <v-list>
            <v-item-group>
              <v-list-item>Eat</v-list-item>
              <v-list-item>Code</v-list-item>
              <v-list-item>Sleep</v-list-item>
              <v-list-item>Repeat</v-list-item>
              <v-list-item>Eat</v-list-item>
              <v-list-item>Code</v-list-item>
              <v-list-item>Sleep</v-list-item>
              <v-list-item>Repeat</v-list-item>
            </v-item-group>
          </v-list>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TeamAnalysisUserCard",
};
</script>

<style lang="scss" scoped>
.v-list-item {
  margin-bottom: 10px;
  min-height: 30px;
  border: 1px var(--v-primary) solid;
  border-radius: 5px;
}
.user-card {
  max-width: 225px;
  min-width: 225px;
  max-height: 300px;
  min-height: 300px;
  margin-top: 20px;
  margin-right: 20px;
  // d-flex justify-center flex-column align-center
  .user-card-avatar {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
