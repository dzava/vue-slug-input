<template>
    <input :type="type" v-model.lazy="slug" v-if="slugUserInput">
    <input :type="type" v-model="slug" v-else>
</template>

<script>
    import slugFunc from '../slugify'

    export default {
        props: {
            resetWhenEmpty: {
                type: Boolean,
                default: false,
            },
            slugify: {
                type: Function,
                default: slugFunc,
            },
            slugUserInput: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'text',
            },
            value: {
                type: String,
                required: false,
                default: '',
            },
        },
        data() {
            return {
                touchedSlug: null,
            }
        },
        computed: {
            isTouched() {
                return this.touchedSlug !== null
            },
            slug: {
                set(value) {
                    if (value === '' && this.resetWhenEmpty) {
                        value = null
                    }

                    this.touchedSlug = value
                },
                get() {
                    let slug = this.touchedSlug

                    if (!this.isTouched) {
                        slug = this.slugify(this.value)
                    } else if (this.slugUserInput) {
                        slug = this.slugify(slug)
                    }

                    this.$emit('change', slug)

                    return slug
                },
            },
        },
        methods: {
            reset() {
                this.touchedSlug = null
            },
        },
    }
</script>
