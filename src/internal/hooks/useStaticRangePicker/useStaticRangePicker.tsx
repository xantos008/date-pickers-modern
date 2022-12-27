import * as React from 'react';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '../../../LocalizationProvider';
import {
  DateOrTimeView,
  usePicker,
  WrapperVariantContext,
  PickersViewLayout,
  DIALOG_WIDTH,
  PickersViewLayoutSlotsComponentsProps,
  ExportedBaseToolbarProps,
} from '../../../internals';
import {
  UseStaticRangePickerParams,
  UseStaticRangePickerProps,
} from './useStaticRangePicker.types';
import { DateRange, RangePosition } from '../../models/range';

const PickerStaticViewLayout = styled(PickersViewLayout)(({ theme }) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  backgroundColor: (theme.vars || theme).palette.background.paper,
})) as unknown as typeof PickersViewLayout;

/**
 * Hook managing all the range static pickers:
 * - StaticDateRangePicker
 */
export const useStaticRangePicker = <
  TDate,
  TView extends DateOrTimeView,
  TExternalProps extends UseStaticRangePickerProps<TDate, TView, any, TExternalProps>,
>({
  props,
  valueManager,
  validator,
  ref,
}: UseStaticRangePickerParams<TDate, TView, TExternalProps>) => {
  const { localeText, components, componentsProps, displayStaticWrapperAs, autoFocus } = props;

  const [rangePosition, setRangePosition] = React.useState<RangePosition>('start');

  const { layoutProps, renderCurrentView } = usePicker<
    DateRange<TDate>,
    TDate,
    TView,
    TExternalProps,
    {}
  >({
    props,
    valueManager,
    validator,
    autoFocusView: autoFocus ?? false,
    additionalViewProps: {},
    wrapperVariant: displayStaticWrapperAs,
  });

  const componentsPropsForLayout: PickersViewLayoutSlotsComponentsProps<DateRange<TDate>, TView> = {
    ...componentsProps,
    toolbar: {
      ...componentsProps?.toolbar,
      rangePosition,
      onDateRangePositionRange: setRangePosition,
    } as ExportedBaseToolbarProps,
  };

  const renderPicker = () => (
    <LocalizationProvider localeText={localeText}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <PickerStaticViewLayout
          {...layoutProps}
          components={components}
          componentsProps={componentsPropsForLayout}
          ref={ref}
        >
          {renderCurrentView()}
        </PickerStaticViewLayout>
      </WrapperVariantContext.Provider>
    </LocalizationProvider>
  );

  return { renderPicker };
};
