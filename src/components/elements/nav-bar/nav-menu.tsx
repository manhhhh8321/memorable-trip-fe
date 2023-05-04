import { As, HStack, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { NavItem } from './nav-item'
import { navigationFn } from '~/routes'
import { FiUsers } from 'react-icons/fi'
import { FaBaby, FaBuilding, FaHome } from 'react-icons/fa'
import { BiBuildings, BiVideoRecording } from 'react-icons/bi'
import {
  MdOutlineForum,
  MdOutlineAdminPanelSettings,
  MdOutlineArticle,
  MdOutlineRoomPreferences,
  MdCast,
  MdPodcasts,
  MdOutlineBugReport,
  MdOutlineTouchApp,
  MdImage,
  MdOutlineCabin,
  MdOutlineApartment
} from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Icons } from '~/assets'
import { BREAK_POINTS } from '~/configs'
import { DESCRIPTION } from '~/modules/room/interface/room.interface'
import { TbBrandLinktree, TbBuildingEstate, TbSailboat } from 'react-icons/tb'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { BsHouse } from 'react-icons/bs'
import { GiPalmTree } from 'react-icons/gi'
import { useNavigate } from 'react-router'
// import './styles.css'

export type TNavigation = {
  label: string
  to: string
  icon?: As<any> | undefined
}

const sidebarNavigations = [
  {
    label: DESCRIPTION[0],
    to: '/filter?description=1',
    icon: FaHome
  },
  {
    label: DESCRIPTION[1],
    to: '/filter?description=2',
    icon: FaBuilding
  },
  {
    label: DESCRIPTION[2],
    to: '/filter?description=3',
    icon: BiBuildings
  },
  {
    label: DESCRIPTION[3],
    to: '/filter?description=4',
    icon: TbBuildingEstate
  },
  {
    label: DESCRIPTION[4],
    to: '/filter?description=5',
    icon: HiOutlineBuildingStorefront
  },
  {
    label: DESCRIPTION[5],
    to: '/filter?description=6',
    icon: MdOutlineCabin
  },
  {
    label: DESCRIPTION[6],
    to: '/filter?description=7',
    icon: TbBrandLinktree
  },
  {
    label: DESCRIPTION[7],
    to: '/filter?description=8',
    icon: BsHouse
  },
  {
    label: DESCRIPTION[8],
    to: '/filter?description=9',
    icon: MdOutlineApartment
  },
  {
    label: DESCRIPTION[9],
    to: '/filter?description=10',
    icon: GiPalmTree
  },
  {
    label: DESCRIPTION[10],
    to: '/filter?description=11',
    icon: TbSailboat
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

  const navigate = useNavigate()

  const handleClick = (to: string) => {
    // Check if the clicked item is a description item
    if (to.includes('/description')) {
      // Reload the homepage
      navigate('/')
    } else {
      // Navigate to the clicked item
      navigate(to)
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
              <NavItem
                key={navigation.label}
                isCollapsed={isCollapsed}
                onClick={() => handleClick(navigation.to)}
                {...navigation}
              />
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
