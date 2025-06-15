'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface ConsultationTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
}

export function ConsultationTemplatesSettings() {
  const [templates, setTemplates] = useState<ConsultationTemplate[]>([
    {
      id: '1',
      name: 'General Consultation',
      description: 'Standard consultation template',
      sections: ['Chief Complaint', 'History', 'Examination', 'Assessment', 'Plan'],
    },
    {
      id: '2',
      name: 'Follow-up Visit',
      description: 'Template for follow-up appointments',
      sections: ['Progress', 'Current Symptoms', 'Examination', 'Plan'],
    },
    {
      id: '3',
      name: 'Annual Physical',
      description: 'Comprehensive annual examination',
      sections: ['Vital Signs', 'Systems Review', 'Physical Exam', 'Lab Results', 'Recommendations'],
    },
  ]);

  const [editingTemplate, setEditingTemplate] = useState<ConsultationTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState('');

  const handleAddTemplate = () => {
    const newTemplate: ConsultationTemplate = {
      id: Date.now().toString(),
      name: '',
      description: '',
      sections: [],
    };
    setEditingTemplate(newTemplate);
    setIsDialogOpen(true);
  };

  const handleEditTemplate = (template: ConsultationTemplate) => {
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
    setNewSection('');
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const addSection = () => {
    if (!editingTemplate || !newSection.trim()) return;

    setEditingTemplate({
      ...editingTemplate,
      sections: [...editingTemplate.sections, newSection.trim()],
    });
    setNewSection('');
  };

  const removeSection = (index: number) => {
    if (!editingTemplate) return;

    setEditingTemplate({
      ...editingTemplate,
      sections: editingTemplate.sections.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Consultation Note Templates</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate?.id && templates.find((t) => t.id === editingTemplate.id) ? 'Edit' : 'Create'} Template
              </DialogTitle>
            </DialogHeader>
            {editingTemplate && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="templateDescription">Description</Label>
                  <Textarea
                    id="templateDescription"
                    value={editingTemplate.description}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Template Sections</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add section name"
                      value={newSection}
                      onChange={(e) => setNewSection(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSection()}
                    />
                    <Button type="button" onClick={addSection}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editingTemplate.sections.map((section, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {section}
                        <button onClick={() => removeSection(index)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
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

      <div className="space-y-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {template.sections.map((section, index) => (
                  <Badge key={index} variant="secondary">
                    {section}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
