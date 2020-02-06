import app from "../../app/app.js"
import QuestionModel from '../models/QuestionModel.js'
import AnswerModel from '../models/AnswerModel.js'

export default class EditQuizzController {

    show() {
        app.mvc.loadView('edit').
            then(() => this.editList())
            .then(() => this.listener())
    }

    // When we land on the page we have first the list of all questions and answers
    editList() {

        // models
        const questions = new QuestionModel().getAllFromLocalStorage('question')
        const answers = new AnswerModel().getAllFromLocalStorage('answer')

        const select = app.dom.getById('select')
        const tbody = app.dom.getById('tbody_quizz_list')

        // To nest the select options
        let options = ''

        // To nest the table row
        let tr = ''

        
        // list of all questions table row creation
        questions.forEach((question, indexQuestion) => {

            const matchingAnswers = answers.filter((answer, indexAnswer) => indexQuestion === indexAnswer)

            options += `<option id="${question.title}" class="questions_options" value="${question.title}">${question.title}</option>`

            tr += `
                <tr id="tr_quizz">
                    <th scope="row th_id">${indexQuestion}</th>
                    <td id="td_title">${question.title}</td>
                    <td id="td_questions">${question.question}</td>
                    <td id="td_answers">
                        <ul id="answers_ul">
                            <li class="${matchingAnswers[0].answer1.value}">${matchingAnswers[0].answer1.answer1}</li>
                            <li class="${matchingAnswers[0].answer2.value}">${matchingAnswers[0].answer2.answer2}</li>
                            <li class="${matchingAnswers[0].answer3.value}">${matchingAnswers[0].answer3.answer3}</li>
                        </ul>
                    </td>
                </tr>
            `
        });


        // append datas to html
        app.dom.appendHtmlNode(select, options)
        app.dom.appendHtmlNode(tbody, tr)

    }


    listener() {
        const selectOneButton = app.dom.getById('select_one_button')
        const showAllButton = app.dom.getById('show_all_button')
        const deleteOneButton = app.dom.getById('delete_one_button')
        const submitEditButton = app.dom.getById('submit_edit')

        showAllButton.addEventListener('click', this.selectAllOnClick.bind(this))

        selectOneButton.addEventListener('click', this.selectOneOnClick.bind(this))

        deleteOneButton.addEventListener('click', this.deleteOnClick.bind(this))

        submitEditButton.addEventListener('click', this.editOnClick.bind(this))

    }


    /********************  
            EVENTS 
    ********************/

    selectAllOnClick(e) {
        e.preventDefault()

        const editForm = app.dom.getById('form_edit')

        if (editForm.classList.contains('d-block')) {

            // The table appears
            app.dom.getById('table').classList.add('d-block')

            // The form disapear and loses its class
            editForm.classList.add('d-none')
            editForm.classList.remove('d-block')
        }
    }


    selectOneOnClick(e) {
        e.preventDefault()

        const questions = new QuestionModel().getAllFromLocalStorage('question')
        const answers = new AnswerModel().getAllFromLocalStorage('answer')

        const options = document.getElementsByClassName('questions_options')

        const sectionTable = app.dom.getById('table')

        for (const option of options) {

            // if an option is selected
            if (option.selected === true) {

                const editForm = app.dom.getById('form_edit')
                const titleInput = app.dom.getById('title')
                const questionInput = app.dom.getById('question')
                const answer1Input = app.dom.getById('answer1')
                const answer2Input = app.dom.getById('answer2')
                const answer3Input = app.dom.getById('answer3')
                const checkInput1 = app.dom.getById('answer_checkbox1')
                const checkInput2 = app.dom.getById('answer_checkbox2')
                const checkInput3 = app.dom.getById('answer_checkbox3')

                // question with matching value is the current
                let currentQuestion = questions.filter(question => question.title === option.value)

                // answers with matching values are the currrents
                let currentAnswers = answers.filter(answer => answer.answer1.title === option.value)

                // if the table is on screen
                if (sectionTable.classList.contains('d-block')) {

                    // The form appears
                    editForm.classList.add('d-block')

                    // The table disapear and loses its class
                    sectionTable.classList.add('d-none')
                    sectionTable.classList.remove('d-block')

                }

                // We give the values of current questions and answers to the fields
                titleInput.value = currentQuestion[0].title
                questionInput.value = currentQuestion[0].question
                answer1Input.value = currentAnswers[0].answer1.answer1
                answer2Input.value = currentAnswers[0].answer2.answer2
                answer3Input.value = currentAnswers[0].answer3.answer3

                // We give the matching value to checkbox to get the checked ones
                currentAnswers[0].answer1.value === 'vrai' ? checkInput1.checked = true : checkInput1.checked = false
                currentAnswers[0].answer2.value === 'vrai' ? checkInput2.checked = true : checkInput2.checked = false
                currentAnswers[0].answer3.value === 'vrai' ? checkInput3.checked = true : checkInput3.checked = false


            }
        }
    }

