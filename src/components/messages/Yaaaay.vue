<template>
  <div id="yay-holder" class="d-flex flex-column align-center justify-center">
    <v-img :src="require('@/assets/Yaaaay.svg')" height="320" contain />
    <div class="text-center">
      <h5 class="heading">Yaaaay!</h5>
      <div class="message">
        <div>
          This team’s research paper has been marked as complete,<br />therefore
          you won't be able to start a new one as a member of this team.
        </div>
        <div>Don't worry, we've got you covered.</div>
        <div>
          You can
          <router-link class="primary--text" :to="{ name: 'Create Team' }">
            <strong>create a new team</strong>
          </router-link>
          or
          <span
            class="secondary--text btn-join-team"
            @click="$emit('showDialog', true)"
          >
            <strong>join another team</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
#yay-holder {
  min-height: 500px;
  margin-top: 50px;
  .heading {
    margin-top: 16px;
  }
  .message {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
  .btn-join-team {
    cursor: pointer;
  }
}
</style>
