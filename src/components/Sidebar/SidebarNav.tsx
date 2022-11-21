import { Stack, Box, Text } from "@chakra-ui/react"
import { MouseEvent, useContext } from "react"
import { RiUserSettingsLine, RiDashboardLine, RiBubbleChartLine, RiShareLine, RiProfileLine, RiLogoutBoxLine } from "react-icons/ri"
import { UserContext } from "../../contexts/UserContext"

import { NavLink } from "./NavLink"

export function SidebarNav() {
  const { signOut } = useContext(UserContext)

  function handleLogout(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    signOut()
  }
  
  return (
    <Stack spacing="12" align="flex-start">
      <Box>
        <Text fontWeight="bold" color="gray.400">GENERAL</Text>
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
          <NavLink href="/my-communities" icon={RiBubbleChartLine}>My Communities</NavLink>
          <NavLink href="/following" icon={RiShareLine}>Following</NavLink>
          <NavLink href="/feed" icon={RiProfileLine}>News Feed</NavLink>
        </Stack>
      </Box>
      <Box>
        <Text fontWeight="bold" color="gray.400">USER</Text>
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink href="/profile/edit" icon={RiUserSettingsLine}>Edit Profile</NavLink>
          <NavLink href="/logout" icon={RiLogoutBoxLine} onClick={handleLogout}>Logout</NavLink>
        </Stack>
      </Box>
    </Stack>
  )
}