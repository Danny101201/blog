---
title: Blogging Like a Hacker
titleTemplate: Vite & Vue powered static site generator
lang: en-US,
---

:::info aaa
this is Info page
:::
:::warning bbb
this is Info page
:::
:::danger ccc
this is Info page
:::

:::details ddd
this is Info page
:::


```js:line-numbers {2,5}
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code  hl]
    }
  },
  aaa:{
    name:'danny' // [!code  hl]
  }
}
```


```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code  --]
      msg: 'Added' // [!code  ++]
    }
  }
}
```
### Import Code Snippets
<<< @/api-examples.md{2}