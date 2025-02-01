import { BarBackButton, H4, H6, NavigationContainer, Input, Button } from "@argent/ui"
import { Box, Flex, Spinner as Loading, Text } from "@chakra-ui/react"
import { FC, Suspense } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Spinner } from "../../components/Spinner"
import { routes } from "../../routes"
import { useSelectedAccount } from "../accounts/accounts.state"
import { Account } from "../accounts/Account"

interface MockMessage {
  id: string
  content: string
  timestamp: number
  sender: string
  recipient: string
}

const mockMessages: Record<string, MockMessage> = {
  "ID-1": {
    id: "ID-1",
    content: "Hey! How are you?",
    timestamp: Date.now() - 86400000,
    sender: "0x123",
    recipient: "0x456",
  },
  "ID-2": {
    id: "ID-2",
    content: "Have you seen the latest updates?",
    timestamp: Date.now() - 3600000,
    sender: "0x789",
    recipient: "0x123",
  },
  "ID-3": {
    id: "ID-3",
    content: "The transaction is confirmed!",
    timestamp: Date.now() - 1800000, 
    sender: "0x456",
    recipient: "0x789",
  },
  "ID-4": {
    id: "ID-4",
    content: "Let's discuss the new proposal",
    timestamp: Date.now() - 300000, 
    sender: "0x123",
    recipient: "0x456",
  },
}

export const MessageThread: FC = () => {
  const { messageId } = useParams<{ messageId: string }>()
  const account = useSelectedAccount()
  const navigate = useNavigate()
  const message = messageId ? mockMessages[messageId] : null
  const error = null

  if (!messageId) {
    return <></>
  }

  if (error) {
    return (
      <NavigationContainer
        leftButton={
          <BarBackButton onClick={() => navigate(routes.accountMessages())} />
        }
      >
        <H4 mt="4" textAlign="center">
          Error loading messages
        </H4>
      </NavigationContainer>
    )
  }

  return (
      <NavigationContainer
        leftButton={
          <BarBackButton onClick={() => navigate(routes.accountMessages())} />
        }
        title={`Message from ${message?.sender.slice(0, 6)}...`}
      >
        <Box p={4} display="flex" flexDirection="column" height="calc(100vh - 150px)">
          <Flex justify="space-between" mb={4}>
            <Text fontSize="sm" color="gray.500">
              From: {message?.sender.slice(0, 6)}...
            </Text>
            <Text fontSize="sm" color="gray.500">
              {message?.timestamp
                ? new Date(message.timestamp).toLocaleString()
                : ""}
            </Text>
          </Flex>
    
          <Box flex={1} overflowY="auto">
            {/* Message existant */}
            <Box p={4} borderRadius="lg">
              {message ? <Text fontSize="md">{message.content}</Text> : <Spinner />}
            </Box>
    
            {/* Message en dur à droite */}
            <Flex justify="flex-end" w="full" mb={4} px={2}>
              <Box
                bg="blue.500"
                color="white"
                p={3}
                borderRadius="lg"
              >
                <Text fontSize="md">Yes, they are incredible !</Text>
                <Text fontSize="xs" color="whiteAlpha.800" mt={1}>
                  {new Date().toLocaleTimeString()}
                </Text>
              </Box>
            </Flex>
          </Box>
    
          {/* Zone de saisie en bas */}
          <Box mt={4} position="sticky" bottom={0} pt={2}>
            <Flex gap={2}>
              <Input
                placeholder="Enter message"
                width="full"
                value={""}
                sx={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid var(--chakra-colors-gray-200)",
                  "&:focus": {
                    borderColor: "var(--chakra-colors-blue-500)",
                    boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                  },
                }}
              />
              <Button
                colorScheme={"primary"}
                size="md"
                onClick={() => {}}
                minW="80px"
              >
                Send
              </Button>
            </Flex>
          </Box>
        </Box>
      </NavigationContainer>
  )
}
