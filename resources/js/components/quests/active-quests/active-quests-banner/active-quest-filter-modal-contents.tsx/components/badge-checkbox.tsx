import CheckBox from "@/components/shared/inputs/check-box";

type BadgeCheckboxItemProps = {
    label: string;
    color: string;
    checked: boolean;
    onChange: () => void;
}

/**
 * A component for a checkbox item with a colored badge.
 */
const BadgeCheckboxItem: React.FC<BadgeCheckboxItemProps> = ({ label, color, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <CheckBox checked={checked} onChange={onChange} />
        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-sm ${color}`}>
            {label}
        </span>
    </label>
);

export default BadgeCheckboxItem;