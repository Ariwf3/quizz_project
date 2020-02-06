import app from './app.js';

// import config from './config.js';

import HomeController from './../src/controllers/HomeController.js';
import AddQuestionController from './../src/controllers/AddQuestionController.js';
import EditQuestionController from './../src/controllers/EditQuestionController.js';
import AddQuizzController from './../src/controllers/AddQuizzController.js';
import PlayQuizzController from './../src/controllers/PlayQuizzController.js';


// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
    app.mvc.router = new Router({
        mode: 'hash',
        root: '/index.html',
        page404: function (path) {
            console.log('"/' + path + '" Page not found');
        }
    });

    // home
    app.mvc.router.add('/', () => {
            new HomeController().show();
        }
    );

    // add questions
    app.mvc.router.add('/questions/add', () => {
        new AddQuestionController().show();
        }
    );

    // edit questions
    app.mvc.router.add('/questions/edit', () => {
        new EditQuestionController().show();
        }
    );

    // add quizz
    app.mvc.router.add('/quizz/add', () => {
        new AddQuizzController().show();
        }
    );

    // play quizz
    app.mvc.router.add('/quizz/play', () => {
        new PlayQuizzController().show();
        }
    );



    app.mvc.router.check().addUriListener();
}


// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function () {
    
    // Initialisation du routeur.
    initializeRouter();

    
});