import Vue from 'vue'

Vue.mixin({
    data() {
        return {
        }
    },

    methods: {
        toast(message, type='is-danger', duration=3000, position='is-top') {
            this.$buefy.toast.open({
                message,
                type,
                pauseOnHover: true,
                duration,
                position,
            })
        },

        async error_can_happen(func) {
            try {
                return await func()
            } catch(e) {
                this.error_log(e)
                if (typeof document === 'undefined') return e
                this.toast('서버 오류 발생!', 'is-danger')
                return e
            }
        },

        error_log(e, message) {
            if (e.response) {
                console.log(e.response.status, e.response.statusText)
                this.toast(e.response.data.message ?? message ?? '오류 발생')
                console.log(e.response.data)
            } else {
                console.log(e)
            }
        },
    },
})
