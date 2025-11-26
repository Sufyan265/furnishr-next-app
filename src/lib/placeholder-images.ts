
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const allImages: ImagePlaceholder[] = data.placeholderImages;

function getImage(id: string): ImagePlaceholder {
    const image = allImages.find(img => img.id === id);
    if (!image) {
        // Return a default or throw an error
        return {
            id: 'not-found',
            description: 'Image not found',
            imageUrl: 'https://picsum.photos/seed/notfound/800/800',
            imageHint: 'placeholder'
        }
    }
    return image;
}

function getImages(ids: string[]): ImagePlaceholder[] {
    return ids.map(id => getImage(id));
}

// Specific exports for easier access
export const heroImages = [
    getImage('hero-1'),
    getImage('hero-2'),
    getImage('hero-3'),
];

export const productImages = {
    'aokland-sofa': getImages(['product-sofa-1', 'product-sofa-2', 'product-sofa-3', 'product-sofa-4', 'product-sofa-5', 'product-sofa-6', 'product-sofa-7', 'product-sofa-8', 'product-sofa-9']),
    'artic-sofa-bed': getImages(['product-artic-sofa-1', 'product-artic-sofa-2']),
    'ashwin-sofa-bed': getImages(['product-ashwin-sofa-1', 'product-ashwin-sofa-2', 'product-ashwin-sofa-3', 'product-ashwin-sofa-4', 'product-ashwin-sofa-5', 'product-ashwin-sofa-6', 'product-ashwin-sofa-7', 'product-ashwin-sofa-8']),
    'chesterfield-sofa': getImages(['product-chesterfield-sofa-1', 'product-chesterfield-sofa-2', 'product-chesterfield-sofa-3', 'product-chesterfield-sofa-4', 'product-chesterfield-sofa-5', 'product-chesterfield-sofa-6', 'product-chesterfield-sofa-7']),
    'dino-sofa': getImages(['product-dino-sofa-1', 'product-dino-sofa-2', 'product-dino-sofa-3', 'product-dino-sofa-4', 'product-dino-sofa-5', 'product-dino-sofa-6', 'product-dino-sofa-7', 'product-dino-sofa-8', 'product-dino-sofa-9', 'product-dino-sofa-10']),
    'dylan-sofa': getImages(['product-dylan-sofa-1', 'product-dylan-sofa-2', 'product-dylan-sofa-3', 'product-dylan-sofa-4', 'product-dylan-sofa-5', 'product-dylan-sofa-6', 'product-dylan-sofa-7', 'product-dylan-sofa-8', 'product-dylan-sofa-9', 'product-dylan-sofa-10']),
    'electric-recliner-sofa': getImages(['product-electric-recliner-1', 'product-electric-recliner-2', 'product-electric-recliner-3']),
    'harrison-sofa': getImages(['product-harrison-sofa-1', 'product-harrison-sofa-2', 'product-harrison-sofa-3', 'product-harrison-sofa-4', 'product-harrison-sofa-5', 'product-harrison-sofa-6', 'product-harrison-sofa-7']),
    'ikea-berlin-sofa-bed': getImages(['product-ikea-berlin-sofa-1', 'product-ikea-berlin-sofa-2', 'product-ikea-berlin-sofa-3', 'product-ikea-berlin-sofa-4', 'product-ikea-berlin-sofa-5', 'product-ikea-berlin-sofa-6']),
    'lilly-sofa': getImages(['product-lilly-sofa-1', 'product-lilly-sofa-2', 'product-lilly-sofa-3']),
    'mini-u-shape-sofa': getImages(['product-mini-u-shape-sofa-1', 'product-mini-u-shape-sofa-2', 'product-mini-u-shape-sofa-3', 'product-mini-u-shape-sofa-4', 'product-mini-u-shape-sofa-5', 'product-mini-u-shape-sofa-6', 'product-mini-u-shape-sofa-7']),
    'roma-leather-recliner-sofa': getImages(['product-roma-recliner-1', 'product-roma-recliner-2', 'product-roma-recliner-3', 'product-roma-recliner-4', 'product-roma-recliner-5', 'product-roma-recliner-6', 'product-roma-recliner-7', 'product-roma-recliner-8']),
    'shannon-sofa': getImages(['product-shannon-sofa-1', 'product-shannon-sofa-2', 'product-shannon-sofa-3', 'product-shannon-sofa-4', 'product-shannon-sofa-5', 'product-shannon-sofa-6']),
    'sorrento-fabric-recliner': getImages(['product-sorrento-recliner-1', 'product-sorrento-recliner-2', 'product-sorrento-recliner-3', 'product-sorrento-recliner-4', 'product-sorrento-recliner-5']),
    'verona-u-shape-sofa': getImages(['product-verona-u-shape-sofa-1', 'product-verona-u-shape-sofa-2', 'product-verona-u-shape-sofa-3', 'product-verona-u-shape-sofa-4', 'product-verona-u-shape-sofa-5', 'product-verona-u-shape-sofa-6']),
    'verona-sofa': getImages(['product-verona-sofa-1', 'product-verona-sofa-2', 'product-verona-sofa-3']),
    'ambassador-bed': getImages(['product-bed-ambassador-1', 'product-bed-ambassador-2', 'product-bed-ambassador-3', 'product-bed-ambassador-4', 'product-bed-ambassador-5', 'product-bed-ambassador-6', 'product-bed-ambassador-7', 'product-bed-ambassador-8', 'product-bed-ambassador-9', 'product-bed-ambassador-10']),
    'sleigh-bed': getImages(['product-bed-sleigh-1', 'product-bed-sleigh-2', 'product-bed-sleigh-3', 'product-bed-sleigh-4', 'product-bed-sleigh-5', 'product-bed-sleigh-6', 'product-bed-sleigh-7', 'product-bed-sleigh-8', 'product-bed-sleigh-9', 'product-bed-sleigh-10', 'product-bed-sleigh-11']),
    'divan-ottoman-bed': getImages(['product-bed-divan-1', 'product-bed-divan-2', 'product-bed-divan-3', 'product-bed-divan-4', 'product-bed-divan-5', 'product-bed-divan-6', 'product-bed-divan-7', 'product-bed-divan-8', 'product-bed-divan-9', 'product-bed-divan-10', 'product-bed-divan-11']),
    'mirror-bed': getImages(['product-bed-mirror-1', 'product-bed-mirror-2', 'product-bed-mirror-3', 'product-bed-mirror-4', 'product-bed-mirror-5', 'product-bed-mirror-6', 'product-bed-mirror-7', 'product-bed-mirror-8', 'product-bed-mirror-9', 'product-bed-mirror-10', 'product-bed-mirror-11']),
    'panel-ambassador-bed': getImages(['product-bed-panel-ambassador-1', 'product-bed-panel-ambassador-2', 'product-bed-panel-ambassador-3', 'product-bed-panel-ambassador-4']),
    'panel-bumper-bed': getImages(['product-bed-panel-bumper-1', 'product-bed-panel-bumper-2', 'product-bed-panel-bumper-3', 'product-bed-panel-bumper-4']),
    'panel-line-bed': getImages(['product-bed-panel-line-1', 'product-bed-panel-line-2', 'product-bed-panel-line-3', 'product-bed-panel-line-4', 'product-bed-panel-line-5', 'product-bed-panel-line-6', 'product-bed-panel-line-7', 'product-bed-panel-line-8', 'product-bed-panel-line-9', 'product-bed-panel-line-10']),
    'panel-wing-back-bed': getImages(['product-bed-panel-wing-back-1', 'product-bed-panel-wing-back-2', 'product-bed-panel-wing-back-3', 'product-bed-panel-wing-back-4', 'product-bed-panel-wing-back-5', 'product-bed-panel-wing-back-6', 'product-bed-panel-wing-back-7', 'product-bed-panel-wing-back-8', 'product-bed-panel-wing-back-9', 'product-bed-panel-wing-back-10', 'product-bed-panel-wing-back-11', 'product-bed-panel-wing-back-12']),
};

export const categoryImages = {
    'living-room': getImage('category-living-room'),
    'bedroom': getImage('category-bedroom'),
    'dining': getImage('category-dining'),
    'office': getImage('category-office'),
}

export const blogImages = {
    'blog-1': getImage('blog-1'),
    'blog-2': getImage('blog-2'),
    'blog-3': getImage('blog-3'),
}

export const aboutImage = getImage('about-us');
export const contactImage = getImage('contact-us');
export const worldMapImage = getImage('world-map');

export { getImage, getImages };

    
    
    





    


