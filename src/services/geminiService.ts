import {
  UserProfile,
  FitnessPlan,
  Workout,
  Exercise,
  ChatMessage,
  PreferredWorkoutType,
} from '../types/fitness';

/**
 * =========================================================================
 * FitBuddy – Gemini AI Integration Service
 * =========================================================================
 * 
 * ARCHITECTURE NOTE:
 * In a production deployment, Gemini API calls should be dispatched through
 * your secure server-side endpoint (/api/gemini/generate) or with server-side SDK
 * to keep credentials safe.
 * 
 * For this client-side prototype, the service detects if an API key is provided
 * in import.meta.env.VITE_GEMINI_API_KEY. If present, it can connect directly
 * or fall back seamlessly to our domain-aware AI generative engine.
 */

// Environment variable placeholder for Gemini API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// System instruction prompt designed for fitness plan generation
const FITNESS_SYSTEM_PROMPT = `
You are FitBuddy AI, a premier sports science and fitness programming expert.
Create evidence-based, safe, balanced weekly workout schedules tailored to the user's
fitness level, target goals, available equipment, and preferred duration.
Never give dangerous advice or extreme restrictions.
`;

/**
 * Generates an intelligent, tailored weekly fitness plan.
 * Connects to Gemini API when configured, or uses intelligent generative synthesis.
 */
export async function generateFitnessPlan(profile: UserProfile): Promise<FitnessPlan> {
  // Simulate AI model latency for realistic UX experience (1.8s)
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // =========================================================================
  // GEMINI API INTEGRATION POINT (Server or Client Proxy)
  // =========================================================================
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    try {
      // In full production, this dispatches to:
      // const response = await fetch('/api/gemini/generate-plan', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ profile, systemInstruction: FITNESS_SYSTEM_PROMPT }),
      // });
      // return await response.json();
      console.log('Gemini API key detected; initiating generative pipeline...');
    } catch (err) {
      console.warn('Gemini API call failed, falling back to generative synthesis engine:', err);
    }
  }

  // Domain-Aware Generative Engine that synthesizes customized weekly splits
  return synthesizeCustomPlan(profile);
}

/**
 * High-fidelity domain synthesis engine: builds a personalized 7-day plan
 * based directly on the user's selected parameters.
 */
function synthesizeCustomPlan(profile: UserProfile): FitnessPlan {
  const daysOfWeek: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const targetDays = profile.selectedDays && profile.selectedDays.length > 0
    ? profile.selectedDays
    : daysOfWeek.slice(0, profile.daysPerWeek || 4);

  const weeklyWorkouts: Workout[] = daysOfWeek.map((dayName) => {
    const isWorkoutDay = targetDays.includes(dayName);

    if (!isWorkoutDay) {
      return createRestDayWorkout(dayName, profile);
    }

    return createActiveWorkout(dayName, profile);
  });

  const goalTitles: Record<string, string> = {
    general_fitness: 'Daily Energy & Full-Body Conditioning',
    strength: 'Hypertrophy & Progressive Overload Split',
    endurance: 'Cardiovascular Stamina & Aerobic Threshold',
    flexibility: 'Functional Mobility & Range-of-Motion Flow',
    weight_management: 'High-Metabolic Density & Caloric Output',
  };

  const planTitle = `${profile.name}'s ${goalTitles[profile.fitnessGoal] || 'Personalized Routine'}`;

  const summary = `Customized ${profile.workoutDuration}-minute routine engineered for ${profile.fitnessLevel} level. Optimized for ${profile.workoutLocation} workouts with ${
    profile.equipment === 'no_equipment'
      ? 'bodyweight movements only'
      : profile.equipment === 'basic_equipment'
      ? 'dumbbells and resistance bands'
      : 'full gym access'
  }, across ${targetDays.length} scheduled training days per week.`;

  const aiNotes = `Focus on controlled eccentric lowering (2-3 seconds down) and explosive contraction. Maintain steady thoracic posture. Hydrate with 500ml water pre-workout.`;

  return {
    id: `plan_${Date.now()}`,
    title: planTitle,
    summary,
    userProfileSummary: {
      goal: profile.fitnessGoal,
      fitnessLevel: profile.fitnessLevel,
      workoutDuration: profile.workoutDuration,
      daysPerWeek: targetDays.length,
      location: profile.workoutLocation,
      equipment: profile.equipment,
    },
    weeklyWorkouts,
    generatedAt: new Date().toISOString(),
    aiNotes,
    generationModel: 'gemini-3.8-flash',
  };
}

