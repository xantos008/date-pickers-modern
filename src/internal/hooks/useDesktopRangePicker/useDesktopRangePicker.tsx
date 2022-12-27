import * as React from 'react';
import { resolveComponentProps, useSlotProps } from '@mui/base/utils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DateOrTimeView,
  executeInTheNextEventLoopTick,
  getActiveElement,
  usePicker,
  WrapperVariantContext,
  PickersPopper,
  PickersViewLayout,
  InferError,
  PickersViewLayoutSlotsComponentsProps,
  ExportedBaseToolbarProps,
} from '@mui/x-date-pickers/internals';
import {
  DesktopRangePickerAdditionalViewProps,
  UseDesktopRangePickerParams,
  UseDesktopRangePickerProps,
} from './useDesktopRangePicker.types';
import { useRangePickerInputProps } from '../useRangePickerInputProps';
import { DateRange, RangePosition } from '../../models/range';
import { BaseMultiInputFieldProps } from '../../models/fields';

export const useDesktopRangePicker = <
  TDate,
  TView extends DateOrTimeView,
  TExternalProps extends UseDesktopRangePickerProps<TDate, TView, any, TExternalProps>,
>({
  props,
  valueManager,
  validator,
}: UseDesktopRangePickerParams<TDate, TView, TExternalProps>) => {

  const {
    components,
    componentsProps = {},
    className,
    format,
    readOnly,
    disabled,
    autoFocus,
    disableOpenPicker,
    localeText,
  } = props;

  const fieldRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<HTMLDivElement>(null);
  const [rangePosition, setRangePosition] = React.useState<RangePosition>('start');

  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    shouldRestoreFocus,
    fieldProps: pickerFieldProps,
  } = usePicker<
    DateRange<TDate>,
    TDate,
    TView,
    TExternalProps,
    DesktopRangePickerAdditionalViewProps
  >({
    props,
    valueManager,
    wrapperVariant: 'desktop',
    validator,
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange: setRangePosition,
    },
  });

  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      if (
        fieldRef.current?.contains(getActiveElement(document)) ||
        popperRef.current?.contains(getActiveElement(document))
      ) {
        return;
      }

      actions.onDismiss();
    });
  };

  const fieldSlotsProps = useRangePickerInputProps({
    wrapperVariant: 'desktop',
    open,
    actions,
    readOnly,
    disabled,
    disableOpenPicker,
    localeText,
    onBlur: handleBlur,
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
      readOnly,
      disabled,
      className,
      format,
      autoFocus: autoFocus && !props.open,
      ref: fieldRef,
    },
    ownerState: props,
  });

  const componentsForField: BaseMultiInputFieldProps<DateRange<TDate>, unknown>['components'] = {
    ...fieldProps.components,
    Input: components.Input,
    Root: components.FieldRoot,
    Separator: components.FieldSeparator,
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

  const componentsPropsForLayout: PickersViewLayoutSlotsComponentsProps<DateRange<TDate>, TView> = {
    ...componentsProps,
    toolbar: {
      ...componentsProps?.toolbar,
      rangePosition,
      onRangePositionChange: setRangePosition,
    } as ExportedBaseToolbarProps,
  };

  const renderPicker = () => (
    <LocalizationProvider localeText={localeText}>
      <WrapperVariantContext.Provider value="desktop">
        <Field
          {...fieldProps}
          components={componentsForField}
          componentsProps={componentsPropsForField}
        />
        <PickersPopper
          role="tooltip"
          containerRef={popperRef}
          anchorEl={fieldRef.current}
          onBlur={handleBlur}
          {...actions}
          open={open}
          components={{
            ...components,
            // Avoids to render 2 action bar, will be removed once `PickersPopper` stop displaying the action bar.
            ActionBar: () => null,
          }}
          componentsProps={{
            ...componentsProps,
            actionBar: undefined,
          }}
          shouldRestoreFocus={shouldRestoreFocus}
        >
          <PickersViewLayout
            {...layoutProps}
            components={components}
            componentsProps={componentsPropsForLayout}
          >
            {renderCurrentView()}
          </PickersViewLayout>
        </PickersPopper>
      </WrapperVariantContext.Provider>
    </LocalizationProvider>
  );

  return {
    renderPicker,
  };
};
