<template>
    <div id="quiz" class="col-a-center">
        <h1>
            <client-only>
                <template v-if="isMyQuestion">
                    Question {{ Number(q_idx) }} of {{ n_question }}
                </template>
            </client-only>
        </h1>

        <div class="page" :class="{ 'checked': checked }">
            <div class="page-item col">
                <template v-if="!checked">
                    <div id="question">
                        {{ q.question }}
                    </div>
    
                    <div id="choices" class="col">
                        <div v-for="(choice, idx) in [q.choices.a, q.choices.b, q.choices.c, q.choices.d]" class="choice" :key="`choice_${idx}`">
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
                            <div v-for="(choice, idx) in [q.choices.a, q.choices.b, q.choices.c, q.choices.d]" class="space-between-a-unset" :key="`choice_checked_${idx}`">
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

                        <div v-html="q_explanation">
                        </div>
                    </div>
                </template>
            </div>

            <div id="article" class="page-item col">
                <template v-if="!checked">
                    <h2 id="subtopic">{{ q.subTopic }}</h2>
                    <p>{{ q.passage }}</p>
                    
                    <div class="w-100 row-j-center">
                        <h4 id="article-url" class="has-background-light2">
                            Do you wanna check out <a :href="q.url" target="_blank" class="underline">this article?</a>
                        </h4>
                    </div>
                </template>

                <template v-else>
                    <h2 id="subtopic">{{ q.subTopic }}</h2>
                    <p v-html="passageWithHighlight"></p>
                    
                    <div class="w-100 row-j-center">
                        <h4 id="article-url" class="has-background-light2">
                            Do you wanna check out <a :href="q.url" target="_blank" class="underline">this article?</a>
                        </h4>
                    </div>
                </template>
            </div>
        </div>

        <button v-show="!checked" id="btn-check" class="button is-primary" @click="check()" :disabled="userChoiceIndex === null">
            Check Answers
        </button>
        <button v-show="isMyQuestion && checked" id="btn-check" class="button is-primary" @click="next()">
            {{ !isLastQuestion ? 'Next' : 'See Result'}}
        </button>

        <ChatBot 
          :scenario="scenario" 
          :question-id="q._id" 
          :clear-button="true" 
          :is-open="q_idx === 1 ? true : isOpen"
          :store-message="isMyQuestion ? true : false"
          :rating-enable="true"
          />
    </div>
</template>

<script>
import { questionState, OMRState, userState, botState } from '../../../store'


