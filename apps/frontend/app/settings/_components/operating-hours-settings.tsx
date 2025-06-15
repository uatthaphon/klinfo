'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface OperatingDay {
  id: string;
  name: string;
  enabled: boolean;
  open: string;
  close: string;
}

interface SpecialClosure {
  id: string;
  name: string;
  date: string;
  description?: string;
}

export function OperatingHoursSettings() {
  const [days, setDays] = useState<OperatingDay[]>([
    { id: 'monday', name: 'Monday', enabled: true, open: '09:00', close: '17:00' },
    { id: 'tuesday', name: 'Tuesday', enabled: true, open: '09:00', close: '17:00' },
    { id: 'wednesday', name: 'Wednesday', enabled: true, open: '09:00', close: '17:00' },
    { id: 'thursday', name: 'Thursday', enabled: true, open: '09:00', close: '17:00' },
    { id: 'friday', name: 'Friday', enabled: true, open: '09:00', close: '17:00' },
    { id: 'saturday', name: 'Saturday', enabled: false, open: '09:00', close: '13:00' },
    { id: 'sunday', name: 'Sunday', enabled: false, open: '09:00', close: '13:00' },
  ]);

  const [lunchBreak, setLunchBreak] = useState({
    enabled: true,
    start: '12:00',
    end: '13:00',
  });

  const [specialClosures, setSpecialClosures] = useState<SpecialClosure[]>([
    { id: '1', name: 'Christmas Day', date: '2024-12-25', description: 'Holiday closure' },
    { id: '2', name: "New Year's Day", date: '2024-01-01', description: 'Holiday closure' },
  ]);

  const updateDay = (dayId: string, field: keyof OperatingDay, value: any) => {
    setDays((prev) => prev.map((day) => (day.id === dayId ? { ...day, [field]: value } : day)));
  };

  const addSpecialClosure = () => {
    const newClosure: SpecialClosure = {
      id: Date.now().toString(),
      name: '',
      date: '',
      description: '',
    };
    setSpecialClosures((prev) => [...prev, newClosure]);
  };

  const updateSpecialClosure = (id: string, field: keyof SpecialClosure, value: string) => {
    setSpecialClosures((prev) => prev.map((closure) => (closure.id === id ? { ...closure, [field]: value } : closure)));
  };

  const removeSpecialClosure = (id: string) => {
    setSpecialClosures((prev) => prev.filter((closure) => closure.id !== id));
  };

  const handleSave = () => {
    console.log('Saving operating hours:', { days, lunchBreak, specialClosures });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Regular Operating Hours</h3>
        {days.map((day) => (
          <div key={day.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-24">
              <Label className="font-medium">{day.name}</Label>
            </div>
            <Switch checked={day.enabled} onCheckedChange={(checked) => updateDay(day.id, 'enabled', checked)} />
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={day.open}
                onChange={(e) => updateDay(day.id, 'open', e.target.value)}
                className="w-32"
                disabled={!day.enabled}
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="time"
                value={day.close}
                onChange={(e) => updateDay(day.id, 'close', e.target.value)}
                className="w-32"
                disabled={!day.enabled}
              />
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Break Times</h3>
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="w-24">
            <Label className="font-medium">Lunch Break</Label>
          </div>
          <Switch
            checked={lunchBreak.enabled}
            onCheckedChange={(checked) => setLunchBreak((prev) => ({ ...prev, enabled: checked }))}
          />
          <div className="flex items-center gap-2">
            <Input
              type="time"
              value={lunchBreak.start}
              onChange={(e) => setLunchBreak((prev) => ({ ...prev, start: e.target.value }))}
              className="w-32"
              disabled={!lunchBreak.enabled}
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="time"
              value={lunchBreak.end}
              onChange={(e) => setLunchBreak((prev) => ({ ...prev, end: e.target.value }))}
              className="w-32"
              disabled={!lunchBreak.enabled}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Special Closures / Holidays</h3>
          <Button onClick={addSpecialClosure} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Closure
          </Button>
        </div>

        <div className="space-y-3">
          {specialClosures.map((closure) => (
            <Card key={closure.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Holiday/Event name"
                      value={closure.name}
                      onChange={(e) => updateSpecialClosure(closure.id, 'name', e.target.value)}
                    />
                    <Input
                      type="date"
                      value={closure.date}
                      onChange={(e) => updateSpecialClosure(closure.id, 'date', e.target.value)}
                    />
                    <Input
                      placeholder="Description (optional)"
                      value={closure.description || ''}
                      onChange={(e) => updateSpecialClosure(closure.id, 'description', e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeSpecialClosure(closure.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
}
