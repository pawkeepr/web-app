'use client'

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { logoutUser } from "../../store/actions";

//redux
import { useAppDispatch, useAppSelector } from "~/store/hooks";

const Logout = () => {
  const dispatch = useAppDispatch();

  const { isUserLogout } = useAppSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return redirect("/sign-in");
  }

  return <></>;
};


export default Logout;