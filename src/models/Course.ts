export interface Course {
  id: string;
  title: string;
  category: 'frontend' | 'backend' | 'mobile' | 'logic' | 'ai';
  language: 'python' | 'javascript' | 'html' | 'css' | 'kotlin' | 'java' | 'logic';
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g. "12 Horas"
  lessonsCount: number;
  status: 'active' | 'coming_soon';
  thumbnail?: string;
}
