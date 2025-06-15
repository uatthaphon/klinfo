"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Upload, MapPin, Globe } from "lucide-react"

export function ClinicInfoSettings() {
  const [clinicData, setClinicData] = useState({
    name: "Downtown Medical Center",
    phone: "+1 (555) 123-4567",
    email: "info@downtownmedical.com",
    website: "https://www.downtownmedical.com",
    address: "123 Medical Center Dr, New York, NY 10001",
    description: "A modern medical facility providing comprehensive healthcare services to the community.",
    googleMapsUrl: "https://maps.google.com/?q=123+Medical+Center+Dr,+New+York,+NY+10001",
  })

  const handleSave = () => {
    // Handle save logic
    console.log("Saving clinic info:", clinicData)
  }

  const handleInputChange = (field: string, value: string) => {
    setClinicData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clinicName">Clinic Name</Label>
          <Input id="clinicName" value={clinicData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clinicLogo">Clinic Logo</Label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Logo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Recommended size: 200x200px, PNG or JPG</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={clinicData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={clinicData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="website"
              className="pl-10"
              placeholder="https://www.yourwebsite.com"
              value={clinicData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={clinicData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="googleMaps">Google Maps URL</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="googleMaps"
              className="pl-10"
              placeholder="https://maps.google.com/?q=your+address"
              value={clinicData.googleMapsUrl}
              onChange={(e) => handleInputChange("googleMapsUrl", e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">This will be used for patient directions and online listings</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Clinic Description</Label>
          <Textarea
            id="description"
            rows={3}
            value={clinicData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
}
