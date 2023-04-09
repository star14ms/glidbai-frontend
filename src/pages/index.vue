<template>
    <div id="index" class="has-background-light2">
        <slide-y-down-transition>
            <div id="title" :class="{ 'moved': transition.after_2000 }" v-show="transition.after_1000">
                <h1>Welcome to <img src="~/assets/icons/title/glide-30.svg" />!</h1>
                <h2 class="mt-2">Your personalized AI Tutor for TOEFL</h2>
            </div>
        </slide-y-down-transition>

        <ChatBot  
          v-show="transition.after_3500"
          :is-open="true" 
          :is-drop-menu="false" 
          :start-message-delay="3500" 
          :scenario="scenario" 
          @update:newbie="updateForm"
          @update:difficulty="updateForm"
          @update:topics="updateForm"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CreateCurriculumForm } from '../shared/user'
import { Scenario } from '../shared/vue-chat-bot'
import { userState, botState } from '../store'


@Component({
    middleware: 'login',
    layout: 'bg-gray',
})
export default class Page extends Vue {
    createCurriculumForm: CreateCurriculumForm = {}

    transition = {
        after_1000: false,
        after_2000: false,
        after_3500: false,
    }

    scenario: Scenario = [
      [
        {
          agent: 'bot',
          type: 'text',
          text: '안녕하세요! 당신의 토플 교육을 도와줄 글라이디입니다 :)',
          disableInput: true,
        },
        {
          agent: 'bot',
          type: 'text',
          text: '오늘은 Reading 부분부터 수업을 진행할 예정입니다. 맞춤형 커리큘럼을 제작하기 위해 몇 가지 질문을 드리겠습니다!',
          disableInput: true,
        },
        {
          agent: 'bot',
          type: 'button',
          text: '처음 토플 공부인가요?',
          disableInput: true,
          options: [
            {
              text: 'Yes',
              value: true,
              action: 'postback',
              emit: 'update:newbie',
            },
            {
              text: 'No',
              value: false,
              action: 'postback',
              emit: 'update:newbie',
            },
          ],
        },
      ],
      [
        {
          agent: 'bot',
          type: 'button',
          text: '당신의 영어 실력은 어느 수준인가요?',
          disableInput: true,
          options: [
            {
              text: '초급',
              value: 1,
              action: 'postback',
              emit: 'update:difficulty',
            },
            {
              text: '중급',
              value: 2,
              action: 'postback',
              emit: 'update:difficulty',
            },
            {
              text: '고급',
              value: 3,
              action: 'postback',
              emit: 'update:difficulty',
            },
          ],
        },
      ],
      [
        {
          agent: 'bot',
          type: 'button',
          text: '어떤 분야의 글을 읽는 것이 가장 어렵나요?',
          disableInput: true,
          options: [
            {
              text: '제출하기',
              value: null,
              action: 'postback',
              emit: 'update:topics',
            },
          ],
          options_multiple_choice: [
            {
              text: 'science',
              value: 'science',
            },
            {
              text: 'history',
              value: 'history',
            },
            {
              text: 'economics',
              value: 'economics',
            },
            {
              text: 'literature',
              value: 'literature',
            },
          ]
        },
      ],
      [
        {
          agent: 'bot',
          type: 'text',
          text: '맞춤형 커리큘럼을 생성하고 있습니다. 잠시만 기다려주세요 😊',
          disableInput: true,
          botTyping: true,
        },
      ]
    ]

    scenario2: Scenario = [
      [
        {
          agent: 'bot',
          type: 'button',
          text: '자 준비가 되셨으면 시작해볼까요? 🚀',
          disableInput: true,
          options: [
            {
              text: 'Let’s Start!',
              value: null,
              action: 'postback',
              to: '',
            },
          ],
        },
      ],
    ]

    mounted() {
        this.setAnimationTimeout()
    }

    moveTitle() {
        const title = document.querySelector('#title')
        const chatBox = document.querySelector('.qkb-board-content__bubbles')
        if (title === null || chatBox === null || chatBox.parentNode === null) return
        chatBox.before(title)
        document.documentElement.style.setProperty("--bottop", '0px')
        document.documentElement.style.setProperty("--title-margin-bottom", '40px')
    }

    setAnimationTimeout() {
        setTimeout(() => {
            this.transition.after_1000 = true
        }, 1000)
        setTimeout(() => {
            this.transition.after_2000 = true
        }, 2000)
        setTimeout(() => {
            this.transition.after_3500 = true
            this.moveTitle()
        }, 3500)
    }

    updateForm({ key, value }: { key: string, value: any }) {
        this.createCurriculumForm[key] = value

        if (key === 'topics') {
          userState.createCurriculum(this.createCurriculumForm)
          botState.clearMessageData()
          setTimeout(() => {
            if (this.scenario2[0][0].options) {
              this.scenario2[0][0].options[0].to = 
                `/question/id/${userState.userCurriculum.length !== 0 ? userState.userCurriculum[0].questionId : 0}`
            }
            this.scenario = this.scenario2
          }, 2000)
        }
    }
}
</script>

<style lang="scss">
#title {
  font-family: 'Inter';
  margin-top: 225px;
  transition: 1.5s;

  &.moved {
    margin-top: 60px;
    margin-bottom: 0px;
    margin-bottom: var(--title-margin-bottom, 0px);
  }
}

#index h1 {
    text-align: center;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    
    color: #000000 !important;
}

#index h2 {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    
    color: #374151 !important;
}
</style>