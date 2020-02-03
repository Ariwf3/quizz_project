import app from "../../app/app.js";
import QuestionModel from '../models/QuestionModel.js';
import AnswerModel from '../models/AnswerModel.js';

export default class Quizz {

    show() {
        app.mvc.loadView('quizz').
            then(() => this.listener());
    }

    listener() {

        // buttons
        const buttonQuestions = document.getElementById('submit_questions');
        const buttonAnswers = document.getElementById('submit_answers');
        const clearQuestions = document.getElementById('clear_questions');

        //models
        const questionModel = new QuestionModel();
        const answerModel = new AnswerModel();

        // questions/answers lists
        const allQuestions = questionModel.getAllFromLocalStorage('question');
        const allAnswers = answerModel.getAllFromLocalStorage('answer');


        // listeners
        buttonQuestions.addEventListener('click', (e) => {
            e.preventDefault()
            
            const question = document.getElementById('question').value

            const questionObj = { question }
            
            allQuestions.push(questionObj)
            
            questionModel.setToLocalStorage('question', allQuestions);

            console.log(questionModel.getAll('question'));

            document.getElementById('question').value = '';
        })

        clearQuestions.addEventListener("click", (e) => {
            e.preventDefault()
            if ( confirm('effacer le local storage ?') ) {
                localStorage.clear();
            }
            
        })

        buttonAnswers.addEventListener("click", (e) => {
            e.preventDefault()

            const answer = document.getElementById('answer').value

            const answerObj = { answer }

            allAnswers.push(answerObj)

            answerModel.setToLocalStorage('answer', allAnswers);

            document.getElementById('answer').value = '';
        })

    }

}