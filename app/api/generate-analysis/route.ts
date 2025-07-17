import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json()

    const supabase = await createClient()
    
    const { data: booking } = await supabase
      .from('questionnaire_submissions')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }
    
    // Generate analysis based on service type
    let analysis;
    const serviceType = booking.service_type || '12-Season Color Analysis';
    
    switch(serviceType) {
    case 'Virtual Wardrobe Curation':
      analysis = generateWardrobeAnalysis(booking.answers, booking.data);
      break;
    case 'Personal Shopping Service':
      analysis = generateShoppingAnalysis(booking.answers, booking.data);
      break;
    case 'Style Evolution Coaching':
      analysis = generateStyleEvolutionAnalysis(booking.answers, booking.data);
      break;
    default: // 12-Season Color Analysis
      analysis = generateColorAnalysis(booking.answers);
    }

    // Create appropriate record based on service type
    let report;
    
    if (serviceType === '12-Season Color Analysis') {
      const { data } = await supabase
        .from('analyst_reports')
        .insert({
          ticket_id: bookingId,
          season_analysis: analysis.season,
          color_recommendations: analysis.colors,
          styling_notes: analysis.notes,
          confidence_score: analysis.confidence,
          ai_analysis: analysis,
          status: 'draft',
        })
        .select()
        .single();
      report = data;
    } else if (serviceType === 'Virtual Wardrobe Curation') {
      const { data } = await supabase
        .from('wardrobe_audits')
        .insert({
          ticket_id: bookingId,
          audit_type: 'virtual_curation',
          wardrobe_items: [],
          outfit_combinations: analysis.outfitCombinations || [],
          gap_analysis: analysis.gapAnalysis || [],
          shopping_recommendations: analysis.recommendedAdditions || [],
          ai_analysis: analysis,
          status: 'pending',
        })
        .select()
        .single();
      report = data;
    } else if (serviceType === 'Personal Shopping Service') {
      const { data } = await supabase
        .from('shopping_sessions')
        .insert({
          ticket_id: bookingId,
          session_type: 'personal_shopping',
          budget_allocated: parseInt(booking.data?.budget?.replace(/[^0-9]/g, '') || '0'),
          curated_items: analysis.statementPieces || [],
          purchase_recommendations: analysis.versatileBasics || [],
          ai_analysis: analysis,
          status: 'scheduled',
        })
        .select()
        .single();
      report = data;
    } else if (serviceType === 'Style Evolution Coaching') {
      const { data } = await supabase
        .from('coaching_programs')
        .insert({
          ticket_id: bookingId,
          program_type: 'style_evolution',
          duration_months: 3,
          sessions_included: 6,
          progress_tracking: {
            transformationPotential: analysis.transformationPotential,
            recommendedDirection: analysis.recommendedDirection,
            keyPieces: analysis.keyPiecesToAcquire,
          },
          ai_analysis: analysis,
          status: 'enrolled',
        })
        .select()
        .single();
      report = data;
    }

    // Return appropriate response based on service type
    if (serviceType === '12-Season Color Analysis') {
      return NextResponse.json({
        success: true,
        report: {
          id: report?.id,
          season: analysis.season,
          confidence: analysis.confidence,
          colors: analysis.colors,
          notes: analysis.notes,
        },
      });
    } else if (serviceType === 'Virtual Wardrobe Curation') {
      return NextResponse.json({
        success: true,
        report: {
          id: report?.id,
          dominant_style: analysis.dominantStyle,
          versatility_score: analysis.versatilityScore,
          organization_level: analysis.organizationLevel,
          gap_analysis: analysis.gapAnalysis,
          recommended_additions: analysis.recommendedAdditions,
        },
      });
    } else if (serviceType === 'Personal Shopping Service') {
      return NextResponse.json({
        success: true,
        report: {
          id: report?.id,
          style_profile: analysis.styleProfile,
          color_preferences: analysis.colorPreferences,
          recommended_brands: analysis.recommendedBrands,
          statement_pieces: analysis.statementPieces,
          versatile_basics: analysis.versatileBasics,
        },
      });
    } else { // Style Evolution Coaching
      return NextResponse.json({
        success: true,
        report: {
          id: report?.id,
          current_style_assessment: analysis.currentStyleAssessment,
          transformation_potential: analysis.transformationPotential,
          recommended_direction: analysis.recommendedDirection,
          key_pieces_to_acquire: analysis.keyPiecesToAcquire,
          confidence_boosters: analysis.confidenceBoosters,
        },
      });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 })
  }
}

