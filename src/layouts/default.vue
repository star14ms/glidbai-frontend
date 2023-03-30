<template>
  <div>
    <Header />

    <div class="container col-a-center is-10">
      <Nuxt />
    </div>

    <ChatBot />
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
