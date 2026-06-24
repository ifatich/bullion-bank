declare module '*.vue' {
  import { defineComponent } from 'vue'

  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'html2pdf.js' {
  const html2pdf: () => {
    set: (options: Record<string, unknown>) => {
      from: (element: HTMLElement) => {
        save: () => Promise<void>
      }
    }
  }

  export default html2pdf
}
