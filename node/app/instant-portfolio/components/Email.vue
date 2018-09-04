<template>
        <div class="control has-icons-left has-icons-right">
            <a :href="`mailto:${email}`">{{email}}</a>
        </div>
</template>

<script>
export default {
  props: ["email"]
};
</script>

<style>
</style>
