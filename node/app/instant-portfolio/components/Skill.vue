<template>
    <span class="tag is-primary is-large" @click="$emit('clickskill', skill.id)">{{skill.name}}</span>
</template>

<script>
export default {
  props: ["skill"],
  methods: {
    onClickSkill(e) {}
  }
};
</script>

<style>
</style>
