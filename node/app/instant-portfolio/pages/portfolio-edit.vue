<template>
    <div class="wrapper">
        <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Hi, I'm {{$store.state.portfolio.name}}
                    <input type="text" placeholder="Name..." v-model="portfolioName" @input="onNameInput" />
                </h1>
                <h2 class="subtitle">
                    {{$store.state.portfolio.description}}
                    <input type="text" placeholder="Ex: Web Engineer / Designer / Interested in web services...." v-model="portfolioDesc" @input="onDescInput" />
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
                 @clickskill = 'onClickSkill'
                />
            </div>
        </section>
        <section class="section">
            <div class="container">
                <h1 class="title">Add your Skills</h1>
                <div class="skill_add columns">
                    <div class="column is-two-thirds">
                        <input type="text" class="input" placeholder="Ex: Ruby on Rails..." v-model="portfolioSkill" />
                    </div>
                    <div class="column">
                        <button class="button is-link" @click="onSkillButtonPress">Add Skill</button>
                    </div>
                </div>
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
                            @clickwork = 'onClickWork'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <h1 class="title">Add your Great Works</h1>
                <div class="work_add columns">
                    <div class="column is-two-thirds">
                        <input type="text" class="input" placeholder="My first Web app..." v-model="portfolioWork.title" />
                        <input type="text" class="input" placeholder="http://www.yourdomain.com" v-model="portfolioWork.url" />
                        <input type="text" class="input" placeholder="This App helps me feeling good..." v-model="portfolioWork.content" />
                    </div>
                    <div class="column">
                        <button class="button is-link" @click="onWorkButtonPress">Add Work</button>
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
        <section class="section">
            <div class="contact-container">
                <div class="contact-container">
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-medium" type="text" placeholder="Email" @input="onEmailInput" v-model="portfolioEmail"  />
                        <span class="icon is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-medium" type="text" placeholder="Twitter" @input="onTwitterInput" v-model="portfolioTwitter" />
                        <span class="icon is-left">
                            <i class="fab fa-twitter"></i>
                        </span>
                    </div>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-medium" type="text" placeholder="Facebook/CodePen/Web/..." @input="onFacebookInput" v-model="portfolioUrl"/>
                        <span class="icon is-left">
                            <i class="fab fa-facebook-f"></i>
                        </span>
                    </div>
                </div>
            </div>
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

import nanoid from "nanoid";

export default {
  components: {
    Skill,
    Work,
    //Contact,
    Email,
    Twitter,
    General
  },
  data() {
    return {
      portfolioName: "",
      portfolioDesc: "",
      portfolioSkill: "",
      portfolioWork: {
        title: "",
        url: "",
        content: ""
      },
      portfolioEmail: "",
      portfolioTwitter: "",
      portfolioUrl: ""
    };
  },
  //async パラメータ取得処理
  async fetch({ store, redirect, route }) {
    const firebaseDb = firebase.database();
    // urlからデータを取得
    const uniqueId = route.query.uid;
    console.log(`param: ${route.query.uid}`);
    //console.log(`nanoid: ${nanoid(12)}`);

    // uniqueIdがない場合や指定されていない場合は/へリダイレクトする
    if (
      uniqueId == null ||
      uniqueId == "" ||
      store.state.currentUniqueId == ""
    ) {
      redirect("/");
    } else {
      // get portfolio data
      const portfolioRef = firebaseDb.ref(
        `portfolios/${store.state.currentUniqueId}`
      );
      // set portfolio data
      portfolioRef.once("value").then(snapshot => {
        //console.log(snapshot.val());
        //console.log(snapshot.val().uniqueId);

        if (snapshot.val() == null) {
          // this.$router.push('/');
        } else {
          // update portfolio data
          store.commit("updatePortfolio", snapshot.val());
        }
      });
    }

    // 別途更新された場合
    // 別途更新された場合
    // const pRef = firebaseDb.ref(`portfolios/${store.state.currentUniqueId}`);
    // pRef.on("value", snapshot =>
    //   store.commit("updatePortfolio", snapshot.val())
    // );
  },
  //   asyncData({ params, router }) {
  //     console.log(`params: uniqueId: ${params.uniqueId}`);
  //     const { uniqueId } = params;
  //     if (uniqueId == undefined || uniqueId == null || uniqueId == "") {
  //       router.push(`/`);
  //     } else {
  //       //redirect("/");
  //     }
  //   },
  methods: {
    onNameInput(e) {
      //console.log(`onNameInput${this.portfolioName}`);
      this.$store.commit("updateName", this.portfolioName);
    },
    onDescInput(e) {
      //console.log(`onDescInput${this.portfolioDesc}`);
      this.$store.commit("updateDesc", this.portfolioDesc);
    },
    onSkillButtonPress(e) {
      //console.log(`onSkillButtonPress ${this.portfolioSkill}`);
      this.$store.commit("addSkill", this.portfolioSkill);
      this.portfolioSkill = "";
    },
    onWorkButtonPress(e) {
      //console.log(`onWorkButtonPress ${this.portfolioWork}`);
      this.$store.commit("addWork", this.portfolioWork);
      this.portfolioWork.title = "";
      this.portfolioWork.url = "";
      this.portfolioWork.content = "";
    },
    onEmailInput(e) {
      //console.log(`onEmailInput ${this.portfolioContact.email}`);
      this.$store.commit("updateEmail", this.portfolioEmail);
    },
    onTwitterInput(e) {
      //console.log(`onTwitterInput ${this.portfolioContact}`);
      this.$store.commit("updateTwitter", this.portfolioTwitter);
    },
    onFacebookInput(e) {
      //console.log(`onFacebookInput ${this.portfolioContact}`);
      this.$store.commit("updateFacebook", this.portfolioUrl);
    },
    // onOther1Input(e) {
    //   //console.log(`onOther1Input ${this.portfolioContact}`);
    //   this.$store.commit("updateOther1", this.portfolioContact);
    // },
    // onOther2Input(e) {
    //   //console.log(`onOther2Input ${this.portfolioContact}`);
    //   this.$store.commit("updateOther2", this.portfolioContact);
    // },
    onClickSkill(_id) {
      console.log(`onClickSkill ${_id}`);
      this.$store.commit("deleteSkill", _id);
    },
    onClickWork(_id) {
      console.log(`onClickWork ${_id}`);
      this.$store.commit("deleteWork", _id);
    }
  }
};
</script>

<style>
</style>
