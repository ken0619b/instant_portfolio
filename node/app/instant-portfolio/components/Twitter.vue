<template>
    <div class="control has-icons-left has-icons-right">
        <a :href="`https://twitter.com/${twitter}`">{{twitter}}</a>
    </div>
</template>

<script>
export default {
  props: ["twitter"]
};
</script>

<style>
</style>
