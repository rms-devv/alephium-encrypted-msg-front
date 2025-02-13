import {
  messageStream,
  sendMessage,
  waitForMessage,
} from "../../shared/messages"
import { IS_DEV } from "../../shared/utils/dev"

export const getMessagingPublicKey = async () => {
  sendMessage({ type: "ALPH_GET_MESSAGING_PUBLIC_KEY" })
  return waitForMessage("ALPH_GET_MESSAGING_PUBLIC_KEY_RES")
}

export const resetAll = () => {
  sendMessage({ type: "ALPH_RESET_ALL" })
}


