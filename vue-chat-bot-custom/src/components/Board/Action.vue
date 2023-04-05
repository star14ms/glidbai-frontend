<template lang="pug">
.qkb-board-action(
  :class="actionClass"
)
  .qkb-board-action__wrapper
    .qkb-board-action__msg-box
      input.qkb-board-action__input(
        type="text",
        v-model="messageText",
        ref="qkbMessageInput",
        :disabled="inputDisable",
        :placeholder="inputPlaceholder",
        @keydown.enter="sendMessage",
      )
      .qkb-board-action__disable-text(
        v-if="inputDisablePlaceholder && inputDisable"
      )
        span {{ inputDisablePlaceholder }}
    .qkb-board-action__extra
      slot(name="actions")
      button.qkb-action-item.qkb-action-item--send(@click="sendMessage")
        slot(name="sendButton")
          img.qkb-action-icon.qkb-action-icon--send(:src="iconSendSrc")
</template>
<script>
export default {
  props: {
    inputPlaceholder: {
      type: String
    },

    inputDisablePlaceholder: {
      type: String
    },

    inputDisable: {
      type: Boolean,
      default: false
    },

    iconSendSrc: {
      type: String,
      default: '/icons/send.svg'
    },
  },

  data () {
    return {
      messageText: null
    }
  },

  computed: {
    actionClass () {
      const actionClasses = []

      if (this.inputDisable) {
        actionClasses.push('qkb-board-action--disabled')
      }

      if (this.messageText) {
        actionClasses.push('qkb-board-aciton--typing')
      }

      // TODO: sending

      return actionClasses
    }
  },

  mounted () {
    this.$refs.qkbMessageInput.focus()
  },

  methods: {
    sendMessage () {
      if (this.messageText) {
        this.$emit('msg-send', { text: this.messageText })
        this.messageText = null
      }
    }
  }
}
</script>
