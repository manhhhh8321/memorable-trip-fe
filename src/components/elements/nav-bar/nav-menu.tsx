import { As, HStack, Text } from '@chakra-ui/react'
import React, { useRef } from 'react'
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
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Icons } from '~/assets'
import { BREAK_POINTS } from '~/configs'
import { DESCRIPTION } from '~/modules/room/interface/room.interface'
// import './styles.css'

export type TNavigation = {
  label: string
  to: string
  icon?: As<any> | undefined
}

const sidebarNavigations = [
  {
    label: DESCRIPTION[0],
    to: navigationFn.HOME,
    icon: MdOutlineAdminPanelSettings
  },
  {
    label: DESCRIPTION[1],
    to: '/impress',
    icon: FiUsers
  },
  {
    label: DESCRIPTION[2],
    to: '/fsd',
    icon: FaBaby
  },
  {
    label: DESCRIPTION[3],
    to: '/sfd',
    icon: FaBaby
  },
  {
    label: DESCRIPTION[4],
    to: '/fds',
    icon: MdOutlineArticle
  },
  {
    label: DESCRIPTION[5],
    to: '/fsdf',
    icon: BiVideoRecording
  },
  {
    label: DESCRIPTION[9],
    to: '/jhg',
    icon: MdOutlineForum
  },
  {
    label: DESCRIPTION[8],
    to: navigationFn.HOME,
    icon: MdOutlineRoomPreferences
  },
  {
    label: DESCRIPTION[7],
    to: navigationFn.HOME,
    icon: MdPodcasts
  },
  {
    label: DESCRIPTION[10],
    to: navigationFn.HOME,
    icon: MdCast
  },
  {
    label: DESCRIPTION[8],
    to: navigationFn.HOME,
    icon: MdOutlineTouchApp
  },
  {
    label: 'Banner Management',
    to: navigationFn.HOME,
    icon: MdImage
  },
  {
    label: 'Report Management',
    to: navigationFn.HOME,
    icon: MdOutlineBugReport
  }
] as TNavigation[]

type SidebarProps = {
  isCollapsed: boolean
  toggleCollapsed: () => void
}
export const NavMenu = (props: SidebarProps) => {
  SwiperCore.use([Navigation])
  const prevButton = useRef<HTMLDivElement>(null)
  const nextButton = useRef<HTMLDivElement>(null)
  const onBeforeInit = (Swiper: SwiperCore): void => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation
      if (navigation) {
        navigation.prevEl = prevButton.current
        navigation.nextEl = nextButton.current
        Swiper.navigation.update()
      }
    }
  }
  const { isCollapsed, toggleCollapsed } = props
  return (
    <HStack className='list-category' my={4} px={{ lg: 8, xl: 8, '2xl': 20 }}>
      <Swiper
        id='main'
        // thumbs={{ swiper: thumbsSwiper }}
        // controller={{ control: controlledSwiper }}
        onBeforeInit={onBeforeInit}
        tag='section'
        wrapperTag='ul'
        navigation={{
          prevEl: prevButton.current,
          nextEl: nextButton.current
        }}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerGroup={9}
        slidesPerView={10}
        breakpoints={BREAK_POINTS}
        onInit={(swiper) => console.log('Swiper initialized!', swiper)}
        onSlideChange={(swiper) => {
          console.log('Slide index changed to: ', swiper.activeIndex)
        }}
        onReachEnd={() => console.log('Swiper end reached')}
      >
        {sidebarNavigations.map((navigation) => {
          return (
            <SwiperSlide style={{ width: 'fit-content' }} key={navigation.label}>
              <NavItem key={navigation.label} isCollapsed={isCollapsed} {...navigation} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Text className='prev-btn pagination-btn' ref={prevButton}>
        <Icons.left w={25} h={25} />
      </Text>
      <Text className='next-btn pagination-btn' ref={nextButton}>
        <Icons.right w={25} h={25} />
      </Text>
    </HStack>
  )
}
