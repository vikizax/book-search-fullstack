import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    loaderContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
            justifyContent: 'left'
        },
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            justifyContent: 'center'
        },
    }
}));
