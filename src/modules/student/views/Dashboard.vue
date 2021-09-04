<template>
  <div id="dashboard">
    <div id="dashboard-no-team">
      <v-img :src="require('@/assets/invitation.svg')" width="600" />
      <div class="dashboard-cta">
        <h5>Looks like you don’t have a team yet.</h5>
        <p>
          Do you want to
          <!-- // TODO:  change to go to create team -->
          <router-link class="primary--text" :to="{ name: 'CreateAccount' }">
            <strong>create</strong>
          </router-link>
          or
          <!-- // TODO:  change to go to team list -->
          <router-link class="secondary--text" :to="{ name: 'CreateAccount' }">
            <strong>join</strong>
          </router-link>
          a team?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      user: {
        teamList: {},
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  text-align: -webkit-center;
  margin: clamp(14px, 7vw, 24px) 20px 20px 20px !important;

  #dashboard-no-team {
    padding: 40px 16px;
  }
  .dashboard-cta {
    margin-top: 48px;
    h5 {
      margin-bottom: 16px;
    }
  }
}
</style>
