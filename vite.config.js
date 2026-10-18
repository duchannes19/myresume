import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { imagetools } from 'vite-imagetools'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'
import { Buffer } from 'node:buffer'

const PERFORMANCE_BUDGET_BYTES = {
  js: 280 * 1024,
  css: 120 * 1024,
}

const performanceBudgetPlugin = (budget = PERFORMANCE_BUDGET_BYTES) => ({
  name: 'vite-performance-budget',
  generateBundle(_, bundle) {
    for (const [fileName, output] of Object.entries(bundle)) {
      if (output.type === 'chunk') {
        const chunkSize = Buffer.byteLength(output.code, 'utf8')
        if (chunkSize > budget.js) {
          this.warn(
            `JavaScript budget exceeded: ${fileName} → ${(chunkSize / 1024).toFixed(1)} KiB (limit ${(budget.js / 1024).toFixed(0)} KiB)`,
          )
        }
      }

      if (output.type === 'asset' && typeof output.source === 'string' && fileName.endsWith('.css')) {
        const assetSize = Buffer.byteLength(output.source, 'utf8')
        if (assetSize > budget.css) {
          this.warn(
            `CSS budget exceeded: ${fileName} → ${(assetSize / 1024).toFixed(1)} KiB (limit ${(budget.css / 1024).toFixed(0)} KiB)`,
          )
        }
      }
    }
  },
})

export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze'

  return {
    plugins: [
      react({
        babel: false,
        jsxImportSource: 'react',
      }),
      imagetools({
        defaultDirectives: (url) => {
          if (url.searchParams.has('raw')) return new URLSearchParams()
          const ext = url.pathname.split('.').pop()?.toLowerCase()
          if (ext === 'gif') {
            return new URLSearchParams()
          }
          const asParam = url.searchParams.get('as')
          const shouldAddFormats = !asParam || asParam === 'img' || asParam === 'picture'

          if (!shouldAddFormats) {
            return new URLSearchParams()
          }

          return new URLSearchParams({ format: 'avif;webp;png' })
        },
      }),
      performanceBudgetPlugin(),
      isAnalyze &&
        visualizer({
          filename: 'dist/bundle-analyze.html',
          template: 'treemap',
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: ['chrome90', 'firefox90', 'safari15'],
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      sourcemap: mode !== 'production',
      modulePreload: {
        polyfill: false,
      },
      assetsInlineLimit: 2048,
      chunkSizeWarningLimit: 450,
      rolldownOptions: {
        output: {
          // Stable vendor chunks for long-term caching; everything else (e.g. libs
          // only used by lazy sections) is left to automatic splitting.
          codeSplitting: {
            groups: [
              { name: 'vendor-particles', test: /node_modules[\\/]@tsparticles[\\/]/, priority: 3 },
              { name: 'vendor-i18n', test: /node_modules[\\/](i18next|react-i18next)[\\/]/, priority: 2 },
              { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/, priority: 1 },
            ],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (!name) return 'assets/[hash][extname]'
            const sanitized = name.split('/').pop()
            if (sanitized && sanitized.match(/\.css$/)) return 'assets/css/[name]-[hash][extname]'
            if (sanitized && sanitized.match(/\.(png|jpe?g|gif|svg|webp|avif)$/)) return 'assets/images/[name]-[hash][extname]'
            if (sanitized && sanitized.match(/\.(woff2?|ttf|otf)$/)) return 'assets/fonts/[name]-[hash][extname]'
            return 'assets/misc/[name]-[hash][extname]'
          },
        },
      },
      reportCompressedSize: false,
      manifest: false,
    },
    optimizeDeps: {
      entries: ['./src/main.jsx'],
    },
    server: {
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  }
})
