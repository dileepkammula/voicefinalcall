export interface Report {
  id: number;
  type: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  date: string;
  time: string;
  severity: string;
  description?: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  type: string;
  location: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
  likes: number;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: number;
  content: string;
  date: string;
  likes: number;
  isSupport: boolean;
}