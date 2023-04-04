<template>
  <nav
      class="navbar header has-background-white px-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <img
            src="~/assets/icons/pinata.png"
            alt="Buefy"
            width="32"
            height="32"
          >
          <img class="ml-3" src="~/assets/icons/title/glide-28.svg" />
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
@media screen and (min-width: 1024px) {
  .navbar {
    min-height: 4rem;
  }
}
</style>