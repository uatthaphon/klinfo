'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface MedicalCertificate {
  id: string;
  name: string;
  description: string;
  template: string;
  category: string;
}

export function MedicalCertificateSettings() {
  const [certificates, setCertificates] = useState<MedicalCertificate[]>([
    {
      id: '1',
      name: 'Sick Leave Certificate',
      description: 'Standard medical certificate for sick leave',
      template:
        'This is to certify that [PATIENT_NAME] is medically unfit for work from [START_DATE] to [END_DATE] due to [CONDITION].',
      category: 'Sick Leave',
    },
    {
      id: '2',
      name: 'Fitness Certificate',
      description: 'Medical fitness certificate for employment/sports',
      template: 'This is to certify that [PATIENT_NAME] is medically fit for [PURPOSE] as of [DATE].',
      category: 'Fitness',
    },
    {
      id: '3',
      name: 'Vaccination Certificate',
      description: 'Certificate of vaccination',
      template: 'This is to certify that [PATIENT_NAME] has been vaccinated with [VACCINE_NAME] on [DATE].',
      category: 'Vaccination',
    },
  ]);

  const [editingCertificate, setEditingCertificate] = useState<MedicalCertificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCertificate = () => {
    const newCertificate: MedicalCertificate = {
      id: Date.now().toString(),
      name: '',
      description: '',
      template: '',
      category: '',
    };
    setEditingCertificate(newCertificate);
    setIsDialogOpen(true);
  };

  const handleEditCertificate = (certificate: MedicalCertificate) => {
    setEditingCertificate({ ...certificate });
    setIsDialogOpen(true);
  };

  const handleSaveCertificate = () => {
    if (!editingCertificate) return;

    if (certificates.find((c) => c.id === editingCertificate.id)) {
      // Update existing certificate
      setCertificates((prev) => prev.map((c) => (c.id === editingCertificate.id ? editingCertificate : c)));
    } else {
      // Add new certificate
      setCertificates((prev) => [...prev, editingCertificate]);
    }

    setEditingCertificate(null);
    setIsDialogOpen(false);
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Medical Certificate Templates</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddCertificate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCertificate?.id && certificates.find((c) => c.id === editingCertificate.id) ? 'Edit' : 'Add'}{' '}
                Certificate Template
              </DialogTitle>
            </DialogHeader>
            {editingCertificate && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificateName">Certificate Name</Label>
                  <Input
                    id="certificateName"
                    value={editingCertificate.name}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateCategory">Category</Label>
                  <Input
                    id="certificateCategory"
                    value={editingCertificate.category}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, category: e.target.value })}
                    placeholder="e.g., Sick Leave, Fitness, Vaccination"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateDescription">Description</Label>
                  <Textarea
                    id="certificateDescription"
                    value={editingCertificate.description}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateTemplate">Template Content</Label>
                  <Textarea
                    id="certificateTemplate"
                    rows={6}
                    value={editingCertificate.template}
                    onChange={(e) => setEditingCertificate({ ...editingCertificate, template: e.target.value })}
                    placeholder="Use placeholders like [PATIENT_NAME], [DATE], [CONDITION], etc."
                  />
                  <p className="text-sm text-muted-foreground">
                    Available placeholders: [PATIENT_NAME], [DATE], [START_DATE], [END_DATE], [CONDITION], [PURPOSE],
                    [VACCINE_NAME]
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCertificate}>Save Certificate</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">{certificate.name}</p>
              <p className="text-sm text-muted-foreground">{certificate.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Category: {certificate.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEditCertificate(certificate)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDeleteCertificate(certificate.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