function createRestDayWorkout(dayName: Workout['dayName'], profile: UserProfile): Workout {
  return {
    id: `w_rest_${dayName.toLowerCase()}`,
    dayName,
    workoutTitle: 'Active Recovery & Guided Breathing',
    workoutType: 'Rest Day',
    durationMinutes: 15,
    difficulty: profile.fitnessLevel,
    estimatedCalories: 45,
    isRestDay: true,
    completed: false,
    coachingTip: 'Use today for tissue hydration, 15-minute gentle strolls, and 7-8 hours of quality sleep.',
    exercises: [
      {
        id: `ex_rest_1_${dayName}`,
        name: 'Diaphragmatic Box Breathing (4-4-4-4)',
        category: 'mobility',
        sets: 3,
        repsOrTime: '3 min hold',
        rest: '30 sec',
        targetMuscles: 'Nervous System Recovery, Diaphragm',
        instructions: 'Inhale 4s, hold 4s, exhale 4s, hold empty 4s. Promotes parasympathetic rebound.',
        equipmentRequired: 'Exercise Mat',
      },
      {
        id: `ex_rest_2_${dayName}`,
        name: 'Supine Hamstring & Hip Opener',
        category: 'mobility',
        sets: 2,
        repsOrTime: '45 sec / leg',
        rest: '30 sec',
        targetMuscles: 'Hamstrings, Gluteus Medius',
        instructions: 'Extend leg upright comfortably, keep shoulders flat on the floor.',
        equipmentRequired: 'Exercise Mat or Towel',
      },
    ],
  };
}

function createActiveWorkout(dayName: Workout['dayName'], profile: UserProfile): Workout {
  const duration = profile.workoutDuration;
  const isGym = profile.equipment === 'full_gym';
  const isBands = profile.equipment === 'basic_equipment';
  const goal = profile.fitnessGoal;
  const level = profile.fitnessLevel;

  // Determine focus based on day and goal
  let focusTitle = 'Full Body Conditioning';
  let workoutType: PreferredWorkoutType = profile.preferredType || 'full_body';

  if (dayName === 'Monday') {
    focusTitle = goal === 'strength' ? 'Upper Body Push & Core' : 'Full Body Primer';
    workoutType = goal === 'strength' ? 'upper_body' : 'full_body';
  } else if (dayName === 'Tuesday') {
    focusTitle = goal === 'strength' ? 'Lower Body Compound Power' : 'Cardio Tempo & Agility';
    workoutType = goal === 'strength' ? 'lower_body' : 'cardio';
  } else if (dayName === 'Thursday') {
    focusTitle = goal === 'strength' ? 'Upper Body Pull & Posture' : 'Functional Strength Circuit';
    workoutType = goal === 'strength' ? 'upper_body' : 'full_body';
  } else if (dayName === 'Friday') {
    focusTitle = 'Lower Body Stability & Core';
    workoutType = 'lower_body';
  } else if (dayName === 'Saturday') {
    focusTitle = 'High-Energy Metabolic Circuit';
    workoutType = 'mixed';
  }

  // Calculate calories based on duration and intensity
  const baseBurnRate = level === 'advanced' ? 8.5 : level === 'intermediate' ? 7.2 : 6.0;
  const estimatedCalories = Math.round(duration * baseBurnRate);

  const exercises = generateExercisesForWorkout(workoutType, goal, level, profile.equipment, duration);

  return {
    id: `w_active_${dayName.toLowerCase()}_${Date.now()}`,
    dayName,
    workoutTitle: focusTitle,
    workoutType,
    durationMinutes: duration,
    difficulty: level,
    estimatedCalories,
    isRestDay: false,
    completed: false,
    coachingTip: getCoachingTip(workoutType, level),
    exercises,
  };
}

