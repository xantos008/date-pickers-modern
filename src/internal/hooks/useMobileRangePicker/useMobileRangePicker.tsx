import * as React from 'react';
import { resolveComponentProps, useSlotProps } from '@mui/base/utils';
import { LocalizationProvider } from '../../../LocalizationProvider';
import {
  PickersLayout,
  PickersLayoutSlotsComponentsProps,
} from '../../../PickersLayout';
import {
  DateOrTimeView,
  usePicker,
  WrapperVariantContext,
  PickersModalDialog,
  InferError,
  ExportedBaseToolbarProps,
} from '../../../internals';
import {
  MobileRangePickerAdditionalViewProps,
  UseMobileRangePickerParams,
  UseMobileRangePickerProps,
} from './useMobileRangePicker.types';
import { useRangePickerInputProps } from '../useRangePickerInputProps';
import { getReleaseInfo } from '../../utils/releaseInfo';
import { DateRange, RangePosition } from '../../models/range';
import { BaseMultiInputFieldProps } from '../../models/fields';

const releaseInfo = getReleaseInfo();

export const useMobileRangePicker = <
  TDate,
  TView extends DateOrTimeView,
  TExternalProps extends UseMobileRangePickerProps<TDate, TView, any, TExternalProps>,
>({
  props,
  valueManager,
  validator,
}: UseMobileRangePickerParams<TDate, TView, TExternalProps>) => {

  const {
    components,
    componentsProps = {},
    className,
    format,
    readOnly,
    disabled,
    disableOpenPicker,
    localeText,
  } = props;

  const fieldRef = React.useRef<HTMLDivElement>(null);
  const [rangePosition, setRangePosition] = React.useState<RangePosition>('start');

  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    fieldProps: pickerFieldProps,
  } = usePicker<
    DateRange<TDate>,
    TDate,
    TView,
    TExternalProps,
    MobileRangePickerAdditionalViewProps
  >({
    props,
    valueManager,
    wrapperVariant: 'mobile',
    validator,
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange: setRangePosition,
    },
  });

  const fieldSlotsProps = useRangePickerInputProps({
    wrapperVariant: 'mobile',
    open,
    actions,
    readOnly,
    disabled,
    disableOpenPicker,
    localeText,
    rangePosition,
    onRangePositionChange: setRangePosition,
  });

  const Field = components.Field;
  const fieldProps: BaseMultiInputFieldProps<
    DateRange<TDate>,
    InferError<TExternalProps>
  > = useSlotProps({
    elementType: Field,
    externalSlotProps: componentsProps.field,
    additionalProps: {
      ...pickerFieldProps,
      readOnly: readOnly ?? true,
      disabled,
      className,
      format,
      ref: fieldRef,
    },
    ownerState: props,
  });

  const componentsForField: BaseMultiInputFieldProps<DateRange<TDate>, unknown>['components'] = {
    ...fieldProps.components,
    Input: components.Input,
  };

  const componentsPropsForField: BaseMultiInputFieldProps<
    DateRange<TDate>,
    unknown
  >['componentsProps'] = {
    ...fieldProps.componentsProps,
    input: (ownerState) => {
      const externalInputProps = resolveComponentProps(componentsProps.input, ownerState);
      const inputPropsPassedByField = resolveComponentProps(
        fieldProps.componentsProps?.input,
        ownerState,
      );
      const inputPropsPassedByPicker =
        ownerState.position === 'start' ? fieldSlotsProps.startInput : fieldSlotsProps.endInput;

      return {
        ...externalInputProps,
        ...inputPropsPassedByField,
        ...inputPropsPassedByPicker,
        inputProps: {
          ...externalInputProps?.inputProps,
          ...inputPropsPassedByField?.inputProps,
        },
      };
    },
    root: (ownerState) => {
      const externalRootProps = resolveComponentProps(componentsProps.fieldRoot, ownerState);
      const rootPropsPassedByField = resolveComponentProps(
        fieldProps.componentsProps?.root,
        ownerState,
      );
      return {
        ...externalRootProps,
        ...rootPropsPassedByField,
        ...fieldSlotsProps.root,
      };
    },
    separator: (ownerState) => {
      const externalSeparatorProps = resolveComponentProps(
        componentsProps.fieldSeparator,
        ownerState,
      );
      const separatorPropsPassedByField = resolveComponentProps(
        fieldProps.componentsProps?.separator,
        ownerState,
      );
      return {
        ...externalSeparatorProps,
        ...separatorPropsPassedByField,
        ...fieldSlotsProps.root,
      };
    },
  };

  const componentsPropsForLayout: PickersLayoutSlotsComponentsProps<DateRange<TDate>, TView> = {
    ...componentsProps,
    toolbar: {
      ...componentsProps?.toolbar,
      rangePosition,
      onRangePositionChange: setRangePosition,
    } as ExportedBaseToolbarProps,
  };
  const Layout = components?.Layout ?? PickersLayout;

  const renderPicker = () => (
    <LocalizationProvider localeText={localeText}>
      <WrapperVariantContext.Provider value="mobile">
        <Field
          {...fieldProps}
          components={componentsForField}
          componentsProps={componentsPropsForField}
        />
        <PickersModalDialog
          {...actions}
          open={open}
          components={{
            ...components,
            // Avoids to render 2 action bar, will be removed once `PickersModalDialog` stop displaying the action bar.
            ActionBar: () => null,
          }}
          componentsProps={{
            ...componentsProps,
            actionBar: undefined,
          }}
        >
          <Layout
            {...layoutProps}
            {...componentsProps?.layout}
            components={components}
            componentsProps={componentsPropsForLayout}
          >
            {renderCurrentView()}
          </Layout>
        </PickersModalDialog>
      </WrapperVariantContext.Provider>
    </LocalizationProvider>
  );

  return {
    renderPicker,
  };
};
