export function LoginWithGoogleUseCase({ FirebaseAuthRepository }) {
    return {
        async execute() {
            const { error, result } = await FirebaseAuthRepository.loginWithGoogle();
            return { error, result };
        }
    };
}
