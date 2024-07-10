import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

function PageTransition({ children, ...rest }: PageTransitionProps, ref: PageTransitionRef) {
	const onTheRight = { x: '10px', opacity: 0 }
	const inTheCenter = { x: 0, y: 0, opacity: 1 }
	const onTheLeft = { x: '-10px', opacity: 0 }

	const transition = { duration: 0.3, ease: 'easeInOut' }

	return (
		<motion.div
			ref={ref}
			initial={onTheRight}
			animate={inTheCenter}
			exit={onTheLeft}
			transition={transition}
			{...rest}
		>
			{children}
		</motion.div>
	)
}

export default forwardRef(PageTransition)