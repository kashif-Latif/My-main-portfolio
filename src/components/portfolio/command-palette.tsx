"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Home, User, Cpu, FolderGit2, Route, Github, Send, Terminal } from "lucide-react";
import { navItems, RouteId } from "@/data/navigation";
import { useAppRouter } from "@/hooks/use-app-router";
import { siteConfig } from "@/data/profile";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenTerminal: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  User,
  Cpu,
  FolderGit2,
  Route,
  Github,
  Send,
};

export function CommandPalette({
  open,
  onOpenChange,
  onOpenTerminal,
}: CommandPaletteProps) {
  const { navigate } = useAppRouter();

  const go = (id: RouteId) => {
    navigate(id);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] ?? Home;
            return (
              <CommandItem
                key={item.id}
                onSelect={() => go(item.id)}
                className="cursor-pointer"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {item.description}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick actions">
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              onOpenTerminal();
            }}
            className="cursor-pointer"
          >
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span>Open interactive terminal</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              window.open(siteConfig.social.github, "_blank");
              onOpenChange(false);
            }}
            className="cursor-pointer"
          >
            <Github className="h-4 w-4 text-muted-foreground" />
            <span>Open GitHub profile</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              window.open(siteConfig.social.linkedin, "_blank");
              onOpenChange(false);
            }}
            className="cursor-pointer"
          >
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Open LinkedIn profile</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              window.location.href = `mailto:${siteConfig.email}`;
              onOpenChange(false);
            }}
            className="cursor-pointer"
          >
            <Send className="h-4 w-4 text-muted-foreground" />
            <span>Send email</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
