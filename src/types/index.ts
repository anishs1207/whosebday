export interface Birthday {
  id: string;
  name: string;
  title: string;
  day: number;
  month: number;
  year?: number | null;
  userId: string;
  createdAt: Date;
}

export interface BirthdayInput {
  name: string;
  title: string;
  day: string | number;
  month: string | number;
  year?: string | number | null;
}
