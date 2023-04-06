export default function ({ $auth, redirect, route }) {
    if (!$auth.$storage._state['_token.local']) {
        if (!route.path.includes('/login')) {
            redirect('/login');
        }
    } else if (route.path.includes('/login')) {
        redirect('/');
    }
}