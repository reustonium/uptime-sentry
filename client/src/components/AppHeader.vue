<template>
  <section class="hero is-bold app-header">
    <div class="hero-head">
      <nav class="nav has-shadow">
        <div class="nav-center">
          <router-link to="/" class="nav-item hero-header">
            <img src="~assets/logo.png" alt="">
            <span class="uptime">Uptime</span> <strong class="webapp">Webapp</strong>
          </router-link>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
</script>

<style lang="scss">
.app-header {
  position: fixed;
  top: 0px;
  min-width: 100%;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
}

.hero-header {
  font-size: 1.35em;
  .uptime {
    margin-left: 10px;
    color: #36AC70;
  }
  .webapp {
    color: #28374B;
  }
}
</style>
