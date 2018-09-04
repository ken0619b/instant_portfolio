<template>
    <div class="wrapper">
        <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Hi, I'm {{$store.state.portfolio.name}}
                </h1>
                <h2 class="subtitle">
                    {{$store.state.portfolio.description}}
                </h2>
            </div>
        </div>
        </section>
        <section class="section">
            <div class="container">
            <h1 class="title">Skill</h1>
                <Skill 
                 v-for="skill in $store.state.portfolio.skills"
                 :key="skill.id"
                 :skill="skill"
                />
            </div>
        </section>
        <section class="section">
            <div class="container">
                <h1 class="title">Works</h1>
                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-12">
                        <div class="tile is-parent">
                        <Work
                        v-for="work in $store.state.portfolio.works"
                        :key="work.id"
                        :work="work"
                        />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <h1 class="title">Contact</h1>
            <Email 
                :email="$store.state.portfolio.email" 
            />
            <Twitter
                :twitter="$store.state.portfolio.twitter" 
            />
            <General
                :url="$store.state.portfolio.url" 
            />
        </section>
    </div>
</template>

<script>
import Skill from "~/components/Skill";
import Work from "~/components/Work";
//import Contact from "~/components/Contact";
import firebase from "../plugins/firebase";

import Email from "~/components/Email";
import Twitter from "~/components/Twitter";
import General from "~/components/General";

export default {
  components: {
    Skill,
    Work,
    //Contact
    Email,
    Twitter,
    General
  },
  async fetch({ store, redirect, route }) {
    const firebaseDb = firebase.database();
    // urlからデータを取得
    const uniqueId = route.query.uid;
    console.log(`param: ${route.query.uid}`);
    //console.log(`nanoid: ${nanoid(12)}`);

    // uniqueIdがない場合や指定されていない場合は/へリダイレクトする
    if (uniqueId == null || uniqueId == "") {
      redirect("/");
    } else {
      // get portfolio data
      const portfolioRef = firebaseDb.ref(`portfolios/${uniqueId}`);
      // set portfolio data
      portfolioRef.once("value").then(snapshot => {
        //console.log(snapshot.val());
        //console.log(snapshot.val().uniqueId);

        if (snapshot.val() == null) {
          this.$router.push("/");
        } else {
          // update portfolio data
          store.commit("updatePortfolio", snapshot.val());
        }
      });
    }
    // 別途更新された場合
    const pRef = firebaseDb.ref(`portfolios/${uniqueId}`);
    pRef.on("value", snapshot =>
      store.commit("updatePortfolio", snapshot.val())
    );
  },
  methods: {
    onClickSkill(e) {}
  }
};
</script>

<style>
</style>
