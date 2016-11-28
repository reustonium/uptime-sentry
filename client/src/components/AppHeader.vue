<template>
  <section class="hero is-bold app-header">
    <div class="hero-head">
      <nav class="nav has-shadow">
        <div class="nav-center">
          <a class="nav-item hero-header" href="/">
            <span class="uptime">Uptime</span> <strong class="webapp">Webapp</strong>
          </a>
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
