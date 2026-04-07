'use client';

import React, { useState } from 'react';
import { ProfileCover } from './ProfileCover';
import { ProfileTabs } from './ProfileTabs';

export function ProfilePageContent() {
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <div className="space-y-6">
      {/* Cover and Header */}
      <ProfileCover onTabChange={setActiveTab} />

      {/* Tab Content */}
      <ProfileTabs activeTab={activeTab} />
    </div>
  );
}
