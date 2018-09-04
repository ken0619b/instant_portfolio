<template>
  <div class="bd-example">
    <section class="hero is-medium is-light is-bold">
      <div class="hero-body">
        <div class="container">
          <p class="title">
            Make your own Portfolio Quickly!
          </p>
          <p class="subtitle">
          </p>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column is-half">
        <button class="button is-primary" @click="createPortfolio">Create</button>
      </div>
      <div class="column">
        <input class="input" type="text" placeholder="ex:1XxlEDCbXxRG" v-model="uniqueId">
        <button class="button is-success" @click="editPortfolio">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../plugins/firebase";
import nanoid from "nanoid";

const firebaseDb = firebase.database();
export default {
  components: {},
  data() {
    return {
      uniqueId: ""
    };
  },
  methods: {
    createPortfolio() {
      console.log("createPortfolio");
      // initialize the portfolio
      const generatedUniqueId = nanoid();
      console.log(`generatedUniqueId: ${generatedUniqueId}`);

      const portfolioRef = firebaseDb.ref(`portfolios/${generatedUniqueId}`);

      // update currentUniqueId
      this.$store.commit("updateCurrentUniqueId", generatedUniqueId);

      portfolioRef.update({
        uniqueId: generatedUniqueId,
        name: "",
        description: "",
        skills: [],
        works: [],
        email: "",
        twitter: "",
        url: ""
      });

      // redirect to edit page
      this.$router.push(`/portfolio-edit?uid=${generatedUniqueId}`);
    },
    editPortfolio() {
      console.log("editPortfolio");
      console.log(`${this.uniqueId}`);

      if (this.uniqueId != "") {
        // access to firebase
        const portfolioRef = firebaseDb.ref(`portfolios/${this.uniqueId}`);
        portfolioRef.once("value").then(snapshot => {
          if (snapshot.val() == null) {
          } else {
            //console.log(snapshot.val());
            //console.log(snapshot.val().uniqueId);

            // update currentUniqueId
            this.$store.commit("updateCurrentUniqueId", this.uniqueId);

            // update portfolio data
            //this.$store.commit("updatePortfolio", snapshot.val());

            // redirect to edit page
            this.$router.push(`/portfolio-edit?uid=${this.uniqueId}`);
          }
        });
      }
    }
  }
};
</script>

<style>
</style>
