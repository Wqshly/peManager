import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activityId: 0,
    activityClass: '',
    venueOption: '',
    user: {
      id: -1,
      userNumber: "",
      username: "",
      password: "",
      age: 22,
      sex: "",
      unit: "",
      identity: "学生",
      phone: "",
      email: "",
      schoolId: ""
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setActivityId(state, activityId) {
      state.activityId = activityId;
    },
    setActivityClass(state, activityClass) {
      state.activityClass = activityClass;
    },
    setVenueOption(state, venueOption) {
      state.venueOption = venueOption;
    },
    setCompetitionClass(state, competition) {
      state.competitionClass = competition;
    },
    setRuleForm(state, ruleForm) {
      state.ruleForm = ruleForm;
    },
    setEditableTabs(state, editableTabs) {
      state.editableTabs = editableTabs;
    }
  }
});

