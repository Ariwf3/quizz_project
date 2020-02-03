let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
        render: (html) => {
            document.querySelector("main").innerHTML = html;
            
        }
    },


    // ----------------------------------------------------------------------------------------------------------------
    // ARCHITECTURE MVC DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    mvc: {
        router: null,
        loadView: (view) => {
            return fetch(`src/views/${view}.html`)
                .then(
                    (response) => {
                        return response.text()
                    })
                .then(
                    (text) => {
                        app.dom.render(text);
                    })
                .catch(
                    function (error) {
                        console.error(error)
                    }
                )
        }
    }
};


// L'application est exportée afin d'être accessible par d'autres modules.
export default app;