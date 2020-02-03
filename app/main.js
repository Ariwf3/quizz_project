import app from './app.js';

import config from './config.js';

import HomeController from './../src/controllers/HomeController.js';
import TestController from './../src/controllers/TestController.js';
import QuizzController from './../src/controllers/QuizzController.js';

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

    // quizz
    app.mvc.router.add('/quizz', () => {
            new QuizzController().show();
        }
    );

    // test
    app.mvc.router.add('/test', () => {
            new TestController().show();
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