import useLocales from '@/hooks/useLocales'

export default function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
    const { t } = useLocales()
    return (
        <button
            type="button"
            onClick={() => handleDelete()}
            className="cursor-pointer rounded-md bg-red-500 p-2 font-medium text-white"
        >
            {t("dashboard.shared.delete")}
        </button>
    )
}
