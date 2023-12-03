export interface HeaderSectionInterface {
  activeStep: number
}

export interface ButtonSectionInterface {
  activeStep: number
  onNext: () => void
  onPrev: () => void
  isDisabled: () => boolean
}
