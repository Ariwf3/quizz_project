import app from "../../app/app.js"
import QuestionModel from '../models/QuestionModel.js'
import AnswerModel from '../models/AnswerModel.js'

export default class PlayQuizzController {

    show() {
        app.mvc.loadView('playQuizz')
    }

}