import { Button, H4 } from "@argent/ui"
import { AddIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  Input,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import * as secp from "@noble/secp256k1"
import { utils } from "@noble/secp256k1"
import { FC, Suspense, useState } from "react"
import { MessageFigure } from "./MessageFigure"
import { CreateChatForm } from "./chatForm"
import { MessageItem } from "./MessageCollectionItem"
import { MessageCollectionsProps } from "./MessageCollections"

export const Messages: FC<MessageCollectionsProps> = ({
  account,
  navigateToSend = false,
}) => {
    const [messageIds, setMessageIds] = useState([
        "ID-1",
        "ID-2",
        "ID-3",
        "ID-4",
      ])
      const { isOpen, onToggle } = useDisclosure()
    
      const handleNewMessage = (newMessageId: string) => {
        setMessageIds(prev => [newMessageId, ...prev])
      }

  return (
    <>
      <Box p={4}>
        <Button
          colorScheme={"tertiary"}
          size="sm"
          leftIcon={<AddIcon />}
          onClick={onToggle}
          width="full"
          border="none"
        >
          {isOpen ? "Cancel" : "Create chat"}
        </Button>

        {isOpen && <CreateChatForm onMessageSent={handleNewMessage} />}
      </Box>

      {messageIds.length === 0 && (
        <Flex justify="center" align="center" minH="200px">
          <Text color="gray.500">No messages yet</Text>
        </Flex>
      )}

      {messageIds.length > 0 && (
        <VStack spacing={4} w="full" px={4}>
          {messageIds.map((messageId) => (
            <MessageFigure key={messageId}>
              <MessageItem
                key={messageId}
                messageId={messageId}
                account={account}
                navigateToSend={navigateToSend}
              />
            </MessageFigure>
          ))}
        </VStack>
      )}
    </>
  )
}