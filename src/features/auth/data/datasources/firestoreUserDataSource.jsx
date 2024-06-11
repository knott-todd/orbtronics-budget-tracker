import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../services/firebaseConfig";

// Create a new user
export async function createUser(name, email, age) {
    try {
        const usersRef = collection(firestore, 'users');
        const docRef = await addDoc(usersRef, {
            name,
            email,
            age
        });
        return { error: null, result: docRef.id };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

// // Get a stream of users for a given query
// export async function getUsers(queryParams) {
//     try {
//         const usersRef = collection(firestore, 'users');
//         const queryUsers = query(usersRef, where(...queryParams));

//         // Create a Subject from RxJS
//         const usersSubject = new Subject();

//         // Subscribe to Firestore snapshots and push data to the Subject
//         const unsubscribe = onSnapshot(queryUsers, (snapshot) => {
//             const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             usersSubject.next(users);
//         });

//         // Export the Subject as a stream
//         const usersStream = usersSubject.asObservable().pipe(
//             finalize(() => {
//                 unsubscribe(); // Call the unsubscribe function when the stream is unsubscribed
//             })
//         );

//         return { error: null, result: usersStream };

//     } catch (err) {
//         console.error(err);
//         return { error: err, result: null };
//     }
// }

// Get a single user by ID
export async function getUser(id) {
    try {
        const userRef = doc(firestore, 'users', id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return { error: null, result: { ...userDoc.data(), id: userDoc.id } };
        } else {
            return { error: new Error('User not found'), result: null };
        }
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

// Update a user's information
export async function updateUser(id, name, email, age) {
    try {
        const userRef = doc(firestore, 'users', id);
        await updateDoc(userRef, {
            name,
            email,
            age
        });
        return { error: null, result: true };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}

// Delete a user by ID
export async function deleteUser(id) {
    try {
        const userRef = doc(firestore, 'users', id);
        await deleteDoc(userRef);
        return { error: null, result: true };
    } catch (err) {
        console.error(err);
        return { error: err, result: null };
    }
}
