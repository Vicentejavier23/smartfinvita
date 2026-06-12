import {
  Building2, ShieldCheck, PiggyBank, PieChart, TrendingUp,
  Home, Smartphone, BarChart2, Bitcoin, Star, Check, X,
  Shield, AlertTriangle, Clock, Droplets, ArrowUpRight,
} from 'lucide-react';

const ICON_MAP = {
  'building-2':   Building2,
  'shield-check': ShieldCheck,
  'piggy-bank':   PiggyBank,
  'pie-chart':    PieChart,
  'trending-up':  TrendingUp,
  'home':         Home,
  'smartphone':   Smartphone,
  'bar-chart-2':  BarChart2,
  'bitcoin':      Bitcoin,
  'star':         Star,
  'check':        Check,
  'x':            X,
  'shield':       Shield,
  'alert-triangle': AlertTriangle,
  'clock':        Clock,
  'droplets':     Droplets,
  'arrow-up-right': ArrowUpRight,
};

export default function LucideIcon({ name, size = 20, className = '', ...props }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} {...props} />;
}
