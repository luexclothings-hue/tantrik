"use client";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  isOpen?: boolean;
}

export default function Sidebar({
  isOpen = false,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span className="logo-text">Tantrik</span>
      </div>

      <ThemeToggle />
    </aside>
  );
}
