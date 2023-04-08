<template lang="pug">
.qkb-msg-bubble(:class="bubbleClass")
  .qkb-msg-avatar(v-if="message.agent === 'bot' || showUserIcon")
    .qkb-msg-avatar__img &nbsp;
  .qkb-msg-content
    component(
      v-if="componentType",
      :is="componentType",
      :main-data="message"
    )
    .qkb-msg-feedback(v-if="message.agent === 'bot'")
      .qkb-msg-feedback__leave
        div(@click="$emit('leave:feedback')") Leave Feedback
      .qkb-msg-feedback__rate
        span Rate this response
        button.qkb-msg-feedback-btn--like.button(
          v-show="rating === true" @click="rate(true)"
        ) 👍
        button.qkb-msg-feedback-btn--unlike.button(
          v-show="rating === false" @click="rate(false)"
        ) 👎
  .qkb-msg-bubble__time(v-if="message.createdAt")
    | {{ message.createdAt }}
</template>
<script>
import SingleText from './SingleText'
import ButtonOptions from './ButtonOptions'

export default {
  components: {
    SingleText,
    ButtonOptions
  },

  props: {
    message: {
      type: Object
    },

    showUserIcon: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    bubbleClass () {
      return this.message.agent === 'bot'
        ? 'qkb-msg-bubble--bot'
        : 'qkb-msg-bubble--user'
    },

    // Define the message type and return the specific component
    componentType () {
      let type = ''

      switch (this.message.type) {
        case 'button':
          type = 'ButtonOptions'
          break
        default:
          type = 'SingleText'
      }

      return type
    }
  },

  data() {
    return {
      rating: null,
    }
  },

  methods: {
    rate(like) {
      if (this.rating === like) {
        this.rating = null
      } else {
        this.rating = like
      }
    }
  }
}
</script>

<style>
.qkb-msg-bubble--user {
  flex-direction: row-reverse
}
</style>
