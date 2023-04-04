<template>
    <div id="index" class="has-background-light2">
        <slide-y-down-transition>
            <div id="title" v-show="transition.after_1000">
              <h1>Welcome to ChatBot</h1>
              <h2 class="mt-2 mb-5">Your personalised AI-powered chatbot</h2>
            </div>
        </slide-y-down-transition>
        <ChatBot :is-open="true" :is-drop-menu="false" :start-message-delay="1500" :scenario="scenario" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    // middleware: 'login'
    layout: 'bg-gray',
})
export default class Page extends Vue {
    transition = {
        after_1000: false,
    }

    scenario = [
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
              value: 'submit_ticket',
              action: 'postback'
            },
            {
              text: 'No',
              value: 'submit_ticket',
              action: 'postback'
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
              value: '초급',
              action: 'postback'
            },
            {
              text: '중급',
              value: '중급',
              action: 'postback'
            },
            {
              text: '고급',
              value: '고급',
              action: 'postback'
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
              text: 'natural sciences',
              value: 'natural sciences',
              action: 'postback'
            },
            {
              text: 'social sciences',
              value: 'social sciences',
              action: 'postback'
            },
            {
              text: 'humanities',
              value: 'humanities',
              action: 'postback'
            },
            {
              text: 'business and economics',
              value: 'business and economics',
              action: 'postback'
            },
            {
              text: 'history',
              value: 'history',
              action: 'postback'
            },
            {
              text: 'arts',
              value: 'arts',
              action: 'postback'
            },
            {
              text: 'literature',
              value: 'literature',
              action: 'postback'
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
        },
        {
          agent: 'bot',
          type: 'button',
          text: '자 준비가 되셨으면 시작해볼까요? 🚀',
          disableInput: true,
          options: [
            {
              text: 'Let’s Start!',
              value: {
                'type': 'redirect',
                'to': '/question/0',
              },
              action: 'postback'
            },
          ],
        },
      ]
    ]

    mounted() {
        window.onload = () => {
            // this.insertTitle()
        }
        this.setAnimationTimeout()
    }

    setAnimationTimeout() {
        setTimeout(() => {
            this.transition.after_1000 = true
        }, 1000)
    }

    insertTitle() {
        const chatBox = document.querySelector('.qkb-board-content__bubbles')
        const title = document.createElement('h1')
        title.innerText = 'Welcome to ChatBot'
        const subtitle = document.createElement('h2')
        subtitle.classList.add('mt-2', 'mb-5')
        subtitle.innerText = 'Your personalised AI-powered chatbot'

        const titleDiv = document.createElement('div')
        titleDiv.style.display = 'none'
        titleDiv.appendChild(title)
        titleDiv.appendChild(subtitle)
        const animationElement = document.createElement('slide-y-down-transition')
        animationElement.appendChild(titleDiv)

        if (chatBox !== null && chatBox.parentNode !== null) {
            chatBox.parentNode.insertBefore(animationElement, chatBox)
            titleDiv.style.display = ''
        }
    }
}
</script>

<style lang="scss">
#title {
    margin-top: 60px;
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