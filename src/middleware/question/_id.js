export default function ({ redirect, store }) {
    if (store.state.user.userCurriculum.length === 0) {
        redirect('/')
    }
}