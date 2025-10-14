'use client';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type AnimatedContainerProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
	duration?: number;
	blurAmount?: string;
	translateY?: number;
};

export function AnimatedContainer({ 
	className, 
	delay = 0.1, 
	children,
	duration = 0.8,
	blurAmount = '4px',
	translateY = -8
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: `blur(${blurAmount})`, translateY, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration }}
			className={className}
		>
			{children}
		</motion.div>
	);
};