export default {
    middleware: ['login', 'question/_id'],
    layout: 'bg-gray',

    async asyncData({ store, route }) {
        // await store.state.question.getNext({ onlyUnsolved: true })
        // await store.state.question.get({ id: store.state.question.nextItem.questionId })
        await questionState.get({ id: route.params.id })
    },

    data() {
        return {
            userChoiceIndex: null,
            checked: false,
            answer2Index: {'a': 0, 'b': 1, 'c': 2, 'd': 3},
            index2Answer: {0: 'A', 1: 'B', 2: 'C', 3: 'D'},
            passageWithHighlight: '',
            choiceSymbols: {'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ'},
            scenario: [],
            q: null,
            q_explanation: null,
            answerIndex: null,
            correct: null,
            q_idx: null,
            isMyQuestion: null,
            isLastQuestion: null,
        
            startTextList: [
              '안녕하세요! <br> 당신의 영어 학습 도우미, 글라이디입니다 😊 <br> 문제 풀이 중 도움이 필요하시면 언제든지 채팅으로 편하게 질문해주세요. 아래 제공된 다양한 옵션 중 하나를 선택하여 사용해보는 것도 좋은 방법이에요. 기쁜 마음으로 도와드리겠습니다!',
              '1번 문제를 완료하셨군요! <br> 이제 2번 문제를 시작해봅시다. <br><br> 이해가 잘 되지 않거나 추가 설명이 필요하시면 <br> 언제든지 알려주세요. <br> 도와드리기 위해 여기 있어요! 😇',
              '2번 문제도 잘 해결하셨어요! <br> 이제 3번 문제로 넘어가봅시다. <br><br> 만약 어려움이 있거나 더 깊이 이해하고 싶으시면 언제든지 말씀해주세요. 항상 도와드리기 위해 기다리고 있어요! ',
              '3번 문제까지 모두 해결하셨군요! <br> 이제 2문제밖에 남지 않았어요. <br> 끝까지 완주해보아요 😊 <br><br> 문제를 풀다가 혹시나 헷갈리거나 추가적인 정보가 필요하시면 망설이지 말고 알려주세요!',
              '4번 문제도 성공적으로 마무리하셨네요! <br> 이제 마지막 문제가 남았어요. <br> 화이팅하시고 끝까지 잘 마무리 해봅시다! <br><br> 만약 도움이 필요하시면 언제든지 알려주세요. 함께 끝까지 힘을 합쳐 최선의 결과를 이끌어냅시다!',
            ],

        }
    },

    computed: {
        n_question() {
            return this.$store.state.OMR.n_question
        },
        isOpen() {
            return botState.isOpen
        },
    },

    async created() {
        this.scenario = [[{
          agent: 'bot',
          type: 'button',
          text: this.startTextList[this.isMyQuestion ? this.q_idx-1 : 0],
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
              value: '',
              action: 'url'
            },
            {
              text: 'Key vocabulary',
              value: 'Key vocabulary',
              action: 'postback'
            },
            {
              ...this.q_idx === 1 ? {
                text: 'Where this passage came from?',
                value: '',
                action: 'url'
              } : {
                text: 'Translate to Korean',
                value: 'Translate to Korean',
                action: 'postback'
              },
            }
          ],
        }]]

        this.q = await this.$axios.get(`/questions/${this.$route.params.id}`)
        this.q_explanation = this.q.explanation.replaceAll(String.fromCharCode(10), " <br><br> ")
        this.answerIndex = this.answer2Index[this.q.answer]
        this.correct = this.answerIndex === this.userChoiceIndex
        this.q_idx = userState.userCurriculum.findIndex(item => item.questionId === this.q._id) + 1
        this.isMyQuestion = this.q_idx !== 0
        this.isLastQuestion = this.$store.state.OMR.n_question === this.q_idx

        if (this.scenario[0][0].options && this.q_idx === 1) {
          this.scenario[0][0].options[4].value = this.q.url
        }

        const res2 = await this.$axios.post('/chat', { questionId: this.$route.params.id, text: 'Try a similar example' })
        if (this.scenario[0][0].options) {
          this.scenario[0][0].options[2].value = `/question/id/${res2.data.response}`
        }

        this.passageWithHighlight = this.q.passage.slice()
        for (const highlight of this.q.highlight) {
            this.passageWithHighlight = this.passageWithHighlight.replace(
                highlight.sentence, 
                `<span class="${highlight.correct ? 'green' : 'red'}">` 
                    + this.choiceSymbols[highlight.choice] + highlight.sentence + 
                '</span>'
            )
        }
        console.log(this.q._id)
        console.log(userState.userCurriculum.slice().map(item => item.questionId))
    },

    methods: {
        check() {
            userState.updateUserQuestion({ questionId: this.q._id, solved: true, correct: this.correct })
            OMRState.update({
                index: this.q_idx - 1, 
                correct: this.correct
            })
            this.checked = true
        },
        
        next() {
            if (!this.isLastQuestion) {
                const nextQuestionIdx = this.q_idx
                const nextId = userState.userCurriculum[nextQuestionIdx].questionId
                this.$router.push(`/question/id/${nextId}`)
            } else {
                this.$router.push(`/question/finish`)
            }
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

#question, #subtopic {
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

    #article-url {
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 2rem;

        a {
            color: #3B82F6 !important;

            &:hover {
                opacity: 0.7;
            }
        }
    }
}

.checked #article {
    font-size: 16px;

    span {
      &.green {
        background-color: #EAF7E4;
      }
      &.red {
        background-color: #F6DFDE;
      }
    }
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