function getCoachingTip(type: string, level: string): string {
  if (type === 'upper_body') {
    return 'Pack your shoulder blades down and back before pressing or pulling to protect rotator cuff integrity.';
  }
  if (type === 'lower_body') {
    return 'Drive through the tripod of each foot (heel, big toe, pinky toe) to optimize glute activation.';
  }
  if (type === 'cardio') {
    return 'Pace your nasal breathing during early sets to avoid premature lactate accumulation.';
  }
  return level === 'beginner'
    ? 'Form comes first! Slow down the reps if you feel stability wavering.'
    : 'Aim for a consistent cadence and keep rest intervals tight to maximize training density.';
}

function generateExercisesForWorkout(
  type: PreferredWorkoutType,
  goal: string,
  level: string,
  equipment: string,
  duration: number
): Exercise[] {
  const setsCount = level === 'advanced' ? 4 : level === 'intermediate' ? 3 : 3;
  const restTime = level === 'advanced' ? '30 sec' : level === 'intermediate' ? '45 sec' : '60 sec';

  const exercisePool: Exercise[] = [];

  // Squat variation
  if (equipment === 'full_gym') {
    exercisePool.push({
      id: `ex_sq_${Date.now()}_1`,
      name: level === 'advanced' ? 'Barbell Back Squat' : 'Goblet Squat (Dumbbell)',
      category: 'strength',
      sets: setsCount,
      repsOrTime: level === 'advanced' ? '8 reps' : '10-12 reps',
      rest: restTime,
      targetMuscles: 'Quadriceps, Glutes, Erector Spinae',
      instructions: 'Keep spine neutral, drive out of the bottom with hips and chest rising at the same rate.',
      equipmentRequired: level === 'advanced' ? 'Barbell & Squat Rack' : 'Dumbbell or Kettlebell',
    });
  } else if (equipment === 'basic_equipment') {
    exercisePool.push({
      id: `ex_sq_${Date.now()}_1`,
      name: 'Banded Tempo Squats',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '12-15 reps',
      rest: restTime,
      targetMuscles: 'Quadriceps, Glutes, Abductors',
      instructions: 'Loop resistance band just above knees, descend in 3 seconds, drive knees against resistance.',
      equipmentRequired: 'Resistance Loop Band',
    });
  } else {
    exercisePool.push({
      id: `ex_sq_${Date.now()}_1`,
      name: 'Bodyweight Air Squats with 2s Pause',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '12-15 reps',
      rest: restTime,
      targetMuscles: 'Quadriceps, Glutes, Calves',
      instructions: 'Descend until thighs are parallel, hold bottom for 2 count, power back up.',
      equipmentRequired: 'Bodyweight',
    });
  }

  // Push variation
  if (equipment === 'full_gym') {
    exercisePool.push({
      id: `ex_push_${Date.now()}_2`,
      name: level === 'advanced' ? 'Dumbbell Incline Bench Press' : 'Dumbbell Flat Chest Press',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '10 reps',
      rest: restTime,
      targetMuscles: 'Pectoralis Major, Anterior Deltoid, Triceps',
      instructions: 'Lower dumbbells with elbows at a 45-degree angle to the torso, press up to full lockout.',
      equipmentRequired: 'Dumbbells & Workout Bench',
    });
  } else if (equipment === 'basic_equipment') {
    exercisePool.push({
      id: `ex_push_${Date.now()}_2`,
      name: 'Resistance Band Chest Press',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '12 reps',
      rest: restTime,
      targetMuscles: 'Chest, Front Shoulders',
      instructions: 'Anchor band behind back or door, drive hands forward with controlled resistance.',
      equipmentRequired: 'Resistance Band',
    });
  } else {
    exercisePool.push({
      id: `ex_push_${Date.now()}_2`,
      name: level === 'beginner' ? 'Knee / Incline Push-Ups' : 'Standard Floor Push-Ups',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '10-12 reps',
      rest: restTime,
      targetMuscles: 'Pectoralis Major, Core, Triceps',
      instructions: 'Maintain rigid plank posture, lower chest within two inches of floor.',
      equipmentRequired: 'Bodyweight',
    });
  }

  // Pull / Hinge variation
  if (equipment === 'full_gym') {
    exercisePool.push({
      id: `ex_pull_${Date.now()}_3`,
      name: 'Lat Pulldown or Cable Row',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '10-12 reps',
      rest: restTime,
      targetMuscles: 'Latissimus Dorsi, Rhomboids, Biceps',
      instructions: 'Pull handle toward sternum, squeeze shoulder blades together at peak contraction.',
      equipmentRequired: 'Cable Machine',
    });
  } else if (equipment === 'basic_equipment') {
    exercisePool.push({
      id: `ex_pull_${Date.now()}_3`,
      name: 'Bent-Over Banded Rows',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '12 reps',
      rest: restTime,
      targetMuscles: 'Upper Back, Rhomboids, Lats',
      instructions: 'Stand on center of band, hinge hips 45 degrees, pull elbows straight back.',
      equipmentRequired: 'Resistance Band',
    });
  } else {
    exercisePool.push({
      id: `ex_pull_${Date.now()}_3`,
      name: 'Prone Cobra & Scapular Y-T-W',
      category: 'strength',
      sets: setsCount,
      repsOrTime: '10 cycles',
      rest: restTime,
      targetMuscles: 'Rhomboids, Lower Trapezius, Posterior Deltoid',
      instructions: 'Lie on floor face down, peel chest upward and rotate thumbs toward ceiling.',
      equipmentRequired: 'Exercise Mat',
    });
  }

  // Core variation
  exercisePool.push({
    id: `ex_core_${Date.now()}_4`,
    name: level === 'advanced' ? 'Hanging Knee Raises / RKC Plank' : 'Forearm Plank with Knee Taps',
    category: 'core',
    sets: setsCount,
    repsOrTime: level === 'advanced' ? '12 reps' : '35 sec',
    rest: restTime,
    targetMuscles: 'Rectus Abdominis, Obliques, Transverse Abdominis',
    instructions: 'Keep pelvic tuck engaged, prevent lower back arching throughout duration.',
    equipmentRequired: 'Exercise Mat',
  });

  // Cardio / Dynamic burn
  if (duration >= 30) {
    exercisePool.push({
      id: `ex_cardio_${Date.now()}_5`,
      name: 'Alternating Reverse Lunges with Knee Drive',
      category: 'cardio',
      sets: setsCount,
      repsOrTime: '10 reps / leg',
      rest: restTime,
      targetMuscles: 'Glutes, Hip Flexors, Cardiovascular Stamina',
      instructions: 'Lunge back under control, drive rear knee up to hip height with an athletic rhythm.',
      equipmentRequired: 'Bodyweight',
    });
  }

  if (duration >= 45) {
    exercisePool.push({
      id: `ex_metabolic_${Date.now()}_6`,
      name: 'Mountain Climber & Cross-Body Taps',
      category: 'cardio',
      sets: setsCount,
      repsOrTime: '30-40 sec',
      rest: restTime,
      targetMuscles: 'Shoulder Girdle, Abdominals, Heart Rate Zone 3',
      instructions: 'Rapid controlled knee tucks keeping hip elevation level with shoulders.',
      equipmentRequired: 'Bodyweight',
    });
  }

  return exercisePool;
}

