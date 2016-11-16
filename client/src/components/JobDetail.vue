<template>
  <div class="jobDetail">
    <h1>Job</h1>
    <p>{{job.data.url}}</p>
    <p>{{job.repeatInterval}}</p>
  </div>
</template>

<script>
export default {
  name: 'jobDetail',
  props: ['job']
}
</script>

<style>
#jobDetail {
  text-align: right;
}
</style>
