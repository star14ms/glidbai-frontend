<template>
  <div id="chatbot">
    <client-only placeholder="loading...">
      <VueChatBot
        :options="botOptions"
        :messages="messageData"
        :bot-typing="botTyping"
        :input-disable="inputDisable"
        :is-open="isOpen"
        @init="botStart"
        @msg-send="msgSend"
      >
        <template v-slot:header>
          <div class="row-j-start">
            <img
              src="~/assets/icons/pinata.png"
              alt="Buefy"
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
import { messageService } from '~/helpers/message'

export default {
  components: {
    BotIcon,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      messageData: [],
      botTyping: false,
      inputDisable: false,
      botOptions: {
        botTitle: 'Glide',
        colorScheme: '#fff',
        textColor: '#000',
        bubbleBtnSize: 60,
        boardContentBg: '#F9FAFB',
        botAvatarSize: 40,
        botAvatarImg: BotIcon,
        msgBubbleBgBot: '#fff',
        msgBubbleBgUser: '#EFF6FF',
        msgBubbleColorUser: '#000',
        inputPlaceholder: 'Send Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: 'Hit the buttons above to respond'
      },
    }
  },

  mounted() {
    // const header = document.querySelector('.qkb-board-header')
    // console.log(header)
    // const icon = document.createElement('img', { src: BotIcon })
    // icon.insertBefore(header.parentNode)

    this.messageSound = new Audio('/audios/bubble.mp3')
    this.messageSound.volume = 0.7
  },

  methods: {
    botStart() {
      // Get token if you want to build a private bot
      // Request first message here

      // Fake typing for the first message
      this.botTyping = true
      setTimeout(() => {
        this.botTyping = false
        this.messageData.push({
          agent: 'bot',
          type: 'button',
          text: 'Select the option below',
          disableInput: true,
          options: [
            {
              text: 'Give me a hint',
              value: 'https://google.com',
              action: 'url'
            },
            {
              text: 'Quiz me!',
              value: 'submit_ticket',
              action: 'postback' // Request to API
            },
            {
              text: 'Try a similar example',
              value: 'Try a similar example ',
              action: 'postback'
            },
            {
              text: 'Key vocabulary',
              value: 'https://google.com',
              action: 'postback'
            },
            {
              text: 'Translate to Korean',
              value: 'https://google.com',
              action: 'postback'
            },
          ],
        })
      }, 1000)
    },

    msgSend(value) {
      // Push the user's message to board
      this.messageData.push({
        agent: 'user',
        type: 'text',
        text: value.text
      })

      this.getResponse()
    },

    // Submit the message from user to bot API, then get the response from Bot
    getResponse() {
      // Loading
      this.botTyping = true

      // Post the message from user here
      // Then get the response as below

      // Create new message from fake data
      messageService.createMessage()
        .then((response) => {
          const replyMessage = {
            agent: 'bot',
            ...response
          }

          this.inputDisable = response.disableInput
          this.messageData.push(replyMessage)
          this.messageSound.play()

          // finish
          this.botTyping = false
        })
    }
  }
}
</script>

<style lang="scss">


#chatbot {
  position: absolute;

  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.qkb-msg-avatar {
  border-radius: 0 !important;
}

.qkb-board {
  width: 440px !important;
  height: 594px !important;

  .qkb-board-header {
    height: 64px;
  }


  
  .qkb-board-content::-webkit-scrollbar {
    width: 0px;
  }
}

.qkb-msg-bubble--bot .qkb-msg-bubble-component__text {
  border: 1px solid #D1D5DB;
  border-radius: 12px;
}

.qkb-msg-bubble--user .qkb-msg-bubble-component__text {
  border: 1px solid #93C5FD;
  border-radius: 12px;
}

.qkb-msg-bubble-component__text {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 12px;
}


.qkb-msg-bubble-component {
  .qkb-msg-bubble-component__options-wrapper {
    // flex-direction: column;
    // flex-wrap: unset;
  }
}

.qkb-mb-button-options__btn {
  background-color: #EFF6FF;
  color: #3B82F6 !important;

  border: 1px solid #93C5FD !important;
  border-radius: 20px;

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    background-color: #3B82F6 !important;
    color: white !important;
  }
}

// .qkb-board-action__extra {
//   padding: 6px;
//   width: 36px;
//   height: 36px;
  
//   background: #93C5FD;
  
//   border: 1px solid #93C5FD;
//   border-radius: 6px;
// }
</style>
