"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, User as UserIcon, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name || "Милорд",
        });
        if (res.error) {
          setError(res.error.message || "Ошибка записи в летопись");
        } else {
          onSuccess();
          onClose();
        }
      } else {
        const res = await authClient.signIn.email({
          email,
          password,
        });
        if (res.error) {
          setError(res.error.message || "Неверная грамота или тайное слово");
        } else {
          onSuccess();
          onClose();
        }
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Ошибка обращения к замковой книге";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="bg-[#120a05] border-2 border-[#54381e] rounded-2xl w-full max-w-sm p-6 shadow-[0_20px_60px_rgba(0,0,0,0.98)] relative font-serif">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a6843] hover:text-[#d4af37] transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#21140a] border border-[#54381e] flex items-center justify-center text-[#d4af37] text-2xl shadow-inner">
            📜
          </div>
          <h2 className="text-base font-bold text-[#f5e6b8] tracking-widest uppercase">
            {isRegister ? "Летопись рода" : "Королевская грамота"}
          </h2>
          <p className="text-[11px] text-[#8a6843] tracking-wide mt-1">
            {isRegister ? "Впишите свое благородное имя" : "Назовите себя страже у ворот"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-[#2b0c0c] border border-[#7a1c1c] rounded-lg text-xs text-[#ff9999] text-center font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 font-sans">
          {isRegister && (
            <div>
              <label className="block text-[11px] font-serif uppercase tracking-wider text-[#a88258] mb-1">
                Имя или титул
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#6e5033] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Лорд Вадим"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0603] border border-[#3d2715] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f5e6b8] placeholder-[#523c28] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-[#a88258] mb-1">
              Почта (Email)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6e5033] absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="lord@realm.live"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0603] border border-[#3d2715] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f5e6b8] placeholder-[#523c28] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-serif uppercase tracking-wider text-[#a88258] mb-1">
              Тайное слово (Пароль)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6e5033] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0603] border border-[#3d2715] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f5e6b8] placeholder-[#523c28] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#8c6729] hover:bg-[#aa7d33] border border-[#d4af37] text-[#140a04] font-serif font-black uppercase tracking-widest text-xs rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? "Сверка печатей..." : isRegister ? "Скрепить печатью" : "Войти в чертоги"}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#331f10] text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#c49a45] hover:text-[#f5e6b8] text-[11px] underline underline-offset-4"
          >
            {isRegister ? "Уже вписаны в летопись? Назвать пароль" : "Нет родового герба? Записаться в летопись"}
          </button>
        </div>
      </div>
    </div>
  );
};
