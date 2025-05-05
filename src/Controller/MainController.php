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
    #[Route('/block/{blockName}', name: 'block_show', defaults: ['blockName' => null])]
    public function homepage(?string $blockName = null): Response
    {
        $projectDir = $this->getParameter('kernel.project_dir');

        // Load navigation
        $navPath = $projectDir . '/data/navigation.json';
        $navigationData = $this->jsonDataLoader->load($navPath);

        // Determine block(s) to load
        $blockDir = $projectDir . '/data/block/';
        $pattern = $blockName ? $blockDir . $blockName . '*.json' : $blockDir . '*.json';
        $matchedFiles = glob($pattern);

        if (empty($matchedFiles)) {
            throw $this->createNotFoundException("No blocks found for " . ($blockName ?? 'homepage'));
        }

        usort($matchedFiles, fn($a, $b) => strcmp(pathinfo($a, PATHINFO_FILENAME), pathinfo($b, PATHINFO_FILENAME)));

        $blocks = [];
        foreach ($matchedFiles as $file) {
            $blockData = $this->jsonDataLoader->load($file);
            if (isset($blockData['data']['block'])) {
                if (isset($blockData['template'])) {
                    $blockData['data']['block']['template'] = $blockData['template'];
                }
                $blocks[] = $blockData['data']['block'];
            }
        }

        return $this->render('base.html.twig', [
            'navigation' => $navigationData['navigation'] ?? [],
            'blocks' => $blocks,
        ]);
    }


}
