declare module 'react-map-interaction' {
    import { Component, ReactNode } from 'react';
    
    interface MapInteractionProps {
      children: ReactNode;
      showControls?: boolean;
      minScale?: number;
      maxScale?: number;
      scale?: number;
      translation?: { x: number, y: number };
      defaultScale?: number;
      defaultTranslation?: { x: number, y: number };
      onChange?: (value: { scale: number, translation: { x: number, y: number } }) => void;
    }
    
    export class MapInteraction extends Component<MapInteractionProps> {}
    export class MapInteractionCSS extends Component<MapInteractionProps> {}
  }