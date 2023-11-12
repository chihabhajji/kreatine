import { Identity } from '@ory/client';

export interface CustomIdentity extends Identity {
  state: boolean;
  email: string;
  internalId: string;
  // TODO: do shit idk
}

declare global {
  namespace Express {
    interface Request {
      session?: CustomIdentity;
    }
  }
}
