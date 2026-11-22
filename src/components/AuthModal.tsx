"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Castle, Mail, Lock, User as UserIcon, ArrowRight } from "lucide-react";

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
          setError(res.error.message || "Ошибка регистрации");
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
          setError(res.error.message || "Неверный логин или пароль");
        } else {
          onSuccess();
          onClose();
        }
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Непредвиденная ошибка";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-500">
            <Castle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">
              {isRegister ? "Создать профиль милорда" : "Вход в королевский архив"}
            </h2>
            <p className="text-xs text-slate-400">Синхронизация государств и решений</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Имя или титул</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Лорд Эддард"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="lord@realm.live"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Пароль</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition mt-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Подождите...</span>
            ) : (
              <>
                <span>{isRegister ? "Зарегистрироваться" : "Войти"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-amber-400 hover:underline text-[11px]"
          >
            {isRegister ? "Уже есть профиль? Войти" : "Нет профиля? Создать"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-[11px]"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
