import app from "../../app/app.js"
import QuestionModel from '../models/QuestionModel.js'
import AnswerModel from '../models/AnswerModel.js'

export default class Quizz {

    show() {
        app.mvc.loadView('quizz').
            then(() => this.listener())
    }

    listener() {

        // html buttons
        const submitButton = document.getElementById('submit_form')
        const clearQuestions = document.getElementById('clear_questions')

        // models
        const questionModel = new QuestionModel()
        const answerModel = new AnswerModel()

        // loading questions/answers lists from local storage
        const allQuestions = questionModel.getAllFromLocalStorage('question')
        const allAnswers = answerModel.getAllFromLocalStorage('answer')


        // event
        submitButton.addEventListener('click', (e) => {
            e.preventDefault()
            
            const form = document.querySelector('form');

            // input checkboxes
            const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'))
            const checked = checkboxes.filter((checkbox) => checkbox.checked === true)

            // values
            const question = document.getElementById('question').value
            const answer1 = document.getElementById('answer1').value
            const answer2 = document.getElementById('answer2').value
            const answer3 = document.getElementById('answer3').value

            // at least one checkbox checked and no empty fields 
            if (checked.length === 0 || question === '' || answer1 === '' || answer2 === '' || answer3 === '') {
                
                if (document.querySelector('form>p') !== null) {
                    document.querySelector('form>p').remove()
                }
                
                let p = document.createElement('p')
                p.classList.add('text-danger', 'text-center', 'mt-3');
                p.textContent = '* Tous les champs doivent êtres remplis et au moins une réponse vraie cochée'

                form.append(p)
                
                
            } else {
                document.querySelector('form>p').remove()
                let i = 0;

                for (const checkbox of checkboxes) {
                    checkbox.checked === true ? checkbox.value = 'vrai' : checkbox.value = 'faux'
                }
                
                // get values of question and answers with the checkboxes values
                const questionObj = { question, }
                const answerObj = { 
                    answer1 : { answer1, value : checkboxes[0].value },
                    answer2 : { answer2, value : checkboxes[1].value },
                    answer3 : { answer3, value : checkboxes[2].value }
                }

                // add objects to previously stated arrays
                allQuestions.push(questionObj)
                allAnswers.push(answerObj)

                questionModel.setToLocalStorage('question', allQuestions)
                answerModel.setToLocalStorage('answer', allAnswers)

                // fields cleaning
                document.getElementById('question').value = ''
                document.getElementById('answer1').value = ''
                document.getElementById('answer2').value = ''
                document.getElementById('answer3').value = ''
            }

        })

        clearQuestions.addEventListener("click", (e) => {
            e.preventDefault()
            if ( confirm('effacer le stockage local ?') ) {
                localStorage.clear()
            }
            
        })

    }

}