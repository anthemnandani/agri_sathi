'use client';

import React, { useState } from 'react';
import { Upload, Camera, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function DiagnosticsSection() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cropDetails, setCropDetails] = useState('');
  const [diagnosis, setDiagnosis] = useState<{
    disease: string;
    confidence: number;
    treatment: string;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        toast.success('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setLoading(true);
    try {
      // Mock API call - simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDiagnosis({
        disease: 'Early Blight',
        confidence: 92,
        treatment:
          'Apply fungicide containing chlorothalonil or copper sulfate. Increase air circulation by pruning lower leaves. Avoid overhead irrigation.',
      });
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Crop Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-accent transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {uploadedImage ? (
                <>
                  <div className="h-32 w-32 rounded-lg overflow-hidden">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to change image
                  </p>
                </>
              ) : (
                <>
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    Click to upload image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or drag and drop (JPG, PNG)
                  </p>
                </>
              )}
            </label>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Crop Details (Optional)
            </label>
            <Textarea
              placeholder="Describe the symptoms, affected area, plant age, etc."
              value={cropDetails}
              onChange={(e) => setCropDetails(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !uploadedImage}
            className="w-full"
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Diagnosis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {diagnosis ? (
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Detected Issue
                </p>
                <p className="text-xl font-bold text-foreground">
                  {diagnosis.disease}
                </p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${diagnosis.confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Confidence: {diagnosis.confidence}%
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">
                  Recommended Treatment
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {diagnosis.treatment}
                </p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> For best results, consult with local
                  agricultural experts or extension officers.
                </p>
              </div>

              <Button variant="outline" className="w-full">
                Connect with Expert
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                Upload and analyze an image to see diagnosis results
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
