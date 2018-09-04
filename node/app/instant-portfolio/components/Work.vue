<template>
  <article class="tile is-child notification is-primary" @click="$emit('clickwork', work.id)">
      <p class="title">{{work.title}}</p>
      <p class="subtitle"><a href="`${work.url}`">{{work.url}}</a></p>
      <div class="content">{{work.content}}</div>
  </article>
</template>

<script>
export default {
  props: ["work"],
  methods: {
    onClickWork(e) {
      // console.log(`onClickWork ${this.work.title}_${this.work.id}`);
      // this.$store.commit("deleteWork", this.work.id);
      // // this.portfolioSkill = "";
    }
  }
};
</script>

<style>
</style>
