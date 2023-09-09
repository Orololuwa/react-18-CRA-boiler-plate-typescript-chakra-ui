import classNames from "classnames";
import React, { forwardRef } from "react";
import Select, {
  SingleValue,
  StylesConfig,
  CSSObjectWithLabel,
  ControlProps,
  OptionProps,
  GetOptionValue,
  PropsValue,
} from "react-select";
import { colors } from "lib/theme/chakra-theme";
import { BoxProps } from "@chakra-ui/react";

export interface Option {
  value: any;
  label: React.ReactNode;
  isdisabled?: boolean;
}

export interface DropdownProps {
  options?: Option[];
  isDisabled?: boolean;
  onChange?: (option: SingleValue<Option>) => void;
  placeholder?: React.ReactNode;
  className?: string;
  getOptionValue?: GetOptionValue<Option>;
  value?: PropsValue<Option>;
  maxMenuHeight?: number;
  defaultValue?: PropsValue<Option>;
  inputStyles?: BoxProps;
  menuStyles?: BoxProps;
}

const Dropdown = forwardRef<any, DropdownProps>(
  (
    {
      options,
      onChange,
      placeholder,
      className,
      getOptionValue,
      value,
      defaultValue,
      isDisabled,
      menuStyles = {},
      inputStyles = {},
      maxMenuHeight = 150,
    },
    ref
  ): JSX.Element => {
    return (
      <Select
        ref={ref}
        className={classNames({
          "inline-block whitespace-nowrap": true,
          ...(className && { [className]: className }),
        })}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        getOptionValue={getOptionValue}
        isOptionDisabled={(option) => option.isdisabled || false}
        value={value}
        defaultValue={defaultValue}
        maxMenuHeight={maxMenuHeight}
        isSearchable={false}
        isDisabled={isDisabled}
        menuShouldScrollIntoView={true}
        styles={customStyles({ menuStyles, inputStyles })}
      />
    );
  }
);

const customStyles = ({
  menuStyles,
  inputStyles,
}: any): StylesConfig<Option, false> => ({
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    margin: 0,
  }),
  control: (
    provided: CSSObjectWithLabel,
    state: ControlProps<Option, false>
  ) => ({
    ...provided,
    ...inputStyles,
    boxShadow: state.menuIsOpen ? `0 0 0 1px ${colors.primary[200]}` : "",
    ":hover": {
      borderColor: colors.primary[200],
    },
    ":focus": {
      borderColor: colors.primary[200],
    },
    ":focus-visible": {
      borderColor: colors.primary[200],
    },
    ":focus-within": {
      borderColor: colors.primary[200],
    },
  }),
  option: (
    provided: CSSObjectWithLabel,
    state: OptionProps<Option, false>
  ) => ({
    ...provided,
    backgroundColor: state.isSelected ? colors.primary[200] : "transparent",
    ...(!state.isSelected && {
      ":hover": {
        backgroundColor: colors.primary[100] + "30",
        cursor: "pointer",
      },
    }),
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    marginBottom: "5px",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    ...menuStyles,
    zIndex: 3,
  }),
});

export default Dropdown;
