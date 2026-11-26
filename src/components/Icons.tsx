import { Briefcase, GraduationCap, HardHat, Plane, Repeat, Users } from "lucide-react";
import type { Service } from "@/lib/services";

const map = { plane: Plane, briefcase: Briefcase, users: Users, graduation: GraduationCap, hardhat: HardHat, repeat: Repeat };

export function ServiceIcon({ name, size = 24, className }: { name: Service["icon"]; size?: number; className?: string }) {
  const I = map[name];
  return <I size={size} className={className} />;
}
