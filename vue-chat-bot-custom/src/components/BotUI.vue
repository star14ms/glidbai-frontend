<template lang="pug">
.qkb-bot-ui(
  :class="uiClasses"
)
  transition(name="qkb-fadeUp")
    .qkb-board(v-if="botActive")
      BoardHeader(
        :bot-title="optionsMain.botTitle",
        :icon-closs-erc="optionsMain.iconCloseHeaderSrc"
        @close-bot="botToggle"
      )
        template(v-slot:header)
          slot(name="header")
      BoardContent(
        :bot-typing="botTyping",
        :main-data="messages"
        :show-user-icon="optionsMain.userAvatarImg !== null"
        :rating-enable="ratingEnable"
      )
      BoardAction(
        :input-disable="inputDisable",
        :input-placeholder="optionsMain.inputPlaceholder",
        :input-disable-placeholder="optionsMain.inputDisablePlaceholder",
        :icon-send-src="optionsMain.iconSendSrc"
        :clear-button="clearButton"
        @msg-send="sendMessage"
      )
  .qkb-bot-bubble
    button.qkb-bubble-btn(
      @click="botToggle"
    )
      slot(name="bubbleButton")
        transition(name="qkb-scaleUp")
          img.qkb-bubble-btn-icon(
            v-if="!botActive",
            :src="optionsMain.iconBubbleSrc"
            key="1"
          )
          img.qkb-bubble-btn-icon.qkb-bubble-btn-icon--close(
            v-else,
            :src="optionsMain.iconCloseSrc"
            key="2"
          )
  AppStyle(:options="optionsMain")
  .qkb-preload-image
    .qkb-msg-avatar__img(v-if="optionsMain.botAvatarImg")
</template>
<script>
import EventBus from '../helpers/event-bus'
import BoardHeader from './Board/Header'
import BoardContent from './Board/Content'
import BoardAction from './Board/Action'
import AppStyle from './AppStyle'

export default {
  name: 'VueBotUI',

  components: {
    BoardHeader,
    BoardContent,
    BoardAction,
    AppStyle
  },

  props: {
    options: {
      type: Object,
      default: () => { return {} }
    },

    messages: {
      type: Array
    },

    botTyping: {
      type: Boolean,
      default: false
    },

    inputDisable: {
      type: Boolean,
      default: false
    },

    isOpen: {
      type: Boolean,
      default: false
    },

    clearButton: {
      type: Boolean,
      default: false
    },

    ratingEnable: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      botActive: false,
      defaultOptions: {
        botTitle: 'Chatbot',
        colorScheme: '#1b53d0',
        textColor: '#fff',
        bubbleBtnSize: 56,
        animation: true,
        boardContentBg: '#fff',
        botAvatarSize: 32,
        botAvatarImg: 'http://placehold.it/200x200',
        userAvatarSize: 32,
        userAvatarImg: null,
        msgBubbleBgBot: '#f0f0f0',
        msgBubbleColorBot: '#000',
        msgBubbleBgUser: '#4356e0',
        msgBubbleColorUser: '#fff',
        inputPlaceholder: 'Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: null,
        iconSendSrc: '/icons/send.svg',
        iconBubbleSrc: '/icons/bubble.svg',
        iconCloseSrc: '/icons/close.svg',
        iconCloseHeaderSrc: '/icons/arrow-down-invert.svg',
      }
    }
  },

  computed: {
    optionsMain () {
      return { ...this.defaultOptions, ...this.options }
    },

    // Add class to bot ui wrapper
    uiClasses () {
      let classes = []

      if (this.optionsMain.animation) {
        classes.push('qkb-bot-ui--animate')
      }

      return classes
    }
  },

  created () {
    this.initBot()
  },

  mounted () {
    EventBus.$on('select-button-option', this.selectOption)
  },

  beforeDestroy () {
    EventBus.$off('select-button-option')
  },

  methods: {
    initBot () {
      if (this.isOpen) {
        this.botActive = true
      }

      this.$emit('init')
    },

    botToggle () {
      this.botActive = !this.botActive

      if (this.botActive) {
        this.$emit('open')
      } else {
        // EventBus.$off('select-button-option')
        this.$emit('destroy')
      }
    },

    sendMessage (value) {
      this.$emit('msg-send', value)
    },

    selectOption (value) {
      this.$emit('msg-send', value)
    },

    clearChat() {
      this.$emit('msg-clear')
    }
  }
}
</script>

<style src="../assets/scss/_app.scss" lang="scss"></style>