function generateColorAnalysis(answers: any) {
  const { 'skin-tone': skin, 'hair-color': hair, 'eye-color': eyes } = answers

  let season = 'Autumn'
  let confidence = 85
  let colors = ['#8B4513', '#CD853F', '#D2691E', '#A0522D', '#DEB887']
  let undertone = 'warm'
  let avoidColors = ['#FF69B4', '#00FFFF', '#FFFF00']
  let makeupTips = 'Choose warm-toned foundations with golden undertones. Opt for earthy eyeshadows in browns, golds, and oranges. Lipstick shades in warm reds, corals, and browns will complement your coloring.'
  let wardrobeTips = 'Focus on rich, warm colors like deep oranges, golden yellows, warm browns, and olive greens. Avoid cool blues and bright pinks. Earth tones and jewel tones work beautifully on you.'
  let shoppingGuide = 'Look for pieces at Zara, Mango, and COS in your color palette. Focus on quality basics in camel, rust, forest green, and cream. Accessories in gold tones will enhance your warm coloring.'
  
  if (skin?.includes('fair') && hair?.includes('blonde')) {
    season = 'Spring'
    colors = ['#FFB6C1', '#98FB98', '#F0E68C', '#DDA0DD', '#87CEEB']
    confidence = 90
    avoidColors = ['#000000', '#8B0000', '#4B0082']
    makeupTips = 'Choose light, fresh foundations with peachy undertones. Bright, clear eyeshadows in corals, peaches, and light greens. Lipstick in coral, peach, and bright pink shades.'
    wardrobeTips = 'Embrace bright, clear colors like coral, peach, light green, and bright blue. Avoid dark, muted colors. Your palette is fresh and energetic.'
    shoppingGuide = 'Shop at H&M, ASOS, and Anthropologie for bright, cheerful pieces. Look for floral prints and light, airy fabrics in your color palette.'
  } else if (skin?.includes('cool') || eyes === 'Blue') {
    season = 'Winter'
    undertone = 'cool'
    colors = ['#000080', '#8B0000', '#4B0082', '#2F4F4F', '#191970']
    confidence = 88
    avoidColors = ['#FFB6C1', '#F0E68C', '#DDA0DD']
    makeupTips = 'Choose foundations with pink or blue undertones. Bold, dramatic eyeshadows in deep blues, purples, and blacks. Lipstick in true reds, deep berries, and bright pinks.'
    wardrobeTips = 'Embrace bold, dramatic colors like true red, royal blue, emerald green, and pure white. Black is your friend. Avoid warm, muted colors.'
    shoppingGuide = 'Shop at Zara, COS, and & Other Stories for sophisticated pieces in your dramatic color palette. Look for structured pieces in bold colors.'
  } else if (skin?.includes('fair')) {
    season = 'Summer'
    undertone = 'cool'
    colors = ['#E6E6FA', '#F0F8FF', '#B0E0E6', '#D8BFD8', '#AFEEEE']
    confidence = 82
    avoidColors = ['#FF4500', '#FFD700', '#8B4513']
    makeupTips = 'Choose foundations with pink undertones. Soft, muted eyeshadows in lavenders, soft blues, and roses. Lipstick in soft pinks, roses, and berry tones.'
    wardrobeTips = 'Embrace soft, muted colors like lavender, soft blue, dusty rose, and sage green. Avoid bright, warm colors. Your palette is gentle and sophisticated.'
    shoppingGuide = 'Shop at Cos, Arket, and Everlane for soft, muted pieces. Look for quality basics in your gentle color palette.'
  }

  return {
    season,
    confidence,
    colors,
    undertone,
    avoidColors,
    makeupTips,
    wardrobeTips,
    shoppingGuide,
    personalMessage: `Your ${ season } coloring is absolutely beautiful! These carefully selected colors will enhance your natural radiance and make you feel confident and stylish.`,
    notes: `Based on ${ skin } skin tone, ${ hair } hair, and ${ eyes } eyes, you are a ${ season }. This season complements your natural coloring with ${ undertone } undertones.`,
    description: `You are a ${ season } with ${ undertone } undertones. This means you look best in ${ season === 'Spring' || season === 'Autumn' ? 'warm' : 'cool' } colors that ${ season === 'Winter' ? 'are bold and dramatic' : season === 'Summer' ? 'are soft and muted' : season === 'Spring' ? 'are bright and clear' : 'are rich and warm' }.`,
    topColors: colors,
  }
}

