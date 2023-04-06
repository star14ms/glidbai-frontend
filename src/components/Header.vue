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

      <div class="navbar-menu">
        <div class="navbar-end">
          <a v-if="$auth.$storage._state['_token.local']" class="is-size-5 navbar-item" @click="logout()">Logout</a>
          <NuxtLink 
            v-if="$auth.$storage._state['_token.local']" 
            to="/delete-account"
            class="is-size-5 navbar-item" 
          >
            회원 탈퇴
          </NuxtLink>
        </div>
      </div>
  </nav>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  async logout() {
    // await this.$auth.logout()
    await this.$auth.setUserToken(false)
    await this.$auth.fetchUser()
    this.$router.push('/login')
  }
}
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .navbar {
    min-height: 4rem;
  }
}
</style>