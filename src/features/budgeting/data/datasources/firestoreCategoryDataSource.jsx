import { onSnapshot, updateDoc, where, collection, addDoc, deleteDoc, getDoc, getDocs, query, doc } from "firebase/firestore";
import { firestore } from "../../../../services/firebaseConfig";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Subject, finalize } from "rxjs";

export async function createCategory(userID, name, type, value, isIncome) {
    try {
        const categoriesRef = collection(firestore, 'categories');
        const docRef = await addDoc(categoriesRef, {
            userID,
            name,
            type,
            value,
            isIncome
        });
        return { error: null, result: docRef.id };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

export async function getCategories (userID) {
    try {

        const categoriesRef = collection(firestore, 'categories');
        const queryCategories = query(categoriesRef, where("userID", "==", userID));

        // Create a Subject from RxJS
        const categoriesSubject = new Subject();

        // Subscribe to Firestore snapshots and push data to the Subject
        const unsubscribe = onSnapshot(queryCategories, (snapshot) => {
            const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            categoriesSubject.next(categories);
        });

        // Export the Subject as a stream
        const categoriesStream = categoriesSubject.asObservable().pipe(
            finalize(() => {
                unsubscribe(); // Call the unsubscribe function when the stream is unsubscribed
            })
        );

        return { error: null, result: categoriesStream };

    } catch (err) {
        console.error(err)
        return { error: err, result: null }
    }
}

export async function getCategory(id) {
    try {
        const categoryRef = doc(firestore, 'categories', id);
        const categoryDoc = await getDoc(categoryRef);
        if (categoryDoc.exists()) {
            return { error: null, result: { ...categoryDoc.data(), id: categoryDoc.id } };
        } else {
            return { error: new Error('Category not found'), result: null };
        }
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

export async function updateCategory(id, name, type, value, isIncome) {
    try {
        const categoryRef = doc(firestore, 'categories', id);
        await updateDoc(categoryRef, {
            name,
            type,
            value,
            isIncome
        });
        return { error: null, result: true };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

export async function deleteCategory(id) {
    try {
        const categoryRef = doc(firestore, 'categories', id);
        await deleteDoc(categoryRef);
        return { error: null, result: true };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}