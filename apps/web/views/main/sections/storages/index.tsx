"use client"
import Body from "./customs/body";
import StorageModal from "./modals";
import { useStorageStore } from "@/stores/main/storages";
import { Button } from "@foodify/design-system/components/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@foodify/design-system/components/resizable";
import Canvas from "./customs/canvas";

const Storages = () => {
    const { modal: { open }, canvas: { open: canvasOpen }, openCanvas } = useStorageStore();
    return (
        <div className="flex flex-row h-[calc(100vh-70px)] w-full bg-background">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className="min-w-[450px] p-4">
                    <Body />
                </ResizablePanel>
                {canvasOpen &&
                    <>
                        <ResizableHandle withHandle />
                        <ResizablePanel
                            className="relative w-full min-w-[450px] border-l dark:border-zinc-800 border-zinc-200 bg-[var(--layer-01)]"
                        >
                            <Canvas />
                        </ResizablePanel></>
                }
                {open && <StorageModal />}
            </ResizablePanelGroup>
        </div >
    )
}

export default Storages
