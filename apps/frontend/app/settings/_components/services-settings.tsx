'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
}

export function ServicesSettings() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'General Consultation',
      description: 'Standard medical consultation',
      duration: 30,
      price: 150,
      active: true,
    },
    {
      id: '2',
      name: 'Annual Check-up',
      description: 'Comprehensive annual health examination',
      duration: 45,
      price: 200,
      active: true,
    },
    {
      id: '3',
      name: 'Vaccination',
      description: 'Immunization services',
      duration: 15,
      price: 50,
      active: true,
    },
  ]);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: '',
      description: '',
      duration: 30,
      price: 0,
      active: true,
    };
    setEditingService(newService);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService({ ...service });
    setIsDialogOpen(true);
  };

  const handleSaveService = () => {
    if (!editingService) return;

    if (services.find((s) => s.id === editingService.id)) {
      // Update existing service
      setServices((prev) => prev.map((s) => (s.id === editingService.id ? editingService : s)));
    } else {
      // Add new service
      setServices((prev) => [...prev, editingService]);
    }

    setEditingService(null);
    setIsDialogOpen(false);
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Medical Services</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddService}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService?.id && services.find((s) => s.id === editingService.id) ? 'Edit' : 'Add'} Service
              </DialogTitle>
            </DialogHeader>
            {editingService && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Description</Label>
                  <Textarea
                    id="serviceDescription"
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceDuration">Duration (minutes)</Label>
                    <Input
                      id="serviceDuration"
                      type="number"
                      value={editingService.duration}
                      onChange={(e) =>
                        setEditingService({ ...editingService, duration: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servicePrice">Price ($)</Label>
                    <Input
                      id="servicePrice"
                      type="number"
                      value={editingService.price}
                      onChange={(e) =>
                        setEditingService({ ...editingService, price: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="serviceActive"
                    checked={editingService.active}
                    onCheckedChange={(checked) => setEditingService({ ...editingService, active: checked })}
                  />
                  <Label htmlFor="serviceActive">Active</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveService}>Save Service</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Switch checked={service.active} onCheckedChange={() => toggleServiceActive(service.id)} />
              <div>
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <p className="text-sm text-muted-foreground">
                  {service.duration} minutes • ${service.price}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
