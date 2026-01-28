/** @type {import('tailwindcss').Config} */
module.exports = {
  // 手动切换暗黑模式
  darkMode: 'class',
  // tailwind应用
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 修改fontSize预设大小
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.45rem', '0.55rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      },

      // 阴影
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b'
      },
      height: {
        header: '72px',
        // 使用calc，运算符两边必须有空格
        main: 'calc(100vh - 72px)'
      },
      colors: {
        main: '#f44c58',
        'hover-main': '$f3283',
        // message成功色值
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        // message警告色值
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        // message错误色值
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      },
      variants: {
        scrollbar: ['dark']
      },
      backdropBlur: {
        '4xl': '240px'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
};
