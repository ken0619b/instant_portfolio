<template>
    <div class="control has-icons-left has-icons-right">
      <a :href="`${url}`">{{url}}</a>
    </div>
</template>

<script>
export default {
  props: ["url"]
};
</script>

<style>
</style>
