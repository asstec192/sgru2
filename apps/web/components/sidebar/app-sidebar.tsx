"use client";

import * as React from "react";
import {
  Ambulance,
  BookOpen,
  ChartNoAxesCombined,
  Hospital,
  Siren,
  UserCog,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavLogo } from "@/components/sidebar/nav-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartNoAxesCombined,
      isActive: true,
      items: [
        {
          title: "CRUFor",
          url: "/dashboard/crufor",
        },
        {
          title: "SAMUFor",
          url: "/dashboard/samufor",
        },
        {
          title: "RUE",
          url: "/dashboard/rue",
        },
      ],
    },
    {
      title: "SAMUFor",
      url: "/dashboard/veiculos",
      icon: Ambulance,
      items: [
        {
          title: "Veículos",
          url: "/samufor/veiculos",
        },
        {
          title: "Destinos",
          url: "/samufor/destinos",
        },
        {
          title: "Intercorrências",
          url: "/samufor/intercorrencias",
        },
      ],
    },

    {
      title: "Regulacao",
      url: "/regulacao",
      icon: Siren,
    },
    {
      title: "Rede de urgência",
      url: "/rede-urgencia",
      icon: Hospital,
    },
    {
      title: "Protocolos",
      url: "/protocolos",
      icon: BookOpen,
    },
    {
      title: "Administrador",
      url: "/admin",
      icon: UserCog,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
