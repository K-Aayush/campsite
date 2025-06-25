"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/utils/Toast";
import {
  Settings,
  Save,
  Database,
  Mail,
  Globe,
  Phone,
  MapPin,
  Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsData>({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      showToast("error", {
        title: "Failed to load settings",
        description: "Please try refreshing the page",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings.siteName.trim()) {
      showToast("error", { title: "Site name is required" });
      return;
    }

    if (!settings.contactEmail.trim()) {
      showToast("error", { title: "Contact email is required" });
      return;
    }

    if (!settings.contactPhone.trim()) {
      showToast("error", { title: "Contact phone is required" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      showToast("success", {
        title: "Settings saved successfully",
        description: "Your changes have been applied",
      });
    } catch (error: any) {
      console.error("Error saving settings:", error);
      showToast("error", {
        title: "Failed to save settings",
        description: error.message || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SettingsData, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialMediaChange = (
    platform: keyof SettingsData["socialMedia"],
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  if (fetchLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-gray-600" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-gray-600" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Site Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name *</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
                placeholder="Enter site name"
                required
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  handleInputChange("siteDescription", e.target.value)
                }
                placeholder="Enter site description"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contactEmail" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Email *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
                placeholder="contact@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="contactPhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Phone *
              </Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) =>
                  handleInputChange("contactPhone", e.target.value)
                }
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter business address"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/yourpage"
                value={settings.socialMedia.facebook}
                onChange={(e) =>
                  handleSocialMediaChange("facebook", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/yourpage"
                value={settings.socialMedia.instagram}
                onChange={(e) =>
                  handleSocialMediaChange("instagram", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                placeholder="https://twitter.com/yourpage"
                value={settings.socialMedia.twitter}
                onChange={(e) =>
                  handleSocialMediaChange("twitter", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Version:</span>
                <p className="text-gray-600">1.0.0</p>
              </div>
              <div>
                <span className="font-medium">Environment:</span>
                <p className="text-gray-600">Production</p>
              </div>
              <div>
                <span className="font-medium">Database:</span>
                <p className="text-gray-600">MongoDB</p>
              </div>
              <div>
                <span className="font-medium">Last Backup:</span>
                <p className="text-gray-600">2 hours ago</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchSettings}
                  disabled={loading}
                >
                  Refresh Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Clear Cache
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="min-w-32"
          size="lg"
        >
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      {/* Help Text */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
              <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Settings Information
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                These settings control the basic information displayed
                throughout your website. Contact information will be used in the
                footer, contact page, and email communications. Social media
                links will appear in the footer and other relevant sections.
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                * Required fields must be filled out for proper website
                functionality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
