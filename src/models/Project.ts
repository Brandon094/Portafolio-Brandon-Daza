export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  keyPoints: string[];
  technologies: string[];
  status: 'completed' | 'in_progress';
  progress?: number;
  liveUrl?: string;     // Enlace a la Web
  playStoreUrl?: string; // Enlace a la Play Store
}
