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
