import {mount} from '@vue/test-utils'
import Input from '../src/components/Input'

describe('Input', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Input, {
            propsData: {
                value: 'The title',
            },
        })
    })

    it('displays the slug', () => {
        expect(wrapper.element.value).toBe('the-title')

        wrapper.setProps({value: 'The updated title'})

        expect(wrapper.element.value).toBe('the-updated-title')
    })

    it('broadcasts the slug value', () => {
        expect(wrapper.emitted().change[0]).toEqual(['the-title'])
    })

    it('broadcasts the new slug value when the prop changes', () => {
        wrapper.setProps({value: 'The updated title'})

        expect(wrapper.emitted().change[1]).toEqual(['the-updated-title'])
    })

    it('broadcasts the new slug value when it is touched by the user', () => {
        typeSlug('the-title-changed')

        expect(wrapper.emitted().change[1]).toEqual(['the-title-changed'])
    })

    it('does not change the slug when the prop updates if it has been touched by the user', () => {
        typeSlug('does-not-matter')

        wrapper.setProps({value: 'Some title'})

        expect(wrapper.emitted().change).toHaveLength(2)
        expect(wrapper.vm.slug).toEqual('does-not-matter')
    })

    it('can be instructed to listen for prop changes after touched by the user', () => {
        typeSlug('does-not-matter')

        wrapper.vm.reset()
        wrapper.setProps({value: 'Some title'})

        expect(wrapper.emitted().change).toHaveLength(4)
        expect(wrapper.element.value).toEqual('some-title')
    })

    it('can be configured to listen for prop changes after touched by the user and the input is empty', () => {
        typeSlug('title')
        wrapper.setProps({value: 'Some title'})
        expect(wrapper.element.value).toEqual('title')
        typeSlug('')
        wrapper.setProps({value: 'Other title'})
        expect(wrapper.element.value).toEqual('')

        wrapper.setProps({resetWhenEmpty: true})

        expect(wrapper.element.value).toEqual('')
        typeSlug('')
        wrapper.setProps({value: 'Other title'})
        expect(wrapper.element.value).toEqual('other-title')
    })

    it('does not slug the user input', () => {
        typeSlug('My slug')

        expect(wrapper.emitted().change[1]).toEqual(['My slug'])
        expect(wrapper.element.value).toEqual('My slug')
    })

    it('can be configured to slug the user input', () => {
        typeSlug('My slug')
        expect(wrapper.element.value).toEqual('My slug')

        wrapper.setProps({slugUserInput: true})

        expect(wrapper.element.value).toEqual('my-slug')

        typeSlug('Slug from user', 'change')
        expect(wrapper.element.value).toEqual('slug-from-user')
    })

    it('accepts a custom function to generate slugs', () => {
        wrapper = mount(Input, {
            propsData: {
                value: 'The title',
                slugify: (val) => 'custom-slug',
            },
        })
        expect(wrapper.emitted().change[0]).toEqual(['custom-slug'])

        wrapper.setProps({value: 'awesome'})
        expect(wrapper.emitted().change[1]).toEqual(['custom-slug'])

        typeSlug('title')
        expect(wrapper.emitted().change[2]).toEqual(['title'])
    })

    function typeSlug(slug, event = 'input') {
        wrapper.element.value = slug
        wrapper.trigger(event)
    }
})
