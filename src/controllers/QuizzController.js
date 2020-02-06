import app from "../../app/app.js"
import QuestionModel from '../models/QuestionModel.js'
import AnswerModel from '../models/AnswerModel.js'

export default class QuizzController {

    show() {
        app.mvc.loadView('quizz').
            then(() => this.listener())
    }


    listener() {

        // html buttons
        const submitButton = app.dom.getById('submit_form')
        const clearButton = app.dom.getById('clear_button')

        submitButton.addEventListener('click',this.addOnclick.bind(this))

        clearButton.addEventListener("click", (e) => {
            e.preventDefault()
            if ( confirm('effacer le stockage local ?') ) {
                localStorage.clear()
            }
        })


    }

    addOnclick(e) {
        e.preventDefault();
        
        const form = document.querySelector('form');


        // loading questions/answers lists from models throught local storage
        const allStoredQuestions = new QuestionModel().getAllFromLocalStorage('question')
        const allStoredAnswers = new AnswerModel().getAllFromLocalStorage('answer')

        // input checkboxes
        const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'))
        const checked = checkboxes.filter((checkbox) => checkbox.checked === true)

        // values
        const title = app.dom.getById('title').value
        const question = app.dom.getById('question').value
        const answer1 = app.dom.getById('answer1').value
        const answer2 = app.dom.getById('answer2').value
        const answer3 = app.dom.getById('answer3').value
        
        // at least one checkbox checked and no empty fields 
        if (checked.length === 0
            || title === ''
            || question === ''
            || answer1 === ''
            || answer2 === ''
            || answer3 === ''
        ) {

            if (document.querySelector('form>p') !== null) {
                document.querySelector('form>p').remove()
            }

            let p = document.createElement('p')
            p.classList.add('text-danger', 'text-center', 'error_custom', 'mt-3');
            p.textContent = '* Tous les champs doivent êtres remplis et au moins une réponse vraie cochée'

            form.append(p)

        } else {

            if (document.querySelector('form>p') !== null) {
                document.querySelector('form>p').remove()
            }

            for (const checkbox of checkboxes) {
                checkbox.checked === true ? checkbox.value = 'vrai' : checkbox.value = 'faux'
            }

            // get values of question and answers with the checkboxes values
            const questionObj = { title, question, }
            const answerObj = {
                answer1: { title, answer1, value: checkboxes[0].value },
                answer2: { title, answer2, value: checkboxes[1].value },
                answer3: { title, answer3, value: checkboxes[2].value }
            }

            // add objects to previously stated arrays
            allStoredQuestions.push(questionObj)
            allStoredAnswers.push(answerObj)

            new QuestionModel().setToLocalStorage('question', allStoredQuestions)
            new AnswerModel().setToLocalStorage('answer', allStoredAnswers)


            // fields cleaning
            this.cleanFields()
        }
    }


    cleanFields() {
        app.dom.getById('title').value = ''
        app.dom.getById('question').value = ''
        app.dom.getById('answer1').value = ''
        app.dom.getById('answer2').value = ''
        app.dom.getById('answer3').value = ''
        app.dom.getById('answer_checkbox1').checked = false
        app.dom.getById('answer_checkbox2').checked = false
        app.dom.getById('answer_checkbox3').checked = false
    }

}