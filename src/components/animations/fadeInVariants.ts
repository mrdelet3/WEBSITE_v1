export const fadeInItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const heroFadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            delay,
            ease: [0.215, 0.61, 0.355, 1.0] // OutCubic
        }
    })
};
