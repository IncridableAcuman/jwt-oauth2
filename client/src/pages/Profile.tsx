import React, { useEffect, useRef } from "react";
import { UseProfile } from "../provider/ProfileProvider";
import { Camera, User, Mail, ShieldCheck, Loader2 } from "lucide-react";

const FILE_BASE_URL = "http://localhost:8080/files/";

const ProfilePage = () => {
  const { profile, loading, fetchProfile, handleEditProfileAvatar } =
      UseProfile();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile) {
      handleEditProfileAvatar(profile.id, file);
    }
  };

  // Avatar URL-ni shakllantirish funksiyasi
  const getAvatarUrl = (avatarPath?: string | null) => {
    if (!avatarPath) return null;

    // 1. Agar OAuth (Google/GitHub) orqali kelgan to'liq URL bo'lsa
    if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
      return avatarPath;
    }

    // 2. Agar bazada eski "./uploads/file.png" saqlanib qolgan bo'lsa, uni tozalash
    const cleanFileName = avatarPath.replace(/^(\.\/|\/)?(uploads\/)?/, "");

    // 3. Local fayl manzili: http://localhost:8080/files/uuid.png
    return `${FILE_BASE_URL}${cleanFileName}`;
  };

  if (loading && !profile) {
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
        </div>
    );
  }

  const avatarUrl = getAvatarUrl(profile?.avatar);

  return (
      <div className="min-h-screen bg-gray-950 text-white p-6 flex justify-center items-center">
        <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-sky-500 bg-gray-800 flex items-center justify-center">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={profile?.username || "User avatar"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Agar rasm serverdan yuklanmasa, zaxira ikonkaga o'tish
                          (e.target as HTMLElement).style.display = "none";
                        }}
                    />
                ) : (
                    <User size={48} className="text-gray-400" />
                )}
              </div>

              <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-sky-500 hover:bg-sky-400 text-gray-950 rounded-full transition-colors"
              >
                <Camera size={16} />
              </button>

              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  accept="image/*"
                  className="hidden"
              />
            </div>

            <h2 className="mt-3 text-xl font-bold">{profile?.username}</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 mt-1">
            {profile?.role}
          </span>
          </div>

          {/* Info Section */}
          <div className="space-y-3">
            <div className="bg-gray-800/60 p-3.5 rounded-xl flex items-center gap-3">
              <Mail className="text-sky-400" size={18} />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium">{profile?.email}</p>
              </div>
            </div>

            <div className="bg-gray-800/60 p-3.5 rounded-xl flex items-center gap-3">
              <ShieldCheck className="text-sky-400" size={18} />
              <div>
                <p className="text-xs text-gray-400">Status</p>
                <p className="text-sm font-medium">
                  {profile?.enabled ? "Verifikatsiya qilingan" : "Tasdiqlanmagan"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;