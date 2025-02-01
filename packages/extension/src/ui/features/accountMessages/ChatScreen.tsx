import { useEffect, useState } from "react"
import { Account } from "../accounts/Account"

// Mock data pour simuler une base de données de messages
const mockMessageDatabase: Record<string, {
  metadata: {
    sender: string
    recipientPublicKey: string
    timestamp: number
  }
  encryptedContent: string
}> = {
  "ID-1": {
    metadata: {
      sender: "0x123...abc",
      recipientPublicKey: "02a9c4f6b56f35267847485a0eeaf9c85787b8513f29d5dcdc5fa3be82986e294f",
      timestamp: Date.now() - 3600000
    },
    encryptedContent: "7b8a9c2d4e5f1a3b6c8d9e0f2a4b6c8d"
  },
  "ID-2": {
    metadata: {
      sender: "0x456...def",
      recipientPublicKey: "03b9d4f6b56f35267847485a0eeaf9c85787b8513f29d5dcdc5fa3be82986e294f",
      timestamp: Date.now() - 7200000
    },
    encryptedContent: "3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c"
  }
}

export const useMessage = (messageId: string, account: Account) => {
  const [message, setMessage] = useState<typeof mockMessageDatabase[string]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un appel API
    const fetchMessage = async () => {
      setIsLoading(true)
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const message = mockMessageDatabase[messageId]
        setMessage(message)
      } catch (error) {
        console.error("Failed to fetch message:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessage()
  }, [messageId, account])

  return { message, isLoading }
}