"use client";

import { Button } from "@/components/ui";

type ContactButtonProps = {
    label?: string;
    onClick?: () => void;
};

export default function ContactButton({ label = "Contact", onClick }: ContactButtonProps) {
    return (
        <Button
            variant="primary"
            size="md"
            onClick={onClick}
        >
            {label}
        </Button>
    );
}