<template>
  <div id="dashboard">
    <div id="no-team">
      <v-img
        :src="require('@/assets/invitation.svg')"
        height="260"
        width="477"
      ></v-img>
      <h5>Looks like you don’t have a team yet.</h5>
      <p>
        Do you want to
        <router-link class="primary--text" :to="{ name: 'CreateAccount' }">
          create
        </router-link>
        or
        <router-link class="secondary--text" :to="{ name: 'CreateAccount' }">
          join
        </router-link>
        a team?
      </p>
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

<style>
#dashboard-first-login {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