function generateWardrobeAnalysis(answers: any, data: any) {
  const { 'wardrobe-size': wardrobeSize, 'wardrobe-refresh': wardrobeRefresh, 'frequent-items': frequentItems } = answers;
  const { specificItems, missingColors, styleInspiration } = data || { };
  
  // Determine dominant style based on style preference and frequent items
  const stylePreference = answers['style-preference'] || 'Classic and timeless';
  const dominantStyle = stylePreference;
  
  // Calculate versatility score based on wardrobe size and refresh frequency
  let versatilityScore = 70; // Default
  if (wardrobeSize === 'Extensive (200+ items)') versatilityScore += 10;
  if (wardrobeSize === 'Minimal (under 50 items)') versatilityScore -= 10;
  if (wardrobeRefresh === 'Every season') versatilityScore += 15;
  if (wardrobeRefresh === 'Only as needed/seldom') versatilityScore -= 15;
  versatilityScore = Math.max(0, Math.min(100, versatilityScore));
  
  // Calculate organization level
  let organizationLevel = 65; // Default
  if (wardrobeSize === 'Minimal (under 50 items)') organizationLevel += 20;
  if (wardrobeSize === 'Extensive (200+ items)') organizationLevel -= 15;
  organizationLevel = Math.max(0, Math.min(100, organizationLevel));
  
  // Generate gap analysis based on frequent items and style preference
  const gapAnalysis = [];
  if (!frequentItems?.includes('Suits/blazers') && (stylePreference === 'Professional and polished' || stylePreference === 'Classic and timeless')) {
    gapAnalysis.push('Tailored blazer in neutral color');
  }
  if (!frequentItems?.includes('Skirts/dresses') && (stylePreference === 'Romantic and feminine' || stylePreference === 'Professional and polished')) {
    gapAnalysis.push('Versatile midi dress');
  }
  if (!frequentItems?.includes('Jeans/trousers')) {
    gapAnalysis.push('Well-fitting dark wash jeans');
  }
  if (!frequentItems?.includes('T-Shirts/tops')) {
    gapAnalysis.push('Basic quality t-shirts in neutral colors');
  }
  if (!frequentItems?.includes('Sweaters/knits') && stylePreference !== 'Edgy and bold') {
    gapAnalysis.push('Cashmere or wool sweater');
  }
  
  // Add missing colors if specified
  if (missingColors && missingColors.length > 0) {
    gapAnalysis.push(`Items in ${ missingColors } to add color variety`);
  }
  
  // Generate recommended additions
  const recommendedAdditions = [
    'Capsule wardrobe essentials in neutral colors',
    'Statement accessories to elevate basic outfits',
    'Versatile layering pieces for multiple seasons',
    'Quality basics that can be dressed up or down',
    'Signature pieces that reflect your personal style',
  ];
  
  // Generate outfit combinations
  const outfitCombinations = [
    'Jeans + White T-shirt + Blazer + Ankle Boots',
    'Midi Dress + Cardigan + Flats',
    'Tailored Pants + Silk Blouse + Heels',
    'Skirt + Sweater + Knee-high Boots',
    'Jeans + Button-down Shirt + Loafers',
  ];
  
  return {
    dominantStyle,
    versatilityScore,
    organizationLevel,
    gapAnalysis,
    recommendedAdditions,
    outfitCombinations,
    description: `Your wardrobe analysis shows a ${ dominantStyle.toLowerCase() } style with a versatility score of ${ versatilityScore }/100 and organization level of ${ organizationLevel }/100. We've identified key gaps and recommended additions to optimize your wardrobe.`,
  };
}

