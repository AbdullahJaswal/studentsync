import {UserType} from "@/types/user/user";

export type AuthSessionType = {
  access: string
  refresh: string
  user: UserType
  access_expiration?: number
}
