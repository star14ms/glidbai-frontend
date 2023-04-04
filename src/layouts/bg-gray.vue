<template>
  <div class="has-background-light2">
    <Header />

    <div class="container col-a-center is-10">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

@import 'assets/styles/variables.scss';

.container {
  min-height: calc(100vh - $header-height);
}
</style>
  