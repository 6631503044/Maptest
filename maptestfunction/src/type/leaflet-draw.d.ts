import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    class Draw extends L.Control {
      constructor(options?: any);
    }
  }

  namespace Draw {
    class Event {
      static CREATED: string;
      static EDITED: string;
      static DELETED: string;
    }
  }
}
