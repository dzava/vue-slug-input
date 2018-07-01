import Input from './components/Input'
import slugify from './slugify'

export default {
    install(Vue, slugify) {
        if (slugify) {
            Input.props.slugify.default = slugify
        }

        Vue.component('slug-input', Input)
    },
}

export {
    slugify
}
