export default function ({ route, redirect, store }) {
    if (store.state.user.userCurriculum.length === 0) {
        redirect('/')
    } else if (route.params.id <= 0 || store.state.OMR.n_question < route.params.id) {
        redirect('/question/1')
    }
}