import * as React from 'react';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { useTheme, styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { useSlotProps } from '@mui/base/utils';
import IconButton from '@mui/material/IconButton';
import { ArrowLeft, ArrowRight } from '../icons';
import {
  PickersArrowSwitcherOwnerState,
  PickersArrowSwitcherProps,
} from './PickersArrowSwitcher.types';
import { getPickersArrowSwitcherUtilityClass } from './pickersArrowSwitcherClasses';

const PickersArrowSwitcherRoot = styled('div', {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{
  ownerState: PickersArrowSwitcherProps;
}>({
  display: 'flex',
});

const PickersArrowSwitcherSpacer = styled('div', {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Spacer',
  overridesResolver: (props, styles) => styles.spacer,
})<{
  ownerState: PickersArrowSwitcherProps;
}>(({ theme }) => ({
  width: theme.spacing(3),
}));

const PickersArrowSwitcherButton = styled(IconButton, {
  name: 'MuiPickersArrowSwitcher',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button,
})<{
  ownerState: PickersArrowSwitcherProps;
}>(({ ownerState }) => ({
  ...(ownerState.hidden && {
    visibility: 'hidden',
  }),
}));

const useUtilityClasses = (ownerState: PickersArrowSwitcherOwnerState) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
    spacer: ['spacer'],
    button: ['button'],
  };

  return composeClasses(slots, getPickersArrowSwitcherUtilityClass, classes);
};

export const PickersArrowSwitcher = React.forwardRef(function PickersArrowSwitcher(
  inProps: PickersArrowSwitcherProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  const props = useThemeProps({ props: inProps, name: 'MuiPickersArrowSwitcher' });

  const {
    children,
    className,
    components = {},
    componentsProps = {},
    isNextDisabled,
    isNextHidden,
    onGoToNext,
    nextLabel,
    isPreviousDisabled,
    isPreviousHidden,
    onGoToPrevious,
    previousLabel,
    ...other
  } = props;

  const ownerState = props;

  const classes = useUtilityClasses(ownerState);

  const nextProps = {
    isDisabled: isNextDisabled,
    isHidden: isNextHidden,
    goTo: onGoToNext,
    label: nextLabel,
  };

  const previousProps = {
    isDisabled: isPreviousDisabled,
    isHidden: isPreviousHidden,
    goTo: onGoToPrevious,
    label: previousLabel,
  };

  const [leftProps, rightProps] = isRTL ? [nextProps, previousProps] : [previousProps, nextProps];

  const PreviousIconButton = components.PreviousIconButton ?? PickersArrowSwitcherButton;
  const previousIconButtonProps = useSlotProps({
    elementType: PreviousIconButton,
    externalSlotProps: componentsProps.previousIconButton,
    additionalProps: {
      size: 'small',
      title: leftProps.label,
      'aria-label': leftProps.label,
      disabled: leftProps.isDisabled,
      edge: 'end',
      onClick: leftProps.goTo,
    },
    ownerState: { ...ownerState, hidden: leftProps.isHidden },
    className: classes.button,
  });

  const NextIconButton = components.NextIconButton ?? PickersArrowSwitcherButton;
  const nextIconButtonProps = useSlotProps({
    elementType: NextIconButton,
    externalSlotProps: componentsProps.nextIconButton,
    additionalProps: {
      size: 'small',
      title: rightProps.label,
      'aria-label': rightProps.label,
      disabled: rightProps.isDisabled,
      edge: 'start',
      onClick: rightProps.goTo,
    },
    ownerState: { ...ownerState, hidden: rightProps.isHidden },
    className: classes.button,
  });

  const LeftArrowIcon = components?.LeftArrowIcon ?? ArrowLeft;
  // The spread is here to avoid this bug mui/material-ui#34056
  const { ownerState: leftArrowIconOwnerState, ...leftArrowIconProps } = useSlotProps({
    elementType: LeftArrowIcon,
    externalSlotProps: componentsProps.leftArrowIcon,
    ownerState: undefined,
  });

  const RightArrowIcon = components?.RightArrowIcon ?? ArrowRight;
  // The spread is here to avoid this bug mui/material-ui#34056
  const { ownerState: rightArrowIconOwnerState, ...rightArrowIconProps } = useSlotProps({
    elementType: RightArrowIcon,
    externalSlotProps: componentsProps.rightArrowIcon,
    ownerState: undefined,
  });

  return (
    <PickersArrowSwitcherRoot
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      <PreviousIconButton {...previousIconButtonProps}>
        {isRTL ? (
          <RightArrowIcon {...rightArrowIconProps} />
        ) : (
          <LeftArrowIcon {...leftArrowIconProps} />
        )}
      </PreviousIconButton>
      {children ? (
        <Typography variant="subtitle1" component="span">
          {children}
        </Typography>
      ) : (
        <PickersArrowSwitcherSpacer className={classes.spacer} ownerState={ownerState} />
      )}
      <NextIconButton {...nextIconButtonProps}>
        {isRTL ? (
          <LeftArrowIcon {...leftArrowIconProps} />
        ) : (
          <RightArrowIcon {...rightArrowIconProps} />
        )}
      </NextIconButton>
    </PickersArrowSwitcherRoot>
  );
});