    // EDIT
    editOnClick(e) {
        e.preventDefault()

        const form = document.querySelector('form');

        const allStoredQuestions = new QuestionModel().getAllFromLocalStorage('question')
        const allStoredAnswers = new AnswerModel().getAllFromLocalStorage('answer')

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

            // if  error paragraph already exists don't repeat
            if (document.querySelector('form>p') !== null) {
                document.querySelector('form>p').remove()
            }

            // creation error paragraph and append to html
            const p = document.createElement('p')
            p.classList.add('text-danger', 'text-center', 'error_custom', 'mt-3');
            p.textContent = '* Tous les champs doivent êtres remplis et au moins une réponse vraie cochée'
            form.append(p)

        } else {

            for (const checkbox of checkboxes) {
                checkbox.checked === true ? checkbox.value = 'vrai' : checkbox.value = 'faux'
            }

            if (confirm('êtes vous sûr de vouloir éditer la question ?')) {

                const options = document.getElementsByClassName('questions_options')

                for (const option of options) {

                    if (option.selected === true) {

                        // If the question has the same value as the value option it matches
                        const currentQuestion = allStoredQuestions.filter(question => question.title === option.value)

                        for (let i = 0; i < allStoredQuestions.length; i++) {
                            const storedQuestion = allStoredQuestions[i];

                            // If the question of my localstorage array (allStoredQuestions) has the same title as the  current question we replace with splice with the exact same structure and index
                            if (storedQuestion.title === currentQuestion[0].title) {

                                allStoredQuestions.splice(i, 1, { title, question })
                                allStoredAnswers.splice(i, 1, {
                                    answer1: { title, answer1, value: checkboxes[0].value },
                                    answer2: { title, answer2, value: checkboxes[1].value },
                                    answer3: { title, answer3, value: checkboxes[2].value }
                                })

                            }
                        }
                        // We update the local storage with new datas
                        new QuestionModel().setToLocalStorage('question', allStoredQuestions)
                        new QuestionModel().setToLocalStorage('answer', allStoredAnswers)
                    }
                }
                // Page reloading
                document.location.reload()
            }
        }
    }

    // DELETE
    deleteOnClick(e) {
        e.preventDefault()

        const allStoredQuestions = new QuestionModel().getAllFromLocalStorage('question')
        const allStoredAnswers = new AnswerModel().getAllFromLocalStorage('answer')

        if (confirm('êtes vous sûrs de vouloir supprimer la question ?')) {

            const options = document.getElementsByClassName('questions_options')

            for (const option of options) {

                if (option.selected === true) {

                    let currentQuestion = allStoredQuestions.filter(question => question.title === option.value)

                    for (let i = 0; i < allStoredQuestions.length; i++) {
                        const storedQuestion = allStoredQuestions[i];
                        // Same principle as the edit but we don't need of the structure object or replacement, we just use splice to delete the elements
                        if (storedQuestion.title === currentQuestion[0].title) {
                            allStoredQuestions.splice(i, 1)
                            allStoredAnswers.splice(i, 1)
                        }
                    }

                    // We update the localStorage
                    new QuestionModel().setToLocalStorage('question', allStoredQuestions)
                    new QuestionModel().setToLocalStorage('answer', allStoredAnswers)

                }
            }
            // Page reloading
            document.location.reload()
        }

    }




}