<?php

namespace App\Controller;

use App\Service\JsonDataLoader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
class MainController extends AbstractController
{
    private $jsonDataLoader;

    public function __construct(JsonDataLoader $jsonDataLoader)
    {
        $this->jsonDataLoader = $jsonDataLoader;
    }



    // The homepage route now handles both `/` and `/block/{blockName}`.
    #[Route('/', name: 'homepage')]
    #[Route('/block/{blockName}', name: 'show_block', defaults: ['blockName' => null])]
    public function homepage(string $blockName = null): Response
    {
        // Load data dynamically for navigation
        $filePathHome = $this->getParameter('kernel.project_dir') . '/data/navigation.json';
        $dataHome = $this->jsonDataLoader->load($filePathHome);

        // Default block path if no specific block name is provided
        $directoryPath = $this->getParameter('kernel.project_dir') . '/data/block/';

        // If blockName is provided (i.e., coming from the block route), filter based on it
        if ($blockName) {
            $filePattern = $directoryPath . $blockName . '*.json';
        } else {
            // Otherwise, load all block files for the homepage
            $filePattern = $directoryPath . '*.json';
        }

        // Use glob to find matching files
        $matchedFiles = glob($filePattern);

        // Sort files alphabetically (optional)
        usort($matchedFiles, function ($a, $b) {
            return strcmp(pathinfo($a, PATHINFO_FILENAME), pathinfo($b, PATHINFO_FILENAME));
        });

        $blocks = [];

        // Load each matched JSON file
        foreach ($matchedFiles as $file) {
            if (file_exists($file)) {
                $blockData = $this->jsonDataLoader->load($file);

                // Check if the block data is valid
                if (isset($blockData['data']['block'])) {
                    // If coming from a specific block, add the template information
                    if ($blockName && isset($blockData['template'])) {
                        $blockData['data']['block']['template'] = $blockData['template'];
                    }
                    // Add each block's data to the blocks array
                    $blocks[] = $blockData['data']['block'];
                }
            }
        }

        // If no blocks found, handle the error
        if (empty($blocks)) {
            throw $this->createNotFoundException('No blocks found or invalid block data structure.');
        }

        // Render the appropriate template
        return $this->render('base.html.twig', [
            'navigation' => $dataHome['navigation'],
            'blocks' => $blocks,  // Pass the loaded blocks data to the template
        ]);
    }
}
