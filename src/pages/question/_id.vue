<template>
    <div id="quiz" class="col-a-center">
        <h1>Question {{ Number($route.params.id) }} of {{ n_question }}</h1>

        <div class="page" :class="{ 'checked': checked }">
            <div class="page-item col">
                <template v-if="!checked">
                    <div id="question">
                        {{ q.question }}
                    </div>
    
                    <div id="choices" class="col">
                        <div v-for="(choice, idx) in [q.choices.a, q.choices.b, q.choices.c, q.choices.d]" class="choice">
                            <b-radio v-model="userChoiceIndex" :native-value="idx" size="is-small" type="is-info">
                                {{ choice }}
                            </b-radio>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div id="answer">
                        <div id="answer-info" class="space-between-a-unset">
                            <span class="col-j-end">Negative Factual Information</span>

                            <span>
                                <div class="row-a-center">
                                    <span class="row-a-center mr-2"><i class="tag is-success my-auto"></i>Correct Answer</span>
                                    <span class="row-a-center"><i class="tag is-danger my-auto"></i>Incorrect Answer</span>
                                </div>
                                <div class="row-a-center row-j-end"><i class="tag is-light"></i>Your Selection</div>
                            </span>
                        </div>

                        <div id="question" class="space-between mt-5">
                            <i class="has-text-danger">Q</i>
                            <span>{{ q.question }}</span>
                        </div>

                        <div id="choices-checked" class="col mt-5">
                            <div v-for="(choice, idx) in [q.choices.a, q.choices.b, q.choices.c, q.choices.d]" class="space-between-a-unset">
                                <i 
                                    class="tag is-large mr-2 bold" 
                                    :class="{ 
                                        'is-success': answerIndex === idx,
                                        'is-danger': answerIndex !== userChoiceIndex && userChoiceIndex === idx,
                                        'is-white': answerIndex !== idx,
                                    }"
                                >
                                    <span>{{ idx===0 ? 'A' : idx===1 ? 'B' : idx===2 ? 'C' : 'D' }}</span>
                                </i>
                                <span class="choice w-100 px-3 py-2" :class="{ 'has-background-light': userChoiceIndex === idx }">
                                    {{ choice }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div id="explanation">
                        <h2 class="subtitle bold">Explanation</h2>

                        <p>Correct Answer: {{q.answer.toUpperCase()}}</p>
                        <p>Your Selection: {{userChoiceIndex !== null ? index2Answer[userChoiceIndex] : ''}}</p>

                        <h2 class="subtitle bold mt-5">This is a Negative Factual Information question. </h2>

                        <div 
                            v-for="(choice, idx) in [e.choices.a, e.choices.b, e.choices.c, e.choices.d]" 
                            class="mt-5" :class="{ 'bold': answerIndex === idx}"
                        >
                            <p>({{ index2Answer[idx] }}) {{ choice?.choice }}</p>
                            <p>→ {{ choice?.explanation }}</p>
                        </div>
                    </div>
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

        <button v-show="!checked" id="btn-check" class="button is-primary" @click="check()" :disabled="userChoiceIndex === null">
            Check Answers
        </button>
        <button v-show="checked" id="btn-check" class="button is-primary" @click="next()">
            {{ !isLastQuestion ? 'Next' : 'See Result'}}
        </button>

        <ChatBot :scenario="scenario" :question-id="q._id" :clear-button="true" />
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import { questionState, explanationState, OMRState } from '../../store'
import { Answer2Index, Index2Answer } from '../../shared/question'
import { Scenario } from '../../shared/vue-chat-bot'

@Component({
  middleware: 'login',
  layout: 'bg-gray',

  async asyncData() {
    await questionState.getNext({ onlyUnsolved: true })
    await questionState.get({ id: questionState.nextItem.questionId })
  }
})
export default class Page extends Vue {
    userChoiceIndex: null | number = null
    checked: boolean = false
    answer2Index: Answer2Index = {'a': 0, 'b': 1, 'c': 2, 'd': 3}
    index2Answer: Index2Answer = {0: 'A', 1: 'B', 2: 'C', 3: 'D'}

    scenario: Scenario = [[{
      agent: 'bot',
      type: 'button',
      text: 'I’m here to help you with this exercise. <br> Here are a few ideas for things you can ask me:',
      disableInput: false,
      reselectable: true,
      options: [
        {
          text: 'Give me a hint',
          value: 'Give me a hint',
          action: 'postback'
        },
        {
          text: 'Quiz me!',
          value: 'Quiz me!',
          action: 'postback'
        },
        {
          text: 'Try a similar example',
          value: 'Try a similar example ',
          action: 'postback'
        },
        {
          text: 'Key vocabulary',
          value: 'Key vocabulary',
          action: 'postback'
        },
        {
          text: 'Translate to Korean',
          value: 'Translate to Korean',
          action: 'postback'
        },
      ],
    }]]

    get q() {
        return questionState.item
    }

    get e() {
        return explanationState.item
    }
    
    get answerIndex() {
        return this.answer2Index[this.q.answer]
    }

    get correct() {
        return this.answerIndex === this.userChoiceIndex
    }

    get n_question() {
        return OMRState.n_question
    }

    get isLastQuestion() {
        return OMRState.n_question === Number(this.$route.params.id)
    }

    check() {
        explanationState.get({ id: this.q._id })
        OMRState.update({
            index: Number(this.$route.params.id) - 1, 
            correct: this.correct
        })
        this.checked = true
    }

    next() {
        const nextId = Number(this.$route.params.id) + 1

        if (!this.isLastQuestion) {
            this.$router.push(`/question/${nextId}`)
        } else {
            this.$router.push(`/question/finish`)
        }
    }
}
</script>

<style lang="scss">
#quiz {
    gap: 32px;

    h1 {
        font-family: 'Inter';
        font-weight: 600;
        margin-top: 32px;
        font-size: 1.5rem;
    }
}

.page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 18px;
    
    width: 1376px;
    min-height: 632px;

    .page-item {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 64px;
        gap: 32px;
        
        width: 679px;
        height: 632px;
        overflow-y: scroll;
        
        background: #FFFFFF;
        
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    }

    &.checked .page-item {
        padding: 32px;

        #answer-info {
            color: #5B5C61;
            font-size: 0.75rem;

            i.tag {
                width: 12px;
                height: 12px;
                padding: 0;
                margin-right: 0.5rem;
    
                &.is-light {
                    width: 40px;
                }
            }
        }
        

    }
}

#question {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;

    color: #000000;

    i.has-text-danger {
        font-size: 1.5rem;
        margin: 0 2.5rem 0 0.5rem;
    }
}

#choices {
    gap: 32px;

    .b-radio {
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

#choices-checked {
    gap: 16px;

    .choice {
        border-radius: 0.25rem;
    }

    .tag {
        span {
            position: relative;
            right: 2px;
        }

        &:not(.is-success, .is-danger) {
            color: black
        }
    }
}


#explanation {
    font-weight: 500;

    .subtitle {
        font-size: 1rem;
    }
}

#article {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
}

.checked #article {
    font-size: 16px;
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