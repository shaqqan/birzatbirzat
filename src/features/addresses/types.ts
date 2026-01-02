export interface Address {
  id: number;
  street: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
  comment?: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}
