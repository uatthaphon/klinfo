'use client';

import { EmptyState } from '@/components/empty-state';
import { Main } from '@/components/main';

export function MainDashboardContent() {
  return (
    <Main>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <EmptyState />
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" style={{ minHeight: '1000px' }} />
      </div>
    </Main>
  );
}
