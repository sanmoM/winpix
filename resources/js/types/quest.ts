type Quest = {
    image: string,
    title: string,
    subtitle: string,
    buttonText: string,
    buttonClass: string
    entry_coin: string;
    category: {
        name: string;
    },
    user: {
        name: string;
    }
}

export type { Quest }