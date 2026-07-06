"use client";

import { useState } from "react";
import { X, User, Mail, LogOut, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/hooks/use-modal";
import { useUser } from "@/hooks/use-user";

export function AccountSettingsModal() {
  const { closeModal } = useModal();
  const { user, logout } = useUser();

  const [nickname, setNickname] = useState(user.nickname);
  const [profession, setProfession] = useState(user.profession ?? "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
  };

  const handleLogout = () => {
    logout();
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
            账号设置
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="px-6 pb-6">
          <TabsList className="mb-4 grid w-full grid-cols-2" style={{ backgroundColor: "var(--app-bg-l4)" }}>
            <TabsTrigger value="profile">资料</TabsTrigger>
            <TabsTrigger value="security">安全</TabsTrigger>
          </TabsList>

          {/* 资料设置 */}
          <TabsContent value="profile" className="space-y-4">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="settings-nickname" className="text-app-text-l2">昵称</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    id="settings-nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="pl-10"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="settings-profession" className="text-app-text-l2">职业 / 简介</Label>
                <Input
                  id="settings-profession"
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="例如：角色扮演类游戏玩家"
                  style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-app-text-l2">邮箱（不可更改）</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-text-l5" />
                  <Input
                    type="email"
                    value={user.email}
                    readOnly
                    className="pl-10 opacity-60"
                    style={{ backgroundColor: "var(--app-bg-l2)", borderColor: "var(--app-border-l2)" }}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-app-theme text-app-secondary hover:bg-app-theme">
                保存
              </Button>
            </form>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-[14px] border p-4" style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}>
                <Shield className="h-5 w-5 text-app-theme" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-app-text-l1">修改密码</p>
                  <p className="text-xs text-app-text-l4">定期更换以保障账号安全</p>
                </div>
                <Button variant="outline" size="sm" className="border-app-border-l2 text-app-text-l3">
                  修改
                </Button>
              </div>

              <div className="flex items-center gap-3 rounded-[14px] border p-4" style={{ borderColor: "var(--app-border-l2)", backgroundColor: "var(--app-bg-l2)" }}>
                <Mail className="h-5 w-5 text-app-theme" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-app-text-l1">邮箱验证</p>
                  <p className="text-xs text-app-green">已验证</p>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleLogout}
                variant="outline"
                className="w-full border-app-red text-app-red hover:bg-app-red hover:text-app-secondary"
              >
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
