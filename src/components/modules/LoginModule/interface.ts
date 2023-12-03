import {
  BaseResponseInterface,
  UserInterface,
} from 'src/components/contexts/AuthContext/interface'

export interface LoginResponseInterface extends BaseResponseInterface {
  user: UserInterface
  token: string
}
