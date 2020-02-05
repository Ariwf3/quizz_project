import app from "../../app/app.js"
import QuestionModel from '../models/QuestionModel.js'
import AnswerModel from '../models/AnswerModel.js'

export default class QuizzController {

    show() {
        app.mvc.loadView('quizz').
            then(() => this.listener())
    }

    showEdit() {
        app.mvc.loadView('edit').
            then(() => this.edit())
            .then(() => this.editListener())
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
        const allQuestions = new QuestionModel().getAllFromLocalStorage('question')
        const allAnswers = new AnswerModel().getAllFromLocalStorage('answer')

        // input checkboxes
        const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'))
        const checked = checkboxes.filter((checkbox) => checkbox.checked === true)

        // values
        const title = app.dom.getById('title').value
        const question = app.dom.getById('question').value
        const answer1 = app.dom.getById('answer1').value
        const answer2 = app.dom.getById('answer2').value
        const answer3 = app.dom.getById('answer3').value
        console.log(question)
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
            p.classList.add('text-danger', 'text-center', 'mt-3');
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
            allQuestions.push(questionObj)
            allAnswers.push(answerObj)

            new QuestionModel().setToLocalStorage('question', allQuestions)
            new AnswerModel().setToLocalStorage('answer', allAnswers)


            // fields cleaning
            this.cleanFields()
        }
    }



    editListener() {
        const selectOne = app.dom.getById('select_one_button')
        selectOne.addEventListener('click', this.selectOneOnClick.bind(this))
    }

    selectOneOnClick(e) {
        e.preventDefault()

        const questions = new QuestionModel().getAllFromLocalStorage('question')
        const answers = new AnswerModel().getAllFromLocalStorage('answer')

        const options = document.getElementsByClassName('questions_options')

        for (const option of options) {
            
            // if an option is selected
            if (option.selected === true) {
                console.log('Mon option :', option.value)

                const formEdit = app.dom.getById('form_edit')
                const title = app.dom.getById('title')
                const questionInput = app.dom.getById('question')
                const answer1Input = app.dom.getById('answer1')
                const answer2Input = app.dom.getById('answer2')
                const answer3Input = app.dom.getById('answer3')
                const checkInput1 = app.dom.getById('answer_checkbox1')
                const checkInput2 = app.dom.getById('answer_checkbox2')
                const checkInput3 = app.dom.getById('answer_checkbox3')

                // question with matching value is the current
                let currentQuestion = questions.filter(question => question.title === option.value)

                // answers with matching value are the currrents
                let currentAnswers = answers.filter(answer => answer.answer1.title === option.value)
                console.log(currentAnswers);

                
                app.dom.getById('table').classList.add('d-none')
                app.dom.getById('form_edit').classList.add('d-block')
                // app.dom.getById('table').style = 'display:none'

                title.value = currentQuestion[0].title
                questionInput.value = currentQuestion[0].question
                answer1Input.value = currentAnswers[0].answer1.answer1
                answer2Input.value = currentAnswers[0].answer2.answer2
                answer3Input.value = currentAnswers[0].answer3.answer3

                currentAnswers[0].answer1.value === 'vrai' ? checkInput1.checked = true : checkInput1.checked = false
                currentAnswers[0].answer2.value === 'vrai' ? checkInput2.checked = true : checkInput2.checked = false
                currentAnswers[0].answer3.value === 'vrai' ? checkInput3.checked = true : checkInput3.checked = false
                    
                
                

                // console.log(currentQuestion)
                // console.log(currentAnswers)

                
            }
        }

    }

    edit () {
        

        // models
        const questions = new QuestionModel().getAllFromLocalStorage('question')
        const answers = new AnswerModel().getAllFromLocalStorage('answer')


        const select = app.dom.getById('select')
        const tbody = app.dom.getById('tbody_quizz_list')
        
        // options for select
        let options = ''
        // table row
        let tr = ''

        
        // I use forEach because I need the key
        // list of all
        questions.forEach( (question, indexQuestion) => {

            const matchingAnswers = answers.filter((answer, indexAnswer) => indexQuestion === indexAnswer)


            options += `<option id="${question.title}" class="questions_options" value="${question.title}">${question.title}</option>`

            tr += `
                <tr id="tr_quizz">
                    <th scope="row th_id">${indexQuestion}</th>
                    <td id="td_title">${question.title}</td>
                    <td id="td_questions">${question.question}</td>
                    <td id="td_answers">
                        <ul id="answers_ul">
                            <li>${matchingAnswers[0].answer1.answer1}</li>
                            <li>${matchingAnswers[0].answer2.answer2}</li>
                            <li>${matchingAnswers[0].answer3.answer3}</li>
                        </ul>
                    </td>
                </tr>
            `
        }); 

        // append datas to html
        app.dom.appendHtmlNode(select, options)
        app.dom.appendHtmlNode(tbody, tr)

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