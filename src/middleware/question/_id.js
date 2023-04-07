export default function ({ route, redirect, store }) {
    if (
        store.state.user.userCurriculum.length === 0 || 
        route.params.id <= 0 || store.state.OMR.n_question < route.params.id
    ) {
        redirect('/')
    }
}