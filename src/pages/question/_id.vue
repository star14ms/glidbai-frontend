<template>
    <div id="quiz" class="col-a-center">
        <div class="page" :class="{ 'checked': checked }">
            <div class="page-item col" >
                <template v-if="!checked">
                    <div id="question">
                        {{ q.question }}
                    </div>
    
                    <div id="choices" class="col">
                        <div v-for="(choice, idx) in [q.choices.a, q.choices.b, q.choices.c, q.choices.d]" class="choice">
                            <b-radio v-model="userChoice" :native-value="idx" size="is-small" type="is-info">
                                {{ choice }}
                            </b-radio>
                        </div>
                    </div>
                </template>

                <template v-else>
                    {{ q.question }}
                </template>
            </div>

            <div id="article" class="page-item">
                <template v-if="!checked">
                    {{ q.passage }}
                </template>

                <template v-else>
                    {{ q.passage }}
                </template>
            </div>
        </div>

        <button v-show="!checked" id="btn-check" class="button is-primary" @click="check()">Check Answers</button>
        <button v-show="checked" id="btn-check" class="button is-primary" @click="next()">Next</button>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { questionState } from '../../store'


@Component({
  layout: 'quiz',

  asyncData(ctx) {
    questionState.get({ id: '0', Authorization: '12345678' })
  }
})
export default class Page extends Vue {
    userChoice: null | number = null
    checked: boolean = false

    get q() {
        return questionState.item
    }

    mounted() {
        console.log(this.q)
    }

    check() {
        this.checked = true
    }

    next() {
        const nextId = Number(this.$route.params.id) + 1
        this.$router.push(`/question/${nextId}`)
    }
}
</script>

<style lang="scss">
#quiz {
    gap: 32px;
}

.page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 18px;
    
    width: 1376px;
    min-height: 632px;

    margin-top: 106px;

    .page-item {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 64px;
        gap: 32px;
        
        width: 679px;
        min-height: 632px;
        
        background: #FFFFFF;
        
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    }

    &.checked .page-item {
        padding: 32px; 
    }
}

#question {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
}

#choices {
    gap: 32px;

    .choice .b-radio {
        font-family: 'Inter';
        font-weight: 400;
        line-height: 24px;

        input {
            font-size: 9px;
        }
        .control-label {
            font-size: 18px;
        }
    }
}

#article {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
}

#btn-check {
    width: 180px;
    height: 40px;
    
    background: #5076CB;
    
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 20px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
}
</style>