<template lang="pug">
#counter.qkb-bot-ui(
  :class="uiClasses"
)
  transition(name="qkb-fadeDown")
    .qkb-board(v-show="botActive")
      slot(name='content')
        Counter(
          @start="counting = true"
          @paused="counting = false"
          @finish="!botActive ? notification = true : {}; counting = false"
          @click:background="botActive = false"
        )
  .qkb-bot-bubble
    span.qkb-bubble-notification(v-if="notification")
    button.qkb-bubble-btn(
      @click="botToggle"
    )
      slot(name="bubbleButton")
        transition(name="qkb-scaleUp")
          .qkb-bubble-btn-icon(
            v-if="!botActive",
            :src="optionsMain.iconBubbleSrc"
            key="1"
          )
            font-awesome-icon(v-if="!notification && !counting" :icon="['fas', 'fa-hourglass-start']" size="2x")
            font-awesome-icon(v-else-if="!notification" :icon="['fas', 'fa-hourglass-half']" size="2x")
            font-awesome-icon(v-else :icon="['fas', 'fa-hourglass-end']" size="2x")
          //- img.qkb-bubble-btn-icon.qkb-bubble-btn-icon--close(
          //-   v-else,
          //-   :src="optionsMain.iconCloseSrc"
          //-   key="2"
          //- )
  AppStyle(:options="optionsMain")
  .qkb-preload-image
    .qkb-msg-avatar__img(v-if="optionsMain.botAvatarImg")
</template>
<script>
import AppStyle from '../../vue-chat-bot-custom/src/components/AppStyle'

export default {
  components: {
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
  },

  data () {
    return {
      botActive: false,
      notification: false,
      counting: false,
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

      if (this.botActive) {
        classes.push('is-open')
      }

      return classes
    }
  },

  watch: {
    botActive: {
      handler(value) {
        if (value) {
          this.notification = false
        }
      }
    }
  },

  created () {
    this.initBot()
  },

  methods: {
    initBot () {
      if (this.isOpen) {
        this.botActive = true
      }

      this.$emit('init')

      if (this.botActive) {
        this.$emit('open')
      } else {
        this.$emit('destroy')
      }
    },

    botToggle () {
      this.botActive = !this.botActive

      if (this.botActive) {
        this.$emit('open')
      } else {
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

<style lang="scss" scoped>

@import 'src/assets/styles/variables.scss';

#counter.is-open .qkb-bot-bubble {
  display: none !important;
}

#counter.qkb-bot-ui {
  bottom: unset !important;
  top: calc($header-height + 1.5rem);

  .qkb-board {
    width: 201px !important;
    height: unset !important;
    bottom: unset;
  
    padding: 1rem;
    background-color: white !important;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  }

  .qkb-bubble-btn {
    position: relative;

    .qkb-bubble-btn-icon {
      position: absolute;
      transform: translate(-50%, -50%);
      margin: 0 !important;
    }
  }
}

.qkb-bot-ui--animate {
  // FadeDown
  .qkb-fadeDown-enter-active,
  .qkb-fadeDown-leave-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: opacity .15s linear, transform .2s ease-out;
  }

  .qkb-fadeDown-enter,
  .qkb-fadeDown-leave-to {
    transform: translate(0, -20px);
    opacity: 0;
  }
}
</style>