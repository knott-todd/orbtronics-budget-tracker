export function FirebaseAuthRepository({ FirebaseAuthDataSource }) {
    return {
        async loginWithGoogle() {
            const { result, error } = await FirebaseAuthDataSource.loginWithGoogle();
            return { result, error };
        },

        async loginWithEmailAndPassword(email, password) {
            const { result, error } = await FirebaseAuthDataSource.loginWithEmailAndPassword(email, password);
            return { result, error };
        },

        async signUpWithEmailAndPassword(email, password) {
            const { result, error } = await FirebaseAuthDataSource.signUpWithEmailAndPassword(email, password);
            return { result, error };
        },

        async logout() {
            const { result, error } = await FirebaseAuthDataSource.logout();
            return { result, error };
        }
    };
}
