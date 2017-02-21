<template>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <label class="label">Monitor Name</label>
      <p class="control has-icon has-icon-right">
        <input class="input" v-model="name" type="text" placeholder="My Awesome Webapp">
        <!-- <span class="help is-info">Enter the name of site you want to monitor.</span> -->
        <span class="icon is-small">
          <i class="fa fa-warning" v-if="this.name===''"></i>
          <i class="fa fa-check" v-else></i>
        </span>
      </p>

      <label class="label">Monitor URL</label>
      <p class="control has-icon has-icon-right">
        <input class="input" v-model="url" type="text" placeholder="https://my-awesome-webapp.com">
        <span class="icon is-small">
         <i class="fa fa-warning" v-if="this.url===''"></i>
         <i class="fa fa-check" v-else></i>
       </span>
       <span class="help is-danger" v-if="this.url===''">You must enter a URL monitor.</span>
      </p>

      <label class="label">Interval</label>
      <p class="control">
        <span class="select">
          <select v-model="freq">
            <option value="1">1 minute</option>
            <option value="2">2 minutes</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minute</option>
            <option value="60">1 hour</option>
          </select>
        </span>
        <span class="help is-info">Enter the interval you want to check on your monitor.</span>
      </p>

      <p class="control">
        <button class="button is-primary" @click="submit">Submit</button>
        <router-link to="/" class="button is-link">Cancel</router-link>
      </p>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      name: '',
      url: '',
      freq: 1
    }
  },
  methods: {
    submit () {
      let body = {
        name: this.name,
        url: this.url,
        freq: this.freq
      }

      this.$http.post('http://localhost:3000/job/', body).then(res => {
        console.log(JSON.stringify(res.body))
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss">
</style>
