export interface RegisterResponseInterface {
  responseCode: number
  responseMessage: string
  responseStatus: string
}

export interface ShowToastInterface {
  title: string
  status: 'error' | 'success'
}
