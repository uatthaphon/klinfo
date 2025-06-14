'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/lib/i18n';
import { Building2, Camera, Eye, EyeOff, LogOut, Shield, Trash2, User } from 'lucide-react';
import { useState } from 'react';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
  },
};

// Mock user data - replace with actual API calls
const mockUser = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '/placeholder.svg?height=100&width=100',
  title: 'General Practitioner',
  bio: 'Experienced family doctor with over 10 years of practice. Specializing in preventive care and chronic disease management.',
  address: {
    street: '123 Medical Center Dr',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  },
  clinics: [
    {
      id: '1',
      name: 'Downtown Medical Center',
      role: 'owner',
      avatar: '/placeholder.svg?height=32&width=32',
      joinedAt: '2023-01-15',
    },
    {
      id: '2',
      name: 'City Health Clinic',
      role: 'doctor',
      avatar: '/placeholder.svg?height=32&width=32',
      joinedAt: '2023-06-20',
    },
  ],
  preferences: {
    theme: 'system',
    language: 'en',
    timezone: 'America/New_York',
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
  },
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSaveProfile = () => {
    // Handle profile save
    setIsEditing(false);
    // Show success message
  };

  const handlePasswordChange = () => {
    // Handle password change
    setPasswords({ current: '', new: '', confirm: '' });
    // Show success message
  };

  const handleLeaveClinic = (clinicId: string) => {
    // Handle leaving clinic
    setUser({
      ...user,
      clinics: user.clinics.filter((clinic) => clinic.id !== clinicId),
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header fixed user={data.user}>
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Header>
        <Main>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* <div className="flex flex-col gap-6"> */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
              </div>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="clinics">Clinics</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and professional details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatar || '/placeholder.svg'} />
                        <AvatarFallback className="text-lg">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Personal Information */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={user.name}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          value={user.title}
                          onChange={(e) => setUser({ ...user, title: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={user.phone}
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="Tell us about yourself and your professional background..."
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Address</Label>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            value={user.address.street}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: { ...user.address, street: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={user.address.city}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: { ...user.address, city: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={user.address.state}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: { ...user.address, state: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={user.address.zipCode}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: { ...user.address, zipCode: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={user.address.country}
                            onValueChange={(value) =>
                              setUser({
                                ...user,
                                address: { ...user.address, country: value },
                              })
                            }
                            disabled={!isEditing}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button onClick={handleSaveProfile}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)}>
                          <User className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Clinics Tab */}
              <TabsContent value="clinics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Clinic Memberships</CardTitle>
                    <CardDescription>Manage your clinic affiliations and roles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.clinics.map((clinic) => (
                        <div key={clinic.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={clinic.avatar || '/placeholder.svg'} />
                              <AvatarFallback>
                                <Building2 className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{clinic.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Joined {new Date(clinic.joinedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={clinic.role === 'owner' ? 'default' : 'secondary'}>{clinic.role}</Badge>
                            {clinic.role !== 'owner' && (
                              <Button variant="outline" size="sm" onClick={() => handleLeaveClinic(clinic.id)}>
                                <LogOut className="h-4 w-4 mr-1" />
                                Leave
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}>
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange}>
                      <Shield className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">
                          Use an authenticator app to generate verification codes
                        </p>
                      </div>
                      <Button variant="outline">Setup</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible and destructive actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how Klinfo looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Theme</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                      </div>
                      <Select
                        value={user.preferences.theme}
                        onValueChange={(value) =>
                          setUser({
                            ...user,
                            preferences: { ...user.preferences, theme: value },
                          })
                        }>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Localization</CardTitle>
                    <CardDescription>Set your language and regional preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Language</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                      </div>
                      <Select
                        value={user.preferences.language}
                        onValueChange={(value) =>
                          setUser({
                            ...user,
                            preferences: { ...user.preferences, language: value },
                          })
                        }>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Timezone</Label>
                        <p className="text-sm text-muted-foreground">Set your local timezone</p>
                      </div>
                      <Select
                        value={user.preferences.timezone}
                        onValueChange={(value) =>
                          setUser({
                            ...user,
                            preferences: { ...user.preferences, timezone: value },
                          })
                        }>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={user.preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          setUser({
                            ...user,
                            preferences: { ...user.preferences, emailNotifications: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch
                        checked={user.preferences.pushNotifications}
                        onCheckedChange={(checked) =>
                          setUser({
                            ...user,
                            preferences: { ...user.preferences, pushNotifications: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                      </div>
                      <Switch
                        checked={user.preferences.marketingEmails}
                        onCheckedChange={(checked) =>
                          setUser({
                            ...user,
                            preferences: { ...user.preferences, marketingEmails: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Main>
      </SidebarInset>
    </SidebarProvider>
  );
}
