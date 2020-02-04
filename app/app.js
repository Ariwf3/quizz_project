let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
        render: (html) => {
            document.querySelector("main").innerHTML = html;
        },
        
        emptyNode: function (node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        },

        getById: (id) => document.getElementById(id),

        /**
         * Append a content to a container with innerHTML assignation
         * @param {string} container 
         * @param {string} content 
         */
        appendHtmlNode: function (container, content) {
            container.innerHTML = content
        },

        appendTextNode: function (container, content) {
            container.textContent = content
        },

        renderTemplateCopies: function (templateSelector, targetSelector, values, copyInitCallBack) {
            // Recherche l'élément cible dans l'arbre DOM.
            let target = document.querySelector(targetSelector);

            // Recherche le template dans l'arbre DOM.
            let template = document.querySelector(templateSelector);

            // Création d'un fragment de DOM vide.
            let fragment = document.createDocumentFragment();

            for (let value of values) {
                // Création d'une copie du template dans l'arbre DOM.
                let copy = document.importNode(template.content, true);

                // Exécution du callback d'initialisation de la copie du template.
                copyInitCallBack(copy, value);

                // Insertion de la copie du template dans le fragment de DOM (mieux pour les performances durant la boucle)
                fragment.appendChild(copy);
            }

            // Fin de boucle : Insertion du fragment dans l'élément cible dans l'arbre DOM.
            this.emptyNode(target);
            target.appendChild(fragment);
        },
        
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