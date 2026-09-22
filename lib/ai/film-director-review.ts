import { BrandProfile, CinematicShot, Project, Property, QCReport } from '../types';

export class FilmDirectorReviewEngine {
  public static evaluateProject(params: {
    project: Project;
    property?: Property;
    shots: CinematicShot[];
    brandProfile?: BrandProfile;
    hasMusic?: boolean;
    hasVoiceover?: boolean;
  }): QCReport {
    const { project, property, shots, brandProfile, hasMusic, hasVoiceover } = params;
    const checks: QCReport['checks'] = [];
    const feedback: string[] = [];

    // Check 1: Timeline Empty / Shots Count
    const hasSufficientShots = shots.length >= 3;
    checks.push({
      id: 'shot_count',
      label: 'Minimum Storyboard Shots',
      passed: hasSufficientShots,
      severity: 'error',
      message: hasSufficientShots
        ? `Timeline contains ${shots.length} shots (optimal for standard marketing film).`
        : `Timeline has only ${shots.length} shot(s). A minimum of 3 shots is recommended for an engaging walkthrough.`,
    });

    // Check 2: Generations Approved / Ready
    const pendingGenerations = shots.filter(s => s.status !== 'approved' && s.status !== 'generated');
    const allGenerated = pendingGenerations.length === 0 && shots.length > 0;
    checks.push({
      id: 'generations_ready',
      label: 'AI Shot Generations Completed',
      passed: allGenerated,
      severity: 'error',
      message: allGenerated
        ? `All ${shots.length} shots have completed cinematic renders.`
        : `${pendingGenerations.length} of ${shots.length} shots still require AI video generation or approval.`,
    });

    // Check 3: Motion Diversity (Avoid consecutive duplicate motions)
    let duplicateMotionCount = 0;
    for (let i = 1; i < shots.length; i++) {
      if (shots[i].motion_preset_id === shots[i - 1].motion_preset_id) {
        duplicateMotionCount++;
      }
    }
    const motionDiverse = duplicateMotionCount <= 1;
    checks.push({
      id: 'motion_diversity',
      label: 'Cinematic Motion Diversity',
      passed: motionDiverse,
      severity: 'warning',
      message: motionDiverse
        ? 'Excellent camera motion variety across sequences.'
        : `Detected ${duplicateMotionCount} consecutive duplicate camera motions. Consider varying camera directions.`,
    });

    // Check 4: Property Details & Pricing
    const hasPrice = Boolean(property?.price || property?.rental_price);
    const hasLocation = Boolean(property?.location);
    const detailsPassed = hasPrice && hasLocation;
    checks.push({
      id: 'property_metadata',
      label: 'Property Price & Location Metadata',
      passed: detailsPassed,
      severity: 'warning',
      message: detailsPassed
        ? `Verified: ${property?.location} (${property?.price || property?.rental_price})`
        : 'Missing price or location metadata. Lower-third cards will omit pricing.',
    });

    // Check 5: KGM Branding & Agent Contact
    const hasContact = Boolean(property?.agent_contact || property?.agent_whatsapp || brandProfile?.whatsapp);
    checks.push({
      id: 'brand_contact',
      label: 'KGM Branding & Agent Direct Contact',
      passed: hasContact,
      severity: 'info',
      message: hasContact
        ? `Branded call-to-action ready (${property?.agent_name || 'KGM Concierge'}).`
        : 'No direct WhatsApp or phone configured. Final contact card will use generic KGM domain.',
    });

    // Check 6: Audio & Music Track
    checks.push({
      id: 'audio_mix',
      label: 'Soundtrack & Acoustic Ambiance',
      passed: Boolean(hasMusic),
      severity: 'info',
      message: hasMusic
        ? 'Commercial royalty-safe soundtrack configured with automated audio ducking.'
        : 'No background music selected (video will export silent unless voiceover is enabled).',
    });

    // Calculate Director Scores
    const passedErrors = checks.filter(c => !c.passed && c.severity === 'error').length;
    const passedWarnings = checks.filter(c => !c.passed && c.severity === 'warning').length;

    let storyFlowScore = 95 - (duplicateMotionCount * 8);
    if (shots.length < 3) storyFlowScore -= 30;
    if (shots.length >= 8) storyFlowScore = Math.min(100, storyFlowScore + 5);

    let shotDiversityScore = 96 - (duplicateMotionCount * 12);
    let pacingScore = shots.every(s => s.duration === 10) ? 98 : 90;

    if (shots.length > 0 && shots[0].category !== 'exterior') {
      feedback.push('Recommendation: Opening with an exterior hero shot establishes strong geographical and architectural context.');
    }
    if (shots.length > 2 && shots[shots.length - 1].category !== 'exterior') {
      feedback.push('Recommendation: Concluding with a sunset/twilight exterior pullback creates a memorable emotional signature.');
    }
    if (duplicateMotionCount > 0) {
      feedback.push('Tip: Switch consecutive lateral glides to diagonal reveals or subtle orbits for greater visual rhythm.');
    }
    if (feedback.length === 0) {
      feedback.push('Film composition is balanced, architectural lines are preserved, and transitions flow smoothly.');
    }

    const isReady = passedErrors === 0;
    const overallScore = Math.max(20, Math.round((storyFlowScore + shotDiversityScore + pacingScore) / 3) - (passedWarnings * 5));

    return {
      is_ready: isReady,
      score: overallScore,
      checks,
      director_evaluation: {
        story_flow_score: Math.max(0, Math.min(100, storyFlowScore)),
        shot_diversity_score: Math.max(0, Math.min(100, shotDiversityScore)),
        pacing_score: Math.max(0, Math.min(100, pacingScore)),
        recommendation: isReady && overallScore >= 75 ? 'Approved' : 'Recommended Changes',
        feedback,
      },
    };
  }
}
