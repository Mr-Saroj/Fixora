import React from "react";

import {
  SectionCard,
  TitleInput,
  MessageTextarea,
  SendButton,
} from "./SharedUI";

import {
  ROLE_OPTIONS,
  getRoleButtonClasses,
  getTitlePlaceholder,
  getMessagePlaceholder,
  getSendButtonLabel,
} from "../utils/roleBasedFormUtils";

const RoleBasedForm = ({
  title,
  setTitle,
  message,
  setMessage,
  role,
  setRole,
  loading,
  onSubmit,
}) => (
  <SectionCard icon="group" title="Send to a Role" badge="BY ROLE">
    <div className="space-y-3">

      <p className="text-xs text-slate-400 leading-relaxed">
        Target only customers or only technicians with this message.
      </p>

      {/* Role Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2">
          Select Role
        </label>

        <div className="flex gap-2">
          {ROLE_OPTIONS.map((roleOption) => (
            <button
              key={roleOption.value}
              type="button"
              onClick={() => setRole(roleOption.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 capitalize ${getRoleButtonClasses(
                roleOption.value,
                role
              )}`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {roleOption.icon}
              </span>

              {roleOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <TitleInput
        value={title}
        onChange={setTitle}
        placeholder={getTitlePlaceholder(role)}
      />

      {/* Message */}
      <MessageTextarea
        value={message}
        onChange={setMessage}
        placeholder={getMessagePlaceholder(role)}
      />

      {/* Send Button */}
      <div className="flex justify-end">
        <SendButton
          onClick={onSubmit}
          loading={loading}
          disabled={!title.trim() || !message.trim()}
          label={getSendButtonLabel(role)}
        />
      </div>
    </div>
  </SectionCard>
);

export default RoleBasedForm;