import firebase from 'firebase'


export default class Login{

    login(value, next, errorcode){
        firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(() => next(true))
        .catch(error => errorcode(error.message))
    }


    create(value, next, errorcode){
        firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(() => next(true))
        .catch(error => errorcode(error.message))
    }
}