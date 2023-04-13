import { IIconProps } from '.'

export const chevronLeft = (props: IIconProps) => {
  const { h = 20, w = 20, color = '#000000' } = props

  return (
    <svg width={w} height={h} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12 16a.997.997 0 01-.707-.293l-5-5a.999.999 0 010-1.414l5-5a.999.999 0 111.414 1.414L8.414 10l4.293 4.293A.999.999 0 0112 16z'
        fill={color}
      />
    </svg>
  )
}

export const left = (props: IIconProps) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z'
        fill={props.color || '#303030'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const right = (props: IIconProps) => {
  const { onClick, w = 24, h = 24, className, color = '#000' } = props

  return (
    <svg width={w} height={h} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className}>
      <polyline
        fill='none'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        onClick={onClick}
        points='9 6 15 12 9 18'
      />
    </svg>
  )
}
