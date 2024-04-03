import { Briefcase, Contact, Mail, Megaphone, Newspaper } from "lucide-react";

export const navLinks = [
  { href: "#", label: "Feed", icon: Newspaper },
  { href: "#", label: "Contacts", icon: Contact },
  { href: "/", label: "Jobs", icon: Briefcase },
  { href: "#", label: "Messages", icon: Mail },
  { href: "#", label: "Updates", icon: Megaphone },
];

export const footerLinks = [
  {
    heading: "Bookings support",
    links: [
      {
        href: "#",
        label: "COVID-19",
      },
      {
        href: "#",
        label: "Help Center",
      },
      {
        href: "#",
        label: "Support",
      },
      {
        href: "#",
        label: "Trust & Safety",
      },
    ],
  },
  {
    heading: "Community",
    links: [
      {
        href: "#",
        label: "Against Discrimination",
      },
      {
        href: "#",
        label: "Invite friends",
      },
      {
        href: "#",
        label: "Gift cards",
      },
    ],
  },
  {
    heading: "About",
    links: [
      {
        href: "#",
        label: "How it works",
      },
      {
        href: "#",
        label: "Careers",
      },
      {
        href: "#",
        label: "About us",
      },
      {
        href: "#",
        label: "Media",
      },
    ],
  },
  {
    heading: "Become an employer",
    links: [
      {
        href: "/dashboard",
        label: "Post your job",
      },
      {
        href: "#",
        label: "Business account",
      },
      {
        href: "#",
        label: "Resource Center",
      },
      {
        href: "#",
        label: "Community",
      },
    ],
  },
];
