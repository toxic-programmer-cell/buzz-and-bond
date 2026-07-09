"use client";

import { Button } from "@/components/ui";

type ContactButtonProps = {
    label?: string;
};

export default function ContactButton({ label = "Contact" }: ContactButtonProps) {
    return (
        <Button
            variant="primary"
            size="md"
        >
            {label}
        </Button>
    );
}