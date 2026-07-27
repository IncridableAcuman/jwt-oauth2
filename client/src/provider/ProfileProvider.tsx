import React, { createContext, useCallback, useContext, useState } from "react";
import type IUser from "../interfaces/user.interface";
import { toast } from "react-toastify";
import axiosInstance from "../api/api";

type ProfileContextType = {
  profile: IUser | null;
  setProfile: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  handleEditProfileAvatar: (id: number, file: File) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/profile");
      setProfile(data);
    } catch (error) {
      console.log(error);
      toast.error("Profil ma'lumotlarini yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEditProfileAvatar = async (id: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await axiosInstance.patch(`/profile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(data);
      toast.success("Avatar muvofaqqiyatli yangilandi");
    } catch (error) {
      console.log(error);
      toast.error("Avatar yuklashda xatolik yuz berdi!");
    }
  };

  return (
    <>
      <ProfileContext.Provider
        value={{
          profile,
          setProfile,
          handleEditProfileAvatar,
          loading,
          fetchProfile,
        }}
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};

export const UseProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("Useprofile context must be within Profile provider");
  return context;
};
