import app from "../../app/app.js";


export default class HomeController {

    show() {
        app.mvc.loadView('home')
            
    }



}