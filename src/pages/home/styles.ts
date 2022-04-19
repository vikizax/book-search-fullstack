import { createStyles } from "@mantine/core";
import { pxToRem } from "../../utils/theme.utils";
export const useStyles = createStyles((theme) => ({
  bookContainer: {
    '&:hover': {
      cursor: 'pointer',
      background: theme.colors.gray[0],
      '& .mantine-Image-placeholder': {
        background: theme.colors.gray[0],
      }
    }
  },
  loaderContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationContainer: {
    paddingTop: pxToRem(20),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      "& > div": {
        gap: 0,
      },
    },
  },
  input: {
    position: 'sticky',
    top: pxToRem(10),
    zIndex: 100
  }
}));
