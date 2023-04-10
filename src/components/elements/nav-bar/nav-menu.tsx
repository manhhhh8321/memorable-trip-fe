import { As, HStack } from '@chakra-ui/react'
import React from 'react'
import { NavItem } from './nav-item'
import { navigationFn } from '~/routes'
import { FiUsers } from 'react-icons/fi'
import { FaBaby } from 'react-icons/fa'
import { BiVideoRecording } from 'react-icons/bi'
import {
  MdOutlineForum,
  MdOutlineAdminPanelSettings,
  MdOutlineArticle,
  MdOutlineRoomPreferences,
  MdCast,
  MdPodcasts,
  MdOutlineBugReport,
  MdOutlineTouchApp,
  MdImage
} from 'react-icons/md'
export type TNavigation = {
  label: string
  to: string
  icon?: As<any> | undefined
}

const sidebarNavigations = [
  {
    label: 'Nhà nhỏ',
    to: navigationFn.HOME,
    icon: MdOutlineAdminPanelSettings
  },
  {
    label: 'Thật ấn tượng!',
    to: '/impress',
    icon: FiUsers
  },
  {
    label: 'Nhà trên núi',
    to: '/fsd',
    icon: FaBaby
  },
  {
    label: 'Bãi biển',
    to: '/sfd',
    icon: FaBaby
  },
  {
    label: 'Được ưa chuộng',
    to: '/fds',
    icon: MdOutlineArticle
  },
  {
    label: 'Khung cảnh tuyệt vời',
    to: '/fsdf',
    icon: BiVideoRecording
  },
  {
    label: 'Thuyền',
    to: '/jhg',
    icon: MdOutlineForum
  },
  // {
  //   label: "Interactive Room",
  //   to: navigationFn.HOME,
  //   icon: MdOutlineRoomPreferences,
  // },
  // {
  //   label: 'Podcast',
  //   to: navigationFn.HOME,
  //   icon: MdPodcasts
  // },
  // {
  //   label: 'Broadcast',
  //   to: navigationFn.HOME,
  //   icon: MdCast
  // },
  // {
  //   label: 'Interactive Room',
  //   to: navigationFn.HOME,
  //   icon: MdOutlineTouchApp
  // },
  // {
  //   label: 'Banner Management',
  //   to: navigationFn.HOME,
  //   icon: MdImage
  // },
  // {
  //   label: 'Report Management',
  //   to: navigationFn.HOME,
  //   icon: MdOutlineBugReport
  // }
] as TNavigation[]

type SidebarProps = {
  isCollapsed: boolean
  toggleCollapsed: () => void
}
export const NavMenu = (props: SidebarProps) => {
  const { isCollapsed, toggleCollapsed } = props
  return (
    <HStack my={4} px={{ lg: 8, xl: 8, '2xl': 20 }}>
      {sidebarNavigations.map((navigation) => {
        return <NavItem key={navigation.label} isCollapsed={isCollapsed} {...navigation} />
      })}
    </HStack>
  )
}
