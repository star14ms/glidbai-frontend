<template>
  <div class="root">
    <Header />

    <div id="container" class="col-a-center is-10">
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

#container {
  min-height: calc(100vh - $header-height);
}
</style>
  