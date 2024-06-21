export interface TimeBlock {
  id: string;
  name: string;
  startTime: string;  
  duration: string;  
  endTime: string;
  day: string; 
  userId?: string;    
}

export interface TimeBlockData {
  id: string;
  name: string;
  startTime: string; 
  endTime: string;
  day: string;  
}
