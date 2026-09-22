import {
  Atom,
  FlaskConical,
  Dna,
  Sparkles,
  Radio,
  Cpu,
  Globe,
  Rocket,
  Lightbulb,
  Plane,
  HelpCircle,
  LucideProps,
} from 'lucide-react';
import React from 'react';
import { EventCategory } from '../types';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Atom,
  FlaskConical,
  Dna,
  Sparkles,
  Radio,
  Cpu,
  Globe,
  Rocket,
  Lightbulb,
  Plane,
};

const CATEGORY_DEFAULT_ICONS: Record<EventCategory, React.ComponentType<LucideProps>> = {
  science: Atom,
  technology: Cpu,
  space: Rocket,
  inventions: Lightbulb,
};

interface EventIconProps extends LucideProps {
  name?: string;
  category?: EventCategory;
}

export function EventIcon({ name, category, ...props }: EventIconProps) {
  const Component =
    (name ? ICON_MAP[name] : null) ||
    (category ? CATEGORY_DEFAULT_ICONS[category] : null) ||
    HelpCircle;
  return <Component {...props} />;
} 