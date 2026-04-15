'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

interface ReviewSectionProps {
  toolId: string;
}

export function ReviewSection({ toolId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    user: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/rental-tools/reviews?toolId=${toolId}`);
        if (response.ok) {
          const result = await response.json();
          setReviews(result.data || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [toolId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/rental-tools/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId,
          ...formData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setReviews([result.data, ...reviews]);
        setFormData({ rating: 5, comment: '', user: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('[v0] Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Reviews</h3>

        {/* Write Review Button */}
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            className="mb-6"
          >
            Write a Review
          </Button>
        )}

        {/* Review Form */}
        {showForm && (
          <Card className="p-4 mb-6">
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Your Name</Label>
                <Input
                  type="text"
                  value={formData.user}
                  onChange={(e) =>
                    setFormData({ ...formData, user: e.target.value })
                  }
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, rating: star })
                      }
                      className="text-2xl transition-transform hover:scale-110"
                    >
                      {star <= formData.rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Comment</Label>
                <Textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  placeholder="Share your experience..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {review.user}
                      {review.verified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground">{review.comment}</p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-sm">
              No reviews yet. Be the first to review!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
