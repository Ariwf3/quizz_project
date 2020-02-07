import app from "../../app/app.js"
import QuestionModel from '../models/QuestionModel.js'
import AnswerModel from '../models/AnswerModel.js'

export default class PlayQuizzController {

    show() {
        app.mvc.loadView('playQuizz').
            then(() => this.listener())
    }

    listener() {

        const launchTest = app.dom.getById('launch_test')

        launchTest.addEventListener('click', this.launchTestOnClick.bind(this))
    }

    launchTestOnClick(e) {
        
        // Définir déroulement d'une partie d'essai
    }

}