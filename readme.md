# vue-slug-input

A Vue.js component that transforms an input to a slug

# Demo

You can view a demo [here](https://dzava.github.io/vue-slug-input/)

## Installation

You can install the package via yarn:

```bash
yarn add vue-slug-input --dev
```

or npm:

```bash
npm install vue-slug-input --save-dev
```

Next you register the component,
```js
import SlugInput from 'vue-slug-input';

Vue.use(SlugInput);
```

you can also provide a function that will be used to transform the input.
```js
import SlugInput from 'vue-slug-input';

Vue.use(SlugInput, (value) => value.toLowerCase());
```


## Usage
```html
<slug-input value="The post title"></slug-input>
<slug-input :value="title"></slug-input>
```

You can retrieve the slug by listening for the `change` event.
```html
<slug-input :value="title" @change="val => slug = val"></slug-input>
```

When a user changes the slug field then any changes to the `value` prop are ignored until either the `reset` method is called on the component or if the `reset-when-empty` prop is true and the slug input is empty. By default text the user types in the slug input will not be passed through the slug function, you can override this behaviour by setting the `slug-user-input` prop, to true.
```html
<slug-input :value="title" slug-user-input></slug-input>
```

To override the slug function on a per component basis use the `slugify` prop. The function will receive one argument, the input value, and should return the slug version of this input.
```html
<slug-input :value="title" :slugify="myCustomSlugFunction"></slug-input>
```

### The Slug function

The default slug function is quite simple and only supports the ASCII and Greek alphabet. You can use the second parameter to the `slugify` export to provide a map from a character to ASCII. For example, to replace the character `&` with the word `and` you would register the plugin like this
```js
import SlugInput from 'vue-slug-input'
import {slugify} from 'vue-slug-input'

Vue.use(SlugInput, (val) => slugify(val, {'&': 'and'}))
```

**Note** that the replacement character must be an ASCII character or sequence of characters.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
