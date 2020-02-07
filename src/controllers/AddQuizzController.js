import app from "../../app/app.js"
import QuestionModel from '../models/QuestionModel.js'
import AnswerModel from '../models/AnswerModel.js'
import QuizzModel from '../models/QuizzModel.js'

export default class AddQuizzController {

    show() {
        app.mvc.loadView('addQuizz').
            then(() => this.showQuizzList()).
                then(() => this.listener())
    }


    // first view with values of local storage
    showQuizzList() {

        // models
        const questions = new QuestionModel().getAllFromLocalStorage('question')
        const answers = new AnswerModel().getAllFromLocalStorage('answer')

        const select = app.dom.getById('select_question')

        // To nest the select options
        let options = ''

        for (const question of questions) {
            options += `<option class="questions_options" value="${question.title}">${question.title}</option>`
        }

        // append datas to html
        app.dom.appendHtmlNode(select, options)
    }

    listener() {

        const addQuestionButton = app.dom.getById('add_question_button');
        const addQuizzButton = app.dom.getById('add_quizz_button');

        addQuestionButton.addEventListener('click', this.addQuestionOnClick.bind(this))
        addQuizzButton.addEventListener('click', this.addQuizzOnClick.bind(this))
    }

    /********************
        EVENTS
    ********************/

    addQuestionOnClick(e) {
        e.preventDefault()

        const questions = new QuestionModel().getAllFromLocalStorage('question')
        const answers = new AnswerModel().getAllFromLocalStorage('answer')

        const options = document.getElementsByClassName('questions_options')

        const divResult = app.dom.getById('result')

        let content =''

        for (const option of options) {

            // if an option is selected
            if (option.selected === true) {

                const headingAddQuizz = app.dom.getById('heading_add_quizz')

                // question with matching value is the current
                let currentQuestion = questions.filter(question => question.title === option.value)

                let div = document.createElement('div')
                
                // If the question had been already add (verification with id attribute)
                if (document.getElementById(currentQuestion[0].title)) {

                    // if  error paragraph already exists don't repeat
                    if (document.querySelector('h3#heading_add_quizz>p') !== null) {
                        document.querySelector('h3#heading_add_quizz>p').remove()
                    }

                    // creation error paragraph and append to html
                    const p = document.createElement('p')
                    p.classList.add('text-danger', 'text-center', 'error_custom', 'mt-3');
                    p.textContent = 'Vous avez déjà sélectionné cette question'
                    headingAddQuizz.append(p)

                } else {
                    div.classList.add('selected_questions')
                    div.setAttribute('id', currentQuestion[0].title)
                    content += `
                        <p>${currentQuestion[0].title}</p>
                        <hr>
                    `
                    // append content to div node
                    app.dom.appendHtmlNode(div, content)

                    // append div node to div result - appendChild only works on nodeElements
                    divResult.appendChild(div)


                    if (document.querySelector('h3#heading_add_quizz>p') !== null) {
                        document.querySelector('h3#heading_add_quizz>p').remove()
                    }
                }
                

                
            }
            
            
        }
    }

    addQuizzOnClick(e) {
        e.preventDefault()

        // loading questions/answers lists from models throught local storage
        const allStoredQuestions = new QuestionModel().getAllFromLocalStorage('question')
        const allStoredAnswers = new AnswerModel().getAllFromLocalStorage('answer')
        
        const allStoredQuizz = new QuizzModel().getAllFromLocalStorage('qcm')

        const name = app.dom.getById('qcm_title').value
        let selectedQuestions = []
        let matchingAnswers = []

        const selectedQuestionsElement = document.getElementsByClassName('selected_questions')
        
        for (const selectedQuestionElement of selectedQuestionsElement) {
            
            const selectedQuestionId = selectedQuestionElement.getAttribute('id')

            let filtredQuestions = allStoredQuestions.filter(question => question.title === selectedQuestionId )

            selectedQuestions.push(...filtredQuestions)
            
            let filtredAnswers = allStoredAnswers.filter(answer => answer.answer1.title === selectedQuestionId )

            matchingAnswers.push(...filtredAnswers)  

        }


        const qcmObj = {
            name,
            questions: { ...selectedQuestions },
            answers: { ...matchingAnswers}

        }

        allStoredQuizz.push(qcmObj)

        new QuizzModel().setToLocalStorage('qcm', allStoredQuizz)

        console.log(qcmObj)
    }


}