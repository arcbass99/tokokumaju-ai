export type TargetGoal =
  | "whatsapp"
  | "visit_store"
  | "booking"
  | "catalog"
  | "registration"
  | "order_product";

export type VisualVibe =
  | "modern_clean"
  | "warm_friendly"
  | "premium_classic"
  | "creative_unique"
  | "bold_energetic"
  | "custom";

export type ColorPalette =
  | "warm_terracotta"
  | "ocean_breeze"
  | "soft_earth"
  | "premium_dark"
  | "fresh_green"
  | "custom";

export type CopyTone =
  | "professional"
  | "casual_persuasive"
  | "warm_family"
  | "elegant"
  | "light_humor";

export type BusinessBrief = {
  businessName: string;
  category: string;
  customCategory?: string;
  slogan?: string;

  featuredProducts: string;
  priceRange?: string;
  productStrengths?: string;
  reasonToChoose?: string;

  whatsapp: string;
  mapsUrl?: string;
  operatingHours?: string;
  paymentMethods: string[];

  socialLinks: {
    platform: string;
    value: string;
  }[];

  targetGoal: TargetGoal;
  visualVibe: VisualVibe;
  customVibe?: string;
  colorPalette: ColorPalette;
  copyTone: CopyTone;

  extraNotes?: string;
};

export type AIStrategy = {
  positioning: string;
  targetAudience: string;
  valueProposition: string;
  mainCTA: string;
  recommendedStructure: string[];
  missingInformation: string[];
  riskNotes: string[];
  improvementSuggestions: string[];
};

export type GeneratedSite = {
  brandStrategy: {
    positioning: string;
    targetAudience: string;
    valueProposition: string;
    mainCTA: string;
  };

  designTokens: {
    headingFont: string;
    bodyFont: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    radius: "none" | "small" | "medium" | "large" | "full";
    styleDirection: string;
  };

  sections: {
    hero: {
      headline: string;
      subheadline: string;
      primaryCTA: string;
      secondaryCTA?: string;
    };

    highlights: {
      title: string;
      description: string;
    }[];

    products: {
      name: string;
      description: string;
      price?: string;
    }[];

    whyChooseUs: {
      title: string;
      description: string;
    }[];

    trustSignals: string[];

    location: {
      title: string;
      description: string;
      mapsUrl?: string;
      operatingHours?: string;
    };

    faq: {
      question: string;
      answer: string;
    }[];

    finalCTA: {
      headline: string;
      description: string;
      buttonText: string;
    };
  };

  marketingCopy: {
    whatsappBroadcast: string;
    instagramCaption: string;
    instagramBio: string;
    googleBusinessDescription: string;
    faqForCustomers: {
      question: string;
      answer: string;
    }[];
    alternativeTaglines: string[];
    alternativeCTAs: string[];
  };

  qualityScore: {
    clarity: number;
    conversion: number;
    trust: number;
    mobileReadiness: number;
    completeness: number;
    suggestions: string[];
  };
};