declare global {
  declare module 'express' {
    interface Request {
      contextParams?: {
        id: number;
        name: string;
        email: string;
        active: boolean;
        userRole: { id: number; name: string };
      };
    }
  }
}
