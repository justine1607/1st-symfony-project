<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class MediaUrlExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('media_url', [$this, 'getMediaUrl']),
            new TwigFunction('media_parameter', [$this, 'getMediaUrl']),
        ];
    }

    public function getMediaUrl(array $media): string
    {
        $mediaId = $media['id'];
        $extension = $media['extension'];

        // Build the filename based on id and extension (e.g., 1.png)
        $filename = $mediaId . '.' . $extension;

        // Return the public path
        return '/build/media/' . $filename;
    }
    public function getMediaParameter(array $media, string $parameter): ?string
    {
        return $media['parameters'][$parameter] ?? null;
    }
    public function getFilters(): array
    {
        return [
            new TwigFilter('html_sanitize', [$this, 'sanitizeHtml'], ['is_safe' => ['html']]),
        ];
    }
    public function sanitizeHtml(?string $value): string
    {
        return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
