"use client";

import {
    formatBytes,
    useFileUpload,
    type FileWithPreview,
} from "@foodify/design-system/hooks/useFileUpload";
import { Alert } from "@foodify/design-system/components/alert";
import { Button } from "@foodify/design-system/components/button";
import { Camera, Trash, TriangleAlert } from "lucide-react";
import { Typography } from "@foodify/design-system/components/typography";
import { cn } from "@foodify/design-system/lib/utils";
import { Avatar } from "@foodify/design-system/components/avatar";
import { useCallback, useEffect } from "react";
import { ButtonProps } from "@heroui/button";

interface AvatarUploadProps {
    /** Maximum file size allowed (in bytes). Defaults to 2MB. */
    maxSize?: number;
    /** Additional custom className for the root container. */
    className?: string;
    /**
     * Callback fired when the selected file changes.
     * Receives the first file (with preview) or `null` if removed.
     */
    onFileChange?: (file: FileWithPreview | null) => void;
    /** Default avatar image URL shown when no file is uploaded. */
    defaultAvatar?: string;
    /** Display name used for generating fallback initials if no image is present. */
    name?: string;
    /** Shape of the avatar preview. */
    variant?: "rounded" | "circle";
    /** Title text shown beside the avatar (e.g., "Profile Picture"). */
    title?: string;
    /** Short description shown under the title. */
    shortDescription?: string;
    /** Additional props for the remove button. */
    removeButtonProps?: ButtonProps;
    /** Additional props for the upload button. */
    uploadButtonProps?: ButtonProps;
}

/**
 * AvatarUpload component provides a UI for uploading and previewing
 * a user profile picture. Supports drag-and-drop, validation for file
 * size/type, and graceful fallback to initials when no image is uploaded.
 *
 * Key Features:
 * - Drag & drop or click-to-upload
 * - Preview uploaded image
 * - Remove uploaded image
 * - Fallback with user initials when no image
 * - Validation with error display
 *
 * @param {AvatarUploadProps} props - Configuration props for the component.
 * @returns {JSX.Element} The rendered AvatarUpload component.
 *
 * @example
 * ```tsx
 * <AvatarUpload
 *   name="Jane Doe"
 *   defaultAvatar="/avatars/default.png"
 *   onFileChange={(file) => console.log(file)}
 *   variant="circle"
 *   title="Profile Photo"
 *   shortDescription="Upload a JPG, PNG, or GIF under"
 * />
 * ```
 */
function AvatarUpload({
    maxSize = 2 * 1024 * 1024, // 2MB
    className,
    onFileChange,
    defaultAvatar,
    name,
    variant = "rounded",
    title = "Profile Picture",
    shortDescription = "We only support PNGs, JPEGs and GIFs under",
    removeButtonProps,
    uploadButtonProps,
}: Readonly<AvatarUploadProps>) {
    const [
        { files, isDragging, errors },
        {
            removeFile,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            getInputProps,
        },
    ] = useFileUpload({
        maxFiles: 1,
        maxSize,
        accept: "image/*",
        multiple: false,
        onFilesChange: (files) => {
            onFileChange?.(files[0] || null);
        },
    });

    const avatarClassName = cn(
        "size-[72px] rounded-2xl",
        variant === "circle" && "rounded-full"
    );


    const avatarShape = variant === "circle" ? "rounded-full" : "rounded-2xl";
    const currentFile = files[0];
    const previewUrl = currentFile?.preview || defaultAvatar;


    // cleanup previews to prevent memory leaks
    useEffect(() => {
        return () => {
            if (files) {
                files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
            }
        };
    }, [files]);

    const handleRemove = useCallback(() => {
        if (currentFile) {
            removeFile(currentFile.id);
        }
    }, [currentFile, removeFile]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
                openFileDialog();
            }
        },
        [openFileDialog]
    );


    return (
        <div className={cn("flex flex-col items-center gap-4", className)}>
            {/* Avatar Preview */}
            <div className="relative flex items-center gap-2">
                <div
                    className={cn(
                        "group/avatar size-[72px] relative cursor-pointer overflow-hidden border border-dashed transition-colors group",
                        isDragging
                            ? "border-[var(--interactive)] bg-[var(--interactive)/5]"
                            : "border-muted-foreground/25 hover:border-muted-foreground/20",
                        previewUrl && "border-solid",
                        variant === "circle" ? "rounded-full" : "rounded-2xl"
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload avatar"
                    aria-describedby="avatar-upload-description"
                    aria-pressed={isDragging}
                    aria-disabled={isDragging}
                    aria-live="polite"
                    onKeyDown={handleKeyDown}
                >
                    <input {...getInputProps()} className="sr-only" />
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Avatar"
                            className="h-full w-full object-cover group-hover:opacity-70 opacity-100 transition-opacity duration-300"
                        />
                    ) : (
                        <div
                            color="primary"
                            className={cn(
                                "flex size-[72px] h-full w-full text-2xl items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-300 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
                                avatarShape
                            )}
                        >
                            {name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center object-cover group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                        <Camera className="size-6" width={24} height={24} color="#ccc" />
                    </div>
                </div>

                {/* Title, description and action buttons */}
                <div className="space-y-0.5">
                    <div>
                        <Typography as="p" className="text-sm font-medium">
                            {title}
                        </Typography>
                        <Typography as="p" className="text-xs">
                            {shortDescription} {formatBytes(maxSize)}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            onPress={openFileDialog}
                            prepend={<Camera />}
                            {...uploadButtonProps}
                        >
                            Upload
                        </Button>
                        {currentFile && (
                            <Button
                                color="danger"
                                onPress={handleRemove}
                                size="sm"
                                hasIconOnly
                                aria-label="Remove avatar"
                                {...removeButtonProps}
                            >
                                <Trash className="size-3.5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Messages */}
            {errors?.length > 0 && (
                <Alert color="danger" className="mt-2">
                    <TriangleAlert />
                    {errors?.map((error, index) => (
                        <p key={index} className="last:mb-0">
                            {error}
                        </p>
                    ))}
                </Alert>
            )}
        </div>
    );
}

export { AvatarUpload, type AvatarUploadProps };
