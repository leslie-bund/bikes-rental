import {
  BsFillCalendarPlusFill,
  BsBicycle,
  BsCardList,
  BsPeopleFill,
  BsPieChartFill,
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
    path: "/home/my-reserve",
    icon: BsFillCalendarPlusFill,
    label: "My Reservations",
  },
].map((ele: IMenu, ind) => {
  ele["id"] = "user" + ind;
  return ele;
});

export const mngrNav = [
  {
    path: "/home/all-reservation/default",
    label: "All Reservations",
    icon: BsCardList,
  },
  {
    path: '/home/all-reservation/users',
    label: 'User Reservations',
    icon: BsPeopleFill
  },
  {
    path: '/home/all-reservation/bikes',
    label: 'Bikes Reserved',
    icon: BsPieChartFill
  }
].map((ele: IMenu, ind) => {
  ele["id"] = "user" + ind;
  return ele;
});