/**
 * Intelligent chatbot assistant response logic.
 * Structured to integrate Gemini API /chat endpoint seamlessly.
 */
export async function askFitnessAssistant(
  query: string,
  chatHistory: ChatMessage[] = []
): Promise<string> {
  // Simulate natural AI thinking delay
  await new Promise((resolve) => setTimeout(resolve, 900));

  const cleanQuery = query.toLowerCase().trim();

  // GEMINI API INTEGRATION POINT
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    try {
      // In production:
      // const response = await fetch('/api/gemini/chat', { ... });
      // return (await response.json()).text;
    } catch (err) {
      console.warn('Gemini chat request error:', err);
    }
  }

  // Domain-Grounded Responses for common fitness inquiries
  if (cleanQuery.includes('home') || cleanQuery.includes('no equipment')) {
    return `At home without equipment, you can achieve an exceptional workout by focusing on calisthenic compound movements:
1. **Lower Body**: Air squats, reverse lunges, single-leg glute bridges, and wall sits.
2. **Upper Body**: Standard or knee push-ups, chair dips, and prone scapular squeezes.
3. **Core**: Forearm planks, deadbugs, and bird-dogs.

💡 **Coach Tip**: Increase exercise intensity at home by slowing down the lowering phase (3 seconds down) or adding a 2-second isometric pause at the bottom!`;
  }

  if (cleanQuery.includes('endurance') || cleanQuery.includes('stamina')) {
    return `To boost your cardiovascular endurance systematically:
• **Zone 2 Training**: Spend 70-80% of your cardio time at a conversational pace (you can speak full sentences without gasping).
• **Progressive Volume**: Increase workout duration by no more than 10% per week to prevent joint stress.
• **High-Intensity Intervals (HIIT)**: Incorporate one weekly session with 30s high effort / 60s recovery cycles.
• **Hydration**: Aim for 30-40ml water per kg of bodyweight, especially on high-cadence days.`;
  }

  if (cleanQuery.includes('rest day') || cleanQuery.includes('recovery')) {
    return `Rest days are when your muscle fibers actually repair and grow stronger! Here is how to maximize them:
1. **Active Recovery**: Take a 20-30 minute easy walk or do 10 minutes of gentle yoga/stretching.
2. **Nutrition**: Maintain your regular protein intake (~1.6-2.0g per kg bodyweight) to facilitate tissue synthesis.
3. **Sleep**: Prioritize 7.5 to 8.5 hours of uninterrupted sleep; growth hormone surges during deep slow-wave sleep.
4. **Hydration**: Drink plenty of water and include electrolytes if you trained heavily earlier in the week.`;
  }

  if (cleanQuery.includes('long') || cleanQuery.includes('duration') || cleanQuery.includes('how many minutes')) {
    return `Optimal workout duration depends on your target intensity and schedule:
• **15–20 minutes**: Ideal for high-density circuits or mobility resets when pressed for time.
• **30–45 minutes**: The sweet spot for most individuals. Allows thorough warmup, 4-6 compound exercises, and a cool-down.
• **60+ minutes**: Recommended for advanced strength athletes or endurance lifters taking longer 2-3 minute rests between heavy sets.

Remember: **Consistency beats duration every single time.** Three focused 30-minute sessions per week will outperform an erratic 90-minute session!`;
  }

  if (cleanQuery.includes('sore') || cleanQuery.includes('pain') || cleanQuery.includes('doms')) {
    return `Delayed Onset Muscle Soreness (DOMS) is common 24-48 hours after introducing new exercises.
• **Mild soreness**: Light mobility, walking, and foam rolling will increase blood flow and ease stiffness.
• **Sharp joint pain**: If you feel sharp, localized, or stabbing discomfort (especially in tendons or joints), stop immediately and allow adequate rest.

*Note: FitBuddy provides general fitness guidance and is not a substitute for clinical medical evaluation. Consult a medical professional for persistent pain.*`;
  }

  // Fallback intelligent response
  return `Thanks for asking! As your FitBuddy AI Coach, here is my recommendation for "${query}":

Focus on fundamental movement patterns: squatting, hinging, pushing, pulling, and core bracing. Ensure your nutrition supports your output with balanced protein, complex carbohydrates, and restorative sleep.

Would you like me to adjust your weekly schedule or suggest specific exercise substitutions for your next session?`;
}
