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
    'urban-elegance-sofa': getImages(['product-sofa-1', 'product-sofa-2', 'product-sofa-3']),
    'ambassador-bed': getImages(['product-bed-ambassador-1', 'product-bed-ambassador-2', 'product-bed-ambassador-3', 'product-bed-ambassador-4', 'product-bed-ambassador-5', 'product-bed-ambassador-6', 'product-bed-ambassador-7', 'product-bed-ambassador-8', 'product-bed-ambassador-9', 'product-bed-ambassador-10']),
    'sleigh-bed': getImages(['product-bed-sleigh-1', 'product-bed-sleigh-2', 'product-bed-sleigh-3', 'product-bed-sleigh-4', 'product-bed-sleigh-5', 'product-bed-sleigh-6', 'product-bed-sleigh-7', 'product-bed-sleigh-8', 'product-bed-sleigh-9', 'product-bed-sleigh-10', 'product-bed-sleigh-11']),
    'divan-ottoman-bed': getImages(['product-bed-divan-1']),
    'mirror-bed': getImages(['product-bed-mirror-1']),
    'panel-ambassador-bed': getImages(['product-bed-panel-ambassador-1']),
    'panel-bumper-bed': getImages(['product-bed-panel-bumper-1']),
    'panel-line-bed': getImages(['product-bed-panel-line-1']),
    'panel-wing-back-bed': getImages(['product-bed-panel-wing-back-1']),
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

    
