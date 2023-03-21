import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Danny Blog",
  description: "A VitePress Site",
  outDir: 'dist',
  srcDir: 'src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'PostgreSQL', link: '/PostgreSQL' },
          { text: 'demo', link: '/demo' },
        ],
        collapsed: true
      },
      {
        text: 'Demo',
        items: [
          { text: 'foo', link: '/packages/foo' },
          { text: 'bar', link: '/packages/bar' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
