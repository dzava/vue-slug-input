import {createLocalVue} from '@vue/test-utils'
import VueSlugInput from '../src'

describe('Plugin', () => {
    it('registers the component', () => {
        const localVue = createLocalVue()
        localVue.use(VueSlugInput)

        expect(localVue.options.components['slug-input']).toBeDefined()
    })

    it('registers the component with a custom slug function', () => {
        const localVue = createLocalVue()
        let slugger = jest.fn()

        localVue.use(VueSlugInput, slugger)

        expect(localVue.options.components['slug-input'].options.props.slugify.default).toBe(slugger)
    })
})
