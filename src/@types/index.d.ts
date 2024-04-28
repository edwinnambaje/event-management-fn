import React from "react";

type MenuItem = {
  url: string;
  title: string;
  protected?: boolean;
};

type IconProps = { active: boolean };

type SideBarITem = {
  icon: (props: IconProps) => React.JSX.Element;
} & MenuItem;

type LoginDto = { identifier: string; password: string };
declare module '@tabler/icons-react';
type ProviderProps = {
  children: React.ChildNode;
};

type User = {
  username: string;
  email: string;
  userId: string;
  phoneNumber: string;
  active: boolean;
  role: string;
  createdAt: string;
};
type Booking = {
  bookingId: string;
  userId: string;
  eventId: string;
  Event: Event;
  User: User;
  tickets: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type Event = {
  eventId: string;
  name: string;
  description: string;
  image: string;
  date: Date;
  time: string;
  availableTickets: number;
  location: string;
  price: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};
