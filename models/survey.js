import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  category: String,
  title: String,
  showProgressBar: String,
  showTimerPanel: String,
  maxTimeToFinishPage: Number,
  maxTimeToFinish: Number,
  firstPageIsStarted: Boolean,
  startSurveyText: String,
  pages: Array,
  surveyPw: String,
  creator: String,
  completedHtml: String,
  completedHtmlOnCondition: Array,
});

module.exports =
  mongoose?.models?.survey || mongoose.model("survey", surveySchema);
