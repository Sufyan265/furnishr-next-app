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
    'nordic-oak-table': getImages(['product-table-1']),
    'cloud-nine-bed': getImages(['product-bed-1']),
    'artisans-touch-chair': getImages(['product-chair-1']),
    'executive-desk': getImages(['product-desk-1']),
    'ladder-bookshelf': getImages(['product-bookshelf-1']),
    'arc-floor-lamp': getImages(['product-lamp-1']),
    'geo-pattern-rug': getImages(['product-rug-1']),
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

export { getImage, getImages };
