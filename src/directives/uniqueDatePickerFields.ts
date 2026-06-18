import type { Directive, DirectiveBinding } from 'vue'

type DatePickerFieldOptions = {
  id: string
  name: string
  autocomplete?: string
}

const applyUniqueFieldAttributes = (
  element: HTMLElement,
  binding: DirectiveBinding<DatePickerFieldOptions>,
) => {
  const options = binding.value
  const variants = ['desktop', 'mobile'] as const

  variants.forEach((variant) => {
    const container = element.querySelector<HTMLElement>(`.${variant}`)
    const input = container?.querySelector<HTMLInputElement>('input')
    const label = container?.querySelector<HTMLLabelElement>('label.form-label')

    if (!input || !label) return

    const fieldId = `${options.id}-${variant}`
    input.id = fieldId
    input.name = `${options.name}-${variant}`
    input.setAttribute('autocomplete', options.autocomplete ?? 'off')
    label.htmlFor = fieldId
  })
}

export const uniqueDatePickerFields: Directive<HTMLElement, DatePickerFieldOptions> = {
  beforeMount: applyUniqueFieldAttributes,
  mounted: applyUniqueFieldAttributes,
  updated: applyUniqueFieldAttributes,
}
