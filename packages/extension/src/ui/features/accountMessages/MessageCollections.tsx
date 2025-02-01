import { H4 } from "@argent/ui"
import { Box } from "@chakra-ui/react"
import { FC, Suspense, useState } from "react"

import { Spinner } from "../../components/Spinner"
import { Account } from "../accounts/Account"
import { Messages } from "./Messages"

export interface MessageCollectionsProps {
  account: Account
  withHeader?: boolean
  navigateToSend?: boolean
}

export const MessageCollections: FC<MessageCollectionsProps> = ({
  account,
  withHeader = true,
  navigateToSend,
  ...rest
}) => {
  return (
    <>
      {withHeader && <H4 textAlign="center">Messages</H4>}
      <Box flex={1} w="full" {...rest}>
        <Suspense fallback={<Spinner size={64} style={{ marginTop: 40 }} />}>
          <Messages account={account} navigateToSend={navigateToSend} />
        </Suspense>
      </Box>
    </>
  )
}
