export interface CustomTextAreaInterface {
  label?: string
  placeholder?: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  value: string
}
