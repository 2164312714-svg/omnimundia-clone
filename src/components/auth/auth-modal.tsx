"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal";
import { useUser } from "@/hooks/use-user";

export function AuthModal() {
  const { closeModal, showModal } = useModal();
  const { login } = useUser();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  // 登录表单
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // 注册表单
  const [regEmail, setRegEmail] = useState("");
  const [regNickname, setRegNickname] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: 直接登录
    login();
    closeModal();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      return;
    }
    // Mock: 注册成功，提示去邮箱验证
    closeModal();
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) closeModal(); }}>
      <DialogContent
        className="max-w-md gap-0 border p-0"
        style={{
          backgroundColor: "var(--app-bg-l5)",
          borderColor: "var(--app-border-l2)",
          borderRadius: "8px",
        }}
      >
        <DialogClose className="absolute right-3 top-3 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100">
          <X className="h-4 w-4 text-app-text-l4" />
        </DialogClose>

        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-center" style={{ fontSize: "1.5rem", color: "var(--app-text-l2)" }}>
            欢迎来到 Omnimundia
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="px-6 pb-6">
          <TabsList className="mb-4 grid w-full grid-cols-2" style={{ backgroundColor: "var(--app-bg-l4)" }}>
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>

          {/* 登录 */}
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-app-text-l2">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="请输入邮箱"
                    className="pl-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-app-text-l2">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="pl-10 pr-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-l5 hover:text-app-text-l3"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => showModal("forgotPassword")}
                  className="text-sm text-app-theme hover:underline"
                >
                  忘记密码？
                </button>
              </div>

              <Button type="submit" className="w-full bg-app-theme text-app-secondary hover:bg-app-theme">
                登录
              </Button>
            </form>
          </TabsContent>

          {/* 注册 */}
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-nickname" className="text-app-text-l2">昵称</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="reg-nickname"
                    type="text"
                    value={regNickname}
                    onChange={(e) => setRegNickname(e.target.value)}
                    placeholder="请输入昵称"
                    className="pl-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-app-text-l2">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="reg-email"
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="请输入邮箱"
                    className="pl-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-app-text-l2">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="pl-10 pr-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-l5 hover:text-app-text-l3"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-confirm" className="text-app-text-l2">确认密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="reg-confirm"
                    type={showPassword ? "text" : "password"}
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    placeholder="请再次输入密码"
                    className="pl-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                    required
                  />
                </div>
                {regPassword && regConfirm && regPassword !== regConfirm && (
                  <p className="text-sm text-app-red">两次输入的新密码不一致</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-app-theme text-app-secondary hover:bg-app-theme">
                注册
              </Button>
              <p className="text-center text-xs text-app-text-l5">
                注册成功后请前往邮箱验证
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
