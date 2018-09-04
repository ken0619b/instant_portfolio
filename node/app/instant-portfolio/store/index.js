// firebase
import firebase from "../plugins/firebase";
const firebaseDb = firebase.database();

export const state = () => {
    return {
        portfolio: {
            // 以下の構成のデータを想定
            UniqueId: '',
            name: '',
            description: '',
            skills: [],
            works: [],
            email: '',
            twitter: '',
            url: ''
        },
        currentUniqueId: ''
    };
};

export const mutations = {
    updateCurrentUniqueId(state, _uniqueId){
        state.currentUniqueId = _uniqueId;
    },
    updatePortfolio(state, _portfolio){
        //const portfolioRef = firebaseDb.ref('portfolios/test');
        //console.log(`updatePortfolioName has been called with ${_name}`)
        //const newPortfolio = state.portfolio;
        const newPortfolio = _portfolio
        state.portfolio = newPortfolio
    },
    updateName(state, _name){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);
        //console.log(`updatePortfolioName has been called with ${_name}`)
        const newPortfolio = state.portfolio;
        newPortfolio.name = _name
        state.portfolio = newPortfolio

        portfolioRef.update({
            name: _name
        })
    },
    updateDesc(state, _description){
        //console.log(`updatePortfolioName has been called with ${_name}`)
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);

        const newPortfolio = state.portfolio;
        newPortfolio.description = _description
        state.portfolio = newPortfolio

        portfolioRef.update({
            description: _description
        })
    },
    addSkill(state, _skill){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);

        const newPortfolio = state.portfolio;
        if(state.portfolio.skills === undefined) {
            state.portfolio.skills = []
            // initialize
            newPortfolio.skills.push({
                id: 0,
                name: _skill
            })
        } else {
            const maxSkillId = Math.max(...state.portfolio.skills.map(s => s.id),0) + 1
            console.log(maxSkillId)
            newPortfolio.skills.push({
                id: maxSkillId,
                name: _skill
            })
        }
        //console.log(`added:${_skill}`)
        state.portfolio = newPortfolio

        portfolioRef.update({
            skills: newPortfolio.skills
        })
    },
    deleteSkill(state, _id){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);

        const newPortfolio = state.portfolio;
        // find skill
        const targetIndex = newPortfolio.skills.findIndex(s => s.id === _id)
        // delete skill
        newPortfolio.skills.splice(targetIndex, 1)
        //console.log(`${newPortfolio.skills}`)
        
        portfolioRef.update({
            skills: newPortfolio.skills
        })

        state.portfolio = newPortfolio

    },
    addWork(state, _work){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);

        const newPortfolio = state.portfolio;
        if(state.portfolio.works === undefined) {
            state.portfolio.works = []
            // initialize
            newPortfolio.works.push({
                id: 0,
                url: _work.url,
                title: _work.title,
                content: _work.content
            })
        } else {        
            const maxWorkId = Math.max(...state.portfolio.works.map(w => w.id),0) + 1
            // add work
            _work.id = maxWorkId
            newPortfolio.works.push({
                id: maxWorkId,
                url: _work.url,
                title: _work.title,
                content: _work.content
            })
        }
        state.portfolio = newPortfolio

        portfolioRef.update({
            works: newPortfolio.works
        })
    },
    deleteWork(state, _id){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);

        const newPortfolio = state.portfolio;
        // find work
        const targetIndex = newPortfolio.works.findIndex(w => w.id === _id)
        //console.log(`${newPortfolio.works[targetIndex]}`)
        // delete work
        newPortfolio.works.splice(targetIndex, 1)
        state.portfolio = newPortfolio

        portfolioRef.update({
            works: newPortfolio.works
        })
    },
    updateEmail(state, _email){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);
        const newPortfolio = state.portfolio;
        //console.log(`${_contact.email}`)
        //console.log(`updateEmail:${_contact} ${newPortfolio.contacts.email}`)
        newPortfolio.email = _email
        state.portfolio = newPortfolio

        portfolioRef.update({
            email: newPortfolio.email
        })

    },
    updateTwitter(state, _twitter){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);
        const newPortfolio = state.portfolio;
        //console.log(`${_contact.twitter}`)
        newPortfolio.twitter = _twitter
        state.portfolio = newPortfolio
        
        portfolioRef.update({
            twitter: newPortfolio.twitter
        })
    },
    updateFacebook(state, _url){
        const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);
        const newPortfolio = state.portfolio;
        //console.log(`${_contact.facebook}`)
        newPortfolio.url = _url
        state.portfolio = newPortfolio

        portfolioRef.update({
            url: newPortfolio.url
        })
    },
    // updateOther1(state, _contact){
    //     const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);
    //     const newPortfolio = state.portfolio;
    //     //console.log(`${_contact.other1}`)
    //     newPortfolio.contacts.other1 = _contact.other1
    //     state.portfolio = newPortfolio

    //     portfolioRef.update({
    //         contacts: newPortfolio.contacts
    //     })
    // },
    // updateOther2(state, _contact){
    //     const portfolioRef = firebaseDb.ref(`portfolios/${state.currentUniqueId}`);
    //     const newPortfolio = state.portfolio;
    //     //console.log(`${_contact.other2}`)
    //     newPortfolio.contacts.other2 = _contact.other2
    //     state.portfolio = newPortfolio

    //     portfolioRef.update({
    //         contacts: newPortfolio.contacts
    //     })
    // },
  };