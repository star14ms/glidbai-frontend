<template>
    <div class="root">
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
  .root {
    background-color: #E5E5E5;
  }

  .container {
    min-height: calc(100vh - $header-height);
  }
  </style>
  