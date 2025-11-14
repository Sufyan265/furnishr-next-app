import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  starClassName?: string;
}

const StarRating = ({ rating, totalStars = 5, className, starClassName }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn("w-5 h-5 text-accent fill-accent", starClassName)} />
      ))}
      {halfStar && (
        <div className="relative w-5 h-5">
            <Star className={cn("w-5 h-5 text-accent absolute", starClassName)} />
            <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
                <Star className={cn("w-5 h-5 text-accent fill-accent", starClassName)} />
            </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn("w-5 h-5 text-accent", starClassName)} />
      ))}
    </div>
  );
};

export default StarRating;
