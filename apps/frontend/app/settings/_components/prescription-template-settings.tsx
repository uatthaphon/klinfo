'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PrescriptionTemplate {
  id: string;
  name: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  category: string;
}

export function PrescriptionTemplateSettings() {
  const [templates, setTemplates] = useState<PrescriptionTemplate[]>([
    {
      id: '1',
      name: 'Antibiotic Course',
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      duration: '7 days',
      instructions: 'Take with food. Complete the full course even if symptoms improve.',
      category: 'Infection',
    },
    {
      id: '2',
      name: 'Pain Relief',
      medication: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      duration: 'Up to 3 days',
      instructions: 'Take with food. Do not exceed 3 doses per day.',
      category: 'Pain Management',
    },
    {
      id: '3',
      name: 'Diabetes Management',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: '2 times daily',
      duration: 'Ongoing',
      instructions: 'Take with meals. Monitor blood sugar levels regularly.',
      category: 'Chronic Condition',
    },
  ]);

  const [editingTemplate, setEditingTemplate] = useState<PrescriptionTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const frequencyOptions = [
    'Once daily',
    '2 times daily',
    '3 times daily',
    '4 times daily',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed',
    'Before meals',
    'After meals',
    'At bedtime',
  ];

  const handleAddTemplate = () => {
    const newTemplate: PrescriptionTemplate = {
      id: Date.now().toString(),
      name: '',
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      category: '',
    };
    setEditingTemplate(newTemplate);
    setIsDialogOpen(true);
  };

  const handleEditTemplate = (template: PrescriptionTemplate) => {
    setEditingTemplate({ ...template });
    setIsDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;

    if (templates.find((t) => t.id === editingTemplate.id)) {
      // Update existing template
      setTemplates((prev) => prev.map((t) => (t.id === editingTemplate.id ? editingTemplate : t)));
    } else {
      // Add new template
      setTemplates((prev) => [...prev, editingTemplate]);
    }

    setEditingTemplate(null);
    setIsDialogOpen(false);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Prescription Templates</h3>
          <p className="text-sm text-muted-foreground">
            Predefined medication templates for quick prescription creation
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate?.id && templates.find((t) => t.id === editingTemplate.id) ? 'Edit' : 'Add'}{' '}
                Prescription Template
              </DialogTitle>
            </DialogHeader>
            {editingTemplate && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input
                      id="templateName"
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                      placeholder="e.g., Antibiotic Course"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="templateCategory">Category</Label>
                    <Input
                      id="templateCategory"
                      value={editingTemplate.category}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                      placeholder="e.g., Infection, Pain Management"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medication">Medication Name</Label>
                  <Input
                    id="medication"
                    value={editingTemplate.medication}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, medication: e.target.value })}
                    placeholder="e.g., Amoxicillin"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={editingTemplate.dosage}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, dosage: e.target.value })}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={editingTemplate.frequency}
                      onValueChange={(value) => setEditingTemplate({ ...editingTemplate, frequency: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={editingTemplate.duration}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, duration: e.target.value })}
                      placeholder="e.g., 7 days"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    rows={3}
                    value={editingTemplate.instructions}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, instructions: e.target.value })}
                    placeholder="Special instructions for the patient..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTemplate}>Save Template</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {templates.map((template) => (
          <div key={template.id} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <span className="text-xs bg-muted px-2 py-1 rounded">{template.category}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Medication:</span>
                    <p className="font-medium">{template.medication}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dosage:</span>
                    <p className="font-medium">{template.dosage}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frequency:</span>
                    <p className="font-medium">{template.frequency}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">{template.duration}</p>
                  </div>
                </div>
                {template.instructions && (
                  <div className="mt-2">
                    <span className="text-muted-foreground text-sm">Instructions:</span>
                    <p className="text-sm">{template.instructions}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
