'use client';

import React from 'react';
import DeliverablesView from '../projects/[projectId]/deliverables/page';

export default function GlobalDeliverablesPage() {
  return <DeliverablesView params={{ projectId: 'proj_kgm_riyadh_01' }} />;
}
