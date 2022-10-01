import { ElementType } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react"

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  href: string;
  children: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  const { asPath } = useRouter()
  
  let isActive = false;

  if (asPath === href || asPath === rest.as) {
    isActive = true;
  }

  return (
    <Link href={href} passHref>
      <ChakraLink 
        display="flex" 
        alignItems="center" 
        color={isActive ? 'orange.400' : 'gray.50'}
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </Link>
  )
}