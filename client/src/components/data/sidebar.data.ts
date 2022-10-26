import {
  BsFillCalendarPlusFill,
  BsBicycle,
  BsCardList,
  BsPersonPlusFill,
  BsPieChartFill,
  BsFillPeopleFill,
  BsSpeedometer,
  BsPinAngleFill,
  BsBarChartFill
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
    icon: BsBarChartFill,
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
    path: "/home/new-user",
    label: "Add User",
    icon: BsPersonPlusFill
  },
  {
    path: "/home/all/user",
    label: "All Users",
    icon: BsFillPeopleFill,
  },
  {
    path: "/home/all-reservation/users",
    label: "User Reservations",
    icon: BsPinAngleFill,
  },
  {
    path: "/home/new-bike",
    label: "Add Bike",
    icon: BsBicycle
  },
  {
    path: "/home/all/bike",
    label: "All Bikes",
    icon: BsSpeedometer,
  },
  {
    path: "/home/all-reservation/bikes",
    label: "Bikes Reserved",
    icon: BsPieChartFill,
  },
].map((ele: IMenu, ind) => {
  ele["id"] = "user" + ind;
  return ele;
});
