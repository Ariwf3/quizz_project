import app from './app.js';

// import config from './config.js';

import HomeController from './../src/controllers/HomeController.js';
import QuizzController from './../src/controllers/QuizzController.js';
import EditController from './../src/controllers/EditController.js';


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
    app.mvc.router.add('/quizz', () => {
            new QuizzController().show();
        }
    );

    // edit questions
    app.mvc.router.add('/edit', () => {
            new EditController().show();
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