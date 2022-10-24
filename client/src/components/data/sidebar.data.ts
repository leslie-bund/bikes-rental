import {
  BsFillCalendarPlusFill,
  BsBicycle,
  BsCardList,
  BsPeopleFill,
  BsPieChartFill
} from "react-icons/bs";

interface IMenu {
  id?: string;
  path: string;
  icon: any;
  label: string;
}

export const userNav = [
  {
    path: "/home/avail-bikes",
    label: "Available Bikes",
    icon: BsBicycle,
  },
  {
    path: "/home/my",
    icon: BsFillCalendarPlusFill,
    label: "My Reservations",
  },
].map((ele: IMenu, ind) => {
  ele["id"] = "user" + ind;
  return ele;
});

export const mngrNav = [
  {
    path: "/home/all-reservation",
    label: "All Reservations",
    icon: BsCardList,
  },
  {
    path: '/home/all-user-reservations',
    label: 'User Reservations',
    icon: BsPeopleFill
  },
  {
    path: '/home/all-bikes-reserved',
    label: 'Bikes Reserved',
    icon: BsPieChartFill
  }
].map((ele: IMenu, ind) => {
  ele["id"] = "user" + ind;
  return ele;
});
