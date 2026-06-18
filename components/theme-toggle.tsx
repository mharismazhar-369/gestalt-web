"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Palette, Monitor, Briefcase, Zap, Brain, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full border-border/50 text-foreground bg-background/50 backdrop-blur-sm hover:bg-muted transition-all shadow-sm">
          <Palette className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl border-border bg-background shadow-xl w-56 p-2">
        <div className="px-2 py-1.5 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Brand Palettes</div>
        <DropdownMenuItem onClick={() => setTheme("corporate")} className="cursor-pointer rounded-xl font-medium mb-1 hover:bg-muted">
          <Briefcase className="mr-2 h-4 w-4 text-[#00C4CC]" /> Corporate Innovator
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dynamic")} className="cursor-pointer rounded-xl font-medium mb-1 hover:bg-muted">
          <Zap className="mr-2 h-4 w-4 text-[#FF5722]" /> Dynamic Integrator
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("holistic")} className="cursor-pointer rounded-xl font-medium mb-1 hover:bg-muted">
          <Brain className="mr-2 h-4 w-4 text-[#81D4FA]" /> Intelligent Holistic
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("secure")} className="cursor-pointer rounded-xl font-medium mb-1 hover:bg-muted">
          <Shield className="mr-2 h-4 w-4 text-[#2E7D32]" /> Rock-Solid Secure
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("humanistic")} className="cursor-pointer rounded-xl font-medium mb-2 hover:bg-muted">
          <Heart className="mr-2 h-4 w-4 text-[#AD1457]" /> Humanistic Tech
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-border" />
        
        <div className="px-2 py-1.5 text-xs font-semibold text-foreground/50 uppercase tracking-wider mt-1">System</div>
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer rounded-xl font-medium mb-1 hover:bg-muted">Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer rounded-xl font-medium mb-1 hover:bg-muted">Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer rounded-xl font-medium hover:bg-muted"><Monitor className="mr-2 h-4 w-4" /> System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}