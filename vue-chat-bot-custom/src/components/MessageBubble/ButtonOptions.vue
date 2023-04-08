<template lang="pug">
.qkb-msg-bubble-component.qkb-msg-bubble-component--button-options
  .qkb-msg-bubble-component__text(v-if="mainData.type === 'text'") {{ mainData.text }}
  .qkb-msg-bubble-component__text(v-if="['html', 'button'].includes(mainData.type)" v-html="mainData.text")
  .qkb-msg-bubble-component__options-wrapper.qkb-msg-bubble-component__options__multiple-choice(v-if="mainData.options_multiple_choice")
    .qkb-mb-button-options__item(
      v-for="(item, index) in mainData.options_multiple_choice",
      :key="index"
    )
      button.qkb-mb-button-options__btn(
        :disabled="disabled",
        :class="{ active: !loading && selectedItemMultiple.has(item) }",
        @click="selectOptionMultiple(item)",
      )
        span {{ item.text }}
  .qkb-msg-bubble-component__options-wrapper
    .qkb-mb-button-options__item(
      v-for="(item, index) in mainData.options",
      :key="index"
    )
      button.qkb-mb-button-options__btn(
        v-if="item.action === 'postback'",
        :disabled="disabled || (mainData.options_multiple_choice && selectedItemMultiple.size === 0)"
        :class="{ active: selectedItem === item }",
        @click="selectOption(item)"
      )
        span {{ item.text }}
      a.qkb-mb-button-options__btn.qkb-mb-button-options__url(
        v-else-if="disabled || (mainData.options_multiple_choice && selectedItemMultiple.size === 0)",
        target="_blank",
        class="disabled"
      )
        span {{ item.text }}
      a.qkb-mb-button-options__btn.qkb-mb-button-options__url(
        v-else,
        target="_blank",
        :href="item.value"
      )
        span {{ item.text }}
</template>
<script>
import EventBus from '../../helpers/event-bus'

export default {
  props: {
    mainData: {
      type: Object
    }
  },

  data () {
    return {
      selectedItem: null,
      selectedItemMultiple: new Set(),
      loading: false,
    }
  },

  computed: {
    disabled() {
      return this.selectedItem !== null && !this.mainData.reselectable
    }
  },

  methods: {
    selectOption (value) {
      this.selectedItem = value

      if (this.mainData.options_multiple_choice) {
        this.selectedItem.value = Array.from(this.selectedItemMultiple).map((item => item.value))
        EventBus.$emit('select-button-option', {
          ...this.selectedItem, 
          text: this.selectedItem.value.join(', ')
        })
      } else {
        EventBus.$emit('select-button-option', value)
      }
    },
    selectOptionMultiple (value) {
      if (!this.selectedItemMultiple.has(value)) {
        this.selectedItemMultiple.add(value)
      } else {
        this.selectedItemMultiple.delete(value)
      }
      this.loading = true
      this.loading = false
    }
  }
}
</script>
