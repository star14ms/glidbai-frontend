<template>
  <div id="chatbot" :class="{ 'not-drop-menu': !isDropMenu }">
    <client-only placeholder="loading...">
      <VueChatBot
        :options="botOptions"
        :messages="messageData"
        :bot-typing="botTyping"
        :input-disable="inputDisable || botTyping"
        :is-open="isOpen"
        :clear-button="clearButton"
        @init="botStart"
        @msg-send="msgSend"
        @msg-clear="msgClear"
        @open="changeOpenState(true)"
        @destroy="changeOpenState(false)"
      >
        <template v-slot:header>
          <div class="is-flex">
            <img
              src="~/assets/icons/pinata.png"
              width="32"
              height="32"
            >
            <img class="ml-3" src="~/assets/icons/title/glide-28.svg" />
          </div>
        </template>
      </VueChatBot>
    </client-only>
  </div>
</template>

<script>
import BotIcon from '~/assets/icons/pinata.png'
import userIcon from '~/assets/icons/user.svg'

export default {
  components: {
    BotIcon,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isDropMenu: {
      type: Boolean,
      default: true,
    },
    startMessageDelay: {
      type: Number,
      default: 0,
    },
    scenario: {
      type: Array[Array[Object]],
      default: () => [],
    },
    questionId: {
      type: String | null,
      default: null,
    },
    clearButton: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      botTyping: false,
      inputDisable: this.scenario.length === 0 ? false : true,
      botOptions: {
        botTitle: 'Glide',
        colorScheme: '#fff',
        textColor: '#000',
        bubbleBtnSize: 60,
        boardContentBg: this.isDropMenu ? '#F9FAFB' : '#F3F4F6',
        botAvatarSize: 40,
        botAvatarImg: BotIcon,
        userAvatarSize: 40,
        userAvatarImg: userIcon,
        msgBubbleBgBot: '#fff',
        msgBubbleBgUser: '#EFF6FF',
        msgBubbleColorUser: '#000',
        inputPlaceholder: 'Send Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: 'Hit the buttons above to respond',
        iconSendSrc: '/icons/send-white.svg',
        iconBubbleSrc: '/icons/bubble.svg',
        iconCloseSrc: '/icons/close.svg',
      },
      scenarioIndex: 0,
      MessageUnrelated: '저는 당신의 영어 실력을 향상시키기 위해 도와주는 글라이디입니다! 당신의 학습에 도움이 되는 질문이라면 모두 답변해 드릴 수 있으니, 문제와 관련된 질문을 작성해주세요 😊'
    }
  },

  computed: {
    messageData() {
      return this.$store.state.bot.messageData
    }
  },

  beforeMount() {
    this.messageSound = new Audio('/audios/bubble.mp3')
    this.messageSound.volume = 0.7
  },

  watch: {
    scenario() {
      this.startScenario()
    }
  },

  methods: {
    botStart() {
      this.startScenario()
    },

    startScenario() {
      this.scenarioIndex = 0
      if (this.scenario.length > 0) {
        setTimeout(() => {
          this.nextScenario()
        }, this.startMessageDelay)
      }
    },

    nextScenario() {
      if (this.scenarioIndex > this.scenario.length-1) {
        this.toast('다음 시나리오가 없습니다.')
        return
      }

      for (let i=0; i<this.scenario[this.scenarioIndex].length; i++) {
        this.botTyping = true
        setTimeout(() => {
          this.$store.commit('bot/AddMessageData', this.scenario[this.scenarioIndex][i])

          if (this.isOpen) {
            this.messageSound.muted = true
            this.messageSound.play()
            this.messageSound.muted = false
          }
          this.inputDisable = this.scenario[this.scenarioIndex][i].disableInput

          if (i === this.scenario[this.scenarioIndex].length-1) {
            if (!this.scenario[this.scenarioIndex][i].botTyping) {
              this.botTyping = false
            }
            this.scenarioIndex += 1
          }
        }, (i+1)*1500)
      }
    },

    msgSend(data) {
      if (data.to !== undefined) {
        return this.$router.push(data.to)
      } else if (data.emit !== undefined) {
        this.$emit(data.emit, { key: data.emit.slice(data.emit.indexOf(':')+1), value: data.value})
      }

      // Push the user's message to board
      this.$store.commit('bot/AddMessageData', {
        agent: 'user',
        type: 'text',
        text: data.text
      })

      if (this.scenarioIndex <= this.scenario.length-1) {
        this.nextScenario()
      } else {
        this.getResponse(data.text)
      }
    },

    msgClear() {
      this.$store.commit('bot/clearMessageData')
      this.startScenario()
    },

    // Submit the message from user to bot API, then get the response from Bot
    getResponse(text) {
      // Loading
      this.botTyping = true

      // Post the message from user here
      // Then get the response as below

      // Create new message from fake data
      this.$axios.post('/chat', { questionId: this.questionId, text: text })
        .then(response => {
          const replyMessage = {
            type: 'html',
            agent: 'bot',
            text: response.data.intend !== 'unrelated' ? 
              response.data.response.replaceAll(String.fromCharCode(10), "<br>") : this.MessageUnrelated,
          }
          this.$store.commit('bot/AddMessageData', replyMessage)
          this.messageSound.play()

          // finish
          this.botTyping = false
        })
    },

    changeOpenState(isOpen) {
      this.$store.commit('bot/ChangeIsOpen', isOpen)
    },
  }
}
</script>

