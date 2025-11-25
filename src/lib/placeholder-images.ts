
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
    'aokland-sofa': getImages(['product-sofa-1', 'product-sofa-2', 'product-sofa-3']),
    'artic-sofa-bed': getImages(['product-artic-sofa-1', 'product-artic-sofa-2', 'product-artic-sofa-3']),
    'ashwin-sofa-bed': getImages(['product-ashwin-sofa-1', 'product-ashwin-sofa-2', 'product-ashwin-sofa-3']),
    'chesterfield-sofa': getImages(['product-chesterfield-sofa-1', 'product-chesterfield-sofa-2', 'product-chesterfield-sofa-3']),
    'dino-sofa': getImages(['product-dino-sofa-1', 'product-dino-sofa-2', 'product-dino-sofa-3']),
    'dylan-sofa': getImages(['product-dylan-sofa-1', 'product-dylan-sofa-2', 'product-dylan-sofa-3']),
    'electric-recliner-sofa': getImages(['product-electric-recliner-1', 'product-electric-recliner-2', 'product-electric-recliner-3']),
    'harrison-sofa': getImages(['product-harrison-sofa-1', 'product-harrison-sofa-2', 'product-harrison-sofa-3']),
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

    


