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
                queue: false,
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
                this.toast(e.response.data?.message ?? '서버 오류 발생!', 'is-danger')
                return e
            }
        },

        error_log(e) {
            if (e.response) {
                console.log(e.response.status, e.response.statusText)
                console.log(e.response.data)
            } else {
                console.log(e)
            }
        },
    },
})
