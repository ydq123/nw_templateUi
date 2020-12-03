<template>
    <div :class="classBtn">
      <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Button',
    display: 'Button按钮',
    data() {
        return {
            preCls: 'yw-btn',
        }
    },
    props: {
        isDisabled: Boolean,
        shape: {
            type: String,
            default: '',//'circle'圆角, 'rectangle'直角
        },
        type: {
            type: String,
            default: 'default',//['default',success', 'warning', 'error', 'info']
            validator(value) {
                let types = ['default','success', 'warning', 'error', 'info']
                return types.includes(value) || !value
            }
        },
        size: {
            type: String,
            default: '',//['large', 'medium', 'small']
        }
    },
    computed: {
        classBtn() {
          return 'nw_buttom_250_88 nw_bag_zt nw_f14'
        }
    },
    methods: {
        clickBtn(ev) {
            this.$emit('click', ev)
        },
    },
}
</script>
