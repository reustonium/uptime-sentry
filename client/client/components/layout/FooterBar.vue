<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="social">
          <a :href="'https://github.com/reustonium/uptime'">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
          </a>
        </p>
        <p>Code licensed under <a href="https://github.com/reustonium/uptime/blob/master/LICENSE">MIT license</a>.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/mixins';

.footer {
  margin-left: 180px;

  @include mobile() {
    margin-left: 0;
  }
}
</style>
