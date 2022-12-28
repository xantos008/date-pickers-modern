import * as React from 'react';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '../../../LocalizationProvider';
import {
  PickersLayout,
  PickersLayoutSlotsComponentsProps,
} from '../../../PickersLayout';
import {
  DateOrTimeView,
  usePicker,
  WrapperVariantContext,
  DIALOG_WIDTH,
  ExportedBaseToolbarProps,
} from '../../../internals';
import {
  UseStaticRangePickerParams,
  UseStaticRangePickerProps,
} from './useStaticRangePicker.types';
import { DateRange, RangePosition } from '../../models/range';

const PickerStaticLayout = styled(PickersLayout)(({ theme }) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  backgroundColor: ((theme as any).vars || theme).palette.background.paper,
})) as unknown as typeof PickersLayout;

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

  const Layout = components?.Layout ?? PickerStaticLayout;
  const componentsPropsForLayout: PickersLayoutSlotsComponentsProps<DateRange<TDate>, TView> = {
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
        <Layout
          {...layoutProps}
          components={components}
          componentsProps={componentsPropsForLayout}
          ref={ref}
        >
          {renderCurrentView()}
        </Layout>
      </WrapperVariantContext.Provider>
    </LocalizationProvider>
  );

  return { renderPicker };
};
