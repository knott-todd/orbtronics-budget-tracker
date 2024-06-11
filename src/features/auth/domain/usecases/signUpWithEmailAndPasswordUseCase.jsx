export function SignUpWithEmailAndPasswordUseCase({ FirebaseAuthRepository }) {
    return {
        async execute(email, password) {
            const { error, result } = await FirebaseAuthRepository.signUpWithEmailAndPassword(email, password);
            return { error, result };
        }
    };
}
