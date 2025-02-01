import { Box } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

interface MessageFigureProps {
  children: ReactNode
}

const MessageFigure: FC<MessageFigureProps> = ({ children }) => (
  <Box
    w="full"
    minH="auto"
    position="relative"
    as="figure"
    bg="neutrals.800"
    cursor="pointer"
    display="block"
    overflow="hidden"
    data-group
    borderRadius="lg"
    p="4"
    _hover={{ 
      bg: "neutrals.700",
      transform: "scale(1.01)",
      transition: "all 0.2s"
    }}
  >
    {children}
  </Box>
)

export { MessageFigure }