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
    {
        id: '1',
        title: 'Classical Male Bust I',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0r3vnn1yxtubD9_0TgnzUCgoBHiOviykDhLpxM1Ez-hflCz5OnQNx7QLUczjhyd8O_lMUOHjN1STMGLIg1y7E40sUKxJLJH2cVpiDMEPELfVPWLQXSvvwD0juuZm6HyLIp_ycy11oU2zXy3Hw-dS2X7f7xY5qohCFMCzzyW2DnvK5QEAEREEWQ17I9tBT-V03XYQju-X80q3DxQeh_H7GVo8OAiBSUNF1F_bWZ4ILcJNITDJ_fKeaahQ8tQoqWAlGCH1OwQs36kxh',
        price: '$3,200',
        category: 'gypsum',
        dimensions: { h: '24"', w: '14"', d: '12"' },
        weight: '14.5 kg',
        edition: 'Limited of 5',
        medium: 'Hand-Polished Gypsum',
        description: 'An exploration of silence and shadow, relying entirely on the interplay of light across white curves.',
        materials: ['Gypsum', 'Marble Dust']
    },
    {
        id: '2',
        title: 'Female Portrait Study',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAkqwydZ49NoavhwoQNNOt73qleG4OeI0Q007TDPH529gAJ9YA0W1W5So-s-f123YIZSvOYX1IfZyvaw-AqOFaiva7G2yPbtokUI0rDLUvYYVK5MeMiEgOrn71Fk1E8DVqDxsUjFL291sC8r_I4RcvN5ZWoYeE_emcTGIZFPfdbyYl_GSoCev0tTxKBE9DMi90d5lFPqxsY8qJDPypBpi2jEQwEnT-FRT-icNb_2eFWrav7vjJUOHA_GHEyysd8yg2yN6Ysl-eE3CX',
        price: '$2,800',
        category: 'gypsum',
        dimensions: { h: '20"', w: '12"', d: '10"' },
        weight: '11.2 kg',
        edition: 'Limited of 5',
        medium: 'Hand-Polished Gypsum',
        description: 'A study of delicate features and soft expressions, captured in the pristine whiteness of gypsum.',
        materials: ['Gypsum', 'Plaster']
    },
    {
        id: '3',
        title: 'Fragmented Torso',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD516A94Vzz5bXbp8M5j3GjqwsRpzxLjGMoJvmadzQcfaEP7KHxB8HYO6eUvlZKN7kIXRPBG408jvgAnK67Zh68eJY510SJbUZKhR39v380Mk0qYd6Ho5GRgzzK7wwMDZYR3Misjd1B5pCMA1sQiinPt7SF0SQ-uTwMJi-r2iCvuDQnR1QnCFtV1ayZQz5EkJjlKMWU5BjiyU1_YqR-McrP89b6iWp-xFwkNaPwS-HL1WoXW2JvlmvutyzeQRTkvn86uYRMytnle35e',
        price: '$4,500',
        category: 'gypsum',
        dimensions: { h: '32"', w: '18"', d: '14"' },
        weight: '18.5 kg',
        edition: 'Limited of 3',
        medium: 'Reinforced Plaster',
        description: 'Fragmented forms suggesting the passage of time and the beauty of incompleteness.',
        materials: ['Gypsum', 'Reinforced Plaster']
    },
    {
        id: '4',
        title: 'Detailed Relief Study',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI3R4Wb3iSl4JOCmlbG6yaYKrgxKsATqoGMCXnK29scRitBdVhuHm8GOmK1zCxZsxFnMY_sKDUkqXmpEAqIWScIahs0nPzy3tUuoDsDHr7NlJYuLH-veaM1IqTS3B5ykWOtZAKRQl9lWXnGlBKwkf0cfjm8m2vcGNvJvxymQWYKO5WqNzGx9ZlsBgI08VCxNZG9p-kNL0MVsVX6cDaEJtJTll_085iZdDgxmqR2v9H4ijB8nyJpSFDrMGutqfpFr9V6Mz8JOc4qM9l',
        price: '$1,500',
        category: 'gypsum',
        dimensions: { h: '16"', w: '12"', d: '4"' },
        weight: '5.5 kg',
        edition: 'Open Edition',
        medium: 'Gypsum Relief',
        description: 'Intricate relief work exploring texture and depth within a confined plane.',
        materials: ['Gypsum']
    },
    {
        id: '5',
        title: 'Classical Male Bust II',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0r3vnn1yxtubD9_0TgnzUCgoBHiOviykDhLpxM1Ez-hflCz5OnQNx7QLUczjhyd8O_lMUOHjN1STMGLIg1y7E40sUKxJLJH2cVpiDMEPELfVPWLQXSvvwD0juuZm6HyLIp_ycy11oU2zXy3Hw-dS2X7f7xY5qohCFMCzzyW2DnvK5QEAEREEWQ17I9tBT-V03XYQju-X80q3DxQeh_H7GVo8OAiBSUNF1F_bWZ4ILcJNITDJ_fKeaahQ8tQoqWAlGCH1OwQs36kxh',
        price: '$3,200',
        category: 'gypsum',
        dimensions: { h: '24"', w: '14"', d: '12"' },
        weight: '14.5 kg',
        edition: 'Limited of 5',
        medium: 'Hand-Polished Gypsum',
        description: 'A variation on the classical form, emphasizing different lighting angles.',
        materials: ['Gypsum']
    },
    {
        id: '6',
        title: 'Fragmented Torso II',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD516A94Vzz5bXbp8M5j3GjqwsRpzxLjGMoJvmadzQcfaEP7KHxB8HYO6eUvlZKN7kIXRPBG408jvgAnK67Zh68eJY510SJbUZKhR39v380Mk0qYd6Ho5GRgzzK7wwMDZYR3Misjd1B5pCMA1sQiinPt7SF0SQ-uTwMJi-r2iCvuDQnR1QnCFtV1ayZQz5EkJjlKMWU5BjiyU1_YqR-McrP89b6iWp-xFwkNaPwS-HL1WoXW2JvlmvutyzeQRTkvn86uYRMytnle35e',
        price: '$4,500',
        category: 'gypsum',
        dimensions: { h: '32"', w: '18"', d: '14"' },
        weight: '18.5 kg',
        edition: 'Limited of 3',
        medium: 'Reinforced Plaster',
        description: 'A robust exploration of the torso form, capturing strength and fragility.',
        materials: ['Gypsum']
    },
    // Bronze Collection
    {
        id: '7',
        title: 'Bronze Figure Study I',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtyEU7mv0frFV-6qTUiHWc62y19pXEnci-t0nNfL8mtUIf8Ngxthmol_BOaT6_CJXZlB9ksLU5IGrPNKUTlWCQl8dV0R2V2CmHc-a0XxfheDauxz-SNOU2WMYlhQfvgx6ZiG9bnCQvVslZfo7B6gY3RtEQrGbcC1Wq-XlPq-1BNtSCqxNs2BnygtpqveWtxs5_2KaG5R_8CAtIFOE2G9X9TWT3lsgxYZBYne8IsCikZj3xtRB_8zSsn2auGeZg9vrc7V0cBmcNduFN', // Placeholder
        price: '$5,200',
        category: 'bronze',
        dimensions: { h: '12"', w: '8"', d: '8"' },
        weight: '8.5 kg',
        edition: 'Limited of 8',
        medium: 'Cast Bronze',
        description: 'Small scale figure study cast in bronze with a warm, classical patina.',
        materials: ['Bronze', 'Patina']
    },
    {
        id: '8',
        title: 'Oxidized Torso',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0r3vnn1yxtubD9_0TgnzUCgoBHiOviykDhLpxM1Ez-hflCz5OnQNx7QLUczjhyd8O_lMUOHjN1STMGLIg1y7E40sUKxJLJH2cVpiDMEPELfVPWLQXSvvwD0juuZm6HyLIp_ycy11oU2zXy3Hw-dS2X7f7xY5qohCFMCzzyW2DnvK5QEAEREEWQ17I9tBT-V03XYQju-X80q3DxQeh_H7GVo8OAiBSUNF1F_bWZ4ILcJNITDJ_fKeaahQ8tQoqWAlGCH1OwQs36kxh', // Reusing for placeholder
        price: '$6,800',
        category: 'bronze',
        dimensions: { h: '28"', w: '16"', d: '10"' },
        weight: '24.0 kg',
        edition: 'Limited of 5',
        medium: 'Oxidized Bronze',
        description: 'A powerful torso form with a distinctive oxidized finish, highlighting the texture.',
        materials: ['Bronze', 'Oxidized Patina']
    },
    {
        id: '9',
        title: 'Abstract Form in Bronze',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI3R4Wb3iSl4JOCmlbG6yaYKrgxKsATqoGMCXnK29scRitBdVhuHm8GOmK1zCxZsxFnMY_sKDUkqXmpEAqIWScIahs0nPzy3tUuoDsDHr7NlJYuLH-veaM1IqTS3B5ykWOtZAKRQl9lWXnGlBKwkf0cfjm8m2vcGNvJvxymQWYKO5WqNzGx9ZlsBgI08VCxNZG9p-kNL0MVsVX6cDaEJtJTll_085iZdDgxmqR2v9H4ijB8nyJpSFDrMGutqfpFr9V6Mz8JOc4qM9l', // Reusing for placeholder
        price: '$4,100',
        category: 'bronze',
        dimensions: { h: '18"', w: '12"', d: '12"' },
        weight: '15.0 kg',
        edition: 'Unique',
        medium: 'Polished Bronze',
        description: 'Abstract extraction of form, polished to a high sheen to reflect its surroundings.',
        materials: ['Bronze']
    },
    // Clear Collection (Resin/Glass)
    {
        id: '10',
        title: 'Crystal Relief',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8buzgm3JtJeRyYtELm4BjP5lQZWDgDOy3N-pQvHWAJhA_xnBYrPp5yQWyDAlQZKgoUIkaMhL7b82q43wWupKUB1MnTAyhAMI3ALKtKewbNwUOQHqiCz42f76WSc1M05jyIAgpmnpKqqNdcJP5zD9D7rdncpPHo3dUrtAY4jYa4eIcKC3rNcE95OsvbLK-xHpDXQBt_akeheu0NJlRpHCjFRH5WJr9ANvE-nze5Q2uGyoMNxr6lRnO_1C9_O-2WgZzL4ZBUKWFdWzr', // Hero image as Clear placeholder
        price: '$3,500',
        category: 'clear',
        dimensions: { h: '14"', w: '10"', d: '2"' },
        weight: '3.2 kg',
        edition: 'Limited of 20',
        medium: 'Optical Resin',
        description: 'Clear resin relief that plays with light transmission and refraction.',
        materials: ['Optical Resin']
    },
    {
        id: '11',
        title: 'Translucent Bust',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAkqwydZ49NoavhwoQNNOt73qleG4OeI0Q007TDPH529gAJ9YA0W1W5So-s-f123YIZSvOYX1IfZyvaw-AqOFaiva7G2yPbtokUI0rDLUvYYVK5MeMiEgOrn71Fk1E8DVqDxsUjFL291sC8r_I4RcvN5ZWoYeE_emcTGIZFPfdbyYl_GSoCev0tTxKBE9DMi90d5lFPqxsY8qJDPypBpi2jEQwEnT-FRT-icNb_2eFWrav7vjJUOHA_GHEyysd8yg2yN6Ysl-eE3CX', // Reusing
        price: '$3,800',
        category: 'clear',
        dimensions: { h: '22"', w: '12"', d: '12"' },
        weight: '9.8 kg',
        edition: 'Limited of 10',
        medium: 'Clear Resin',
        description: 'A ghostly presence, this clear bust captures the essence of the form without the weight.',
        materials: ['Clear Resin']
    }
];
