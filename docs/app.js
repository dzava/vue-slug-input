import Vue from 'vue'
import SlugInput from '../src'

Vue.use(SlugInput)

new Vue({
    el: '#app',
    data: {
        title1: 'The title',
        slug1: '',
        title2: 'The title',
        slug2: '',
        title3: 'The title',
        slug3: '',
        slug4: '',
        title5: 'The title',
        slug5: '',
        title6: 'The title',
        slug6: '',
        title7: 'The title',
        slug7: '',
    },
    methods: {
        customSlugger(value) {
            return '01'.repeat(value.length / 2)
        },
    },
})
