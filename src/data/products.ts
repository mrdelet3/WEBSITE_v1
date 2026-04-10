export interface Product {
    id: string;
    title: string;
    image: string;
    price: string;
    category: 'gypsum' | 'bronze' | 'clear';
    dimensions: { h: string; w: string; d: string };
    weight?: string;
    edition?: string;
    medium?: string;
    description?: string;
    materials: string[];
    // Shopify-specific fields (populated when data comes from Shopify)
    shopifyId?: string;
    shopifyVariantId?: string;
    images?: string[];
}

export const products: Product[] = [
    // ─── Bronze Collection ──────────────────────────────────────────
    {
        id: 'sitting-female-figure',
        title: 'Sitting Female Figure',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0r3vnn1yxtubD9_0TgnzUCgoBHiOviykDhLpxM1Ez-hflCz5OnQNx7QLUczjhyd8O_lMUOHjN1STMGLIg1y7E40sUKxJLJH2cVpiDMEPELfVPWLQXSvvwD0juuZm6HyLIp_ycy11oU2zXy3Hw-dS2X7f7xY5qohCFMCzzyW2DnvK5QEAEREEWQ17I9tBT-V03XYQju-X80q3DxQeh_H7GVo8OAiBSUNF1F_bWZ4ILcJNITDJ_fKeaahQ8tQoqWAlGCH1OwQs36kxh',
        price: '$2,000',
        category: 'bronze',
        dimensions: { h: '12 1/4"', w: '10"', d: '10"' },
        weight: '4.6 kg',
        edition: 'Limited Edition',
        medium: 'Bronze cold cast resin',
        description: 'A contemplative seated female form, cold cast in bronze resin. Hand-finished in our Toronto studio.',
        materials: ['Bronze', 'Cold Cast Resin']
    },
    {
        id: 'bather',
        title: 'Bather',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAkqwydZ49NoavhwoQNNOt73qleG4OeI0Q007TDPH529gAJ9YA0W1W5So-s-f123YIZSvOYX1IfZyvaw-AqOFaiva7G2yPbtokUI0rDLUvYYVK5MeMiEgOrn71Fk1E8DVqDxsUjFL291sC8r_I4RcvN5ZWoYeE_emcTGIZFPfdbyYl_GSoCev0tTxKBE9DMi90d5lFPqxsY8qJDPypBpi2jEQwEnT-FRT-icNb_2eFWrav7vjJUOHA_GHEyysd8yg2yN6Ysl-eE3CX',
        price: '$2,300',
        category: 'bronze',
        dimensions: { h: '17 1/4"', w: '7 1/2"', d: '11 1/2"' },
        weight: '4.2 kg',
        edition: 'Limited Edition',
        medium: 'Bronze cold cast resin & crystal clear resin',
        description: 'A graceful bather figure combining the warmth of bronze cold cast resin with the ethereal transparency of crystal clear resin.',
        materials: ['Bronze', 'Cold Cast Resin', 'Crystal Clear Resin']
    },
    {
        id: 'kings',
        title: 'Kings',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD516A94Vzz5bXbp8M5j3GjqwsRpzxLjGMoJvmadzQcfaEP7KHxB8HYO6eUvlZKN7kIXRPBG408jvgAnK67Zh68eJY510SJbUZKhR39v380Mk0qYd6Ho5GRgzzK7wwMDZYR3Misjd1B5pCMA1sQiinPt7SF0SQ-uTwMJi-r2iCvuDQnR1QnCFtV1ayZQz5EkJjlKMWU5BjiyU1_YqR-McrP89b6iWp-xFwkNaPwS-HL1WoXW2JvlmvutyzeQRTkvn86uYRMytnle35e',
        price: '$4,500',
        category: 'bronze',
        dimensions: { h: '17"', w: '27"', d: '19"' },
        weight: '13.8 kg',
        edition: 'Limited Edition',
        medium: 'Brass cold cast resin',
        description: 'A monumental composition in brass cold cast resin, exploring themes of power and legacy. Hand-finished in our Toronto studio.',
        materials: ['Brass', 'Cold Cast Resin']
    },
    {
        id: 'awakening',
        title: 'Awakening',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtyEU7mv0frFV-6qTUiHWc62y19pXEnci-t0nNfL8mtUIf8Ngxthmol_BOaT6_CJXZlB9ksLU5IGrPNKUTlWCQl8dV0R2V2CmHc-a0XxfheDauxz-SNOU2WMYlhQfvgx6ZiG9bnCQvVslZfo7B6gY3RtEQrGbcC1Wq-XlPq-1BNtSCqxNs2BnygtpqveWtxs5_2KaG5R_8CAtIFOE2G9X9TWT3lsgxYZBYne8IsCikZj3xtRB_8zSsn2auGeZg9vrc7V0cBmcNduFN',
        price: '$2,400',
        category: 'bronze',
        dimensions: { h: '11"', w: '5"', d: '21"' },
        weight: '3.8 kg',
        edition: 'Limited Edition',
        medium: 'Bronze cold cast resin',
        description: 'A dynamic figure emerging from stillness, cast in bronze cold cast resin. Hand-finished in our Toronto studio.',
        materials: ['Bronze', 'Cold Cast Resin']
    },

    // ─── Gypsum Collection (Artificial Stone) ───────────────────────
    {
        id: 'apple-bite',
        title: 'Apple Bite',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI3R4Wb3iSl4JOCmlbG6yaYKrgxKsATqoGMCXnK29scRitBdVhuHm8GOmK1zCxZsxFnMY_sKDUkqXmpEAqIWScIahs0nPzy3tUuoDsDHr7NlJYuLH-veaM1IqTS3B5ykWOtZAKRQl9lWXnGlBKwkf0cfjm8m2vcGNvJvxymQWYKO5WqNzGx9ZlsBgI08VCxNZG9p-kNL0MVsVX6cDaEJtJTll_085iZdDgxmqR2v9H4ijB8nyJpSFDrMGutqfpFr9V6Mz8JOc4qM9l',
        price: '$3,800',
        category: 'gypsum',
        dimensions: { h: '20"', w: '9 3/4"', d: '11 1/2"' },
        weight: '8.5 kg',
        edition: 'Limited Edition',
        medium: 'Artificial stone, gilding',
        description: 'An evocative piece in artificial stone with hand-applied gilding accents. Hand-finished in our Toronto studio.',
        materials: ['Artificial Stone', 'Gilding']
    },
    {
        id: 'female-portrait',
        title: 'Female Portrait',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8buzgm3JtJeRyYtELm4BjP5lQZWDgDOy3N-pQvHWAJhA_xnBYrPp5yQWyDAlQZKgoUIkaMhL7b82q43wWupKUB1MnTAyhAMI3ALKtKewbNwUOQHqiCz42f76WSc1M05jyIAgpmnpKqqNdcJP5zD9D7rdncpPHo3dUrtAY4jYa4eIcKC3rNcE95OsvbLK-xHpDXQBt_akeheu0NJlRpHCjFRH5WJr9ANvE-nze5Q2uGyoMNxr6lRnO_1C9_O-2WgZzL4ZBUKWFdWzr',
        price: 'SOLD',
        category: 'gypsum',
        dimensions: { h: '17"', w: '9"', d: '8"' },
        weight: '5 kg',
        edition: 'Unique',
        medium: 'Artificial stone',
        description: 'A sensitive portrait study in artificial stone, capturing the subtlety of expression. Hand-finished in our Toronto studio.',
        materials: ['Artificial Stone']
    },
    {
        id: 'primping',
        title: 'Primping',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAkqwydZ49NoavhwoQNNOt73qleG4OeI0Q007TDPH529gAJ9YA0W1W5So-s-f123YIZSvOYX1IfZyvaw-AqOFaiva7G2yPbtokUI0rDLUvYYVK5MeMiEgOrn71Fk1E8DVqDxsUjFL291sC8r_I4RcvN5ZWoYeE_emcTGIZFPfdbyYl_GSoCev0tTxKBE9DMi90d5lFPqxsY8qJDPypBpi2jEQwEnT-FRT-icNb_2eFWrav7vjJUOHA_GHEyysd8yg2yN6Ysl-eE3CX',
        price: '$3,400',
        category: 'gypsum',
        dimensions: { h: '26"', w: '9 3/4"', d: '7 1/4"' },
        weight: '5.5 kg',
        edition: 'Limited Edition',
        medium: 'Artificial stone',
        description: 'A figure caught in a moment of self-adornment, rendered in artificial stone. Hand-finished in our Toronto studio.',
        materials: ['Artificial Stone']
    }
];
