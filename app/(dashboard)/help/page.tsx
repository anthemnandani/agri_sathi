import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Help & Support - AgriSathi',
  description: 'Get help with AgriSathi',
};

export default function HelpPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and get support
        </p>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I list my products on the marketplace?
              </AccordionTrigger>
              <AccordionContent>
                Go to My Products, click &quot;Add New Product&quot;, fill in the details, upload images, and publish. Your product will appear in the marketplace immediately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                How does the AI crop diagnostics work?
              </AccordionTrigger>
              <AccordionContent>
                Upload a photo of your crop leaf in the Expert Talk section. Our AI analyzes the image and provides diagnosis with recommended treatments. Always consult with local experts for confirmation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I request specific government schemes?
              </AccordionTrigger>
              <AccordionContent>
                The schemes page shows all available schemes. Click &quot;Apply Now&quot; to be directed to the official application page. We also send notifications when new schemes are added.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                How do I hire a worker or service provider?
              </AccordionTrigger>
              <AccordionContent>
                Browse the Workers page, select a professional based on rating and specialization, and click &quot;Hire&quot; or &quot;Call&quot;. Negotiate rates directly with them.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                Are weather alerts customizable?
              </AccordionTrigger>
              <AccordionContent>
                Yes! In Weather & Alerts, you can set preferences for alert types and severity levels. You&apos;ll receive notifications for critical agricultural alerts in your area.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>
            Get in touch with our support team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-foreground">Email</p>
            <p className="text-sm text-muted-foreground">support@agrisathi.com</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Phone</p>
            <p className="text-sm text-muted-foreground">+91 1800-SATHI-00</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Hours</p>
            <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM IST</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