<style lang="scss">

@import 'src/assets/styles/variables.scss';

#chatbot {
  position: absolute;

  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}


.qkb-board {
  width: 440px !important;
  height: 594px !important;

  background-color: #F3F4F6 !important;

  .qkb-board-header {
    height: 64px;
  }

  .qkb-board-content__bubbles {
    min-height: unset;
    padding: 1.25rem 1rem 1rem;
  }

  .qkb-msg-avatar {
    border-radius: 0 !important;
  }

  .qkb-msg-bubble.qkb-msg-bubble--bot .qkb-msg-bubble-component {
    margin-right: 0.5rem;
  }
  
  .qkb-board-content::-webkit-scrollbar {
    width: 0px;
  }
}
#chatbot.not-drop-menu .qkb-board {
  position: fixed;
  top: calc($header-height + 148px);
  left: 50%;
  transform: translateX(-50%);
  box-shadow: none;

  width: 1024px !important;
  height: calc(100vh - $header-height - 148px) !important;

  .qkb-board-header {
    display: none;
  }

  .qkb-board-content__bubbles {
    padding: 1.25rem 1.25rem 1rem;
  }
}

.qkb-board-header__close {
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.25rem;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}

#chatbot.not-drop-menu .qkb-bot-bubble {
  display: none;
}


.qkb-msg-bubble--bot .qkb-msg-bubble-component__text {
  border: 1px solid #D1D5DB;
}

.qkb-msg-bubble--user .qkb-msg-bubble-component__text {
  border: 1px solid #93C5FD;
}

.qkb-msg-bubble-component__text {
  display: inline-block;

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  border-radius: 12px !important;
}
#chatbot.not-drop-menu .qkb-msg-bubble-component__text {
  font-size: 16px;
  line-height: 24px;
}


.qkb-msg-bubble-component__options-wrapper {
  flex-direction: column;
}
#chatbot.not-drop-menu .qkb-msg-bubble-component__options-wrapper {
  flex-direction: unset;
}


.qkb-mb-button-options__btn {
  display: inline-flex !important;

  background-color: #EFF6FF;
  color: #3B82F6 !important;

  border: 1px solid #93C5FD !important;
  border-radius: 20px !important;

  font-weight: 500 !important;
  font-size: 16px !important;
  line-height: 24px;

  &:hover:not([disabled]) {
    background-color: #3B82F6 !important;
    color: white !important;
  }

  &:active:not([disabled]), &.active {
    background-color: #3B82F6 !important;
    color: white !important;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
}
#chatbot.not-drop-menu .qkb-mb-button-options__btn {
  width: 193px;
  height: 32px;

  display: flex;
  justify-content: center;

  border-radius: 8px !important;
}
#chatbot.not-drop-menu .qkb-msg-bubble-component__options__multiple-choice .qkb-mb-button-options__btn {
  width: unset;
  height: unset;
  padding: 0.5rem 1rem;
  border-radius: 20px !important;
}


.qkb-board-action {
  background-color: white;
}

#chatbot:not(.not-drop-menu) .qkb-board-action {
  background-color: #F9FAFB;
  height: 84px;
  border-top: 0;
  padding: 0 1.5rem 0;
  margin-bottom: 24px;

  .qkb-board-action__wrapper {
    background-color: transparent;
    flex-direction: column;

    .qkb-board-action__msg-box {
      width: 392px;
      height: 44px;
      padding: 0;
      background-image: linear-gradient(to right, #5EEFB4, #29CBFF, #0376FF, #0055FF);
      border-radius: 12px;
      
      display: flex;
      flex-grow: 0;
      justify-content: center;
      align-items: center;

      .qkb-board-action__input {
        width: 386px;
        height: 38px;
        padding: 0px 12px;
        background-color: white;
        border-radius: 10px;
      }
    }

    .qkb-board-action__extra {
      display: flex;
      justify-content: flex-end;
    
      margin-top: 0.25rem;

      .qkb-action-item {
        opacity: 1;
      }

      .qkb-action-item--send {
        width: 36px;
        height: 36px;
        
        border: 1px inset #93C5FD;
        border-radius: 6px;
        background-color: #3B82F6;

        &[disabled] {
          opacity: 0.5;
          cursor: default;
        }
      }
    
      .qkb-action-item--clear {
        width: 85px;
        height: 36px;
        
        border-radius: 6px;
        background: #E5E7EB;
        margin-right: 0.25rem;
      }
    }
  }
}
#chatbot.not-drop-menu .qkb-board-action {
  margin: 0 1.5rem 1.5rem;
  border-radius: 12px;

  .qkb-board-action__input {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    
    &::placeholder {
      color: #9CA3AF !important;
    }
  }
}
</style>
