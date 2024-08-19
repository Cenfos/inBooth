export interface Item {
  title: string;
  description: string;
}

export interface Section {
  title: string;
  description?: string;
  items?: Item[];
  steps?: Item[];
}

export interface InterpretationTranslations {
  title: string;
  sections: {
    professionalServices: {
      title: string;
      description: string;
    };
    whatWeOffer: {
      title: string;
      simultaneousInterpretation: ServiceSection;
      consecutiveInterpretation: ServiceSection;
      legalInterpretation: ServiceSection;
      medicalInterpretation: ServiceSection;
    };
    workingProcess: {
      title: string;
      steps: Item[];
    };
    whyChooseUs: {
      title: string;
      items: Item[];
    };
  };
}

// Refactorización para evitar repetición en las secciones de servicios
export interface ServiceSection {
  title: string;
  items: Item[];
}
