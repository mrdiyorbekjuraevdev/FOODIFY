"use client";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@foodify/design-system/components/modal";
import { createContext, useCallback, useContext, useState } from "react";
import { Button } from "@foodify/design-system/components/button";

type ConfirmOptions = {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    size?: "sm" | "md" | "lg" | "xl";
};

type ConfirmContextType = ((options: ConfirmOptions) => Promise<boolean>) & {
    setLoading: (loading: boolean) => void;
    close: () => void;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({});
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const confirm = useCallback((opts: ConfirmOptions) => {
        setOptions(opts);
        setIsOpen(true);
        setIsLoading(false);
        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    }, []);

    (confirm as ConfirmContextType).setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    (confirm as ConfirmContextType).close = () => {
        setIsOpen(false);
        resolver?.(true);
        setResolver(null);
    };

    const handleCancel = () => {
        setIsOpen(false);
        resolver?.(false);
        setResolver(null);
    };

    return (
        <ConfirmContext.Provider value={confirm as ConfirmContextType}>
            {children}
            <Modal
                isOpen={isOpen}
                size={options.size || "md"}
                onClose={handleCancel}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>{options.title || "Confirm Action"}</ModalHeader>
                            <ModalBody>
                                <p>{options.message || "Are you sure you want to proceed?"}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={handleCancel}
                                    isDisabled={isLoading}
                                >
                                    {options.cancelText || "Cancel"}
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => resolver?.(true)} // <-- no close here
                                    isLoading={isLoading}
                                >
                                    {options.confirmText || "Confirm"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
    return ctx;
}
