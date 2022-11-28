import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({

  title:String,
  showProgressBar: String,
  showTimerPanel:String,
  maxTimeToFinishPage:Number,
  maxTimeToFinish:Number,
  firstPageIsStarted:Boolean,
  startSurveyText:String,
  pages:Array,
  completedHtml:String,
  completedHtmlOnCondition:Array

  });
  
  module.exports = mongoose.models.survey || mongoose.model("survey", surveySchema);
