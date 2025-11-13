<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class File
{
    /**
     * Upload a file to a disk and return the path.
     *
     * @param UploadedFile $file
     * @param string $folder
     * @param string $disk
     * @return string|null
     */
    public static function uploadFile(UploadedFile $file, string $folder = 'uploads', string $disk = 'public'): ?string
    {
        if (!$file) {
            return null;
        }

        return $file->store($folder, $disk);
    }

    /**
     * Safely delete a file from storage if it exists.
     *
     * @param string|null $path
     * @param string $disk
     * @return bool
     */
    public static function deleteFile(?string $path, string $disk = 'public'): bool
    {
        if (!$path) {
            return false;
        }

        if (Storage::disk($disk)->exists($path)) {
            return Storage::disk($disk)->delete($path);
        }

        return false;
    }
}
