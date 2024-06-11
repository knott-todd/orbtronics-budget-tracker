import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../../../services/firebaseConfig";

export async function loginWithGoogle() {

    try {

        const response = await signInWithPopup(auth, provider);
        return { error: null, result: response }

    } catch (err) {
        console.error(err)
        return { error: err, result: null }
    }

}

export async function loginWithEmailAndPassword(email, password) {
    try {

        const response = await signInWithEmailAndPassword(auth, email, password);
        return { error: null, result: response }

    } catch (err) {
        return { error: err, result: null }
    }
}

export async function signUpWithEmailAndPassword(email, password) {
    try {

        const response = await createUserWithEmailAndPassword(auth, email, password);
        return { error: null, result: response }

    } catch (err) {
        console.log(err)
        return { error: err, result: null }
    }
}

export async function logout() {
    try {

        const response = await signOut(auth);
        return { error: null, result: {} }

    } catch (err) {
        console.error(err)
        return { error: err, result: null }
    }
}