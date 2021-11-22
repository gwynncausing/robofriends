<template>
  <div
    id="empty-data-holder"
    class="d-flex flex-column align-center justify-center"
  >
    <v-img :src="require('@/assets/no-data.svg')" height="320" contain />
    <div class="text-center">
      <h5 class="mt-10">
        <slot name="title" />
      </h5>
      <div class="mt-4">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
#empty-data-holder {
  min-height: 500px;
  margin-top: 50px;
}
</style>
