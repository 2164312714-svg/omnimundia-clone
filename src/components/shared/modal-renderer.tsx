"use client";

import { useModal } from "@/hooks/use-modal";
import { AuthModal } from "@/components/auth/auth-modal";
import { RechargeModal } from "@/components/wallet/recharge-modal";
import { ForgotPasswordModal } from "@/components/auth/forgot-password-modal";
import { InviteFriendsModal } from "@/components/shared/invite-friends-modal";
import { OfficialGroupDialog } from "@/components/shared/official-group-dialog";
import { SurveyDialog } from "@/components/shared/survey-dialog";
import { AccountSettingsModal } from "@/components/auth/account-settings-modal";

/** 全局弹窗渲染器 — 根据 activeModal 渲染对应弹窗 */
export function ModalRenderer() {
  const { activeModal } = useModal();

  return (
    <>
      {activeModal === "auth" && <AuthModal />}
      {activeModal === "recharge" && <RechargeModal />}
      {activeModal === "forgotPassword" && <ForgotPasswordModal />}
      {activeModal === "invite" && <InviteFriendsModal />}
      {activeModal === "officialGroup" && <OfficialGroupDialog />}
      {activeModal === "survey" && <SurveyDialog />}
      {activeModal === "accountSettings" && <AccountSettingsModal />}
    </>
  );
}
