export function LoginWithEmailAndPasswordUseCase({ FirebaseAuthRepository }) {
    return {
        async execute(email, password) {
            const { error, result } = await FirebaseAuthRepository.loginWithEmailAndPassword(email, password);
            return { error, result };
        }
    };
}
