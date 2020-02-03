

export default class QuestionModel {

    setToLocalStorage(key, data) {

        const str = JSON.stringify(data)
            
        localStorage.setItem(key, str)
    }

    getAllFromLocalStorage(key) {
        const datas = JSON.parse(localStorage.getItem(key));

        if (datas === null) {

            datas = [];

        }
        return datas
    }
}