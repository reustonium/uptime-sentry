<template>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <label class="label">Monitor Name</label>
      <p class="control">
        <input class="input" type="text" placeholder="My Awesome Webapp">
        <span class="help is-info">Enter the name of site you want to monitor.</span>
      </p>

      <label class="label">Monitor URL</label>
      <p class="control">
        <input class="input" type="text" placeholder="https://my-awesome-webapp.com">
        <span class="help is-info">Enter the URL of site you want to monitor.</span>
      </p>

      <label class="label">Interval</label>
      <p class="control">
        <span class="select">
          <select>
            <option>1 minute</option>
            <option>2 minutes</option>
            <option>5 minutes</option>
            <option>10 minute</option>
            <option>1 hour</option>
          </select>
        </span>
        <span class="help is-info">Enter the interval you want to check on your monitor.</span>
      </p>

      <p class="control">
        <button class="button is-primary">Submit</button>
        <button class="button is-link">Cancel</button>
      </p>
      
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
</style>
