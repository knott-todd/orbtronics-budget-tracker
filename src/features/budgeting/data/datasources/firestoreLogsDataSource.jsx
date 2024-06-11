import { Timestamp, updateDoc, where, collection, addDoc, deleteDoc, getDoc, query, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../../../services/firebaseConfig';
import { Subject, finalize } from 'rxjs';

export async function createLog(userID, categoryID, categoryName, amount, description) {
    try {
        const logsRef = collection(firestore, 'logs');
        const docRef = await addDoc(logsRef, {
            userID,
            categoryID,
            categoryName,
            amount,
            description,
            timestamp: Timestamp.now()
        });
        return { error: null, result: docRef.id };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

export async function getLogs(userID) {
    try {

        console.log("Making log data request")

        const logsRef = collection(firestore, 'logs');
        const queryLogs = query(logsRef, where("userID", "==", userID));


        // Create a Subject from RxJS
        const logsSubject = new Subject();

        // Subscribe to Firestore snapshots and push data to the Subject
        const unsubscribe = onSnapshot(queryLogs, (snapshot) => {
            const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            logsSubject.next(logs);
        });

        // Export the Subject as a stream
        const logsStream = logsSubject.asObservable().pipe(
            finalize(() => {
                unsubscribe(); // Call the unsubscribe function when the stream is unsubscribed
            })
        );

        return { error: null, result: logsStream };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

export async function getLog(id) {
    try {
        const logRef = doc(firestore, 'logs', id);
        const logDoc = await getDoc(logRef);
        if (logDoc.exists()) {
            return { error: null, result: { ...logDoc.data(), id: logDoc.id } };
        } else {
            return { error: new Error('Log not found'), result: null };
        }
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

export async function updateLog(id, categoryID, categoryName, amount, description) {
    try {
        const logRef = doc(firestore, 'logs', id);
        await updateDoc(logRef, {
            categoryID,
            categoryName,
            amount,
            description
        });
        return { error: null, result: true };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

export async function deleteLog(id) {
    try {
        const logRef = doc(firestore, 'logs', id);
        await deleteDoc(logRef);
        return { error: null, result: true };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}