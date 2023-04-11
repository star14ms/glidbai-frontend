<template>
<no-ssr>
    <vue-countdown 
        ref="vac" 
        :left-time="leftTime" 
        :speed="100"
        @start="onStart()"
        @paused="onPaused()"
        @finish="onFinish()"
        @process="onProcess()"
    >
        <div id="counter-background" @click="$emit('click:background')"></div>
    
        <template
            v-for="slot in ['process', 'finish']"
            :slot="slot"
            slot-scope="{ state, timeObj, startCountdown, pauseCountdown }"
        >
            <div class="counter-content row">
                <div class="row-a-center">
                    <div class="col-j-center">
                        <button class="button btn-add" @click="addTime(60)">
                            <font-awesome-icon :icon="['fas', 'fa-caret-up']" />
                        </button>

                        <div id="time-left" class="is-size-3">{{ `${timeObj.m ?? '00'}` }}</div>

                        <button class="button btn-add" @click="addTime(-60)">
                            <font-awesome-icon :icon="['fas', 'fa-caret-down']" />
                        </button>
                    </div>

                    <div class="is-size-3 mx-1 mb-1">:</div>

                    <div class="col-j-center">
                        <button class="button btn-add" @click="addTime(10)">
                            <font-awesome-icon :icon="['fas', 'fa-caret-up']" />
                        </button>

                        <div id="time-left" class="is-size-3">{{ `${timeObj.s ?? '00'}` }}</div>

                        <button class="button btn-add" @click="addTime(-10)">
                            <font-awesome-icon :icon="['fas', 'fa-caret-down']" />
                        </button>
                    </div>
                </div>
    
                <div class="col-ja-center ml-1">
                    <button v-show="state === 'paused' || state === 'finished'" class="button btn-play" @click="startCountdown()">
                        <font-awesome-icon size="2x" :icon="['fas', 'fa-play']" />
                    </button>
                    <button v-show="state !== 'paused' && state !== 'finished'" class="button btn-play" @click="pauseCountdown()">
                        <font-awesome-icon size="2x" :icon="['fas', 'fa-pause']" />
                    </button>
                </div>
            </div>
        </template>
    </vue-countdown>
</no-ssr>
</template>

<script>
import { OMRState } from '../store'

export default {
    computed: {
        leftTime() {
            return this.$store.state.OMR.leftTime
        }
    },

    beforeMount() {
        this.finishSound = new Audio('/audios/꿈속에서.wav')
        this.finishSound.volume = 0.33
    },

    methods: {
        addTime(sec) {
            const vac = this.$refs.vac
            const nowTime = new Date().getTime()
            const addedTime = sec * 1000
            let newActualEndTime

            if (vac.state === 'finished') {
                newActualEndTime = nowTime + addedTime
                vac.state = 'paused'
            } else if (vac.state === 'paused') {
                newActualEndTime = nowTime + vac.remainingTime + addedTime
            } else {
                newActualEndTime = vac.actualEndTime += addedTime
            }

            if (newActualEndTime - nowTime <= 0) {
                vac.actualEndTime = nowTime
                vac.remainingTime = 0
                vac.state = 'paused'
                this.$emit('paused')
            } else {
                vac.actualEndTime = newActualEndTime
            }
            
            let leftTime = new Date(vac.actualEndTime).getTime() - nowTime
            this.$store.commit('OMR/updateLeftTime', leftTime)
            if (leftTime < 0) return

            const t = {}
            let leftSeconds = leftTime / 1000
    
            let ms = leftTime % 1000
    
            if (vac.thousandSpeed && ms > 990) {
              leftSeconds = Math.ceil(leftSeconds)
              ms = 0
            }
    
            const org = {
              d: leftSeconds / 60 / 60 / 24,
              h: (leftSeconds / 60 / 60) % 24,
              m: (leftSeconds / 60) % 60,
              s: leftSeconds % 60,
              ms: ms
            }
    
            const txt = {
              d: parseInt(org.d, 10).toString(),
              h: parseInt(org.h, 10)
                .toString()
                .padStart(2, 0),
              m: parseInt(org.m, 10)
                .toString()
                .padStart(2, 0),
              s: parseInt(org.s, 10)
                .toString()
                .padStart(2, 0),
              ms: org.ms.toString().padStart(3, 0)
            }
    
            const ceil = {
              d: parseInt(Math.ceil(leftSeconds / 60 / 60 / 24), 10),
              h: parseInt(Math.ceil(leftSeconds / 60 / 60), 10),
              m: parseInt(Math.ceil(leftSeconds / 60), 10),
              s: parseInt(Math.ceil(leftSeconds), 10)
            }
    
            t.endTime = vac.actualEndTime
            t.speed = vac.speed
            vac.usedTime = new Date().getTime() - vac.actualStartTime
            t.leftTime = leftTime
            vac.remainingTime = leftTime
            vac.timeObj = Object.assign({}, t, txt, {
              org,
              ceil
            })
            vac.timeObj.org = org
            vac.timeObj.ceil = ceil
        },

        onStart() {
            OMRState.ChangeisPausedCounter(false)
            this.$emit('start')
        },

        onPaused() {
            OMRState.ChangeisPausedCounter(true)
            this.$emit('paused')
        },

        onProcess() {
            this.$store.commit('OMR/updateLeftTime', this.$refs.vac.remainingTime)
        },

        onFinish() {
            this.$emit('finish')

            if (this.leftTime === 0) return 
            this.$store.commit('OMR/updateLeftTime', 0)
            this.finishSound.play()
        },
    }
}
</script>

<style lang="scss" scoped>

#counter-background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.counter-content {
    gap: 0.75rem;
    font-family: 'Inter';
    z-index: -1;

    .button {
        background-color: #5076CB !important;
        color: white;
        z-index: 1;
        
        &:focus:not(:active), &.is-focused:not(:active) {
            box-shadow: none;
        }
    }

    #time-left {
        width: 41.1px;
        line-height: 32px;
    }

    .btn-add {
        height: 1.5rem;
        padding: 0 0.5rem;
        background-color: white !important;
        color: black;
        border: none;
        
        &:hover:not(:active) {
            background-color: #F3F4F6 !important;
        }
    }

    .btn-play {
        border-radius: 50%;
    }

    .fa-play {
        font-size: 26.65px;
        position: relative;
        left: 2px;
    }

    .fa-stop {
        font-size: 28px;
    }
}
</style>