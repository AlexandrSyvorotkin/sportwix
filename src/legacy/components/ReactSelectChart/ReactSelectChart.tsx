import React from "react";
import Select, { components } from "react-select";
import { Link } from "react-router-dom";

interface OptionType {
    value: string;
    label: string;
    url: string;
    onClick: () => void;
    component: React.ElementType;
}

interface SelectProps {
    options: { to: string; label: string }[];
}

const SelectWithRouter: React.FC<SelectProps> = ({ options }) => {
    const formattedOptions: OptionType[] = options.map((option) => {
        return {
            value: option.to,
            label: option.label,
            url: option.to,
            onClick: () => {},
            component: Link,
        };
    });

    return (
        <Select
            options={formattedOptions}
            components={{ Option: CustomOption }}
        />
    );
};

const CustomOption = (props: any) => {
    const { data } = props;
    const Component = data.component;
    return (
        <components.Option {...props}>
            <Component to={data.url}>{data.label}</Component>
        </components.Option>
    );
};

export default SelectWithRouter;
