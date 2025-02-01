import { SVGProps } from "react"
import { chakra } from "@chakra-ui/react"

const MessageIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 4C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18L2.01 6C2.01 4.9 2.9 4 4 4H20ZM20 6H4V18H20V6ZM7 9H17V11H7V9ZM7 13H14V15H7V13Z"
      fill="currentColor"
    />
  </svg>
)

export default chakra(MessageIconSvg)