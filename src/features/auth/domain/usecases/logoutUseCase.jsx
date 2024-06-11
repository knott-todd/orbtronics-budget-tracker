export function LogoutUseCase({ FirebaseAuthRepository }) {
    return {
        async execute() {
            const { error, result } = await FirebaseAuthRepository.logout()
            return { error, result }
        }
    }
}