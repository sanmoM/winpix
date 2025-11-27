import CheckBox from "@/components/shared/inputs/check-box";

type CheckboxItemProps = {
    label: string;
    checked: boolean;
    onChange: () => void;
}

/**
 * A component for a checkbox item with a text label.
 */
const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <CheckBox label={label} checked={checked} onChange={onChange} />
    </label>
);


export default CheckboxItem;