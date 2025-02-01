
import {
  Box,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes"
import { Account } from "../accounts/Account"

interface MessageItemProps {
  messageId: string
  account: Account
  navigateToSend: boolean
}


export const MessageItem: FC<MessageItemProps> = ({
  messageId,
  account,
  navigateToSend,
}) => {
  const navigate = useNavigate()

  return (
    <Box
      onClick={() => {
        navigate(routes.messageThread(messageId), {
          state: { account, navigateToSend },
        })
      }}
    >
      <Flex justify="space-between" align="center" w="full">
        <Text fontSize="md">Message {messageId}</Text>
        <Text fontSize="sm" color="gray.500">
          {new Date().toLocaleDateString()}
        </Text>
      </Flex>
    </Box>
  )
}