function generateShoppingAnalysis(answers: any, data: any) {
  const { budget, 'shopping-goals': shoppingGoals } = answers;
  const { wardrobeGaps, materialPreferences, silhouettePreferences, avoidStyles } = data || { };
  
  // Determine style profile based on style preference and shopping goals
  const stylePreference = answers['style-preference'] || 'Classic and timeless';
  const styleProfile = `${ stylePreference } with a focus on ${ shoppingGoals?.toLowerCase() || 'wardrobe essentials' }`;
  
  // Generate color preferences based on skin tone and style preference
  const skinTone = answers['skin-tone'] || 'Medium with warm undertones';
  let colorPreferences = [];
  
  if (skinTone.includes('warm')) {
    colorPreferences = ['Warm neutrals', 'Earth tones', 'Coral', 'Olive green', 'Terracotta'];
  } else if (skinTone.includes('cool')) {
    colorPreferences = ['Cool neutrals', 'Jewel tones', 'Burgundy', 'Navy', 'Lavender'];
  } else {
    colorPreferences = ['Universal neutrals', 'Mid-tone blues', 'Soft greens', 'Muted reds', 'Taupe'];
  }
  
  // Generate recommended brands based on budget and style preference
  let recommendedBrands = [];
  if (budget === 'Budget-friendly (under £500)') {
    recommendedBrands = ['H&M', 'Uniqlo', 'Zara', 'Mango', 'ASOS'];
  } else if (budget === 'Mid-range (£500-£1000)') {
    recommendedBrands = ['COS', 'Arket', '& Other Stories', 'Massimo Dutti', 'Sandro'];
  } else if (budget === 'Premium (£1000-£2000)') {
    recommendedBrands = ['Theory', 'Vince', 'Reiss', 'AllSaints', 'Club Monaco'];
  } else { // Luxury
    recommendedBrands = ['Max Mara', 'Toteme', 'Jil Sander', 'The Row', 'Loro Piana'];
  }
  
  // Generate statement pieces based on style preference
  let statementPieces = [];
  if (stylePreference === 'Classic and timeless') {
    statementPieces = ['Camel coat with perfect fit', 'Leather tote bag', 'Gold statement watch'];
  } else if (stylePreference === 'Modern and trendy') {
    statementPieces = ['Oversized blazer in bold color', 'Designer logo belt', 'Statement sunglasses'];
  } else if (stylePreference === 'Bohemian and relaxed') {
    statementPieces = ['Embroidered maxi dress', 'Suede fringe bag', 'Stacked bangles set'];
  } else if (stylePreference === 'Professional and polished') {
    statementPieces = ['Tailored suit in unexpected color', 'Designer work bag', 'Signature silk scarf'];
  } else if (stylePreference === 'Edgy and bold') {
    statementPieces = ['Leather jacket', 'Platform boots', 'Architectural jewelry piece'];
  } else { // Romantic and feminine
    statementPieces = ['Floral midi dress', 'Delicate jewelry set', 'Embellished evening clutch'];
  }
  
  // Generate versatile basics
  const versatileBasics = [
    'White button-down shirt',
    'Well-fitting dark jeans',
    'Black ankle boots',
    'Cashmere sweater',
    'Tailored blazer',
  ];
  
  // Calculate shopping priority score
  let shoppingPriorityScore = 75; // Default
  if (shoppingGoals === 'Complete wardrobe refresh') shoppingPriorityScore += 20;
  if (shoppingGoals === 'Specific occasion outfits') shoppingPriorityScore += 10;
  if (shoppingGoals === 'Statement pieces') shoppingPriorityScore -= 10;
  if (wardrobeGaps && wardrobeGaps.length > 20) shoppingPriorityScore += 15;
  shoppingPriorityScore = Math.max(0, Math.min(100, shoppingPriorityScore));
  
  return {
    styleProfile,
    colorPreferences,
    recommendedBrands,
    statementPieces,
    versatileBasics,
    shoppingPriorityScore,
    description: `Your shopping profile shows a ${ styleProfile } with a shopping priority score of ${ shoppingPriorityScore }/100. We've curated recommendations tailored to your budget of ${ budget } and style preferences.`,
  };
}

