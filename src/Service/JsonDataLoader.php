<?php

namespace App\Service;

class JsonDataLoader
{
    public function load(string $filePath)
    {
        return json_decode(file_get_contents($filePath), true);
    }
}

