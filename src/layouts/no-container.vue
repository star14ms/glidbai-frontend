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
  beforeMount() {
    // https://yohanpro.com/posts/css/브라우저-주소창-크기-제어
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)

    window.addEventListener("resize", () => {
      console.log("resize")
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    })
  },
}
</script>

<style lang="scss" scoped>

@import 'assets/styles/variables.scss';

#container {
  min-height: calc(100vh - $header-height);
  min-height: calc(var(--vh, 1vh) * 100 - $header-height) !important;
}
</style>
  