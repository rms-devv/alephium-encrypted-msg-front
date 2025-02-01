import { Button, H4 } from "@argent/ui"
import {
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react"
import * as secp from "@noble/secp256k1"
import { FC, Suspense, useState } from "react"
import { usePrivateKey } from "../accountTokens/usePrivateKey"

interface CreateChatFormProps {
    onMessageSent: (messageId: string) => void;
  }

  export const CreateChatForm: FC<CreateChatFormProps> = ({ onMessageSent }) => {
    const [publicKey, setPublicKey] = useState("")
    const [message, setMessage] = useState("")
    const toast = useToast()
    const privateKey = usePrivateKey()
  
    const encryptMessage = async (message: string, publicKeyHex: string) => {
      try {
        const recipientPublicKey = Uint8Array.from(
          Buffer.from(publicKeyHex.replace("0x", ""), "hex"),
        )
        const sharedSecret = secp.getSharedSecret(
          privateKey as string,
          recipientPublicKey,
        )
        const messageBytes = new TextEncoder().encode(message)
        const encrypted = new Uint8Array(messageBytes.length)
        for (let i = 0; i < messageBytes.length; i++) {
          encrypted[i] = messageBytes[i] ^ sharedSecret[i % sharedSecret.length]
        }
  
        return {
          encryptedMessage: Buffer.from(encrypted).toString("hex"),
        }
      } catch (error) {
        throw new Error("Encryption failed: Invalid public key or message")
      }
    }
  
    const handleSubmit = async () => {
        try {
          const encrypted = await encryptMessage(message, publicKey)
          console.log("Encrypted message:", encrypted)
    
          // Simuler un nouvel ID de message (dans la réalité, viendrait du smart contract)
          const newMessageId = `ID-${Date.now()}`
          
          toast({
            title: "Message encrypted successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
    
          onMessageSent(newMessageId)
          setPublicKey("")
          setMessage("")
        } catch (error) {
          toast({
            title: "Encryption failed",
            description: error instanceof Error ? error.message : "Invalid input",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
      }
  
    return (
      <VStack
        spacing={4}
        p={4}
        marginTop="4px"
      >
        <Input
          placeholder="Enter recipient's public key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
        <Input
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          colorScheme={"primary"}
          size="sm"
          onClick={handleSubmit}
          isDisabled={!publicKey || !message}
          width="full"
        >
          Send Encrypted Message
        </Button>
      </VStack>
    )
  }