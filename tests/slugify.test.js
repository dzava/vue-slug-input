import slugify from '../src/slugify'

describe('Slugify', () => {
    it('creates the expected output', () => {
        [
            ['', ''],
            ['The tiTle', 'the-title'],
            ['The.tiTle', 'the-title'],
            ['Ό τίτλος', 'o-titlos'],
            [' The    tiTle ', 'the-title'],
            ['The----tiTle ----', 'the-title'],
        ].forEach(([value, expected]) => {
            expect(slugify(value)).toBe(expected)
        })
    })
})
