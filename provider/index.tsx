'use client';
import {ReactNode} from "react";
import {PRISMANE_COLORS, PrismaneProvider} from "@prismane/core";
import Template from "@/template";

interface Props {
    children: ReactNode;
}

export default function Provider({children}: Props) {
    const theme = {
        mode: "all",
        colors: {
            primary: { ...PRISMANE_COLORS.ruby },
            base: { ...PRISMANE_COLORS.slate },
        },
        spacing: '4px',
        fontFamily: 'Inter',
    };

    return (
        <PrismaneProvider theme={theme}>
            <Template>
                {children}
            </Template>
        </PrismaneProvider>
    )
}