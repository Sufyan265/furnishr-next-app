'use client';

import { AlertTriangle } from 'lucide-react';

export default function DevelopmentBanner() {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-yellow-400 border-2 border-yellow-500 p-4 rounded-lg text-yellow-900 shadow-lg animate-float max-w-md">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-sm">Demo Mode Active</h3>
          <p className="text-xs">
            This project is under development and launched for demo purposes only. Features may be incomplete.
          </p>
        </div>
      </div>
    </div>
  );
}