function generateStyleEvolutionAnalysis(answers: any, data: any) {
  const { 'style-challenges': styleChallenges, 'transformation-goals': transformationGoals, 'feeling-dressed': feelingDressed } = answers;
  const { occupation, contextConsiderations } = data || { };
  
  // Determine current style assessment
  const stylePreference = answers['style-preference'] || 'Classic and timeless';
  const currentStyleAssessment = `Your current style is primarily ${ stylePreference.toLowerCase() }, with challenges related to ${ styleChallenges?.toLowerCase() || 'confidence and consistency' }.`;
  
  // Calculate transformation potential
  let transformationPotential = 80; // Default
  if (styleChallenges === 'Lack of confidence in style choices') transformationPotential += 15;
  if (styleChallenges === 'Career transition requiring new image') transformationPotential += 10;
  if (styleChallenges === 'Style feels outdated or inconsistent') transformationPotential += 5;
  if (transformationGoals === 'More polished professional appearance') transformationPotential += 5;
  if (transformationGoals === 'Confidence in personal image') transformationPotential += 10;
  transformationPotential = Math.max(0, Math.min(100, transformationPotential));
  
  // Generate recommended direction
  let recommendedDirection = '';
  if (transformationGoals === 'More polished professional appearance') {
    recommendedDirection = 'Elevated Professional: Refining your work wardrobe with quality pieces that communicate authority and competence';
  } else if (transformationGoals === 'Authentic expression of personality') {
    recommendedDirection = 'Authentic Expression: Developing a signature style that reflects your unique personality while remaining versatile';
  } else if (transformationGoals === 'Age-appropriate yet modern style') {
    recommendedDirection = 'Modern Classic: Creating a timeless wardrobe with contemporary touches that feels age-appropriate yet fresh';
  } else if (transformationGoals === 'Versatile wardrobe for multiple occasions') {
    recommendedDirection = 'Versatile Foundation: Building a flexible wardrobe system that works across different contexts in your life';
  } else { // Confidence in personal image
    recommendedDirection = 'Confidence Building: Focusing on pieces that make you feel your best while developing a cohesive personal style';
  }
  
  // Generate key pieces to acquire
  let keyPiecesToAcquire = [];
  if (stylePreference === 'Classic and timeless') {
    keyPiecesToAcquire = ['Perfect-fitting blazer', 'Quality leather bag', 'Cashmere sweater', 'Dark wash jeans', 'White button-down shirt'];
  } else if (stylePreference === 'Modern and trendy') {
    keyPiecesToAcquire = ['Statement coat', 'Designer accessory', 'On-trend denim', 'Architectural top', 'Modern boots'];
  } else if (stylePreference === 'Bohemian and relaxed') {
    keyPiecesToAcquire = ['Flowy maxi dress', 'Embroidered jacket', 'Stacked jewelry', 'Suede boots', 'Printed kimono'];
  } else if (stylePreference === 'Professional and polished') {
    keyPiecesToAcquire = ['Tailored suit', 'Silk blouse', 'Structured handbag', 'Classic pumps', 'Statement watch'];
  } else if (stylePreference === 'Edgy and bold') {
    keyPiecesToAcquire = ['Leather jacket', 'Statement boots', 'Graphic tee', 'Distressed denim', 'Bold jewelry'];
  } else { // Romantic and feminine
    keyPiecesToAcquire = ['Floral dress', 'Lace blouse', 'A-line skirt', 'Delicate jewelry', 'Feminine cardigan'];
  }
  
  // Generate items to phase out
  const itemsToPhaseOut = [
    'Ill-fitting basics',
    'Outdated trend pieces',
    'Uncomfortable shoes',
    'Low-quality fabrics',
    'Items that don\'t make you feel confident',
  ];
  
  // Generate confidence boosters
  const confidenceBoosters = [
    'Invest in proper tailoring for key pieces',
    'Create outfit formulas for easy daily styling',
    'Add one signature accessory to define your look',
    'Focus on fit and fabric quality over quantity',
    'Develop a color palette that enhances your natural coloring',
  ];
  
  return {
    currentStyleAssessment,
    transformationPotential,
    recommendedDirection,
    keyPiecesToAcquire,
    itemsToPhaseOut,
    confidenceBoosters,
    description: `Your style evolution assessment shows ${ transformationPotential }% transformation potential. We recommend focusing on a ${ recommendedDirection.split(':')[0] } direction to achieve your goals of ${ transformationGoals?.toLowerCase() || 'improved style confidence' }.`,
  };
}